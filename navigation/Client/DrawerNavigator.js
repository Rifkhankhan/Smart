import React, { useEffect } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ProductStacks } from "./ProductStacks";
import { HomeOverView } from "./HomeStacks";
import { SellerOrderStacks } from "./OrderStacks";
import { AccountOverView } from "./AccountStacks";
import Cart from "../../screens/Cart";
import DashboardScreen from "../../screens/Client/Dashboard";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          //   backgroundColor: "#c6cbef",
          // width: 240,
          width: "75%",
        },
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "red",
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerTitle: "DashBoard", drawerLabel: "DashBoard" }}
      />
      <Drawer.Screen
        name="HomeOverView"
        component={HomeOverView}
        options={{ headerTitle: "Home", drawerLabel: "Home" }}
      />
      {/* <Drawer.Screen name="Services" component={ProductDetails} /> */}
      <Drawer.Screen
        name="ProductStacks"
        component={ProductStacks}
        options={{ headerTitle: "Products", drawerLabel: "Products" }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: "Cart", drawerLabel: "Cart" }}
      />
      <Drawer.Screen
        name="SellerOrderStacks"
        component={SellerOrderStacks}
        options={{ headerTitle: "Orders", drawerLabel: "Orders" }}
      />
      <Drawer.Screen
        name="AccountOverView"
        component={AccountOverView}
        options={{
          headerTitle: "Account",
          drawerLabel: "Account",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  //   paddingHorizontal: 5,
                }}
                onPress={() => navigation.navigate("SettingScreen")}
              >
                <AntDesign name="setting" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};
