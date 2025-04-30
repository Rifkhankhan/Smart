import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewReview from "../../screens/Services/ViewReview";
import ReviewListScreen from "../../screens/Services/ReviewListScreen";
const Stack = createNativeStackNavigator();

export const ReviewStack = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName="ReviewListScreen">
      <Stack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewReview"
        component={ViewReview}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});
