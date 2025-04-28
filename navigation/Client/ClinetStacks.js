// const SellerHomeStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="SellerHome">
//       <Stack.Screen
//         name="SellerHome"
//         component={SellerHome}
//         options={{
//           headerShown: false,
//         }}
//       />

import React from "react";
import SellerHome from "../../screens/Client/SellerHome";
import AddItem from "../../screens/AddItem";
import EditItem from "../../screens/EditItem";
import ProductDetails from "../../screens/product/ProductDetails";

//       <Stack.Screen
//         name="AddItem"
//         component={AddItem}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "Create Item",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//       <Stack.Screen
//         name="EditItem"
//         component={EditItem}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "Edit Item",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//       <Stack.Screen
//         name="ProductDetails"
//         component={ProductDetails}
//         options={{
//           headerShown: false,
//           // headerTransparent: true,

//           // headerTintColor: 'white',
//           // headerTitle: () => <SearchBar width="0.6" />,
//           headerTitleAlign: "left",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
export const SellerHomeStacks = React.memo(() => {
  // Memoized options for screens
  const getAddItemOptions = {
    headerShown: true,
    headerTitle: "Create Item",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };

  const getEditItemOptions = {
    headerShown: true,
    headerTitle: "Edit Item",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator initialRouteName="SellerHome">
      <Stack.Screen
        name="SellerHome"
        component={SellerHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={getAddItemOptions}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={getEditItemOptions}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
});
