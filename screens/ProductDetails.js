import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import { Asset } from "expo-asset";

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import HomeCard from "./../components/HomeCard";
import { TouchableOpacity } from "react-native";
import Card from "./../components/Card";
import { useDispatch, useSelector } from "react-redux";
import CardContainer from "../components/CardContainer";
import shop3Image from "./../assets/images/shop3.jpg";

import BuyNowBottomSheet from "../components/BuyNowBottomSheet";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import {
  addIntoWish,
  createCart,
  deleteWishItem,
  placeOrder,
} from "../utils/actions/cartActions";
import { checkCartExistance, removeWishItem } from "../store/cartSlice";
import { useRoute } from "@react-navigation/native";
import ProductScreen from "./product/ProductImageCarousel";

// Memoize the Card component
const MemoizedCard = memo(({ product }) => (
  <HomeCard key={product.productKey} product={product} />
));
const ProductDetails = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { product } = route?.params;
  const { products } = useSelector((state) => state.product);
  const { shops } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);
  const { carts, wishList } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  

  const shop = shops?.filter((shop) => shop.shopKey === product.shopKey)[0];

  const productsInSameStore = products
    ?.filter((pro) => pro.shopKey === product?.shopKey)
    .filter((pro) => pro.productKey !== product.productKey);

  const renderItem = ({ item }) => {
    return <MemoizedCard key={item.productKey} product={item} />;
  };

  const ShoppingCart = () => (
    <Pressable
      onPress={() => navigation.navigate("CartScreen")}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 0,
      }}
    >
      <AntDesign
        name="shoppingcart"
        size={30}
        color="black"
        style={{ position: "relative" }}
      />

      <View
        style={{
          top: 0,
          right: 0,
          position: "absolute",
          borderRadius: 50,
          width: 20,
          height: 20,
          backgroundColor: "red",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          {carts.length}
        </Text>
      </View>
    </Pressable>
  );

  const headerLeft = () => (
    <>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginRight: "auto" }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
    </>
  );

  const wishHandler = useCallback(async () => {
    setLoading(true);
    const itemExist = await wishList?.find(
      (pro) => pro.productKey === product?.productKey
    );

    if (!!itemExist) {
      console.log("yes");

      const data = {
        uid: authData?.uid,
        wishKey: itemExist?.wishKey,
      };

      const action = await deleteWishItem(data);
      dispatch(action);
      setLoading(false);
    } else {
      console.log("no");

      const data = {
        uid: authData?.uid,
        productKey: product?.productKey,
      };

      await addIntoWish(data);

      setLoading(false);
    }
  }, [wishList, loading]);

  useEffect(() => {
    const headerRight = () => (
      <>
        {!loading ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 10, paddingVertical: 0 }}
            onPress={wishHandler}
          >
            <View>
              {wishList.some(
                (prod) => prod.productKey === product.productKey
              ) ? (
                <AntDesign name="heart" size={30} color="red" />
              ) : (
                <AntDesign name="hearto" size={30} color="black" />
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
        {/* <Pressable style={{ paddingHorizontal: 10, paddingVertical: 0 }}>
          <AntDesign name="search1" size={30} color="black" />
        </Pressable> */}
        <ShoppingCart carts={carts} />
      </>
    );

    navigation.setOptions({
      headerRight,
    });
  }, [carts, navigation, loading, wishList]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerTitle: "",
      headerShown: true,
    });
  }, [route?.params]);

  const addToCartHandler = useCallback(async () => {
    const data = {
      productKey: product?.productKey,
      uid: authData?.uid,
    };

    console.log(carts);

    const cartExists = carts.some(
      (cart) => cart.productKey === data.productKey
    );

    if (cartExists) return;

    if (!cartExists) {
      await createCart(data);
    }
  }, [dispatch, product?.productKey, authData?.uid, carts]);

  const CustomBottomBar = () => {
    return (
      <View style={styles.container}>
        <View style={styles.leftBtnsContainer}>
          <View style={styles.storeBtn}>
            <FontAwesome5 name="store" size={18} color="red" />
            <Text>Store</Text>
          </View>

          <View style={styles.chatBtn}>
            <MaterialIcons name="chat" size={20} color="red" />
            <Text>Chat</Text>
          </View>
        </View>
        <View style={styles.rightBtnsContainer}>
          <Pressable
            style={styles.buyNowbutton}
            onPress={() => setOpen((prev) => !prev)}
          >
            <Text style={styles.buttonText}>Buy now</Text>
          </Pressable>

          <Pressable style={styles.addToCardbutton} onPress={addToCartHandler}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
          <ProductScreen
            productImages={
              product?.images?.length > 0
                ? product.images
                : [{ uri: "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png" }]
            }
          />

        <View style={styles.cardComponent}>
          <Text style={styles.name}>{product?.name}</Text>
          {/* price */}
          <View style={styles.price}>
            <Text style={styles.newPrice}>Rs.{product?.price}</Text>
            <Text style={styles.oldPrice}>Rs.{product?.oPrice}</Text>
          </View>
          {/* stars */}
          <View style={styles.startContainer}>
            <Text style={styles.icon}>
              <Ionicons name="star" color="red" size={18} />
            </Text>
            <Text style={styles.reviewRate}>5/5 (5)</Text>
          </View>
          {/* options */}
          <View style={styles.shareOptions}>
            <View style={styles.wishContainer}>
              <Ionicons name="heart" color="red" size={20} />
              <Text style={styles.text}>Add to Wishlist(5)</Text>
            </View>
            <View style={styles.shareContainer}>
              <Ionicons name="share" color="red" size={20} />
              <Text style={styles.text1}>Share Product</Text>
            </View>
          </View>

          {/* shop */}
          <View style={styles.shopContainer}>
            <Image
              source={shop3Image}
              style={styles.shopImage}
            />
            <Text style={styles.shopName}>{shop?.name}</Text>
          </View>
        </View>

        {/* Rating & reviews */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingHeader}>Rating & Reviews</Text>
          {/* Rating */}

          <View style={styles.ratingInnerContainer}>
            <Text style={styles.ratePoints}>5.0</Text>
            <Text style={styles.ratingStars}>
              <Ionicons name="star" color="#FF8C00" size={24} />
              <Ionicons name="star" color="#FF8C00" size={24} />
              <Ionicons name="star" color="#FF8C00" size={24} />
              <Ionicons name="star" color="#FF8C00" size={24} />
              <Ionicons name="star" color="#FF8C00" size={24} />
            </Text>
            <Text style={styles.ratingText}>Excellent</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Ionicons name="camera" size={20} color="black" />
              <Text style={styles.boxText}>Photos(5)</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText1}>View all(15)</Text>
            </View>
          </View>
        </View>

        {/* Questions */}

        <View style={styles.questionContainer}>
          <Text style={styles.questionHeader}>
            Questions about this Products(0)
          </Text>

          <View style={styles.questionNoMassageContainer}>
            <Text style={styles.questionNoMassage}>
              There is no questions yet ask the seller now and their will show
              here
            </Text>
          </View>
          <Text style={styles.questionText}>Ask Questions</Text>
        </View>

        {/* follow and visit store */}
        <View style={styles.followAndVisitContainer}>
          <View style={styles.followContainer}>
            <Ionicons name="add" size={22} color="#FF8C00" />
            <Text style={styles.followAndVisitContainerText}>Follow</Text>
          </View>
          <View style={styles.visitStoreContainer}>
            <FontAwesome5 name="store" size={22} color="#FF8C00" />
            <Text style={styles.followAndVisitContainerText}>Visit Store</Text>
          </View>
        </View>
      </>
    );
  };

  const placeOrderHandler = async (data) => {
    await placeOrder(data);
    setOpen(false);
  };
  return (
    <>
      <View style={{ position: "relative" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={() => (
            <View style={{ marginBottom: 50 }}>
              {/* from the same stores products */}
              <View style={styles.sameStoreContainer}>
                <Text style={styles.sameStoreHeader}>From the same store</Text>
                <FlatList
                  data={productsInSameStore}
                  keyExtractor={(item) => {
                    return item.productKey;
                  }}
                  renderItem={renderItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {/* similar products */}
              <View style={styles.similarProductsContainer}>
                <Text style={styles.similarProductsHeader}>
                  People who Viewed This Item Also Viewed
                </Text>
                <View style={styles.cards}>
                  <CardContainer header="" />
                </View>
              </View>
            </View>
          )}
        />

        {/* bottomSheet */}

        {open && (
          <BuyNowBottomSheet
            product={product}
            open={open}
            setOpen={setOpen}
            placeOrderHandler={placeOrderHandler}
          />
        )}

        {!open && <CustomBottomBar />}

        {/* buttonBar */}
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  loadinContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  image: {
    width: "100%",
    height: 300,
  },
  cardComponent: {
    backgroundColor: "white",
    borderRadius: 4,
    margin: 8,
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: "500",
    paddingRight: 4,
    color: "red",
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  startContainer: {
    flexDirection: "row",
    // marginBottom:8,
    paddingVertical: 16,
    borderTopWidth: 0.01,
    borderColor: "lightblue",
    alignItems: "center",
  },
  icon: {
    paddingRight: 8,
  },
  reviewRate: {
    fontSize: 16,
  },
  shareOptions: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    borderTopWidth: 0.01,
    borderTopColor: "lightblue",
  },
  wishContainer: {
    width: "50%",
    flexDirection: "row",
    paddingVertical: 16,
  },
  shareContainer: {
    width: "50%",

    flexDirection: "row",
    paddingVertical: 16,

    borderColor: "lightblue",

    borderTopWidth: 0.01,
    paddingLeft: 8,
  },
  text: {
    fontSize: 16,

    paddingHorizontal: 12,
    borderRightColor: "lightblue",
    borderRightWidth: 1,
  },
  text1: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
  shopContainer: {
    flexDirection: "row",
  },
  shopImage: {
    width: 22,
    height: 22,
    borderRadius: 50,
    marginRight: 10,
  },
  shopName: {
    fontWeight: "700",
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "column",
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 4,
  },
  ratingHeader: {
    fontSize: 20,
    fontWeight: "400",
    paddingBottom: 16,
  },
  ratingInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  ratePoints: {
    fontSize: 24,
    fontWeight: "500",
    paddingRight: 8,
  },
  ratingStars: {
    flexDirection: "row",
    paddingRight: 8,
  },
  ratingText: {
    fontSize: 18,
    padding: 4,
    backgroundColor: "#FF8C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "white",
    borderRadius: 4,
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between",
  },
  box: {
    width: "45%",
    flexDirection: "row",
    backgroundColor: "lightgray",
    // margin: 4,
    padding: 4,
    borderRadius: 4,
    alignItems: "center",
  },
  boxText: {
    paddingLeft: 4,
  },
  boxText1: {
    padding: 2,
  },
  questionContainer: {
    flexDirection: "column",
    // alignItems: 'center',
    // marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 4,
    // padding: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  questionHeader: {
    textAlign: "left",
    fontSize: 18,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  questionNoMassageContainer: {
    alignItems: "center",
    padding: 16,
  },
  questionNoMassage: {
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
  questionText: {
    color: "#FF8C00",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    borderTopColor: "lightblue",
    borderColor: "lightblue",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  followAndVisitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "white",
    marginHorizontal: 8,
    paddingVertical: 16,
  },
  followContainer: {
    width: "35%",
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FF8C00",
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  visitStoreContainer: {
    width: "35%",
    justifyContent: "center",

    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FF8C00",
    padding: 4,
    alignItems: "center",
    marginHorizontal: 4,
  },
  followAndVisitContainerText: {
    paddingLeft: 6,
  },
  sameStoreContainer: {
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: 8,
    padding: 4,
  },
  sameStoreHeader: {
    paddingVertical: 8,
    paddingLeft: 4,
    fontSize: 20,
    fontWeight: "400",
  },
  similarProductsContainer: {
    flexDirection: "column",
  },
  similarProductsHeader: {
    padding: 8,
    fontSize: 19,
    fontWeight: "400",
    textAlign: "center",
    color: "red",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  container: {
    flexDirection: "row",

    alignItems: "center",
    elevation: 20,
    paddingVertical: 6,
    paddingHorizontal: 2,
    backgroundColor: "white",
    borderTopColor: "aqua",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  leftBtnsContainer: {
    flex: 1,
    flexDirection: "row",
    marginRight: "auto",
    justifyContent: "space-around",
  },

  storeBtn: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  chatBtn: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    borderLeftWidth: 0.5,
    borderColor: "aqua",
  },

  addToCardbutton: {
    padding: 12,
    elevation: 4,
    marginLeft: "auto",
    marginRight: 10,
    borderWidth: 0,

    borderRadius: 4,
    backgroundColor: "#ff5400",
  },
  rightBtnsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },

  buyNowbutton: {
    padding: 12,
    paddingHorizontal: 18,
    elevation: 4,
    borderWidth: 0,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: "#ffca00",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    paddingHorizontal: 8,
  },

  priceContainer: {
    marginLeft: 10,
    marginRight: "auto",
    flexDirection: "row",
  },
  priceContainerTotal: {
    fontSize: 20,
  },
});
