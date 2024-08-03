import Home from "../../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductDetails from "./../../screens/ProductDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Text, View } from "react-native";
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
import SellerHome from "../../screens/SellerHome";
import AddItem from "../../screens/AddItem";
import EditItem from "../../screens/EditItem";
import Inbox from "../../screens/Inbox";
import ViewMessage from "../../screens/ViewMessage";
import ManageOrders from "../../screens/OrderListPage";
import ViewOrder from "../../screens/ViewOrder";
import ProductListPage from "../../screens/product/ProductListPage";
import CreateProduct from "../../screens/product/CreateProduct";
import ViewProduct from "../../screens/product/ViewProduct";
import EditProduct from "../../screens/product/EditProduct";
import OrderListPage from "../../screens/OrderListPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFirebaseApp } from "../../utils/firebaseHelper";
import { child, getDatabase, onValue, ref } from "firebase/database";

import { setNewShops } from "../../store/shopSlice";
import { setShopKey } from "../../store/authSlice";
import BuyNowModal from "../../screens/BuyNowModal";
import BuyNowBottomSheet from "../../components/BuyNowBottomSheet";
import SettingsScreen from "../../screens/SettingsScreen";
import {
  getOrdersOfaShop,
  getProductOfaShop,
  getUserCarts,
} from "../../utils/Subscribefunctions/Client";
import Cart from "../../screens/Cart";
import SearchScreen from "../../screens/SearchScreen";
import { getProducts, getShops } from "../../utils/Subscribefunctions/Admin";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SellerNavigators = () => {
  const dispatch = useDispatch();

  const { isUsersLoading } = useSelector((state) => state.user);
  const { shopsIsLoading } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Subscribing to firebase Client listeners");

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

    // get user Carts
    const cartIdsRef = child(dbRef, `carts/${authData?.uid}`);
    refs.push(cartIdsRef);
    const getUserCartsAction = getUserCarts(dbRef, cartIdsRef, refs);
    dispatch(getUserCartsAction);
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

const TabNavigators = () => {
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
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Home</Text>
          ),
          headerStyle: { backgroundColor: "#333333" },
          headerTitle: "",

          headerLeft: ({ size, color }) => {
            return (
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
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProductStacks"
        component={ProductStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="product-hunt" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Products</Text>
          ),
        }}
      />
      {/* <Tab.Screen
				name="SellerInboxStacks"
				component={SellerInboxStacks}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="mail" size={24} color={color} />
					)
				}}
			/> */}

      <Tab.Screen
        name="SellerOrderStacks"
        component={SellerOrderStacks}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome6 name="box-open" size={24} color={color} />;
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Orders</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="shopping-cart" size={size} color={color} />;
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Cart</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Deal"
        component={SellerOrderStacks}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="offer" size={size} color={color} />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Deals</Text>
          ),
        }}
      />
      <Tab.Screen
        name="AccountOverView"
        component={AccountOverView}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "gray" }}>Account</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const HomeOverView = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigators">
      <Stack.Group>
        <Stack.Screen
          name="TabNavigators"
          component={TabNavigators}
          options={{
            headerShown: false,
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

        {/* <Stack.Screen
					name="ButNowSheet"
					component={BuyNowBottomSheet}
					options={{
						headerShown: false,

						// headerTransparent: true,

						// headerTintColor: 'white',
						// headerTitle: () => <SearchBar width="0.6" />,
						headerTitleAlign: 'left'
					}}
				/> */}
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "containedModal" }}>
        {/* <Stack.Screen
					name="BuyNowModal"
					component={BuyNowModal}
					options={{
						headerShown: true,

						// headerTransparent: true,

						// headerTintColor: 'white',
						// headerTitle: () => <SearchBar width="0.6" />,
						headerTitleAlign: 'left'
					}}
				/> */}

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
      </Stack.Group>
    </Stack.Navigator>
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
    </Stack.Navigator>
  );
};

const SellerHomeStacks = () => {
  return (
    <Stack.Navigator initialRouteName="SellerHome">
      <Stack.Screen
        name="SellerHome"
        component={SellerHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "Create Item",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "Edit Item",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
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

const SellerInboxStacks = () => {
  return (
    <Stack.Navigator initialRouteName="Inbox">
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 24 },
        }}
      />

      <Stack.Screen
        name="ViewMessage"
        component={ViewMessage}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "Message for you",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

const SellerOrderStacks = () => {
  return (
    <Stack.Navigator initialRouteName="OrderListPage">
      <Stack.Screen
        name="OrderListPage"
        component={OrderListPage}
        options={{
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "white",
          headerShown: true,
          headerTitle: "Orders",
          headerTitleStyle: {
            width: "100%",
          },
        }}
      />

      <Stack.Screen
        name="ViewOrder"
        component={ViewOrder}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "white",
          headerTitle: "New Order",
          headerStyle: { backgroundColor: "#8B008B" },
          headerTintColor: "white",
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
