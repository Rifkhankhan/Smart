import React, { useCallback, memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png";

const ServiceMiniCard = ({ service }) => {
  const navigation = useNavigation();
  // console.log(product);

  const onPressHandler = useCallback(() => {
    navigation.navigate("ViewService", { service });
  }, [navigation, service]);

  const imageUrl = service?.image || PLACEHOLDER_IMAGE;
  const price = service?.price ?? "0.00";
  const oldPrice = service?.oldPrice ?? "0.00";

  return (
    <TouchableOpacity style={styles.card} onPress={onPressHandler}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{service?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ServiceMiniCard); // Prevent unnecessary re-renders

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F4F6F8",
    borderRadius: 8,
    shadowColor: "rgba(1, 1, 2, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    width: 100,
    height: 150,
    margin: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  details: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  name: { textAlign: "center", fontWeight: 400, padding: 0, margin: 0 },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  oldPrice: {
    fontSize: 12,
    color: "#A9A9A9",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF5400",
  },
});
