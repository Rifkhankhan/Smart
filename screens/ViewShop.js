// import {
//   Button,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useLayoutEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";
// import { deleteShop, updateShop } from "../utils/actions/shopActions";
// import defaultImage from './../assets/images/man.png'

// const ViewShop = ({ route, navigation }) => {
//   const dispatch = useDispatch();
//   const shop = route?.params?.shop;

//   const editHandler = () => {
//     navigation.navigate("EditShop", { shop: route?.params?.shop });
//   };

//   const toggleBlock = async () => {
//     try {
//       const userData = { status: !shop?.status };
//       await updateShop(shop?.uid, shop.shopKey, userData);
//       navigation.navigate("SellerListPage");
//     } catch (error) {
//       console.error("Error updating shop:", error);
//     }
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: shop?.name,
//       headerStyle: { backgroundColor: "#1E1E1E" },
//       headerTintColor: "white",
//       headerRight: () => (
//         <Pressable onPress={editHandler} style={styles.headerButton}>
//           <Ionicons name="pencil" size={24} color="white" />
//         </Pressable>
//       ),
//     });
//   }, [navigation, shop]);

//   const deleteShopHandler = async () => {
//     try {
//       const action = await deleteShop(shop.uid, shop.shopKey);
//       dispatch(action);
//       // Navigate only after successful deletion
//       navigation.navigate("SellerListPage");
//     } catch (error) {
//       // Handle error (e.g., show an alert or message to the user)
//       alert(error.message || "Failed to delete shop");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.imageContainer}>
//         <Image
//           source={
//             shop?.profilePicture
//               ? { uri: shop.profilePicture }
//               : defaultImage
//           }
//           style={styles.image}
//         />
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.heading}>Shop Details</Text>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Name:</Text>
//           <Text style={styles.detail}>{shop?.name}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Phone:</Text>
//           <Text style={styles.detail}>{shop?.phone}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Address:</Text>
//           <Text style={styles.detail}>{shop?.address}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Village:</Text>
//           <Text style={styles.detail}>{shop?.village}</Text>
//         </View>
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.heading}>Activity Details</Text>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Orders:</Text>
//           <Text style={styles.detail}>5</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Rank:</Text>
//           <Text style={styles.detail}>{shop?.rank}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detail}>
//             {shop?.status ? "Active" : "Blocked"}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.heading}>Actions</Text>
//         <View style={styles.buttonContainer}>
//           <Button
//             title={shop?.status ? "Block " : "Unblock "}
//             color="#FF6347"
//             onPress={toggleBlock}
//           />
//           <View style={{ paddingVertical: 2 }}></View>
//           <Button
//             title="Delete Shop"
//             color="black"
//             onPress={deleteShopHandler}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ViewShop;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     backgroundColor: "#F5F5F5",
//   },
//   imageContainer: {
//     width: "100%",
//     height: 250,
//     marginBottom: 20,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#E0E0E0",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   detailsContainer: {
//     width: "90%",
//     marginVertical: 20,
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   heading: {
//     textAlign: "center",
//     fontSize: 22,
//     marginVertical: 10,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 8,
//   },
//   detailLabel: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#666",
//   },
//   detail: {
//     fontSize: 18,
//     color: "#333",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   headerButton: {
//     marginRight: 10,
//     opacity: 1,
//   },
// });


import React, { useLayoutEffect, useCallback } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteShop, updateShop } from "../utils/actions/shopActions";
import defaultImage from './../assets/images/man.png';

const ViewShop = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const shop = route?.params?.shop;

  const editHandler = useCallback(() => {
    navigation.navigate("EditShop", { shop });
  }, [navigation, shop]);

  const toggleBlock = useCallback(async () => {
    try {
      const userData = { status: !shop?.status };
      await updateShop(shop?.uid, shop?.shopKey, userData);
      navigation.navigate("SellerListPage");
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  }, [shop, navigation]);

  const deleteShopHandler = useCallback(async () => {
    try {
      await deleteShop(shop.uid, shop.shopKey);
      dispatch({ type: "DELETE_SHOP", payload: shop.uid }); // Assuming you're dispatching a delete action
      navigation.navigate("SellerListPage");
    } catch (error) {
      console.error("Failed to delete shop:", error);
      alert(error.message || "Failed to delete shop");
    }
  }, [shop, dispatch, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop?.name,
      headerStyle: { backgroundColor: "#1E1E1E" },
      headerTintColor: "white",
      headerRight: () => (
        <Pressable onPress={editHandler} style={styles.headerButton}>
          <Ionicons name="pencil" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation, shop, editHandler]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={shop?.profilePicture ? { uri: shop.profilePicture } : defaultImage}
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Shop Details</Text>
        <DetailRow label="Name" value={shop?.name} />
        <DetailRow label="Phone" value={shop?.phone} />
        <DetailRow label="Address" value={shop?.address} />
        <DetailRow label="Village" value={shop?.village} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Activity Details</Text>
        <DetailRow label="Orders" value="5" />
        <DetailRow label="Rank" value={shop?.rank} />
        <DetailRow label="Status" value={shop?.status ? "Active" : "Blocked"} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Actions</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={shop?.status ? "Block" : "Unblock"}
            color="#FF6347"
            onPress={toggleBlock}
          />
          <View style={styles.spacer} />
          <Button title="Delete Shop" color="black" onPress={deleteShopHandler} />
        </View>
      </View>
    </ScrollView>
  );
};

const DetailRow = React.memo(({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detail}>{value}</Text>
  </View>
));

export default ViewShop;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    width: "90%",
    marginVertical: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
  },
  detail: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
  },
  headerButton: {
    marginRight: 10,
  },
  spacer: {
    paddingVertical: 5,
  },
});
