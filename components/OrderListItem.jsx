import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import image from "./../assets/images/albert-dera-ILip77SbmOE-unsplash.jpg";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const OrderListItem = ({ order, activeTab }) => {
  const navigation = useNavigation();
  const { products } = useSelector((state) => state.product);

  const product = products.find(
    (product) => product?.productKey === order?.productKey
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ViewOrder", {
          order: order || {},
          product: product || {},
          activeTab: activeTab,
        })
      }
    >
      <Image
        source={order?.profilePicture ? { uri: order?.profilePicture } : image}
        style={styles.propic}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>OrderKey : {order?.orderKey}</Text>
        <Text style={styles.name}>Name : {product?.name}</Text>
        <Text style={styles.name}>Qty : {order?.qty}</Text>
        <Text style={styles.name}>Price : {product?.price}</Text>
        <Text style={styles.name}>Total : {order?.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
    alignItems: "center", // Align items vertically centered
    padding: 5, // Add padding for better spacing
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  propic: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 5, // Make it circular
    marginRight: 10, // Add margin to separate from text
  },
  textContainer: {
    flex: 1, // Allow text container to take up remaining space
  },
});
