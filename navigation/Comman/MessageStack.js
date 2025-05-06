import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListPage from "../../screens/product/ProductListPage";
import CreateProduct from "../../screens/product/CreateProduct";
import ViewProduct from "../../screens/product/ViewProduct";
import EditProduct from "../../screens/product/EditProduct";
import MessageHome from "../../components/Common/MessageHome";
const Stack = createNativeStackNavigator();

export const MessageStack = React.memo(() => {
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
    <Stack.Navigator initialRouteName="MessageHome">
      <Stack.Screen
        name="MessageHome"
        component={MessageHome}
        options={getProductListPageOptions}
      />
      {/* <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={getViewProductOptions}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          headerShown: true,
        }}
      /> */}
    </Stack.Navigator>
  );
});
