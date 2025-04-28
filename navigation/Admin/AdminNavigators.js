import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateIdea from "../../screens/Admin/service/CreateIdea";
import ItemsList from "../../screens/ItemsList";
import AdminHome from "./../../screens/AdminHome";
import ProductDetails from "./../../screens/product/ProductDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Text, View } from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomerListPage from "../../screens/CustomersListPage";
import CreatePerson from "../../screens/Admin/client/CreatePerson";
import ViewPerson from "../../screens/Admin/client/ViewPerson";
import EditPerson from "../../screens/Admin/client/EditPerson";
import SellerListPage from "../../screens/SellerListPage";
import CreateShop from "../../screens/Admin/client/CreateShop";
import ViewShop from "../../screens/Admin/client/ViewShop";
import EditShop from "../../screens/Admin/client/EditShop";
import EditProduct from "../../screens/product/EditProduct";
import ViewProduct from "../../screens/product/ViewProduct";
import CreateProduct from "../../screens/product/CreateProduct";
import ProductListPage from "../../screens/product/ProductListPage";
import IconButton from "../../UI/IconButton";
import Orders from "../../screens/Orders";
import Account from "../../screens/Account";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import colors from "./../../constants/colors";
import commonStyles from "./../../constants/commonStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { getFirebaseApp } from "./../../utils/firebaseHelper";
import { child, get, getDatabase, off, onValue, ref } from "firebase/database";

import { useEffect } from "react";
import {
  getProducts,
  getShops,
  getUsers,
} from "../../utils/Subscribefunctions/Admin";
import SettingsScreen from "../../screens/SettingsScreen";
import { getUserCarts } from "../../utils/Subscribefunctions/Client";

export const AdminNavigator = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);

  const { isUsersLoading } = useSelector((state) => state.user);
  const { shopsIsLoading } = useSelector((state) => state.shop);

  useEffect(() => {
    // console.log("Subscribing to firebase listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const usersRef = child(dbRef, "users");

    const refs = [usersRef];

    //   get Users -----------
    const userAction = getUsers(usersRef);
    dispatch(userAction);
    //   get Users end ------------

    //   get shops -----------
    const shopsRef = child(dbRef, "shops");
    refs.push(shopsRef);

    const shopAction = getShops(shopsRef, authData);
    dispatch(shopAction);
    //   get shops end ------------

    //   get Products----------
    const prouctsRef = child(dbRef, "products");
    refs.push(prouctsRef);

    const productAction = getProducts(prouctsRef);
    dispatch(productAction);
    //   get Products end ------------

    // get carts
    // get user Carts
    const cartIdsRef = child(dbRef, `carts/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserCartsAction = getUserCarts(dbRef, cartIdsRef, refs);
    dispatch(getUserCartsAction);

    return () => {
      // console.log("Unsubscribing firebase listeners");
      refs.forEach((ref) => off(ref));
    };
  }, [dispatch]);

  if (isUsersLoading || shopsIsLoading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName="AdminHomeOverView"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#333333" },
        tabBarActiveTintColor: "white",
        // tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="AdminHomeOverView"
        component={AdminHomeOverView}
        options={{
          title: "Home",
          tabBarLabel: "Home",

          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#12845f" },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Service"
        component={CustomerStacks}
        options={{
          title: "Service",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#12845f" },
          headerShown: false,
          tabBarLabel: "Service",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="miscellaneous-services"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomerStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="people-line" size={24} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Customers",

          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
        }}
      />

      <Tab.Screen
        name="SellerStacks"
        component={SellerStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="people-carry-box" size={24} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Shops",

          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          headerTitle: "Shops",
          headerTitleAlign: "left",
        }}
      />

      <Tab.Screen
        name="ProductStacks"
        component={ProductStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="product-hunt" size={24} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Products",

          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          headerTitle: "Products",
          headerTitleAlign: "left",
        }}
      />

      <Tab.Screen
        name="AccountOverView"
        component={AccountOverView}
        options={{
          tabBarLabel: "Profile",

          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AccountOverView = () => {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "Mohammed Rifkhan",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",

          headerLeft: () => {
            return (
              <IconButton
                name="add"
                size={24}
                color="red"
                backgroundColor={true}
              />
            );
          },
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

      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export const AdminHomeOverView = () => {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
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
            return <Ionicons name="search" color="white" size={24} />;
          },
        }}
      />
      <Stack.Screen
        name="CreateIdea"
        component={CreateIdea}
        options={{
          headerShown: true,

          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          // headerTransparent: true,

          // headerTintColor: 'white',
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
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
    </Stack.Navigator>
  );
};

export const CustomerStacks = () => {
  return (
    <Stack.Navigator initialRouteName="CustomerList">
      <Stack.Screen
        name="CustomerList"
        component={CustomerListPage}
        options={{
          headerShown: true,
          title: "",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="CreatePerson"
        component={CreatePerson}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ViewPerson"
        component={ViewPerson}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#12845f" },
        }}
      />

      <Stack.Screen
        name="EditPerson"
        component={EditPerson}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          // headerTransparent: true,

          // headerTintColor: 'white',
          // headerTitle: () => <SearchBar width="0.6" />,
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};

export const SellerStacks = () => {
  return (
    <Stack.Navigator initialRouteName="SellerListPage">
      <Stack.Screen
        name="SellerListPage"
        component={SellerListPage}
        options={{
          headerShown: true,
          title: "Shops",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="CreateShop"
        component={CreateShop}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ViewShop"
        component={ViewShop}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="EditShop"
        component={EditShop}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export const ProductStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ProductListPage">
      <Stack.Screen
        name="ProductListPage"
        component={ProductListPage}
        options={{
          headerShown: true,
          title: "Products",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

// import React, { useEffect, useCallback, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { ActivityIndicator, Text, View } from "react-native";
// import {
//   FontAwesome,
//   FontAwesome6,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { getFirebaseApp } from "../../utils/firebaseHelper";
// import { child, off, ref, getDatabase } from "firebase/database";
// import {
//   getProducts,
//   getShops,
//   getUsers,
// } from "../../utils/Subscribefunctions/Admin";
// import { getUserCarts } from "../../utils/Subscribefunctions/Client";
// import colors from "../../constants/colors";
// import commonStyles from "../../constants/commonStyles";
// import ProductDetails from "./../../screens/product/ProductDetails";

// // Import screens lazily
// const AdminHome = React.lazy(() => import("../../screens/AdminHome"));
// const CreateIdea = React.lazy(() => import("../../screens/CreateIdea"));
// const ItemsList = React.lazy(() => import("../../screens/ItemsList"));
// const CustomerListPage = React.lazy(() =>
//   import("../../screens/CustomersListPage")
// );
// const SellerListPage = React.lazy(() => import("../../screens/SellerListPage"));
// const CreateShop = React.lazy(() => import("../../screens/CreateShop"));
// const EditShop = React.lazy(() => import("../../screens/EditShop"));
// const ProductListPage = React.lazy(() =>
//   import("../../screens/product/ProductListPage")
// );
// const CreateProduct = React.lazy(() =>
//   import("../../screens/product/CreateProduct")
// );
// const ViewProduct = React.lazy(() =>
//   import("../../screens/product/ViewProduct")
// );
// const EditProduct = React.lazy(() =>
//   import("../../screens/product/EditProduct")
// );
// const Orders = React.lazy(() => import("../../screens/Orders"));
// const Account = React.lazy(() => import("../../screens/Account"));
// const SettingsScreen = React.lazy(() => import("../../screens/SettingsScreen"));

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export const AdminNavigator = () => {
//   const dispatch = useDispatch();
//   const { authData } = useSelector((state) => state.auth);
//   const { isUsersLoading } = useSelector((state) => state.user);
//   const { shopsIsLoading } = useSelector((state) => state.shop);

//   const [firebaseRefs, setFirebaseRefs] = useState([]);

//   useEffect(() => {
//     const app = getFirebaseApp();
//     const dbRef = ref(getDatabase(app));
//     const usersRef = child(dbRef, "users");
//     const shopsRef = child(dbRef, "shops");
//     const productsRef = child(dbRef, "products");
//     const cartIdsRef = child(dbRef, `carts/${authData?.uid}`);

//     setFirebaseRefs([usersRef, shopsRef, productsRef, cartIdsRef]);

//     const userAction = getUsers(usersRef);
//     dispatch(userAction);

//     const shopAction = getShops(shopsRef, authData);
//     dispatch(shopAction);

//     const productAction = getProducts(productsRef);
//     dispatch(productAction);

//     const getUserCartsAction = getUserCarts(getDatabase(app), cartIdsRef, [
//       usersRef,
//       shopsRef,
//       productsRef,
//       cartIdsRef,
//     ]);
//     dispatch(getUserCartsAction);

//     return () => {
//       // Cleanup: Unsubscribe from Firebase listeners
//       firebaseRefs.forEach((ref) => off(ref));
//     };
//   }, [dispatch, authData, firebaseRefs]);

//   if (isUsersLoading || shopsIsLoading) {
//     return (
//       <View style={commonStyles.center}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <Tab.Navigator
//       initialRouteName="AdminHomeOverView"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: "#333333" },
//         tabBarActiveTintColor: "white",
//         tabBarShowLabel: false,
//       }}
//     >
//       <Tab.Screen
//         name="AdminHomeOverView"
//         component={AdminHomeOverView}
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Customers"
//         component={CustomerStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome6 name="people-line" size={24} color={color} />
//           ),
//           headerShown: false,
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//         }}
//       />
//       <Tab.Screen
//         name="SellerStacks"
//         component={SellerStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome6 name="people-carry-box" size={24} color={color} />
//           ),
//           headerShown: false,
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//           headerTitle: "Shops",
//           headerTitleAlign: "left",
//         }}
//       />

//       <Tab.Screen
//         name="ProductStacks"
//         component={ProductStacks}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="product-hunt" size={24} color={color} />
//           ),
//           headerShown: false,
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//           headerTitle: "Products",
//           headerTitleAlign: "left",
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
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const AdminHomeOverView = () => (
//   <Stack.Navigator initialRouteName="AdminHome">
//     <Stack.Screen
//       name="AdminHome"
//       component={AdminHome}
//       options={{
//         headerShown: true,
//         headerTitle: "Smart",
//         headerLeft: () => (
//           <Text
//             style={{ color: "white", fontFamily: "monospace", fontSize: 30 }}
//           >
//             Smart
//           </Text>
//         ),
//         headerRight: () => <Ionicons name="search" color="white" size={24} />,
//       }}
//     />
//     <Stack.Screen name="CreateIdea" component={CreateIdea} />
//     <Stack.Screen name="ProductDetails" component={ProductDetails} />
//     <Stack.Screen name="ItemsList" component={ItemsList} />
//   </Stack.Navigator>
// );

// const AccountOverView = () => (
//   <Stack.Navigator initialRouteName="Account">
//     <Stack.Screen
//       name="Account"
//       component={Account}
//       options={{
//         headerShown: true,
//         headerTitle: "Mohammed Rifkhan",
//         headerStyle: { backgroundColor: "#8B008B" },
//         headerTintColor: "white",
//         headerLeft: () => <IconButton name="add" size={24} color="red" />,
//       }}
//     />
//     <Stack.Screen name="Orders" component={Orders} />
//     <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
//   </Stack.Navigator>
// );

// Similar changes to other stacks (CustomerStacks, SellerStacks, ProductStacks)
