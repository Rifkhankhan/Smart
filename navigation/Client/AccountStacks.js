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

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../../screens/Account";
import Orders from "../../screens/Orders";
import IconButton from "../../UI/IconButton";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SettingsScreen from "../../screens/SettingsScreen";
const Stack = createNativeStackNavigator();
const HeaderLeftButton = React.memo(() => {
  return <IconButton name="add" size={24} color="red" backgroundColor={true} />;
});

export const AccountOverView = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
          headerLeft: () => <HeaderLeftButton />, // Using memoized component here
        }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "My Orders",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
        }}
      />

      <Stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          headerTitle: "Settings",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
});
