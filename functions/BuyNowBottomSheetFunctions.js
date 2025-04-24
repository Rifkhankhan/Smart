// import { Text, View } from "react-native";
// import { Pressable } from "react-native";


// export const CustomBotttomSheetBar = ({ placeOrderHandlerData,product,CustomBotttomSheetBarStyles,formState}) => {
//     return (
//       <View style={CustomBotttomSheetBarStyles.container}>
//         <View style={CustomBotttomSheetBarStyles.priceContainer}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={{ fontSize: 20 }}>Total : </Text>
//             <Text>
//               <Text style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
//                 Rs.
//               </Text>{" "}
//               <Text style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
//                 {product?.price * formState.inputValues.qty + 100}
//               </Text>
//             </Text>
//           </View>
//         </View>
//         <View style={CustomBotttomSheetBarStyles.rightBtnsContainer}>
//           <Pressable
//             onPress={placeOrderHandlerData}
//             style={CustomBotttomSheetBarStyles.addToCardbutton}
//           >
//             <Text style={CustomBotttomSheetBarStyles.buttonText}>Place Order</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };
  

import React, { useCallback } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

export const CustomBottomSheetBar = React.memo(({ placeOrderHandlerData, product, CustomBottomSheetBarStyles, formState }) => {
  const handlePlaceOrder = useCallback(() => {
    placeOrderHandlerData()
  }, [placeOrderHandlerData])

  const totalAmount = product?.price * formState.inputValues.qty + 100

  return (
    <View style={[styles.container, CustomBottomSheetBarStyles.container]}>
      <View style={[styles.priceContainer, CustomBottomSheetBarStyles.priceContainer]}>
        <View style={styles.priceRow}>
          <Text style={styles.totalText}>Total : </Text>
          <Text>
            <Text style={styles.currency}>Rs.</Text>
            <Text style={styles.amount}>{totalAmount}</Text>
          </Text>
        </View>
      </View>
      <View style={[styles.rightBtnsContainer, CustomBottomSheetBarStyles.rightBtnsContainer]}>
        <Pressable
          onPress={handlePlaceOrder}
          style={[styles.addToCardButton, CustomBottomSheetBarStyles.addToCardButton]}
        >
          <Text style={[styles.buttonText, CustomBottomSheetBarStyles.buttonText]}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  priceContainer: {
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
  },
  currency: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  amount: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightBtnsContainer: {
    alignItems: 'flex-end',
  },
  addToCardButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007aff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
