// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import CategoryComponent from "../components/CategoryComponent";
// import HomeItemList from "../components/HomeItemList";
// import BigItemList from "../components/BigItemList";
// import Card from "../components/Card";
// import CardContainer from "../components/CardContainer";
// import { Ionicons } from "@expo/vector-icons";
// import ServiceList from "./Services/ServiceListComponent";
// import ServiceListComponent from "./Services/ServiceListComponent";

// const AdminHome = ({ navigation }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: ({ size, color }) => {
//         return (
//           <Ionicons
//             onPress={() => navigation.navigate("SearchScreen")}
//             style={{ marginRight: 10 }}
//             name="search"
//             color="white"
//             size={24}
//           />
//         );
//       },
//     });
//   }, []);

//   const renderComponents = () => (
//     <>
//       <CategoryComponent />
//       <ServiceListComponent title="Services" />
//       {/* <HomeItemList title="Services" /> */}
//       <BigItemList title="Today Offers" subTitle="Limited" />
//       <HomeItemList title="Everything Under" subTitle="Rs.99" />
//     </>
//   );

//   return (
//     <>
//       <SafeAreaView>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           ListHeaderComponent={renderComponents}
//           ListFooterComponent={() => (
//             <>
//               <CardContainer header="Just For You" />
//             </>
//           )}
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   productCardContainer: {
//     padding: 4,
//     backgroundColor: "#15df",
//     marginHorizontal: 8,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   plusButton: {
//     position: "absolute",
//     right: 15,
//     bottom: 20,
//     width: 50,
//     height: 50,
//   },
//   plusImage: {
//     width: "100%",
//     height: "100%",
//   },
//   title: {
//     paddingLeft: 8,
//     fontSize: 20,
//     fontWeight: "600",
//     paddingVertical: 8,
//   },
//   cards: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
// });

import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Components
import CategoryComponent from "../../components/CategoryComponent";
import HomeItemList from "../../components/HomeItemList";
import BigItemList from "../../components/BigItemList";
import CardContainer from "../../components/CardContainer";
import ServiceListComponent from "../Services/ServiceListComponent";

const AdminHome = ({ navigation }) => {
  console.log("in");

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
    });
  }, [navigation]);

  const renderHeaderComponents = useCallback(
    () => (
      <View>
        <CategoryComponent />
        <ServiceListComponent title="Services" />
        <BigItemList title="Today Offers" subTitle="Limited" />
        <HomeItemList title="Everything Under" subTitle="Rs.99" />
      </View>
    ),
    []
  );

  const renderFooterComponent = useCallback(
    () => <CardContainer header="Just For You" />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]} // Required placeholder data
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeaderComponents}
        ListFooterComponent={renderFooterComponent}
        showsVerticalScrollIndicator={false}
      />
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
});
