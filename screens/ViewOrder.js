// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Button,
//   ScrollView,
// } from "react-native";
// import React, { useCallback, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { statusChange } from "../utils/actions/orderActions";
// import { Asset } from "expo-asset";
// import shop6Image from "./../assets/images/plus.png";

// const ViewOrder = ({ route, navigation }) => {
//   const { order, product, activeTab } = route.params;
//   const { orderedUsers } = useSelector((state) => state.user);

//   const usersArray = Object.values(orderedUsers);
//   const user = usersArray.find((user) => user.uid === order.uid);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: order?.orderKey,
//     });
//   }, [route?.params, navigation, product]);

//   const statusChangeHandler = useCallback(async () => {
//     if (activeTab === "new") {
//       let status = "processing";
//       await statusChange(status, order.orderKey);
//     } else if (activeTab === "processing") {
//       let status = "Deliver";
//       await statusChange(status, order.orderKey);
//     }

//     navigation.goBack();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image
//         source={shop6Image}
//         style={styles.image}
//       />

//       {/* Order Details */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.subtitle}>Order Details</Text>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Price:</Text>
//           <Text style={styles.detailValue}>
//             ${(+product?.price)?.toFixed(2)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Qty:</Text>
//           <Text style={styles.detailValue}>{order?.qty}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Total:</Text>
//           <Text style={styles.detailValue}>
//             ${(+order?.qty * +product?.price + 100)?.toFixed(2)}
//           </Text>
//         </View>

//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{order.orderStatus}</Text>
//         </View>
//       </View>

//       {/* User Details */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.subtitle}>Customer Details</Text>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Name:</Text>
//           <Text style={styles.detailValue}>{user?.firstLast}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Address:</Text>
//           <Text style={styles.detailValue}>{user?.address}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Village:</Text>
//           <Text style={styles.detailValue}>{user?.village}</Text>
//         </View>
//       </View>

//       <View style={styles.btnContainer}>
//         <View style={styles.button}>
//           <Button
//             title="Reject"
//             color="#FF6F6F"
//             onPress={() => {
//               /* handle reject */
//             }}
//           />
//         </View>
//         {order.orderStatus === "new" ? (
//           <View style={styles.button}>
//             <Button
//               title="Accept"
//               color="#4CAF50"
//               onPress={statusChangeHandler}
//             />
//           </View>
//         ) : (
//           <View style={styles.button}>
//             <Button
//               title="Status"
//               color="#4CAF50"
//               onPress={statusChangeHandler}
//             />
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ViewOrder;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: "#f0f4f7",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: "hidden",
//     elevation: 5,
//   },
//   detailsContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     elevation: 2,
//     padding: 16,
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#333",
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   detailValue: {
//     fontSize: 16,
//     fontWeight: "400",
//     color: "#666",
//   },
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
// });


import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Image, Button, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { statusChange } from "../utils/actions/orderActions";
import shop6Image from "./../assets/images/plus.png";

const ViewOrder = React.memo(({ route, navigation }) => {
  const { order, product, activeTab } = route.params;
  const { orderedUsers } = useSelector((state) => state.user);

  // Memoize user lookup to avoid recalculating it on every render
  const user = useMemo(() => {
    const usersArray = Object.values(orderedUsers);
    return usersArray.find((user) => user.uid === order.uid);
  }, [orderedUsers, order.uid]);

  useEffect(() => {
    if (order?.orderKey) {
      navigation.setOptions({
        headerTitle: order?.orderKey,
      });
    }
  }, [order?.orderKey, navigation]);

  // Use memoized total calculation to avoid recalculating on every render
  const total = useMemo(() => {
    return (+order?.qty * +product?.price + 100)?.toFixed(2);
  }, [order?.qty, product?.price]);

  const statusChangeHandler = useCallback(async () => {
    if (activeTab === "new") {
      let status = "processing";
      await statusChange(status, order.orderKey);
    } else if (activeTab === "processing") {
      let status = "Deliver";
      await statusChange(status, order.orderKey);
    }

    navigation.goBack();
  }, [activeTab, order.orderKey, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={shop6Image} style={styles.image} />

      {/* Order Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.subtitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>
            ${(+product?.price)?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Qty:</Text>
          <Text style={styles.detailValue}>{order?.qty}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total:</Text>
          <Text style={styles.detailValue}>${total}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{order.orderStatus}</Text>
        </View>
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.subtitle}>Customer Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{user?.firstLast}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{user?.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Village:</Text>
          <Text style={styles.detailValue}>{user?.village}</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.button}>
          <Button
            title="Reject"
            color="#FF6F6F"
            onPress={() => {
              /* handle reject */
            }}
          />
        </View>
        {order.orderStatus === "new" ? (
          <View style={styles.button}>
            <Button
              title="Accept"
              color="#4CAF50"
              onPress={statusChangeHandler}
            />
          </View>
        ) : (
          <View style={styles.button}>
            <Button
              title="Status"
              color="#4CAF50"
              onPress={statusChangeHandler}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
});

export default ViewOrder;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 5,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
