// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   Pressable,
//   Text,
//   TextInput,
//   TouchableHighlight,
//   View,
// } from "react-native";
// import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
// import PageContainer from "../components/PageContainer";
// import { useDebouncedCallback } from "use-debounce";
// import { searchItems } from "../utils/actions/searchAction";
// import { setSearchProducts } from "../store/productSlice";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import Cart from "./Cart";
// import Card from "../components/Card";

// // Define CartScreen as a functional component
// const CartScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Cart Screen</Text>
//       <Pressable onPress={() => navigation.goBack()}>
//         <Text style={{ color: "blue" }}>Go back</Text>
//       </Pressable>
//     </View>
//   );
// };

// // Define Stack Navigator for Cart and SearchedProducts
// const Stack = createNativeStackNavigator();

// const SearchedProductsScreen = ({ route, navigation }) => {
//   const [searchTerm, setSearchTerm] = useState();
//   const [searchedProducts, setSearchedProducts] = useState([]);
//   const { carts } = useSelector((state) => state.cart);

//   useEffect(() => {
//     setSearchTerm(route?.params?.searchTerm);
//     setSearchedProducts(route?.params?.products);
//   }, [navigation, route?.params]);

//   const headerLeft = () => (
//     <Pressable
//       onPress={() => navigation.goBack()}
//       style={{ marginRight: "auto" }}
//     >
//       <Ionicons name="chevron-back" size={24} color="black" />
//     </Pressable>
//   );

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//       headerLeft: headerLeft,
//     });
//   }, [navigation]);

//   const renderHighlightedText = (text, term) => {
//     if (!term) return <Text>{text}</Text>;

//     // Find the first occurrence of the searchTerm
//     const index = text.toLowerCase().indexOf(term.toLowerCase());

//     if (index === -1) return <Text>{text}</Text>;

//     // Split the text into parts
//     const beforeMatch = text.slice(0, index);
//     const match = text.slice(index, index + term.length);
//     const afterMatch = text.slice(index + term.length);

//     return (
//       <Text>
//         {beforeMatch}
//         <Text style={{ fontWeight: "bold" }}>{match}</Text>
//         {afterMatch}
//       </Text>
//     );
//   };

//   const mainPage = () => (
//     <PageContainer>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 10,
//           flexDirection: "row",
//         }}
//       >
//         <Pressable
//           onPress={() => navigation.goBack()}
//           style={{ marginRight: "auto" }}
//         >
//           <Ionicons name="chevron-back" size={24} color="black" />
//         </Pressable>
//         <View style={{ position: "relative", flex: 1 }}>
//           <Ionicons
//             name="search-outline"
//             style={{ position: "absolute", left: 5, top: 8 }}
//             size={18}
//             color="aqua"
//           />
//           <TextInput
//             value={searchTerm}
//             onPress={() => navigation.goBack()}
//             style={{
//               padding: 2,
//               width: "100%",
//               paddingHorizontal: 8,
//               backgroundColor: "lightgray",
//               borderRadius: 8,
//               paddingLeft: 28,
//               fontSize: 16,
//             }}
//           />
//         </View>

//         <View style={{ flexDirection: "row" }}>
//           <View style={{ position: "relative" }}>
//             <TouchableHighlight
//               underlayColor="lightgray"
//               // onPress={() => console.log("pressed")}
//               style={{
//                 padding: 4,
//                 borderRadius: 20,
//                 position: "relative",
//               }}
//             >
//               <AntDesign
//                 name="shoppingcart"
//                 size={28}
//                 color="black"
//                 style={{ position: "relative" }}
//               />
//             </TouchableHighlight>

//             <Pressable
//               onPress={() => navigation.navigate("CartScreen")}
//               style={{
//                 backgroundColor: "red",
//                 color: "white",
//                 position: "absolute",
//                 right: 0,
//                 width: 20,
//                 height: 20,
//                 borderRadius: 50,
//                 overflow: "hidden",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                   alignItems: "center",
//                   margin: "auto",
//                   justifyContent: "center",
//                   flex: 1,
//                   textAlign: "center",
//                 }}
//               >
//                 {carts.length}
//               </Text>
//             </Pressable>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "flex-end",
//               padding: 4,
//             }}
//           >
//             <TouchableHighlight
//               underlayColor="lightgray"
//               // onPress={() => console.log("pressed")}
//               style={{
//                 borderRadius: 20,
//               }}
//             >
//               <AntDesign
//                 name="filter"
//                 size={28}
//                 color="black"
//                 style={{ alignItems: "center", padding: 0, margin: 0 }}
//               />
//             </TouchableHighlight>
//             <Text
//               style={{
//                 fontWeight: "300",
//                 fontSize: 12,
//                 padding: 0,
//                 margin: 0,
//               }}
//             >
//               Filter
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View style={{ marginTop: 10 }}>
//         <FlatList
//           horizontal={false}
//           data={searchedProducts}
//           renderItem={(item) => <Card product={item.item} />}
//           keyExtractor={(item) => item.productKey}
//           numColumns={2}
//         />
//       </View>
//     </PageContainer>
//   );

//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="SearchedProducts" options={{ headerShown: false }}>
//         {mainPage}
//       </Stack.Screen>
//       <Stack.Screen
//         name="CartScreen"
//         component={Cart}
//         options={{ title: "Cart" }} // Customize as needed
//       />
//     </Stack.Navigator>
//   );
// };

// export default SearchedProductsScreen;

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "./../../components/PageContainer";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "./../Cart";
import Card from "./../../components/Card";

// Define CartScreen as a functional component
const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.cartContainer}>
      <Text>Cart Screen</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go back</Text>
      </Pressable>
    </View>
  );
};

// Define Stack Navigator for Cart and SearchedProducts
const Stack = createNativeStackNavigator();

const SearchedProductsScreen = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const { carts } = useSelector((state) => state.cart);

  useEffect(() => {
    setSearchTerm(route?.params?.searchTerm);
    setSearchedProducts(route?.params?.products);
  }, [navigation, route?.params]);

  const headerLeft = () => (
    <Pressable
      onPress={() => navigation.goBack()}
      style={styles.headerLeftContainer}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </Pressable>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerLeft: headerLeft,
    });
  }, [navigation]);

  const renderHighlightedText = (text, term) => {
    if (!term) return <Text>{text}</Text>;

    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return <Text>{text}</Text>;

    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const afterMatch = text.slice(index + term.length);

    return (
      <Text>
        {beforeMatch}
        <Text style={styles.highlightedText}>{match}</Text>
        {afterMatch}
      </Text>
    );
  };

  const mainPage = () => (
    <PageContainer>
      <View style={styles.mainContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerLeftContainer}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            style={styles.searchIcon}
            size={18}
            color="aqua"
          />
          <TextInput
            value={searchTerm}
            onPress={() => navigation.goBack()}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.cartAndFilterContainer}>
          <View style={styles.cartContainer}>
            <TouchableHighlight
              underlayColor="lightgray"
              style={styles.cartButton}
            >
              <AntDesign name="shoppingcart" size={28} color="black" />
            </TouchableHighlight>
            <Pressable
              onPress={() => navigation.navigate("CartScreen")}
              style={styles.cartBadge}
            >
              <Text style={styles.cartBadgeText}>{carts.length}</Text>
            </Pressable>
          </View>

          <View style={styles.filterContainer}>
            <TouchableHighlight
              underlayColor="lightgray"
              style={styles.filterButton}
            >
              <AntDesign name="filter" size={28} color="black" />
            </TouchableHighlight>
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </View>
      </View>

      <View style={styles.productListContainer}>
        <FlatList
          horizontal={false}
          data={searchedProducts}
          renderItem={(item) => <Card product={item.item} />}
          keyExtractor={(item) => item.productKey}
          numColumns={2}
        />
      </View>
    </PageContainer>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchedProducts" options={{ headerShown: false }}>
        {mainPage}
      </Stack.Screen>
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{ title: "Cart" }} // Customize as needed
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackText: {
    color: "blue",
  },
  headerLeftContainer: {
    marginRight: "auto",
  },
  highlightedText: {
    fontWeight: "bold",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  searchContainer: {
    position: "relative",
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    left: 5,
    top: 8,
  },
  searchInput: {
    padding: 2,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    paddingLeft: 28,
    fontSize: 16,
  },
  cartAndFilterContainer: {
    flexDirection: "row",
  },
  cartButton: {
    padding: 4,
    borderRadius: 20,
    position: "relative",
  },
  cartBadge: {
    backgroundColor: "red",
    color: "white",
    position: "absolute",
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 50,
    overflow: "hidden",
  },
  cartBadgeText: {
    color: "white",
    alignItems: "center",
    margin: "auto",
    justifyContent: "center",
    flex: 1,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 4,
  },
  filterButton: {
    borderRadius: 20,
  },
  filterText: {
    fontWeight: "300",
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
  productListContainer: {
    marginTop: 10,
  },
});

export default SearchedProductsScreen;
