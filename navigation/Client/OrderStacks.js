// const SellerOrderStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="OrderListPage">
//       <Stack.Screen
//         name="OrderListPage"
//         component={OrderListPage}
//         options={{
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//           headerShown: true,
//           headerTitle: "Orders",
//           headerTitleStyle: {
//             width: "100%",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="ViewOrder"
//         component={ViewOrder}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "New Order",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import OrderListPage from "../../screens/OrderListPage";
import ViewOrder from "../../screens/ViewOrder";

export const SellerOrderStacks = React.memo(() => {
  // Memoized options for screens
  const getOrderListPageOptions = {
    headerStyle: { backgroundColor: "#333333" },
    headerTintColor: "white",
    headerShown: true,
    headerTitle: "Orders",
    headerTitleStyle: {
      width: "100%",
    },
  };

  const getViewOrderOptions = {
    headerShown: true,
    headerTitle: "New Order",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };
  return (
    <Stack.Navigator initialRouteName="OrderListPage">
      <Stack.Screen
        name="OrderListPage"
        component={OrderListPage}
        options={getOrderListPageOptions}
      />
      <Stack.Screen
        name="ViewOrder"
        component={ViewOrder}
        options={getViewOrderOptions}
      />
    </Stack.Navigator>
  );
});
