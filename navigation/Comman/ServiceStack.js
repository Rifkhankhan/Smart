import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddService from "./../../screens/Services/AddService";
import EditService from "./../../screens/Services/EditService";
import ViewService from "./../../screens/Services/ViewService";
import ViewServicesByCategory from "./../../screens/Services/ViewServicesByCategory";
import ServiceListPage from "./../../screens/Services/ServiceListPage";
import ReviewListScreen from "../../screens/Services/ReviewListScreen";
import { ReviewStack } from "./ReviewStack";
import Header from "../../components/Common/Header";

const Stack = createNativeStackNavigator();

export const ServiceStack = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName="ServiceListPage">
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditService"
        component={EditService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewService"
        component={ViewService}
        // screenOptions={{
        //   header: () => <Header />,
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewServicesByCategory"
        component={ViewServicesByCategory}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ServiceListPage"
        component={ServiceListPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReviewStack"
        component={ReviewStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});
