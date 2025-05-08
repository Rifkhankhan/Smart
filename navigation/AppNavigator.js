import React, { useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/Auth/AuthScreen";
import { useSelector } from "react-redux";
import StartUpScreen from "../screens/Common/StartUpScreen";
import BuyNowBottomSheet from "../components/BuyNowBottomSheet";

// Memoize components to avoid unnecessary re-renders
const MemoizedBuyNowBottomSheet = React.memo(BuyNowBottomSheet);
// const MainNavigator = React.memo(MainNavigator);
const MemoizedAuthScreen = React.memo(AuthScreen);
const MemoizedStartUpScreen = React.memo(StartUpScreen);
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeOverView } from "./Client/ClientNavigators";
const Drawer = createDrawerNavigator();

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "../screens/product/ProductDetails";
import { ProductStacks } from "./Comman/ProductStacks";
import { ServiceStack } from "./Comman/ServiceStack";
import { ProductCategoryStack } from "./Comman/ProductCategoryStack";
import { AuthStack } from "./Comman/AuthStack";
import { ReviewStack } from "./Comman/ReviewStack";

const Stack = createNativeStackNavigator();
const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      {/* bottomSheet */}

      <Stack.Navigator
        initialRouteName="MainNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="ProductStacks" component={ProductStacks} />
        <Stack.Screen name="ServiceStacks" component={ServiceStack} />
        <Stack.Screen
          name="ProductCategoryStack"
          component={ProductCategoryStack}
        />
        <Stack.Screen name="ReviewStack" component={ReviewStack} />

        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          // options={getProductListPageOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
