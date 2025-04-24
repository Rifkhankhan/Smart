// import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
// import React from "react";
// import { useSelector } from "react-redux";

// const OrderCard = ({ order }) => {

//   const { products } = useSelector((state) => state.product);

//   const orderProduct = products.find(
//     (product) => product.productKey === order.productKey
//   );

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//         marginVertical: 4,
//         padding: 8,
//         flexDirection: "column",
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           paddingHorizontal: 4,
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <View>
//           <Text style={{ fontSize: 16, fontWeight: "400" }}>
//             Order {order.orderKey}
//           </Text>
//           <Text style={{ fontSize: 14, fontWeight: "300" }}>
//             Placed on {order?.updatedAt?.toString().slice(0, 10)}
//           </Text>
//         </View>

//         <Text>
//           {order?.orderStatus?.toLowerCase() === "deliver"
//             ? "Ready for delivery"
//             : order?.orderStatus?.toLowerCase() === "deliverd"
//             ? "Delivered"
//             : order?.orderStatus?.toLowerCase() === "processing"
//             ? "Processing"
//             : "Pending"}
//         </Text>
//       </View>
//       <View
//         style={{
//           padding: 4,
//           flexDirection: "row",
//           paddingVertical: 16,
//         }}
//       >
//         <Image
//           source={{
//             uri: "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
//           }}
//           style={{ width: 60, height: 80 }}
//         />

//         <View
//           style={{
//             paddingHorizontal: 8,

//             width: Dimensions.get("window").width * 0.8,
//           }}
//         >
//           <Text numberOfLines={3}>{orderProduct?.description}</Text>

//           <Text style={{ fontWeight: "700", paddingVertical: 4 }}>
//             Rs.{orderProduct?.price}
//           </Text>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text>x 1</Text>
//             <Text style={{ color: "red", fontWeight: "500", fontSize: 15 }}>
//               {order?.orderStatus?.toLowerCase() === "deliver"
//                 ? "Ready for delivery"
//                 : order?.orderStatus?.toLowerCase() === "deliverd"
//                 ? "Delivered"
//                 : order?.orderStatus?.toLowerCase() === "processing"
//                 ? "Processing"
//                 : "Pending"}
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View
//         style={{
//           paddingVertical: 0,
//           paddingHorizontal: 8,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "flex-end",
//         }}
//       >
//         <Text>{order?.qty} item,</Text>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 16,
//               paddingLeft: 4,
//             }}
//           >
//             Total
//           </Text>
//           <Text
//             style={{
//               color: "red",
//               fontSize: 16,
//               paddingHorizontal: 8,
//               fontWeight: "600",
//             }}
//           >
//             Rs.{order?.total}
//           </Text>
//         </View>
//       </View>

//       <View
//         style={{
//           justifyContent: "flex-end",
//           paddingTop: 16,
//           paddingBottom: 4,
//           paddingHorizontal: 8,
//           alignItems: "flex-end",
//         }}
//       >
//         <Text
//           style={{
//             padding: 8,
//             backgroundColor: "orange",
//             borderRadius: 4,
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           Buy again
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default OrderCard;

// const styles = StyleSheet.create({});


import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import defaultImage from './../assets/images/man.png';

const OrderCard = React.memo(({ order }) => {
  const { products } = useSelector((state) => state.product);

  const orderProduct = products.find(
    (product) => product.productKey === order.productKey
  );

  // Extracting order status to avoid redundant computation
  const orderStatus = order?.orderStatus?.toLowerCase();
  const statusText = orderStatus === "deliver"
    ? "Ready for delivery"
    : orderStatus === "deliverd"
    ? "Delivered"
    : orderStatus === "processing"
    ? "Processing"
    : "Pending";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderKey}>Order {order.orderKey}</Text>
          <Text style={styles.orderDate}>
            Placed on {order?.updatedAt?.toString().slice(0, 10)}
          </Text>
        </View>
        <Text>{statusText}</Text>
      </View>

      <View style={styles.productContainer}>
        <Image
          source={defaultImage}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text numberOfLines={3} style={styles.productDescription}>
            {orderProduct?.description}
          </Text>
          <Text style={styles.productPrice}>Rs.{orderProduct?.price}</Text>
          <View style={styles.productQuantityContainer}>
            <Text>x 1</Text>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>{order?.qty} item,</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rs.{order?.total}</Text>
        </View>
      </View>

      <View style={styles.buyAgainContainer}>
        <Text style={styles.buyAgainText}>Buy again</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 4,
    padding: 8,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderKey: {
    fontSize: 16,
    fontWeight: "400",
  },
  orderDate: {
    fontSize: 14,
    fontWeight: "300",
  },
  productContainer: {
    padding: 4,
    flexDirection: "row",
    paddingVertical: 16,
  },
  productImage: {
    width: 60,
    height: 80,
  },
  productDetails: {
    paddingHorizontal: 8,
    width: Dimensions.get("window").width * 0.8,
  },
  productDescription: {
    numberOfLines: 3,
  },
  productPrice: {
    fontWeight: "700",
    paddingVertical: 4,
  },
  productQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },
  footer: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    paddingLeft: 4,
  },
  totalPrice: {
    color: "red",
    fontSize: 16,
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  buyAgainContainer: {
    justifyContent: "flex-end",
    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  buyAgainText: {
    padding: 8,
    backgroundColor: "orange",
    borderRadius: 4,
    color: "white",
    textAlign: "center",
  },
});

export default OrderCard;
