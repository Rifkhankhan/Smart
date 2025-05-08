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
import Account from "../../screens/Common/Account";
import Orders from "../../screens/Orders";
import IconButton from "../../UI/IconButton";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SettingsScreen from "../../screens/Common/SettingsScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const HeaderLeftButton = React.memo((navigation) => {
  return <IconButton name="add" size={24} color="red" backgroundColor={true} />;
});

export const AccountStacks = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
      <Stack.Screen
        name="Account"
        component={Account}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Account Screen",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
          headerLeft: () => <IconButton name="add" size={24} color="red" />,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 12 }}
              onPress={() => {
                console.log("Pressed Settings");
                navigation.navigate("SettingsScreen");
              }}
            >
              <AntDesign name="setting" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: true,
          headerTitle: "My Orders",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
