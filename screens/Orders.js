import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import OrderCard from "./../components/OrderCard";
import { ScrollView } from "react-native";
import TopTabBar from "./../components/TopTabBar";
import { useSelector } from "react-redux";
const tabs = [
  { id: "all", label: "All" },
  { id: "toPay", label: "To Pay" },
  { id: "toReceive", label: "To Receive" },
  { id: "toReveiw", label: "To Review" },
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

  const displayProducts = userOrders.slice(0, 10);

  return (
    <>
      <TopTabBar
        type={type}
        tabs={tabs}
        customeStyles={{ backgroundColor: "black", paddingVertical: 5 }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {displayProducts.length > 0 && (
        <FlatList
          data={displayProducts}
          renderItem={(item) => <OrderCard order={item.item} />}
          keyExtractor={(item) => item.orderKey}
          showsVerticalScrollIndicator={false}
        />
      )}

      {displayProducts.length === 0 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 24, color: "black" }}>
            There is no product
          </Text>
        </View>
      )}
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({});
