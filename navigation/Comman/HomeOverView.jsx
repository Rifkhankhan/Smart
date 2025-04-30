import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import { Text } from "react-native";
import ItemsList from "../../screens/ItemsList";
import ProductDetails from "../../screens/product/ProductDetails";
import Home from "../../screens/Common/Home";
import IconButton from "../../UI/IconButton";
import { ServiceStack } from "./ServiceStack";
import ViewService from "../../screens/Services/ViewService";
import ReviewListScreen from "../../screens/Services/ReviewListScreen";
import ViewReview from "../../screens/Services/ViewReview";

export const HomeOverView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#333333" },
          // headerTintColor:'white',
          // headerTitleAlign: 'left',
          headerTitle: "",
          // headerRight:,
          headerLeft: ({ size, color }) => {
            return (
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
          },
          headerRight: ({ size, color }) => {
            return <IconButton name="search" color="white" size={24} />;
          },
        }}
      />

      <Stack.Screen
        name="ItemsList"
        component={ItemsList}
        options={{
          headerShown: true,
          // headerTransparent: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          headerTitle: "Gifts",
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen
        name="ServiceStack"
        component={ServiceStack}
        options={{
          // headerTransparent: true,
          headerShown: false,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen
        name="ViewService"
        component={ViewService}
        options={{
          // headerTransparent: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="ViewReview"
        component={ViewReview}
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};
