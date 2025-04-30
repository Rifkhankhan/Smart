import React from "react";
import { Text } from "react-native";
import Cart from "../../screens/Cart";
import DashboardScreen from "../../screens/Client/Dashboard";
import ProductDetails from "../../screens/product/ProductDetails";
import SearchedProductsScreen from "./../../screens/product/SearchedProductsScreen";
import SearchScreen from "../../screens/SearchScreen";
import ServiceListPage from "../../screens/Services/ServiceListPage";
import ViewServicesByCategory from "../../screens/Services/ViewServicesByCategory";
import SettingsScreen from "../../screens/Common/SettingsScreen";

import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewService from "../../screens/Services/ViewService";
import Home from "./../../screens/Home";

const Stack = createNativeStackNavigator();

// Define header left and right components outside the render to avoid re-creation
const HeaderLeft = () => (
  <Text
    style={{
      color: "white",
      fontFamily: "monospace",
      fontSize: 30,
      paddingInline: 10,
    }}
  >
    Smart
  </Text>
);

const HeaderRight = () => <Ionicons name="search" color="white" size={24} />;

// export const HomeOverView = () => {
//   return (
//     <Stack.Navigator initialRouteName="TabNavigators">
//       <Stack.Group>
//         <Stack.Screen
//           name="TabNavigators"
//           component={TabNavigators}
//           options={{
//             headerShown: false,
//             headerStyle: { backgroundColor: "#333333" },
//             // headerTintColor:'white',
//             // headerTitleAlign: 'left',
//             headerTitle: "",
//             // headerRight:,
//             headerLeft: ({ size, color }) => {
//               return (
//                 <Text
//                   style={{
//                     color: "white",
//                     fontFamily: "monospace",
//                     fontSize: 30,
//                     paddingInline: 10,
//                   }}
//                 >
//                   Smart
//                 </Text>
//               );
//             },
//             headerRight: ({ size, color }) => {
//               return <Ionicons name="search" color="white" size={24} />;
//             },
//           }}
//         />

//         <Stack.Screen
//           name="ProductDetails"
//           component={ProductDetails}
//           options={{
//             headerShown: false,

//             // headerTransparent: true,

//             // headerTintColor: 'white',
//             // headerTitle: () => <SearchBar width="0.6" />,
//             headerTitleAlign: "left",
//           }}
//         />

//       <Stack.Screen
//           name="ViewService"
//           component={ViewService}
//           options={{
//             headerShown: false,

//             // headerTransparent: true,

//             // headerTintColor: 'white',
//             // headerTitle: () => <SearchBar width="0.6" />,
//             headerTitleAlign: "left",
//           }}
//         />

//       <Stack.Screen
//           name="ViewServicesByCategory"
//           component={ViewServicesByCategory}
//           options={{
//             headerShown: false,

//             // headerTransparent: true,

//             // headerTintColor: 'white',
//             // headerTitle: () => <SearchBar width="0.6" />,
//             headerTitleAlign: "left",
//           }}
//         />

//           <Stack.Screen
//           name="ServiceListPage"
//           component={ServiceListPage}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="CartScreen"
//           component={Cart}
//           options={{
//             headerShown: false,

//             headerTitleAlign: "left",
//           }}
//         />
//       </Stack.Group>

//       <Stack.Group screenOptions={{ presentation: "containedModal" }}>
//         <Stack.Screen
//           name="SettingsScreen"
//           component={SettingsScreen}
//           options={{
//             headerShown: true,
//             headerTitle: "",
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="SearchScreen"
//           component={SearchScreen}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="SearchedProductsScreen"
//           component={SearchedProductsScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// };

// this for tabNavigator
// export const HomeOverView = React.memo(() => {
//   return (
//     <Stack.Navigator initialRouteName="DrawerNavigator">
//       <Stack.Group>
//         <Stack.Screen
//           name="DrawerNavigator"
//           component={DrawerNavigator}
//           options={{
//             headerShown: false,
//             headerStyle: { backgroundColor: "#333333" },
//             headerTitle: "",
//             headerLeft: HeaderLeft, // Using memoized header components
//             headerRight: HeaderRight,
//           }}
//         />

//         <Stack.Screen
//           name="ProductDetails"
//           component={ProductDetails}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="ViewService"
//           component={ViewService}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="ViewServicesByCategory"
//           component={ViewServicesByCategory}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="ServiceListPage"
//           component={ServiceListPage}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="CartScreen"
//           component={Cart}
//           options={{
//             headerShown: false,
//             headerTitleAlign: "left",
//           }}
//         />
//       </Stack.Group>

//       <Stack.Group screenOptions={{ presentation: "containedModal" }}>
//         <Stack.Screen
//           name="SettingsScreen"
//           component={SettingsScreen}
//           options={{
//             headerShown: true,
//             headerTitle: "",
//             headerTitleAlign: "left",
//           }}
//         />

//         <Stack.Screen
//           name="SearchScreen"
//           component={SearchScreen}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="SearchedProductsScreen"
//           component={SearchedProductsScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// });

// const AccountOverView = () => {
//   return (
//     <Stack.Navigator initialRouteName="Account">
//       <Stack.Screen
//         name="Account"
//         component={Account}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",

//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",

//           headerLeft: () => {
//             return (
//               <IconButton
//                 name="add"
//                 size={24}
//                 color="red"
//                 backgroundColor={true}
//               />
//             );
//           },
//         }}
//       />
//       <Stack.Screen
//         name="Orders"
//         component={Orders}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "My Orders",
//           headerStyle: { backgroundColor: "white" },
//           headerTintColor: "black",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// Memoized IconButton component

// this is for drawer
export const HomeOverView = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#333333" },
            headerTitle: "",
            headerLeft: HeaderLeft, // Using memoized header components
            headerRight: HeaderRight,
          }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="ViewService"
          component={ViewService}
          options={{
            headerShown: false,
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="ViewServicesByCategory"
          component={ViewServicesByCategory}
          options={{
            headerShown: false,
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="ServiceListPage"
          component={ServiceListPage}
          options={{
            headerShown: false,
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="CartScreen"
          component={Cart}
          options={{
            headerShown: false,
            headerTitleAlign: "left",
          }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "containedModal" }}>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SearchedProductsScreen"
          component={SearchedProductsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
});
