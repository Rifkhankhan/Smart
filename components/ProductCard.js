import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ product }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>Rs. {product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    color: "#007AFF",
    marginTop: 4,
  },
});
