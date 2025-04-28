import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getFirebaseApp } from "../../utils/firebaseHelper";
import { child, getDatabase, onValue, ref, off, get } from "firebase/database";
import { resetOrders } from "../../store/orderSlice";
import {
  getOrdersOfaShop,
  getOrdersOfaUser,
  getUserCarts,
  getUserWishes,
} from "../../utils/Subscribefunctions/Client";
import { ActivityIndicator, View } from "react-native";
import colors from "../../constants/colors";
import commonStyles from "../../constants/commonStyles";
import { getProducts, getShops } from "../../utils/Subscribefunctions/Admin";

import DrawerNavigator from "./DrawerNavigator";
export const SellerNavigators = () => {
  const dispatch = useDispatch();

  const { isUsersLoading } = useSelector((state) => state.user);
  const { shopsIsLoading } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log("Subscribing to firebase Client listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const refs = [];

    // wee need to get all the shops and products

    //   get shops -----------
    const shopsRef = child(dbRef, "shops");
    refs.push(shopsRef);

    const shopAction = getShops(shopsRef, authData);
    dispatch(shopAction);
    //   get shops end ------------

    //   get Products----------
    const prouctsRef = child(dbRef, "products");
    refs.push(prouctsRef);

    const productAction = getProducts(prouctsRef);
    dispatch(productAction);
    //   get Products end ------------

    // get orders id of a shop
    const shopordersRef = child(dbRef, `shopsOrders/${authData?.shopKey}`);

    refs.push(shopordersRef);

    onValue(shopordersRef, (shopOrdersSnapShot) => {
      const ordersObjects = shopOrdersSnapShot.val() || {};

      dispatch(resetOrders());
      Object.entries(ordersObjects).forEach(([key, orderKey]) => {
        const orderRef = child(dbRef, `orders/${orderKey}`);

        refs.push(orderRef);
        // get orders for the shop
        const orderFetchAction = getOrdersOfaShop(
          dbRef,
          orderRef,
          orderKey,
          refs,
          key
        );

        dispatch(orderFetchAction);
      });
    });

    // get user's orders

    const orderIdsRef = child(dbRef, `usersOrders/${authData?.uid}`);
    refs.push(orderIdsRef);
    const getUserOrdersAction = getOrdersOfaUser(dbRef, orderIdsRef, refs);
    dispatch(getUserOrdersAction);

    // get user Carts
    const cartIdsRef = child(dbRef, `carts/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserCartsAction = getUserCarts(dbRef, cartIdsRef, refs);
    dispatch(getUserCartsAction);

    // get user wishLists
    const wishIdsRef = child(dbRef, `wishes/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserwishListsAction = getUserWishes(dbRef, wishIdsRef, refs);
    dispatch(getUserwishListsAction);

    // Cleanup all listeners to prevent memory leaks
    return () => {
      off(dbRef); // Remove all listeners
    };
  }, [authData]);

  if (isUsersLoading || shopsIsLoading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }
  return <DrawerNavigator />;
};
