import React, { useCallback, useEffect } from "react";

import { CustomerTabNavigators } from "./CustomerTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseApp } from "../../utils/firebaseHelper";
import { child, getDatabase, onValue, ref, off, get } from "firebase/database";
import { ActivityIndicator, View } from "react-native";
import colors from "../../constants/colors";
import commonStyles from "../../constants/commonStyles";

import {
  getOrdersOfaShop,
  getOrdersOfaUser,
  getUserCarts,
  getUserWishes,
} from "../../utils/Subscribefunctions/Client";
import { resetOrders } from "../../store/orderSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();
import { getProducts, getShops } from "../../utils/Subscribefunctions/Admin";
import ProductDetails from "../../screens/product/ProductDetails";
export const CustomerNavigators = React.memo(() => {
  const dispatch = useDispatch();

  const { isUsersLoading } = useSelector((state) => state.user);
  const { shopsIsLoading } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log("Subscribing to firebase Client listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const refs = [];

    // wee need to get all the and products

    //   get Products----------
    const prouctsRef = child(dbRef, "products");
    refs.push(prouctsRef);

    const productAction = getProducts(prouctsRef);
    dispatch(productAction);
    //   get Products end ------------

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

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="CustomerTabs" component={CustomerTabNavigators} />
      <RootStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          // headerTransparent: true,

          // headerTintColor: 'white',
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />
    </RootStack.Navigator>
  );
});
