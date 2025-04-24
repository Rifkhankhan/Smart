// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const HomeCard = ({ product }) => {
//   const navigation = useNavigation();

//   const onPressHandler = () => {
//     navigation.navigate("ProductDetails", { product: product || {} });
//   };

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPressHandler}>
//       {/* Image Section */}
//       <Image
//         source={{
//           uri: product?.image
//             ? product.image
//             : "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
//         }}
//         style={styles.image}
//       />

//       {/* Product Details */}
//       <View style={styles.details}>
    
//         <View style={styles.priceContainer}>
//           <Text style={styles.newPrice}>Rs.{product?.price || "0.00"}</Text>
//           <Text style={styles.oldPrice}>Rs.{product?.oldPrice || "0.00"}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default HomeCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#F4F6F8", // Clean light background for modern feel
//     borderRadius: 8,
//     shadowColor: "rgba(1, 1, 2, 1)",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//     width: 100, // Compact width for smaller cards
//     height: 150, // Compact height for tighter spacing
//     margin: 4,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "70%", // Reduced height for compact design
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   details: {
//     padding: 4,
//     flex: 1,
//     justifyContent: "space-evenly",
//     backgroundColor: "#FFFFFF", // Contrast with the image and card background
//   },
//   name: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333333",
//     textAlign: "left",
//   },
//   priceContainer: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
//   oldPrice: {
//     fontSize: 12,
//     color: "#A9A9A9", // Muted color for old price
//     textDecorationLine: "line-through",
// },
// newPrice: {
// 	  marginRight: 4,
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#FF5400", // Bright orange for visibility
//   },
// });


import React, { useCallback, memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png";

const HomeCard = ({ product }) => {
  const navigation = useNavigation();
  // console.log(product);
  

  const onPressHandler = useCallback(() => {
    navigation.navigate("ProductDetails", { product });
  }, [navigation, product]);

  const imageUrl = product?.image || PLACEHOLDER_IMAGE;
  const price = product?.price ?? "0.00";
  const oldPrice = product?.oldPrice ?? "0.00";

  return (
    <TouchableOpacity style={styles.card} onPress={onPressHandler}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.priceContainer}>
          <Text style={styles.newPrice}>Rs.{price}</Text>
          <Text style={styles.oldPrice}>Rs.{oldPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(HomeCard); // Prevent unnecessary re-renders

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
