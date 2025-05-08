import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/Auth/AuthScreen";
const Stack = createNativeStackNavigator();

export const AuthStack = React.memo(() => {
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
    <Stack.Navigator initialRouteName="AuthScreen">
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={getProductListPageOptions}
      />
    </Stack.Navigator>
  );
});
