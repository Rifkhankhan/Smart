// const TabNavigators = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: "#333333" },
//         tabBarActiveTintColor: "white",
//         tabBarShowLabel: true,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: true,
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Home</Text>
//           ),
//           headerStyle: { backgroundColor: "#333333" },
//           headerTitle: "",
//           headerLeft: ({ size, color }) => {
//             return (
//               <Text
//                 style={{
//                   color: "white",
//                   fontFamily: "monospace",
//                   fontSize: 30,
//                   marginLeft: 15,
//                 }}
//               >
//                 Smart
//               </Text>
//             );
//           },
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="ProductStacks"
//         component={ProductStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="product-hunt" size={24} color={color} />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Products</Text>
//           ),
//         }}
//       />
//       {/* <Tab.Screen
// 				name="SellerInboxStacks"
// 				component={SellerInboxStacks}
// 				options={{
// 					tabBarIcon: ({ color, size }) => (
// 						<Ionicons name="mail" size={24} color={color} />
// 					)
// 				}}
// 			/> */}

//       <Tab.Screen
//         name="SellerOrderStacks"
//         component={SellerOrderStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => {
//             return <FontAwesome6 name="box-open" size={24} color={color} />;
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Orders</Text>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Cart"
//         component={Cart}
//         options={{
//           tabBarIcon: ({ color, size }) => {
//             return <Entypo name="shopping-cart" size={size} color={color} />;
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Cart</Text>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Deal"
//         component={SellerOrderStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => {
//             return (
//               <MaterialCommunityIcons name="offer" size={size} color={color} />
//             );
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Deals</Text>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="AccountOverView"
//         component={AccountOverView}
//         options={{
//           tabBarIcon: ({ color, size }) => {
//             return (
//               <MaterialCommunityIcons name="account" size={24} color={color} />
//             );
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? "white" : "gray" }}>Account</Text>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
import React, { useEffect } from "react";
import { Text } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Cart from "../../screens/Cart";
import DashboardScreen from "../../screens/Client/Dashboard";
import {
  AccountOverView,
  ProductStacks,
  SellerOrderStacks,
} from "./ClientNavigators";
const Tab = createBottomTabNavigator();

const getTabBarLabel = (focused, label) => (
  <Text style={{ color: focused ? "white" : "gray" }}>{label}</Text>
);

const getTabBarIcon = (IconComponent, name, size, color) => (
  <IconComponent name={name} size={size} color={color} />
);

// update TabNavigator
export const TabNavigators = React.memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#333333" },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Home"),
          headerStyle: { backgroundColor: "#333333" },
          headerTitle: "",
          headerLeft: ({ size, color }) => (
            <Text
              style={{
                color: "white",
                fontFamily: "monospace",
                fontSize: 30,
                marginLeft: 15,
              }}
            >
              Smart
            </Text>
          ),
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(Ionicons, "home", size, color),
        }}
      />

      <Tab.Screen
        name="ProductStacks"
        component={ProductStacks}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(FontAwesome, "product-hunt", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Products"),
        }}
      />

      <Tab.Screen
        name="SellerOrderStacks"
        component={SellerOrderStacks}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(FontAwesome6, "box-open", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Orders"),
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
        name="Deal"
        component={SellerOrderStacks}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(MaterialCommunityIcons, "offer", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Deals"),
        }}
      />

      <Tab.Screen
        name="AccountOverView"
        component={AccountOverView}
        options={{
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(MaterialCommunityIcons, "account", size, color),
          tabBarLabel: ({ focused }) => getTabBarLabel(focused, "Account"),
        }}
      />
    </Tab.Navigator>
  );
});
