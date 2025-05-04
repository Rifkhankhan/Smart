import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Components
import CategoryComponent from "../../components/CategoryComponent";
import HomeItemList from "../../components/HomeItemList";
import BigItemList from "../../components/BigItemList";
import CardContainer from "../../components/CardContainer";
import ServiceListComponent from "../Services/ServiceListComponent";
import Header from "../../components/Common/Header";
import Carouselcomponent from "../../components/HomeComponents/Carousel";
import CategoryTabs from "../../navigation/Comman/TopTabNavigator";
import TopTabsComponent from "./TopTabs";

const HomePrevious = ({ navigation }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = React.useRef(null);

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: ["#f0ffff", "#b2ffff"], // adjust as needed
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

  const renderHeaderComponents = useCallback(
    () => (
      <View style={styles.container}>
        {/* Delivery in 
        15 minutes 
        live location address now */}

        {/* carousel banner */}
        <Carouselcomponent />

        <CategoryComponent />
        <ServiceListComponent title="Services" />
        <BigItemList title="Today Offers" subTitle="Limited" />
        <HomeItemList title="Everything Under" subTitle="Rs.99" />
      </View>
    ),
    []
  );

  const renderFooterComponent = useCallback(
    () => (
      <>
        {/* <TopTabsComponent /> */}
        <CategoryTabs />
        <CardContainer />
      </>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeaderComponents}
        ListFooterComponent={renderFooterComponent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const offsetY = event.nativeEvent.contentOffset.y;
              setShowScrollTop(offsetY > 200); // show button after scrolling down 200px
            },
          }
        )}
        scrollEventThrottle={16}
      />

      {showScrollTop && (
        <View style={styles.scrollTopContainer}>
          <Ionicons
            name="arrow-up-circle"
            size={50}
            color="#007AFF"
            onPress={() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomePrevious;

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
    backgroundColor: "transparent",
  },
});
