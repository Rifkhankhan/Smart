import React from "react";
import { Text } from "react-native";
import Cart from "../../screens/Cart";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AccountOverView, AccountStacks } from "./../Comman/AccountStacks";
import { HomeOverView } from "./../Comman/HomeOverView";
import SettingsScreen from "../../screens/Common/SettingsScreen";
import { MessageStack } from "../Comman/MessageStack";

// Memoizing options for the Tab.Navigator
const getHomeOverViewOptions = {
  tabBarIcon: ({ color, size }) => (
    <Ionicons name="home" size={size} color={color} />
  ),
};

const getCardOptions = {
  tabBarIcon: ({ color, size }) => (
    <AntDesign name="shoppingcart" size={32} color={color} />
  ),
};

const getAccountOverViewOptions = {
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="account" size={32} color={color} />
  ),
};
const getTabBarLabel = (focused, label) => (
  <Text style={{ color: focused ? "black" : "gray" }}>{label}</Text>
);

const getTabBarIcon = (IconComponent, name, size, color) => (
  <IconComponent name={name} size={size} color={color} />
);

// Memoizing the navigation screens
// const HomeOverView = React.memo(() => (
//   <Stack.Navigator initialRouteName="Home">
//     <Stack.Screen
//       name="Home"
//       component={Home}
//       options={{
//         headerShown: true,
//         headerStyle: { backgroundColor: "#333333" },
//         headerTitle: "",
//         headerLeft: () => (
//           <Text
//             style={{
//               color: "white",
//               fontFamily: "monospace",
//               fontSize: 30,
//               paddingInline: 10,
//             }}
//           >
//             Smart
//           </Text>
//         ),
//         headerRight: ({ color }) => (
//           <IconButton name="search" color="white" size={24} />
//         ),
//       }}
//     />
//     <Stack.Screen
//       name="ProductDetails"
//       component={ProductDetails}
//       options={{ headerShown: false, headerTitleAlign: "left" }}
//     />
//     <Stack.Screen
//       name="ItemsList"
//       component={ItemsList}
//       options={{
//         headerShown: true,
//         headerStyle: { backgroundColor: "#333333" },
//         headerTintColor: "white",
//         headerTitle: "Gifts",
//         headerTitleAlign: "left",
//       }}
//     />
//   </Stack.Navigator>
// ));

export const CustomerTabNavigators = React.memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="HomeOverView"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="HomeOverView"
        component={HomeOverView}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(FontAwesome, "home", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "For You"),
        }}
      />

      <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(AntDesign, "message1", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Messages"),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(Entypo, "shopping-cart", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Cart"),
        }}
      />

      <Tab.Screen
        name="AccountStacks"
        component={AccountStacks}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(MaterialCommunityIcons, "account", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Account"),
        }}
      />
    </Tab.Navigator>
  );
});
