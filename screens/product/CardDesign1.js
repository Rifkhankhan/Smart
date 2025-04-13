import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeCard = ({ product }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("ProductDetails", { product: product || {} });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPressHandler}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: product?.image
              ? product.image
              : "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
          }}
          style={styles.image}
        />
      </View>

      {/* Price Section */}
      <View style={styles.details}>
        <View style={styles.priceContainer}>
          <Text style={styles.newPrice}>Rs.{product?.price || "0.00"}</Text>
          {product?.oldPrice && (
            <Text style={styles.oldPrice}>Rs.{product.oldPrice}</Text>
          )}
        </View>
        {/* Product Name */}
        <Text style={styles.name} numberOfLines={1}>
          {product?.name || "Unnamed Product"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16, // Smooth rounded corners
    shadowColor: "rgba(1, 1, 1, 0.7)", // Soft shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Layered shadow for Android
    width: 100, // Compact width
    height: 150, // Compact height
    margin: 4,
    overflow: "hidden",
    
  },
  imageContainer: {
    width: "100%",
    height: "65%", // Major focus on the image section
    backgroundColor: "#5d8aa8", // Light gray for a clean placeholder
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  details: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f0f8ff", // Clean contrast with the image
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 10,
    color: "#A9A9A9", // Muted gray for old price
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  newPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5400", // Bright orange for new price emphasis
  },
  name: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333333", // Neutral gray for readability
    textAlign: "left",
  },
});
