import React, { useEffect } from "react";

import Home from "../../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import IconButton from "../../UI/IconButton";
import Orders from "../../screens/Orders";
import Account from "../../screens/Account";
import SellerHome from "../../screens/Client/SellerHome";
import AddItem from "../../screens/AddItem";
import ProductDetails from "./../../screens/product/ProductDetails";
import EditItem from "../../screens/EditItem";

import Inbox from "../../screens/Inbox";
// import ViewMessage from "../../screens/ViewMessage";
import ManageOrders from "../../screens/OrderListPage";
import ViewOrder from "../../screens/ViewOrder";
import ProductListPage from "../../screens/product/ProductListPage";
import CreateProduct from "../../screens/product/CreateProduct";
import ViewProduct from "../../screens/product/ViewProduct";
import EditProduct from "../../screens/product/EditProduct";
import OrderListPage from "../../screens/OrderListPage";
import { useDispatch, useSelector } from "react-redux";

import SettingsScreen from "../../screens/SettingsScreen";

import Cart from "../../screens/Cart";
import SearchScreen from "../../screens/SearchScreen";
import SearchedProductsScreen from "../../screens/SearchedProductsScreen";
import ViewService from "../../screens/Services/ViewService";
import ServiceListPage from "../../screens/Services/ServiceListPage";
import ViewServicesByCategory from "../../screens/Services/ViewServicesByCategory";
import { getFirebaseApp } from "../../utils/firebaseHelper";
import { child, getDatabase, onValue, ref, off, get } from "firebase/database";
import { resetOrders } from "../../store/orderSlice";
import {
  getOrdersOfaShop,
  getOrdersOfaUser,
  getUserCarts,
  getUserWishes,
} from "../../utils/Subscribefunctions/Client";
import { ActivityIndicator, View } from "react-native";
import colors from "../../constants/colors";
import commonStyles from "../../constants/commonStyles";
import { getProducts, getShops } from "../../utils/Subscribefunctions/Admin";

// Memoized Screen Components
// const AddItem = React.memo(() => <AddItemScreen />);
// const EditItem = React.memo(() => <EditItemScreen />);
// const ProductDetails = React.memo(() => <ProductDetailsScreen />);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SellerNavigators = () => {
  const dispatch = useDispatch();

  const { isUsersLoading } = useSelector((state) => state.user);
  const { shopsIsLoading } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log("Subscribing to firebase Client listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const refs = [];

    // wee need to get all the shops and products

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

    // get orders id of a shop
    const shopordersRef = child(dbRef, `shopsOrders/${authData?.shopKey}`);

    refs.push(shopordersRef);

    onValue(shopordersRef, (shopOrdersSnapShot) => {
      const ordersObjects = shopOrdersSnapShot.val() || {};

      dispatch(resetOrders());
      Object.entries(ordersObjects).forEach(([key, orderKey]) => {
        const orderRef = child(dbRef, `orders/${orderKey}`);

        refs.push(orderRef);
        // get orders for the shop
        const orderFetchAction = getOrdersOfaShop(
          dbRef,
          orderRef,
          orderKey,
          refs,
          key
        );

        dispatch(orderFetchAction);
      });
    });

    // get user's orders

    const orderIdsRef = child(dbRef, `usersOrders/${authData?.uid}`);
    refs.push(orderIdsRef);
    const getUserOrdersAction = getOrdersOfaUser(dbRef, orderIdsRef, refs);
    dispatch(getUserOrdersAction);

    // get user Carts
    const cartIdsRef = child(dbRef, `carts/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserCartsAction = getUserCarts(dbRef, cartIdsRef, refs);
    dispatch(getUserCartsAction);

    // get user wishLists
    const wishIdsRef = child(dbRef, `wishes/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserwishListsAction = getUserWishes(dbRef, wishIdsRef, refs);
    dispatch(getUserwishListsAction);

    // Cleanup all listeners to prevent memory leaks
    return () => {
      off(dbRef); // Remove all listeners
    };
  }, [authData]);

  if (isUsersLoading || shopsIsLoading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }
  return <HomeOverView />;
};

const getTabBarLabel = (focused, label) => (
  <Text style={{ color: focused ? "white" : "gray" }}>{label}</Text>
);

const getTabBarIcon = (IconComponent, name, size, color) => (
  <IconComponent name={name} size={size} color={color} />
);

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

export const TabNavigators = React.memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#333333" },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
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

export const HomeOverView = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName="TabNavigators">
      <Stack.Group>
        <Stack.Screen
          name="TabNavigators"
          component={TabNavigators}
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
const HeaderLeftButton = React.memo(() => {
  return <IconButton name="add" size={24} color="red" backgroundColor={true} />;
});
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
    </Stack.Navigator>
  );
});

// const SellerHomeStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="SellerHome">
//       <Stack.Screen
//         name="SellerHome"
//         component={SellerHome}
//         options={{
//           headerShown: false,
//         }}
//       />

//       <Stack.Screen
//         name="AddItem"
//         component={AddItem}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "Create Item",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//       <Stack.Screen
//         name="EditItem"
//         component={EditItem}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "Edit Item",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//       <Stack.Screen
//         name="ProductDetails"
//         component={ProductDetails}
//         options={{
//           headerShown: false,
//           // headerTransparent: true,

//           // headerTintColor: 'white',
//           // headerTitle: () => <SearchBar width="0.6" />,
//           headerTitleAlign: "left",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
export const SellerHomeStacks = React.memo(() => {
  // Memoized options for screens
  const getAddItemOptions = {
    headerShown: true,
    headerTitle: "Create Item",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };

  const getEditItemOptions = {
    headerShown: true,
    headerTitle: "Edit Item",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator initialRouteName="SellerHome">
      <Stack.Screen
        name="SellerHome"
        component={SellerHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={getAddItemOptions}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={getEditItemOptions}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
});

// Memoized Screen Components
// const Inbox = React.memo(() => <Inbox />);
const ViewMessage = React.memo(() => <ViewMessage />);

// const SellerInboxStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="Inbox">
//       <Stack.Screen
//         name="Inbox"
//         component={Inbox}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//           headerTitleStyle: { fontSize: 24 },
//         }}
//       />

//       <Stack.Screen
//         name="ViewMessage"
//         component={ViewMessage}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "Message for you",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
export const SellerInboxStacks = React.memo(() => {
  // Memoized options for screens
  const getInboxOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: "#333333" },
    headerTintColor: "white",
    headerTitleStyle: { fontSize: 24 },
  };

  const getViewMessageOptions = {
    headerShown: true,
    headerTitle: "Message for you",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };
  return (
    <Stack.Navigator initialRouteName="Inbox">
      <Stack.Screen
        name="Inbox"
        component={InboxScreen}
        options={getInboxOptions}
      />
      <Stack.Screen
        name="ViewMessage"
        component={ViewMessageScreen}
        options={getViewMessageOptions}
      />
    </Stack.Navigator>
  );
});

// Memoized Screen Components
// const OrderListPageScreen = React.memo(() => <OrderListPage />);
// const ViewOrderScreen = React.memo(() => <ViewOrder />);

// const SellerOrderStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="OrderListPage">
//       <Stack.Screen
//         name="OrderListPage"
//         component={OrderListPage}
//         options={{
//           headerStyle: { backgroundColor: "#333333" },
//           headerTintColor: "white",
//           headerShown: true,
//           headerTitle: "Orders",
//           headerTitleStyle: {
//             width: "100%",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="ViewOrder"
//         component={ViewOrder}
//         options={{
//           headerShown: true,
//           tabBarActiveTintColor: "white",
//           headerTitle: "New Order",
//           headerStyle: { backgroundColor: "#8B008B" },
//           headerTintColor: "white",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
export const SellerOrderStacks = React.memo(() => {
  // Memoized options for screens
  const getOrderListPageOptions = {
    headerStyle: { backgroundColor: "#333333" },
    headerTintColor: "white",
    headerShown: true,
    headerTitle: "Orders",
    headerTitleStyle: {
      width: "100%",
    },
  };

  const getViewOrderOptions = {
    headerShown: true,
    headerTitle: "New Order",
    headerStyle: { backgroundColor: "#8B008B" },
    headerTintColor: "white",
  };
  return (
    <Stack.Navigator initialRouteName="OrderListPage">
      <Stack.Screen
        name="OrderListPage"
        component={OrderListPage}
        options={getOrderListPageOptions}
      />
      <Stack.Screen
        name="ViewOrder"
        component={ViewOrder}
        options={getViewOrderOptions}
      />
    </Stack.Navigator>
  );
});

// export const ProductStacks = () => {
//   return (
//     <Stack.Navigator initialRouteName="ProductListPage">
//       <Stack.Screen
//         name="ProductListPage"
//         component={ProductListPage}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="CreateProduct"
//         component={CreateProduct}
//         options={{
//           headerShown: true,
//         }}
//       />

//       <Stack.Screen
//         name="ViewProduct"
//         component={ViewProduct}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: "black" },
//           headerTintColor: "white",
//         }}
//       />

//       <Stack.Screen
//         name="EditProduct"
//         component={EditProduct}
//         options={{
//           headerShown: true,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// Memoized Screen Components
// const ProductListPageScreen = React.memo(() => <ProductListPage />);
// const CreateProductScreen = React.memo(() => <CreateProduct />);
// const ViewProductScreen = React.memo(() => <ViewProduct />);
// const EditProductScreen = React.memo(() => <EditProduct />);

export const ProductStacks = React.memo(() => {
  // / Memoized options for screens
  const getProductListPageOptions = {
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home" size={size} color={color} />
    ),
  };

  const getViewProductOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator initialRouteName="ProductListPage">
      <Stack.Screen
        name="ProductListPage"
        component={ProductListPage}
        options={getProductListPageOptions}
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
        options={getViewProductOptions}
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
});
