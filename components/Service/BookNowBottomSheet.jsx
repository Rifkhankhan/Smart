import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "./../../utils/reducers/formReducer";
import defaultImage from "./../../assets/images/man.png";
import { CustomBotttomSheetBarStyles } from "./../../StylesSheets/CustomBotttomSheetBar";
import { CustomBottomSheetBar } from "./../../functions/BuyNowBottomSheetFunctions";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const initialState = {
  inputValues: { qty: 0, total: 0 },
  inputValidities: { qty: false, total: false },
  formIsValid: false,
};

const BookNowBottomSheet = ({ service, bottomSheetRef, placeOrderHandler }) => {
  const { authData } = useSelector((state) => state.auth);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const placeOrderHandlerData = useCallback(() => {
    placeOrderHandler({
      ...formState.inputValues,
      uid: authData.uid,
      productKey: service?.productKey,
      shopKey: service?.shopKey,
      orderStatus: "new",
      status: true,
      total: service?.price * formState.inputValues.qty + 100,
    });
  }, [authData, formState.inputValues, placeOrderHandler, service]);

  const CustomBotttomSheetBarComponent = useCallback(() => {
    return (
      <CustomBottomSheetBar
        placeOrderHandlerData={placeOrderHandlerData}
        service={service}
        CustomBottomSheetBarStyles={CustomBotttomSheetBarStyles}
        formState={formState}
      />
    );
  }, [placeOrderHandlerData, service, formState]);

  const sheetSize = ["85%"];

  useEffect(() => {
    bottomSheetRef?.current?.snapToIndex(0);
  }, []);

  const plusHandler = useCallback(
    () => dispatchFormState({ type: "plus" }),
    []
  );
  const minusHandler = useCallback(
    () => dispatchFormState({ type: "minus" }),
    []
  );

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
        backgroundColor: "white",
      }}
      handleIndicatorStyle={{ backgroundColor: "black", width: 50 }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1} // hides when index is -1
          appearsOnIndex={0} // shows when index >= 0
          opacity={0.5} // how dark the background is
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
            <Pressable onPress={minusHandler} style={styles.qtyButton}>
              <Text style={styles.qtyText}>-</Text>
            </Pressable>
            <Text style={styles.qtyValue}>{formState.inputValues.qty}</Text>
            <Pressable onPress={plusHandler} style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total</Text>
            <Text style={styles.summaryValue}>Rs.{service?.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>Rs.100</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Payment</Text>
            <Text style={styles.summaryValue}>
              Rs.{service?.price * formState.inputValues.qty + 100}
            </Text>
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

export default BookNowBottomSheet;
