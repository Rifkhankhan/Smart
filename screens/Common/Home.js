import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import PagerView from "react-native-pager-view";

// Components
import Header from "../../components/Common/Header";
import Carouselcomponent from "../../components/HomeComponents/Carousel";
import CategoryComponent from "../../components/CategoryComponent";
import ServiceListComponent from "../Services/ServiceListComponent";
import BigItemList from "../../components/BigItemList";
import HomeItemList from "../../components/HomeItemList";
import CardContainer from "../../components/CardContainer";
import CategoryTabs from "../../navigation/Comman/TopTabNavigator";
import { LayoutAnimation } from "react-native"; // at the top
import HomeCategoryComponent from "../../components/HomeCategoryComponent";

const AdminHome = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const [pagerHeight, setPagerHeight] = useState(screenHeight);

  const products = useSelector((state) => state.product.products);
  const categories = [...new Set(products.map((p) => p.category))];
  const tabRefs = useRef([]);
  useEffect(() => {
    if (categories?.length) {
      tabRefs.current = categories.map(() => React.createRef());
    }
  }, [categories]);

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: ["#f0ffff", "#b2ffff"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("SearchScreen")}
          style={styles.headerIcon}
          name="search"
          color="white"
          size={24}
        />
      ),
      header: () => (
        <Header
          backgroundColor={backgroundColor}
          placeHolder="Search in SmartServe"
        />
      ),
    });
  }, [navigation]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  };

  const handleSwipePageChange = (e) => {
    const index = e.nativeEvent.position;
    setActiveTab(index);
  };

  const DATA = [
    // { key: "carousel", render: () => <Carouselcomponent /> },
    { key: "category", render: () => <CategoryComponent /> },
    {
      key: "services",
      render: () => <ServiceListComponent title="Services" />,
    },
    {
      key: "offers",
      render: () => <BigItemList title="Today Offers" subTitle="Limited" />,
    },
    {
      key: "Categories",
      render: () => (
        <HomeCategoryComponent title="Categories" subTitle="Shop More" />
      ),
    },
    {
      key: "tabs",
      render: () => (
        <CategoryTabs
          activeTab={activeTab}
          setActiveTab={handleTabPress}
          categories={categories}
        />
      ),
    },
    {
      key: "pager",
      render: () => (
        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={handleSwipePageChange}
          style={{
            height: pagerHeight,
            marginTop: 5,
          }}
        >
          {categories.map((category, index) => (
            <View key={index}>
              <View
                onLayout={(event) => {
                  if (index === activeTab) {
                    const { height } = event.nativeEvent.layout;

                    if (height > 0 && height !== pagerHeight) {
                      setPagerHeight(height);
                    }
                  }
                }}
              >
                <CardContainer category={category} />
              </View>
            </View>
          ))}
        </PagerView>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => item.render()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const offsetY = event.nativeEvent.contentOffset.y;
              setShowScrollTop(offsetY > 200);
            },
          }
        )}
        stickyHeaderIndices={[5]} // 'tabs' is index 5
        showsVerticalScrollIndicator={false}
      />

      {showScrollTop && (
        <View style={styles.scrollTopContainer}>
          <Ionicons
            name="arrow-up-circle"
            size={50}
            color="#007AFF"
            onPress={() =>
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerIcon: {
    marginRight: 10,
  },
  scrollTopContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 100,
  },
});
