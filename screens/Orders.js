// import { StyleSheet, Text, View, Dimensions } from "react-native";
// import React, { useState } from "react";
// import { Pressable } from "react-native";
// import { FlatList } from "react-native";
// import { Image } from "react-native";
// import OrderCard from "./../components/OrderCard";
// import { ScrollView } from "react-native";
// import TopTabBar from "./../components/TopTabBar";
// import { useSelector } from "react-redux";
// const tabs = [
//   { id: "all", label: "All" },
//   { id: "toPay", label: "To Pay" },
//   { id: "toReceive", label: "To Receive" },
//   { id: "toReveiw", label: "To Review" },
//   { id: "return", label: "Returns" },
//   { id: "cancel", label: "Cancelled" },
// ];
// const Orders = ({ route, navigation }) => {
//   navigation.setOptions({
//     tabBarVisible: false,
//   });

//   const { userOrders } = useSelector((state) => state.order);

//   const [activeTab, setActiveTab] = useState("all");

//   const type = route.params?.type;

//   const displayProducts = userOrders.slice(0, 10);

//   return (
//     <>
//       <TopTabBar
//         type={type}
//         tabs={tabs}
//         customeStyles={{ backgroundColor: "black", paddingVertical: 5 }}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {displayProducts.length > 0 && (
//         <FlatList
//           data={displayProducts}
//           renderItem={(item) => <OrderCard order={item.item} />}
//           keyExtractor={(item) => item.orderKey}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {displayProducts.length === 0 && (
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           <Text style={{ fontSize: 24, color: "black" }}>
//             There is no product
//           </Text>
//         </View>
//       )}
//     </>
//   );
// };

// export default Orders;

// const styles = StyleSheet.create({});


import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import TopTabBar from "./../components/TopTabBar";
import OrderCard from "./../components/OrderCard";

const tabs = [
  { id: "all", label: "All" },
  { id: "toPay", label: "To Pay" },
  { id: "toReceive", label: "To Receive" },
  { id: "toReview", label: "To Review" },
  { id: "return", label: "Returns" },
  { id: "cancel", label: "Cancelled" },
];

const Orders = ({ route, navigation }) => {
  navigation.setOptions({
    tabBarVisible: false,
  });

  const { userOrders } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("all");

  const type = route.params?.type;

  // Memoize the sliced display products to avoid recalculating on each render
  const displayProducts = useMemo(() => userOrders.slice(0, 10), [userOrders]);

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    return userOrders.filter((order) => {
      if (activeTab === "all") return true;
      return order.status === activeTab; // Assuming the order object has a status field
    });
  }, [userOrders, activeTab]);

  return (
    <>
      <TopTabBar
        type={type}
        tabs={tabs}
        customeStyles={{ backgroundColor: "black", paddingVertical: 5 }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders.slice(0, 10)} // Limit the list to 10 items
          renderItem={({ item }) => <OrderCard order={item} />}
          keyExtractor={(item) => item.orderKey}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10} // Render first 10 items
          maxToRenderPerBatch={10} // Render in batches of 10 items
          windowSize={5} // Render window size
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>There are no products</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyText: {
    fontSize: 24,
    color: "black",
  },
});

export default Orders;
