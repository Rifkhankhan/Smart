import React, { useState, useLayoutEffect, useMemo, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TopTabBar from "../components/TopTabBar";
import ProductListItem from "../components/ProductListItem";
import PageContainer from "../components/PageContainer";
import IconButton from "../UI/IconButton";
import PageTitle from "../components/PageTitle";
import OrderListItem from "../components/OrderListItem";
import { Ionicons } from "@expo/vector-icons";

const tabs = [
  { id: "all", label: "All" },
  { id: "new", label: "New Orders" },
  { id: "processing", label: "Processing" },
  { id: "Deliver", label: "To Deliver" },
  { id: "delivered", label: "Delivered" },
  { id: "return", label: "Returns" },
  { id: "cancel", label: "Cancelled" },
];

const OrderListPage = ({ navigation }) => {
  const { orders } = useSelector((state) => state.order);

  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("new");

  const filterProducts = useMemo(
    () =>
      orders.filter((product) => {
        if (activeTab === "all") {
          const searchRegex = new RegExp(searchQuery, "i");

          return searchRegex.test(product.orderKey); // Show all products when "all" tab is active
        } else {
          // Create a regular expression for matching the active tab and search query
          const tabRegex = new RegExp(activeTab, "i");
          const searchRegex = new RegExp(searchQuery, "i");

          // Check if both conditions are met
          return (
            tabRegex.test(product.orderStatus) &&
            searchRegex.test(product.orderKey)
          );
        }
      }),
    [orders, activeTab, searchQuery]
  );

  const searchHandler = () => {
    setSearchQuery("");
    setIsClicked((current) => !current);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [isClicked, navigation, orders]);

  const addCustomerHandler = () => {
    navigation.navigate("CreateProduct");
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <PageTitle text="Orders" />

        {!isClicked && (
          <Ionicons
            name="search"
            color="black"
            size={30}
            onPress={searchHandler}
          />
        )}
      </View>

      <View style={{ marginBottom: 5 }}>
        <TopTabBar
          tabs={tabs}
          customeStyles={{ backgroundColor: "black", paddingVertical: 5 }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
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
            size={25}
            style={{ position: "absolute", right: 3, top: 5 }}
            onPress={searchHandler}
          />
        </View>
      )}
      <PageContainer>
        <FlatList
          data={filterProducts}
          keyExtractor={(order) => order?.orderKey}
          renderItem={({ item }) => (
            <OrderListItem order={item} activeTab={activeTab} />
          )}
        />
      </PageContainer>
    </>
  );
};

export default OrderListPage;

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
    height: 35,
    width: "100%",
  },
});


// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import TopTabBar from "../components/TopTabBar";
// import OrderListItem from "../components/OrderListItem";
// import PageContainer from "../components/PageContainer";
// import PageTitle from "../components/PageTitle";
// import { Ionicons } from "@expo/vector-icons";
// import { debounce } from 'lodash';

// const tabs = [
//   { id: "all", label: "All" },
//   { id: "new", label: "New Orders" },
//   { id: "processing", label: "Processing" },
//   { id: "Deliver", label: "To Deliver" },
//   { id: "delivered", label: "Delivered" },
//   { id: "return", label: "Returns" },
//   { id: "cancel", label: "Cancelled" },
// ];

// const OrderListPage = ({ navigation }) => {
//   const { orders } = useSelector((state) => state.order);

//   const [isClicked, setIsClicked] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("new");

//   const filterProducts = useMemo(
//     () =>
//       orders.filter((product) => {
//         const searchRegex = new RegExp(searchQuery, "i");

//         if (activeTab === "all") {
//           return searchRegex.test(product.orderKey); // Show all products when "all" tab is active
//         } else {
//           const tabRegex = new RegExp(activeTab, "i");
//           return (
//             tabRegex.test(product.orderStatus) &&
//             searchRegex.test(product.orderKey)
//           );
//         }
//       }),
//     [orders, activeTab, searchQuery]
//   );

//   // Debounce the search query to prevent excessive re-renders
//   const debouncedSearchQuery = useCallback(
//     debounce((text) => setSearchQuery(text), 300),
//     []
//   );

//   const searchHandler = () => {
//     setIsClicked((current) => !current);
//   };

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [isClicked, navigation, orders]);

//   return (
//     <>
//       <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
//         <PageTitle text="Orders" />

//         {!isClicked && (
//           <Ionicons name="search" color="black" size={30} onPress={searchHandler} />
//         )}
//       </View>

//       <View style={{ marginBottom: 5 }}>
//         <TopTabBar
//           tabs={tabs}
//           customeStyles={{ backgroundColor: "black", paddingVertical: 5 }}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />
//       </View>

//       {isClicked && (
//         <View style={styles.searchBarContainer}>
//           <TextInput
//             placeholder="Type..."
//             style={styles.searchBar}
//             onChangeText={debouncedSearchQuery}
//             value={searchQuery}
//           />

//           <Ionicons
//             name="close"
//             color="gray"
//             size={25}
//             style={{ position: "absolute", right: 3, top: 5 }}
//             onPress={searchHandler}
//           />
//         </View>
//       )}

//       <PageContainer>
//         <FlatList
//           data={filterProducts}
//           keyExtractor={(order) => order?.orderKey}
//           renderItem={({ item }) => <OrderListItem order={item} activeTab={activeTab} />}
//           initialNumToRender={10} // Render the first 10 items
//           maxToRenderPerBatch={10} // Render in batches of 10 items
//           windowSize={5} // Render window size
//         />
//       </PageContainer>
//     </>
//   );
// };

// export default OrderListPage;

// const styles = StyleSheet.create({
//   plusbtn: {
//     width: 50,
//     height: 50,
//   },
//   plusBtnContainer: {
//     position: "absolute",
//     right: 15,
//     bottom: 20,
//     width: 50,
//     height: 50,
//   },
//   searchBarContainer: {
//     position: "relative",
//     flexDirection: "row",
//     marginHorizontal: "5%",
//     marginVertical: 5,
//     borderWidth: 1,
//     borderRadius: 5,
//     width: "90%",
//   },
//   searchBar: {
//     padding: 5,
//     fontSize: 16,
//     height: 35,
//     width: "100%",
//   },
// });
