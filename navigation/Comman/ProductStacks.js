// export const ProductStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="ProductListPage">
//       <Stack.Screen
//         name="ProductListPage"
//         component={ProductListPage}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="CreateProduct"
//         component={CreateProduct}
//         options={{
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="ViewProduct"
//         component={ViewProduct}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: "black" },
//           headerTintColor: "white",
//         }}
//       />

//       <Stack.Screen
//         name="EditProduct"
//         component={EditProduct}
//         options={{
//           headerShown: true,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// Memoized Screen Components
// const ProductListPageScreen = React.memo(() => <ProductListPage />);
// const CreateProductScreen = React.memo(() => <CreateProduct />);
// const ViewProductScreen = React.memo(() => <ViewProduct />);
// const EditProductScreen = React.memo(() => <EditProduct />);

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListPage from "../../screens/product/ProductListPage";
import CreateProduct from "../../screens/product/CreateProduct";
import ViewProduct from "../../screens/product/ViewProduct";
import EditProduct from "../../screens/product/EditProduct";
import ProductDetails from "../../screens/product/ProductDetails";
const Stack = createNativeStackNavigator();

export const ProductStacks = React.memo(() => {
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
    <Stack.Navigator initialRouteName="ProductListPage">
      <Stack.Screen
        name="ProductListPage"
        component={ProductListPage}
        options={getProductListPageOptions}
      />
      <Stack.Screen
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
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
});
