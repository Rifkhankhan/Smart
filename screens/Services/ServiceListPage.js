import React, {
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "./../../components/PageTitle";
import PageContainer from "./../../components/PageContainer";
import ProductListItem from "../../components/ProductListItem";
import { Ionicons } from "@expo/vector-icons";
import plusImage from "./../../assets/images/plus.png";
import quickdelivery from "./../../assets/images/service/quickdelivery.jpg";
import rent from "./../../assets/images/service/rent.jpg";
import homemadethings from "./../../assets/images/service/homemadethings.jpg";
import homemadefoods from "./../../assets/images/service/homemadefood.jpg";
import ServiceCard from "./ServiceCard";
import ServicesCard from "./ServicesCard";
import { services } from "../../assets/data/services";
const ServiceListPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {}, [products]);
  // const renderItem = ({ item }) => <ServiceCard service={item} />

  // Render Item Component
  // const renderServiceItem = ({ item }) => {
  //   return (
  //     <ScrollView
  //       horizontal={false}
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={[styles.row, { flexDirection: "row" }]}
  //     >
  //       <ServicesCard service={item} />
  //     </ScrollView>
  //   );
  // };

  const renderServiceItem = ({ item }) => <ServicesCard service={item} />;

  const filteredServices = useMemo(
    () =>
      services?.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, services]
  );

  const searchHandler = () => {
    setSearchQuery("");
    setIsClicked((current) => !current);
  };

  const backHandler = () => {
    navigation.goBack();
  };

  // const searchProducts = useMemo(
  //     () =>
  //     products.filter((product) =>
  //         new RegExp(searchQuery, "i").test(product.name)
  //     ),
  //     [products, searchQuery]
  // );

  // Group services by category/type
  const groupedServices = Object.entries(
    services.reduce((acc, service) => {
      // Create an array for each category if it doesn't already exist
      if (!acc[service.type]) {
        acc[service.type] = [];
      }
      // Push the current service into its corresponding category
      acc[service.type].push(service);
      return acc;
    }, {})
  ).map(([type, data]) => ({
    title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter of the category
    data,
  }));

  return (
    <PageContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          paddingHorizontal: 8,
        }}
      >
        {/* Animated Header */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="arrow-back-sharp"
            color="black"
            size={30}
            onPress={backHandler}
            style={{ marginRight: 10 }}
          />
          <PageTitle text="Services" />
        </View>

        {!isClicked && (
          <Ionicons
            name="search"
            color="black"
            size={30}
            onPress={searchHandler}
          />
        )}
      </View>
      {isClicked && (
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Type..."
            style={styles.searchBar}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          <Ionicons
            name="close"
            color="gray"
            size={20}
            style={{ position: "absolute", right: 0, top: 2 }}
            onPress={searchHandler}
          />
        </View>
      )}

      <SectionList
        sections={groupedServices} // Your grouped data
        keyExtractor={(item, index) => item.id.toString()} // Ensure unique keys
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.headerContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeader}>{title}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ServiceStacks", {
                    screen: "ViewServicesByCategory",
                    params: { data: data },
                  })
                }
              >
                {data?.length > 2 && (
                  <Text style={styles.moreHeader}>View More</Text>
                )}
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {data.map((item) => renderServiceItem({ item }))}

              {/* Render each item */}
            </ScrollView>
          </View>
        )}
        renderItem={({ item }) => null} // Prevents rendering items again in renderItem
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </PageContainer>
  );
};

export default ServiceListPage;

const styles = StyleSheet.create({
  plusbtn: {
    width: 50,
    height: 50,
  },
  plusBtnContainer: {
    position: "absolute",
    right: 15,
    bottom: 20,
    width: 50,
    height: 50,
  },
  searchBarContainer: {
    position: "relative",
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
  },
  searchBar: {
    padding: 5,
    fontSize: 16,
    height: 25,
    width: "100%",
  },
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    color: "#333",
    backgroundColor: "#f5f5f5", // Header background color
  },
  headerContainer: {
    borderRadius: 8, // Rounded corners for the header
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Text color
    padding: 10,
    borderRadius: 5,
  },
  moreHeader: {
    color: "red",
    fontWeight: 500,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});
