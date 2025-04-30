import React, { useCallback } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

export const CustomBottomSheetBar = React.memo(
  ({
    placeOrderHandlerData,
    service,
    CustomBottomSheetBarStyles,
    formState,
    bottomSheetRef,
    setShouldOpenPaymentSheet,
  }) => {
    const handlePlaceOrder = useCallback(() => {
      placeOrderHandlerData();
      setShouldOpenPaymentSheet(true);
      bottomSheetRef.current?.close(); // Trigger close
    }, [placeOrderHandlerData]);

    const totalAmount = service?.price * formState.inputValues.qty + 100;

    return (
      <View style={[styles.container, CustomBottomSheetBarStyles.container]}>
        <View
          style={[
            styles.priceContainer,
            CustomBottomSheetBarStyles.priceContainer,
          ]}
        >
          <View style={styles.priceRow}>
            <Text style={styles.totalText}>Total : </Text>
            <Text>
              <Text style={styles.currency}>Rs.</Text>
              <Text style={styles.amount}>{totalAmount}</Text>
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.rightBtnsContainer,
            CustomBottomSheetBarStyles.rightBtnsContainer,
          ]}
        >
          <Pressable
            onPress={handlePlaceOrder}
            style={[
              styles.addToCardButton,
              CustomBottomSheetBarStyles.addToCardButton,
            ]}
          >
            <Text
              style={[styles.buttonText, CustomBottomSheetBarStyles.buttonText]}
            >
              Confirm Service
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  priceContainer: {
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
  },
  currency: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  amount: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  rightBtnsContainer: {
    alignItems: "flex-end",
  },
  addToCardButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#007aff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
