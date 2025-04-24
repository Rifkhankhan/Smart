import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import image from "./../assets/images/albert-dera-ILip77SbmOE-unsplash.jpg";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import defaultImage from './../assets/images/man.png'

const ProductListItem = memo(({ product }) => {
  const navigation = useNavigation();

  const shops = useSelector((state) => state.shop.shops);

  let shop = {};
  for (let i = 0; i < shops.length; i++) {
    if (shops[i].shopKey === product?.shopKey) {
      shop = shops[i];
      break;
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ViewProduct", {
          product: product || {},
          shop: shop || {},
        })
      }
    >
      {/* <Image
        source={
          product?.profilePicture ? { uri: product?.profilePicture } : image
        }
        style={styles.propic}
      /> */}


      <Image
        source={
          product?.images?.length > 0
            ? { uri: product?.images[0] }
            :defaultImage
        }
        style={styles.propic}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.name}>{shop?.name}</Text>
        <Text style={styles.name}>Price : {product?.price}</Text>
        <Text style={styles.name}>Stock : {product?.stock}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default ProductListItem;

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


// import React, { memo } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import defaultImage from "./../assets/images/man.png";

// // Memoize the component to prevent unnecessary re-renders
// const ProductListItem = memo(({ product }) => {
//   const navigation = useNavigation();
//   const shops = useSelector((state) => state.shop.shops);

//   // Use the `find` method instead of a loop for efficiency and readability
//   const shop = shops.find((shop) => shop.shopKey === product.shopKey) || {};

//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() =>
//         navigation.navigate("ViewProduct", {
//           product: product || {},
//           shop: shop || {},
//         })
//       }
//     >
//       <Image
//         source={
//           product?.images?.length > 0
//             ? { uri: product.images[0] }
//             : defaultImage
//         }
//         style={styles.propic}
//       />

//       <View style={styles.textContainer}>
//         <Text style={styles.name}>{product?.name}</Text>
//         <Text style={styles.name}>{shop?.name}</Text>
//         <Text style={styles.name}>Price: {product?.price}</Text>
//         <Text style={styles.name}>Stock: {product?.stock}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// });

// export default ProductListItem;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "#ccc",
//     elevation: 3,
//     marginHorizontal: 8,
//     marginVertical: 2,
//     borderRadius: 5,
//     alignItems: "center", // Align items vertically centered
//     padding: 5, // Add padding for better spacing
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   propic: {
//     width: 50, // Adjust size as needed
//     height: 50, // Adjust size as needed
//     borderRadius: 5, // Make it circular
//     marginRight: 10, // Add margin to separate from text
//   },
//   textContainer: {
//     flex: 1, // Allow text container to take up remaining space
//   },
// });
