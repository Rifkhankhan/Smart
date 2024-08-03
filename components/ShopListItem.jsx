import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import image from "./../assets/images/albert-dera-ILip77SbmOE-unsplash.jpg";
import { useNavigation } from "@react-navigation/native";

const ShopListItem = ({ shop }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ViewShop", { shop })}
    >
      <Image
        source={shop?.profilePicture ? { uri: shop?.profilePicture } : image}
        style={styles.propic}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{shop?.firstLast}</Text>
        <Text>{shop?.owner}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShopListItem;

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
    borderRadius: 25, // Make it circular
    marginRight: 10, // Add margin to separate from text
  },
  textContainer: {
    flex: 1, // Allow text container to take up remaining space
  },
});
