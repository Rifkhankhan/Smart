import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Image } from "react-native";

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import HomeCard from "./../../components/HomeCard";
import { TouchableOpacity } from "react-native";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import CardContainer from "../../components/CardContainer";
import shop3Image from "./../../assets/images/shop3.jpg";

import BuyNowBottomSheet from "../../components/BuyNowBottomSheet";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import {
  addIntoWish,
  createCart,
  deleteWishItem,
  placeOrder,
} from "../../utils/actions/cartActions";

import ProductScreen from "./ProductImageCarousel";
import defaultImage from "./../../assets/images/man.png";
import {
  getRatingText,
  StartRating,
} from "../../components/Common/StartRating";
import { SafeAreaView } from "react-native";
import plusImage from "./../../assets/images/plus.png";
import CategoryTabs from "../../navigation/Comman/TopTabNavigator";
import PagerView from "react-native-pager-view";

const ProductDetails = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { product } = route?.params;
  const { products } = useSelector((state) => state.product);
  const { shops } = useSelector((state) => state.shop);
  const { authData } = useSelector((state) => state.auth);
  const { carts, wishList } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const flatListRef = React.useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);
  const tabRefs = useRef([]);
  const screenHeight = Dimensions.get("window").height;
  const [pagerHeight, setPagerHeight] = useState(screenHeight);

  console.log(product);

  const shop = shops?.filter((shop) => shop.shopKey === product?.shopKey)[0];

  const productsInSameStore = products
    ?.filter((pro) => pro.shopKey === product?.shopKey)
    .filter((pro) => pro.productKey !== product?.productKey);

  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    if (categories?.length) {
      tabRefs.current = categories.map(() => React.createRef());
    }
  }, [categories]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  };

  const handleSwipePageChange = (e) => {
    const index = e.nativeEvent.position;
    setActiveTab(index);
  };

  // Memoize the Card component
  const MemoizedCard = memo(({ product }) => (
    <HomeCard key={product?.productKey} product={product || {}} />
  ));

  const renderItem = ({ item }) => {
    return <MemoizedCard key={item?.productKey} product={item} />;
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
      // console.log("yes");

      const data = {
        uid: authData?.uid,
        wishKey: itemExist?.wishKey,
      };

      const action = await deleteWishItem(data);
      dispatch(action);
      setLoading(false);
    } else {
      // console.log("no");

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
                (prod) => prod.productKey === product?.productKey
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

    // console.log(carts);

    const cartExists = carts.some(
      (cart) => cart.productKey === data.productKey
    );

    if (cartExists) return;

    if (!cartExists) {
      await createCart(data);
    }
  }, [dispatch, product?.productKey, authData?.uid, carts]);

  const handleBuyNowPress = () => {
    bottomSheetRef.current?.expand(); // show the bottom sheet
  };
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
          <Pressable style={styles.buyNowbutton} onPress={handleBuyNowPress}>
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
    return <>{/* Rating & reviews */}</>;
  };

  const placeOrderHandler = async (data) => {
    await placeOrder(data);
    setOpen(false);
  };

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "Great service, very satisfied!",
      rating: 4.5,
      image: plusImage, // sample image
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Good experience overall, but room for improvement.",
      rating: 4.0,
      image: null,
    },
  ];

  const DATA = [
    {
      key: "ProductScreen",
      render: () => (
        <ProductScreen
          productImages={
            product?.images?.length > 0 ? product?.images : [defaultImage]
          }
        />
      ),
    },
    {
      key: "ProductDetails",
      render: () => (
        <ProductDetailsComponent
          product={product}
          shop={shop}
          styles={styles}
        />
      ),
    },
    {
      key: "Rating And Reviews",
      render: () => (
        <RatingAndReviews
          reviews={reviews}
          product={product}
          navigation={navigation}
          styles={styles}
        />
      ),
    },
    {
      key: "Questions",
      render: () => <Questions styles={styles} />,
    },
    {
      key: "Follow Visit Store",
      render: () => <FollowVisitStore styles={styles} />,
    },

    {
      key: "From The Same store",
      render: () => (
        <FromSameStore
          product={product}
          products={productsInSameStore}
          styles={styles}
        />
      ),
    },
    {
      key: "tabs",
      render: () => (
        <CategoryTabs
          activeTab={activeTab}
          setActiveTab={handleTabPress}
          categories={categories}
          styles={styles}
        />
      ),
    },

    {
      key: "pager",
      render: () => (
        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={handleSwipePageChange}
          style={{
            height: pagerHeight,
            marginTop: 5,
          }}
        >
          {categories.map((category, index) => (
            <View key={index}>
              <View
                onLayout={(event) => {
                  if (index === activeTab) {
                    const { height } = event.nativeEvent.layout;

                    if (height > 0 && height !== pagerHeight) {
                      setPagerHeight(height);
                    }
                  }
                }}
              >
                {/* similar products */}
                <CardContainer category={category} />
              </View>
            </View>
          ))}
        </PagerView>
      ),
    },
  ];
  return (
    <>
      <SafeAreaView
        style={{ position: "relative", flex: 1, paddingBottom: 50 }}
      >
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          data={DATA}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => item.render()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setShowScrollTop(offsetY > 200);
              },
            }
          )}
          stickyHeaderIndices={[6]} // 'tabs' is index 5
          // scrollEventThrottle={16}
        />

        <CustomBottomBar />

        {/* buttonBar */}
      </SafeAreaView>
      {/* bottomSheet */}

      {/* {open && ( */}
      <BuyNowBottomSheet
        product={product}
        bottomSheetRef={bottomSheetRef}
        placeOrderHandler={placeOrderHandler}
      />
      {/* )} */}
    </>
  );
};

export default ProductDetails;

// import React, { useCallback, useEffect, useState, useMemo, } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   FlatList,
//   Pressable,
//   ActivityIndicator,
//   Image,
//   StyleSheet
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { AntDesign, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { addIntoWish, createCart, deleteWishItem } from "../utils/actions/cartActions";
// import { checkCartExistance } from "../store/cartSlice";
// import ProductScreen from "./product/ProductImageCarousel";
// import defaultImage from './../assets/images/man.png';

// const MemoizedCard = React.memo(({ product }) => (
//   <HomeCard key={product.productKey} product={product} />
// ));

// export const ProductDetails = ({ route, navigation }) => {
//   const { product } = route?.params;
//   const { products } = useSelector((state) => state.product);
//   const { shops } = useSelector((state) => state.shop);
//   const { authData } = useSelector((state) => state.auth);
//   const { carts, wishList } = useSelector((state) => state.cart);
//   const [loading, setLoading] = useState(false);

//   const shop = useMemo(() => {
//     return shops?.find((shop) => shop.shopKey === product.shopKey);
//   }, [shops, product.shopKey]);

//   const productsInSameStore = useMemo(() => {
//     return products?.filter((pro) => pro.shopKey === product?.shopKey && pro.productKey !== product.productKey);
//   }, [products, product?.shopKey, product.productKey]);

//   const dispatch = useDispatch();

//   const wishHandler = useCallback(async () => {
//     setLoading(true);
//     const itemExist = wishList?.find((pro) => pro.productKey === product?.productKey);
//     if (itemExist) {
//       await dispatch(deleteWishItem({ uid: authData?.uid, wishKey: itemExist?.wishKey }));
//     } else {
//       await dispatch(addIntoWish({ uid: authData?.uid, productKey: product?.productKey }));
//     }
//     setLoading(false);
//   }, [dispatch, wishList, product?.productKey, authData?.uid]);

//   const addToCartHandler = useCallback(async () => {
//     const data = { productKey: product?.productKey, uid: authData?.uid };
//     if (!carts.some((cart) => cart.productKey === data.productKey)) {
//       await dispatch(createCart(data));
//     }
//   }, [dispatch, product?.productKey, authData?.uid, carts]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <Pressable onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={24} color="black" />
//         </Pressable>
//       ),
//       headerRight: () => (
//         <Pressable onPress={wishHandler} style={{ paddingHorizontal: 10 }}>
//           {!loading ? (
//             <AntDesign
//               name={wishList.some((prod) => prod.productKey === product.productKey) ? "heart" : "hearto"}
//               size={30}
//               color={wishList.some((prod) => prod.productKey === product.productKey) ? "red" : "black"}
//             />
//           ) : (
//             <ActivityIndicator size="small" color="#0000ff" />
//           )}
//         </Pressable>
//       ),
//     });
//   }, [navigation, wishList, loading]);

//   const CustomBottomBar = () => (
//     <View style={styles.container}>
//       <View style={styles.leftBtnsContainer}>
//         <View style={styles.storeBtn}>
//           <FontAwesome5 name="store" size={18} color="red" />
//           <Text>Store</Text>
//         </View>
//         <View style={styles.chatBtn}>
//           <MaterialIcons name="chat" size={20} color="red" />
//           <Text>Chat</Text>
//         </View>
//       </View>
//       <View style={styles.rightBtnsContainer}>
//         <Pressable style={styles.buyNowbutton} onPress={() => setOpen((prev) => !prev)}>
//           <Text style={styles.buttonText}>Buy now</Text>
//         </Pressable>
//         <Pressable style={styles.addToCardbutton} onPress={addToCartHandler}>
//           <Text style={styles.buttonText}>Add to cart</Text>
//         </Pressable>
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView>
//       <ProductScreen productImages={product?.images?.length > 0 ? product.images : [defaultImage]} />
//       <View style={styles.cardComponent}>
//         <Text style={styles.name}>{product?.name}</Text>
//         <View style={styles.price}>
//           <Text style={styles.newPrice}>Rs.{product?.price}</Text>
//           <Text style={styles.oldPrice}>Rs.{product?.oPrice}</Text>
//         </View>
//         <View style={styles.startContainer}>
//           <Ionicons name="star" color="red" size={18} />
//           <Text style={styles.reviewRate}>5/5 (5)</Text>
//         </View>
//         <View style={styles.shareOptions}>
//           <View style={styles.wishContainer}>
//             <Ionicons name="heart" color="red" size={20} />
//             <Text>Add to Wishlist(5)</Text>
//           </View>
//           <View style={styles.shareContainer}>
//             <Ionicons name="share" color="red" size={20} />
//             <Text>Share Product</Text>
//           </View>
//         </View>
//         <View style={styles.shopContainer}>
//           <Image source={shop?.image || defaultImage} style={styles.shopImage} />
//           <Text style={styles.shopName}>{shop?.name}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={productsInSameStore}
//         renderItem={({ item }) => <MemoizedCard product={item} />}
//         keyExtractor={(item) => item.productKey}
//       />

//       <CustomBottomBar />
//     </ScrollView>
//   );
// };

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
    zIndex: 0,
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
  reviewsContainer: {
    marginTop: 16,
  },
  reviewItem: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
    backgroundColor: "#f5f5dc",
    borderRadius: 5,
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 5,
  },
  reviewerName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  reviewRatingPoint: {
    fontSize: 22,
    marginRight: 3,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
  },
  reviewImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginLeft: 10,
  },
  reviewRate: {
    fontSize: 16,
  },
  loadMoreWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: "#1E90FF",
    borderRadius: 24,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  loadMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

const MemoizedCard = memo(({ product }) => <HomeCard product={product} />);
const FromSameStore = ({ product, products, styles }) => {
  const renderItem = useCallback(
    ({ item }) => <MemoizedCard product={item} />,
    []
  );

  return (
    <View style={{ marginBottom: 5 }}>
      {/* from the same stores products */}
      <View style={styles.sameStoreContainer}>
        <Text style={styles.sameStoreHeader}>From the same provider</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => {
            return item.productKey;
          }}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const FollowVisitStore = ({ styles }) => (
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
);

const Questions = ({ styles }) => (
  <View style={styles.questionContainer}>
    <Text style={styles.questionHeader}>Questions about this Products(0)</Text>

    <View style={styles.questionNoMassageContainer}>
      <Text style={styles.questionNoMassage}>
        There is no questions yet ask the seller now and their will show here
      </Text>
    </View>
    <Text style={styles.questionText}>Ask Questions</Text>
  </View>
);

const RatingAndReviews = ({ reviews, product, navigation, styles }) => (
  <>
    {reviews.length > 0 && (
      <View style={styles.ratingContainer}>
        {/* Rating & reviews */}
        <Text style={styles.ratingHeader}>Rating & Reviews</Text>

        {/* Rating */}
        <View style={styles.ratingInnerContainer}>
          <Text style={styles.ratePoints}>{product?.ratings}</Text>
          <View style={styles.ratingStars}>
            <Text>{StartRating(product?.ratings || 5)}</Text>
          </View>
          <Text style={styles.ratingText}>
            {getRatingText(product?.ratings || 0)}
          </Text>
        </View>

        {/* Sample Reviews */}

        <View style={styles.reviewsContainer}>
          {reviews?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.reviewItem}
              onPress={() => navigation.navigate("ViewReview")}
            >
              <View style={styles.reviewContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <View style={styles.reviewRating}>
                    <Text style={styles.reviewRatingPoint}>{item.rating}</Text>{" "}
                    {StartRating(item.rating)}
                  </View>
                  <Text style={styles.reviewText}>{item.review}</Text>
                </View>
                {item.image && (
                  <Image
                    source={item.image}
                    style={styles.reviewImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Footer - Load More */}
          {/* Load More Reviews Footer */}

          <TouchableOpacity
            style={styles.loadMoreWrapper}
            onPress={() => {
              navigation.navigate("ReviewListScreen");
            }}
          >
            (
            <View>
              <Text style={styles.loadMoreText}>Load More Reviews</Text>
            </View>
            )
          </TouchableOpacity>
        </View>
      </View>
    )}
  </>
);

const ProductDetailsComponent = ({ product, shop, styles }) => (
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
      <Text style={styles.reviewRate}>{product?.ratings} (5)</Text>
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
      <Image source={shop3Image} style={styles.shopImage} />
      <Text style={styles.shopName}>{shop?.name}</Text>
    </View>
  </View>
);
