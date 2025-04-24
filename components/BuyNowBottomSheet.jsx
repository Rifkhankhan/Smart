// import React, {
//   useCallback,
//   useEffect,
//   useReducer,
//   useRef,
//   useState,
// } from "react";
// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import BottomSheet, {
//   BottomSheetFooter,
//   BottomSheetScrollView,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import { AntDesign, Feather } from "@expo/vector-icons";
// import { reducer } from "../utils/reducers/formReducer";
// import { useDispatch, useSelector } from "react-redux";
// import { validateInput } from "../utils/actions/formActions";
// import { CustomBotttomSheetBarStyles } from "../StylesSheets/CustomBotttomSheetBar";
// import defaultImage from './../assets/images/man.png'

// const initialState = {
//   inputValues: {
//     qty: 0,
//     total: 0,
//   },
//   inputValidities: {
//     qty: false,
//     total: false,
//   },
//   formIsValid: false,
// };

// const BuyNowBottomSheet = ({ product, open, setOpen, placeOrderHandler }) => {
//   const { authData } = useSelector((state) => state.auth);
//   const [formState, dispatchFormState] = useReducer(reducer, initialState);

//   const [error, setError] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   const placeOrderHandlerData = () => {
//     placeOrderHandler({
//       ...formState.inputValues,
//       uid: authData.uid,
//       productKey: product?.productKey,
//       shopKey: product?.shopKey,
//       orderStatus: "new",
//       status: true,
//       total: product?.price * formState.inputValues.qty + 100,
//     });
//   };

//   // new change
//   const CustomBotttomSheetBar = CustomBotttomSheetBar(placeOrderHandlerData,product,CustomBotttomSheetBarStyles,formState)

//   const sheetRef = useRef(null);
//   const dispatch = useDispatch();

//   const sheetSize = ["85%"];

//   useEffect(() => {
//     sheetRef?.current?.snapToIndex(0);
//   }, []);

//   useEffect(() => {
//     if (error) {
//       Alert.alert("An error occured", error, [{ text: "Okay" }]);
//     }
//   }, [error]);

//   const plusHandler = useCallback(() => {
//     dispatchFormState({ type: "plus" });
//   }, [dispatchFormState]);

//   const minusHandler = useCallback(() => {
//     dispatchFormState({ type: "minus" });
//   }, [dispatchFormState]);

//   return (
//     <BottomSheet
//       ref={sheetRef}
//       snapPoints={sheetSize}
//       onClose={() => setOpen(false)}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Buy now</Text>
//         <Pressable onPress={() => setOpen(false)} style={styles.closeButton}>
//           <AntDesign
//             style={styles.closeButtonText}
//             name="close"
//             size={24}
//             color="black"
//           />
//         </Pressable>
//       </View>
//       <BottomSheetScrollView>
//         <View style={{ marginBottom: 55, marginTop: 5 }}>
//           {/* product details */}
//           <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
//             <View style={{ flex: 2 }}>
//               <Image
//                 style={{ width: 150, height: 150, borderRadius: 5 }}
//                 source={
//                   product?.images?.length > 0
//                     ? { uri: product?.images[0] }
//                     : { uri: "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708858980/cld-sample-5.jpg" }
//                 }
//               />

//             </View>
//             <View style={{ flex: 2.3, paddingVertical: 5 }}>
//               <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//                 {product?.name}
//               </Text>
//               <Text style={{ fontSize: 18, color: "red" }}>
//                 Rs.{product?.price}
//               </Text>
//               <Text
//                 style={{ fontSize: 12, textDecorationLine: "line-through" }}
//               >
//                 Rs.{product?.oPrice}
//               </Text>
//             </View>
//           </View>

//           {/* colors */}
//           <View
//             style={{
//               marginVertical: 10,
//               paddingVertical: 5,
//               paddingHorizontal: 10,
//               borderTopWidth: 0.5,
//               borderBottomWidth: 0.5,
//               borderColor: "aqua",
//             }}
//           >
//             <View>
//               <Text style={{ fontSize: 18 }}>Color</Text>
//             </View>
//             <View
//               style={{ marginTop: 5, flexDirection: "row", flexWrap: "wrap" }}
//             >
//               {[...Array(10)].map((_, index) => (
//                 <View key={index} style={{ alignItems: "center", margin: 5 }}>
//                   <Image
//                     width={50}
//                     height={50}
//                     borderRadius={5}
//                     source={defaultImage}
//                   />
//                   <Text>Color {index + 1}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>

//           {/* quantity */}

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginVertical: 10,

//               paddingHorizontal: 10,
//             }}
//           >
//             <Text style={{ marginRight: "auto", fontSize: 18 }}>Quantity</Text>
//             <View style={{ marginLeft: "auto", flexDirection: "row" }}>
//               <Pressable onPress={minusHandler}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     paddingHorizontal: 8,
//                     borderWidth: 0.5,
//                   }}
//                 >
//                   -
//                 </Text>
//               </Pressable>

//               <View
//                 style={{
//                   margin: "auto",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text> {formState.inputValues.qty}</Text>
//               </View>

//               <Pressable onPress={plusHandler}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     paddingHorizontal: 8,
//                     borderWidth: 0.5,
//                   }}
//                 >
//                   +
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* summary details */}
//           <View style={{ paddingHorizontal: 10 }}>
//             <Text style={{ fontWeight: "bold", fontSize: 20 }}>
//               Order Summary
//             </Text>
//             <View style={{ paddingHorizontal: 5 }}>
//               {/* {[
// 								{ label: 'Items Total', amount: product?.price },
// 								{ label: 'Delivery Fee', amount: 100 },
// 								{ label: 'Total Payment', amount: ((product?.price * formState.inputValues.qty) + 100 }
// 							] */}

//               <View style={{ flexDirection: "row", paddingVertical: 3 }}>
//                 <Text style={{ marginRight: "auto", fontSize: 17 }}>
//                   Items Total
//                 </Text>
//                 <Text style={{ fontSize: 17 }}>{product?.price}</Text>
//               </View>

//               <View style={{ flexDirection: "row", paddingVertical: 3 }}>
//                 <Text style={{ marginRight: "auto", fontSize: 17 }}>
//                   Delivery Fee
//                 </Text>
//                 <Text style={{ fontSize: 17 }}>100</Text>
//               </View>

//               <View style={{ flexDirection: "row", paddingVertical: 3 }}>
//                 <Text style={{ marginRight: "auto", fontSize: 17 }}>
//                   Total Payment
//                 </Text>
//                 <Text style={{ fontSize: 17 }}>
//                   {product?.price * formState.inputValues.qty + 100}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </BottomSheetScrollView>

//       {open && <CustomBotttomSheetBar />}
//     </BottomSheet>
//   );
// };

// export default BuyNowBottomSheet;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     elevation: 2,
//     paddingVertical: 0,
//     marginVertical: 0,
//     backgroundColor: "white",
//   },
//   headerTitle: {
//     fontSize: 18,
//     margin: "auto",
//     paddingVertical: 0,
//     marginVertical: 0,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   closeButton: {
//     paddingVertical: 5,
//     marginVertical: 0,
//   },
//   closeButtonText: {
//     fontSize: 20,

//     color: "black",
//   },
//   container: {
//     flexDirection: "row",

//     alignItems: "center",
//     elevation: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 2,
//     backgroundColor: "white",
//     borderTopColor: "aqua",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },

//   priceContainer: {
//     marginLeft: 10,
//     marginRight: "auto",
//     flexDirection: "row",
//   },
//   priceContainerTotal: {
//     fontSize: 20,
//   },
//   rightBtnsContainer: {
//     flexDirection: "row",
//     marginLeft: "auto",
//   },
//   addToCardbutton: {
//     padding: 12,
//     elevation: 4,
//     marginLeft: "auto",
//     marginRight: 10,
//     borderWidth: 0,

//     borderRadius: 4,
//     backgroundColor: "#ff5400",
//   },
//   buttonText: {
//     fontSize: 14,
//     color: "white",
//     paddingHorizontal: 8,
//   },
// });
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../utils/reducers/formReducer";
import defaultImage from './../assets/images/man.png';
import { CustomBotttomSheetBarStyles } from "../StylesSheets/CustomBotttomSheetBar";
import { CustomBottomSheetBar } from './../functions/BuyNowBottomSheetFunctions';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const initialState = {
  inputValues: { qty: 0, total: 0 },
  inputValidities: { qty: false, total: false },
  formIsValid: false,
};

const BuyNowBottomSheet = ({ product, bottomSheetRef, placeOrderHandler }) => {
  const { authData } = useSelector((state) => state.auth);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const placeOrderHandlerData = useCallback(() => {
    placeOrderHandler({
      ...formState.inputValues,
      uid: authData.uid,
      productKey: product?.productKey,
      shopKey: product?.shopKey,
      orderStatus: "new",
      status: true,
      total: product?.price * formState.inputValues.qty + 100,
    });
  }, [authData, formState.inputValues, placeOrderHandler, product]);

  const CustomBotttomSheetBarComponent = useCallback(() => {
    return (
      <CustomBottomSheetBar
        placeOrderHandlerData={placeOrderHandlerData}
        product={product}
        CustomBottomSheetBarStyles={CustomBotttomSheetBarStyles}
        formState={formState}
      />
    );
  }, [placeOrderHandlerData, product, formState]);

  const sheetSize = ["85%"];

  useEffect(() => {
    bottomSheetRef?.current?.snapToIndex(0);
  }, []);

  const plusHandler = useCallback(() => dispatchFormState({ type: "plus" }), []);
  const minusHandler = useCallback(() => dispatchFormState({ type: "minus" }), []);

  return (
    <BottomSheet  
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      snapPoints={sheetSize}
      index={-1} // ⬅️ This keeps it closed initially
      onClose={() => bottomSheetRef?.current?.close()} // this now runs AFTER close animation
      backgroundStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
      }}
      handleIndicatorStyle={{ backgroundColor: 'black',width:50 }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1} // hides when index is -1
          appearsOnIndex={0}     // shows when index >= 0
          opacity={0.5}          // how dark the background is
        />
      )}
    >
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Buy Now</Text>
        <Pressable onPress={() => bottomSheetRef?.current?.close()} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>

      </View> */}

      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={product?.images?.length > 0 ? product?.images[0] : defaultImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product?.name}</Text>
            <Text style={styles.productPrice}>Rs.{product?.price}</Text>
            <Text style={styles.productOriginalPrice}>Rs.{product?.oPrice}</Text>
          </View>
        </View>

        <View style={styles.colorContainer}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorsRow}>
            {[...Array(10)].map((_, index) => (
              <View key={index} style={styles.colorItem}>
                <Image style={styles.colorImage} source={defaultImage} />
                <Text style={styles.colorText}>Color {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <Pressable onPress={minusHandler} style={styles.qtyButton}><Text style={styles.qtyText}>-</Text></Pressable>
            <Text style={styles.qtyValue}>{formState.inputValues.qty}</Text>
            <Pressable onPress={plusHandler} style={styles.qtyButton}><Text style={styles.qtyText}>+</Text></Pressable>
          </View>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total</Text>
            <Text style={styles.summaryValue}>Rs.{product?.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>Rs.100</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Payment</Text>
            <Text style={styles.summaryValue}>Rs.{product?.price * formState.inputValues.qty + 100}</Text>
          </View>
        </View>
      </BottomSheetScrollView>

       <CustomBotttomSheetBarComponent />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 5,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  productContainer: {
    flexDirection: "row",
    padding: 15,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    color: "red",
  },
  productOriginalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#999",
  },
  colorContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  colorsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorItem: {
    alignItems: "center",
    margin: 5,
  },
  colorImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  colorText: {
    fontSize: 12,
    marginTop: 2,
  },
  quantityContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  qtyText: {
    fontSize: 20,
  },
  qtyValue: {
    marginHorizontal: 15,
    fontSize: 18,
  },
  orderSummary: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BuyNowBottomSheet;
