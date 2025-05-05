import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryHomeScreen from "../../screens/Category/CategoryHomeScreen";
import ViewCategory from "../../screens/Category/ViewCategory";
const Stack = createNativeStackNavigator();

export const ProductCategoryStack = React.memo(() => {
  // / Memoized options for screens
  const getProductListPageOptions = {
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home" size={size} color={color} />
    ),
  };

  const getViewProductOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator initialRouteName="CategoryHomeScreen">
      <Stack.Screen
        name="CategoryHomeScreen"
        component={CategoryHomeScreen}
        options={getProductListPageOptions}
      />

      <Stack.Screen
        name="ViewCategory"
        component={ViewCategory}
        options={getProductListPageOptions}
      />
    </Stack.Navigator>
  );
});
