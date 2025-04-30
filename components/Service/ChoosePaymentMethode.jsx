import React, { useCallback, useEffect, useReducer } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { reducer } from "../../utils/reducers/formReducer";
import defaultImage from "./../../assets/images/man.png";
import { CustomBottomSheetBar } from "./CustomBotttomSheetBar";
import { CustomBotttomSheetBarStyles } from "../../StylesSheets/CustomBotttomSheetBar";
import { CustomBotttomSheetBarForPayment } from "./CustomBotttomSheetBarForPayment";

const initialState = {
  inputValues: {
    paymentMethod: "Cash on Delivery",
  },
  inputValidities: {
    paymentMethod: true,
  },
  formIsValid: true,
};

const ChoosePaymentMethod = ({
  service,
  bottomPaymentSheetRef,
  placeOrderHandler,
  setConfirmOrder,
  confirmOrderHandler,
}) => {
  const { authData } = useSelector((state) => state.auth);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const setPaymentMethod = useCallback((method) => {
    dispatchFormState({ type: "SET_PAYMENT_METHOD", value: method });
  }, []);

  const placeOrderHandlerData = useCallback(() => {
    const totalAmount = service?.price + 100; // Assuming fixed delivery charge
    placeOrderHandler({
      ...formState.inputValues,
      uid: authData.uid,
      productKey: service?.productKey,
      shopKey: service?.shopKey,
      orderStatus: "new",
      status: true,
      total: totalAmount,
      qty: 1, // default qty
    });
  }, [authData, formState.inputValues, placeOrderHandler, service]);

  const CustomBottomSheetBarComponent = useCallback(() => {
    return (
      <CustomBotttomSheetBarForPayment
        placeOrderHandlerData={placeOrderHandlerData}
        service={service}
        CustomBottomSheetBarStyles={CustomBotttomSheetBarStyles}
        formState={formState}
        bottomPaymentSheetRef={bottomPaymentSheetRef}
        setConfirmOrder={setConfirmOrder}
        confirmOrderHandler={confirmOrderHandler}
      />
    );
  }, [placeOrderHandlerData, service, formState]);

  const sheetSize = ["60%"];

  useEffect(() => {
    bottomPaymentSheetRef?.current?.snapToIndex(0);
  }, []);

  return (
    <BottomSheet
      ref={bottomPaymentSheetRef}
      enablePanDownToClose={true}
      snapPoints={sheetSize}
      index={-1}
      onClose={() => bottomPaymentSheetRef?.current?.close()}
      backgroundStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
      }}
      handleIndicatorStyle={{ backgroundColor: "black", width: 50 }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
    >
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={
              service?.images?.length > 0 ? service?.images[0] : defaultImage
            }
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{service?.name}</Text>
            <Text style={styles.productPrice}>Rs.{service?.price}</Text>
            <Text style={styles.productOriginalPrice}>
              Rs.{service?.oPrice}
            </Text>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>

          {["Cash on Delivery", "Online Payment"].map((method) => (
            <Pressable
              key={method}
              onPress={() => setPaymentMethod(method)}
              style={styles.radioItem}
            >
              <View
                style={[
                  styles.radioOuter,
                  formState.inputValues.paymentMethod === method &&
                    styles.radioOuterSelected,
                ]}
              >
                {formState.inputValues.paymentMethod === method && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.radioLabel}>{method}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>

      {CustomBottomSheetBarComponent()}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "#4CAF50",
  },
  productOriginalPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  paymentContainer: {
    marginTop: 20,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: "#007AFF",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  radioLabel: {
    fontSize: 14,
  },
});

export default ChoosePaymentMethod;
