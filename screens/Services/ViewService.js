import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  ToastAndroid,
  Animated,
  Dimensions,
} from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { placeOrder } from "./../../utils/actions/cartActions";
import ProductImageCarousel from "../Services/ServiceImageCarousel";
import plusImage from "./../../assets/images/plus.png";

import BookNowBottomSheet from "../../components/Service/BookNowBottomSheet";
import ChoosePaymentMethode from "../../components/Service/ChoosePaymentMethode";
import {
  getRatingText,
  StartRating,
} from "../../components/Common/StartRating";
import ServiceCardContainer from "../../components/Service/ServiceCardContainer";
import ServiceMiniCard from "../../components/Service/ServiceMiniCard";
import { services } from "../../assets/data/services";
import commonStyles from "../../constants/commonStyles";
import colors from "../../constants/colors";
import Header from "../../components/Common/Header";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import CategoryTabs from "../../navigation/Comman/TopTabNavigator";
import PagerView from "react-native-pager-view";
import CardContainer from "../../components/CardContainer";

// Memoize the Card component
const MemoizedCard = memo(({ service }) => (
  <ServiceMiniCard service={service} />
));

const ViewService = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const [confirmedOrder, setConfirmOrder] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = React.useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);
  const tabRefs = useRef([]);
  const screenHeight = Dimensions.get("window").height;
  const [pagerHeight, setPagerHeight] = useState(screenHeight);
  const { service } = route?.params;

  // const services = useSelector((state) => state?.service?.services);
  const categories = [...new Set(services?.map((p) => p.type))];

  useEffect(() => {
    if (categories?.length) {
      tabRefs.current = categories?.map(() => React.createRef());
    }
  }, [categories]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("SearchScreen")}
          style={styles.headerIcon}
          name="search"
          color="white"
          size={24}
        />
      ),

      header: () => (
        <Header logo="arrow-back" placeHolder="Search in SmartServe" />
      ),
    });
  }, [navigation]);

  const bottomSheetRef = useRef(null);
  const bottomPaymentSheetRef = useRef(null);

  // const shop = shops?.filter((shop) => shop.shopKey === product?.shopKey)[0];

  const headerLeft = useCallback(
    () => (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginRight: "auto" }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
    ),
    [navigation]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerTitle: service?.name,
      headerShown: true,
    });
  }, [navigation, headerLeft, service?.name]);

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

  const placeOrderHandler = async (data) => {
    await placeOrder(data);
    setOpen(false);
  };

  const CustomBottomBar = () => {
    return (
      <View style={styles.container}>
        <View style={styles.rightBtnsContainer}>
          <Pressable
            style={styles.buyNowbutton}
            onPress={() => bottomSheetRef?.current.expand()}
          >
            <Text style={styles.buttonText}>Book</Text>
          </Pressable>

          <Pressable style={styles.addToCardbutton}>
            <Text style={styles.buttonText}>Learn More</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const BookPlusBtn = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => bottomSheetRef?.current.expand()}
      style={styles.bookBtnContainer}
    >
      <Text style={styles.bookBtn}>Pick</Text>
    </TouchableOpacity>
  );

  const confirmOrderHandler = async (orderData) => {
    setConfirmOrder(true); // show overlay indicator

    try {
      const response = await placeOrder(orderData);
      setConfirmOrder(false); // hide the indicator immediately after success
      // Show success message based on platform
      if (Platform.OS === "android") {
        ToastAndroid.show("Order confirmed successfully!", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Order confirmed successfully!");
      }
    } catch (error) {
      setConfirmOrder(false); // hide the indicator if there is an error
      // Show error message based on platform
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Order failed, please try again.",
          ToastAndroid.SHORT
        );
      } else {
        Alert.alert("Error", "Order failed, please try again.");
      }
    }
  };

  // for Category pager Sweap

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  };

  const handleSwipePageChange = (e) => {
    const index = e.nativeEvent.position;
    setActiveTab(index);
  };

  const DATA = [
    {
      key: "carousel",
      render: () => (
        <View style={styles.imageContainer}>
          <ProductImageCarousel serviceImages={service?.images} />
        </View>
      ),
    },
    {
      key: "ServiceDetails",
      render: () => <ServiceDetails service={service} styles={styles} />,
    },
    {
      key: "Rating And Reviews",
      render: () => (
        <RatingAndReviews
          reviews={reviews}
          service={service}
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
        <FromSameStore service={service} services={services} styles={styles} />
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
                <ServiceCardContainer category={category} />
              </View>
            </View>
          ))}
        </PagerView>
      ),
    },
  ];

  return (
    <>
      <SafeAreaView style={{ position: "relative", flex: 1 }}>
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
          contentContainerStyle={{ paddingBottom: 40 }}
        />
        {showScrollTop && (
          <View style={styles.scrollTopContainer}>
            <Ionicons
              name="arrow-up-circle"
              size={50}
              color="#007AFF"
              onPress={() => {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });
              }}
            />
          </View>
        )}

        <BookPlusBtn />
      </SafeAreaView>

      <BookNowBottomSheet
        service={service}
        bottomSheetRef={bottomSheetRef}
        placeOrderHandler={placeOrderHandler}
        bottomPaymentSheetRef={bottomPaymentSheetRef}
      />

      <ChoosePaymentMethode
        service={service}
        bottomPaymentSheetRef={bottomPaymentSheetRef}
        placeOrderHandler={placeOrderHandler}
        setConfirmOrder={setConfirmOrder}
        confirmOrderHandler={confirmOrderHandler}
      />

      {confirmedOrder && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.indicatorText}>Confirming your service...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // light black overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // makes sure it overlays on top of everything
  },
  indicatorText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.primary,
  },

  imageContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    alignSelf: "center",
  },
  bookBtnContainer: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: "#FF6B00",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  bookBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardComponent: {
    backgroundColor: "#fff",
    padding: 16,

    shadowOpacity: 0.1,
    elevation: 3,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e1e1e",
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
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 4,
  },
  ratingHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
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
    marginVertical: 2,
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
    backgroundColor: "white",
    borderRadius: 4,
    marginVertical: 4,
    padding: 4,
  },
  sameStoreHeader: {
    fontSize: 18,
    fontWeight: "400",
    padding: 4,
    marginTop: 2,
    color: "#333",
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
    marginVertical: 8,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    elevation: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
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
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: "#ff5400",
    padding: 15,
    paddingHorizontal: 22,
  },
  rightBtnsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  buyNowbutton: {
    padding: 15,
    paddingHorizontal: 22,
    elevation: 4,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: "#ffca00",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
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
  scrollTopContainer: {
    position: "absolute",
    bottom: 150,
    right: 20,
    zIndex: 100,
    backgroundColor: "transparent",
  },
});

export default ViewService;

const FromSameStore = ({ service, services, styles }) => {
  const servicesFromSameProvider = services?.filter(
    (pro) => pro.provider === service?.provider
  );

  const renderItem = useCallback(
    ({ item }) => <MemoizedCard service={item} />,
    []
  );

  return (
    <View style={{ marginBottom: 5 }}>
      {/* from the same stores products */}
      <View style={styles.sameStoreContainer}>
        <Text style={styles.sameStoreHeader}>From the same provider</Text>
        <FlatList
          data={servicesFromSameProvider}
          keyExtractor={(item) => {
            return item.id;
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

const RatingAndReviews = ({ reviews, service, navigation, styles }) => (
  <>
    {reviews.length > 0 && (
      <View style={styles.ratingContainer}>
        {/* Rating & reviews */}
        <Text style={styles.ratingHeader}>Rating & Reviews</Text>

        {/* Rating */}
        <View style={styles.ratingInnerContainer}>
          <Text style={styles.ratePoints}>{service?.ratings}</Text>
          <View style={styles.ratingStars}>
            <Text>{StartRating(service?.ratings || 5)}</Text>
          </View>
          <Text style={styles.ratingText}>
            {getRatingText(service?.ratings || 0)}
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

const ServiceDetails = ({ service, styles }) => (
  <View style={styles.cardComponent}>
    <Text style={styles.name} numberOfLines={3}>
      {service?.description}
    </Text>
    {/* price */}
    <View style={styles.price}>
      <Text style={styles.newPrice}>
        Rs.{service?.ChargePerItem || service?.chargePerKM}
      </Text>
      <Text style={styles.oldPrice}>
        Rs.{service?.oldChargePerItem || service?.oldChargePerKM}
      </Text>
    </View>
    {/* stars */}
    <View style={styles.startContainer}>
      <Text style={styles.icon}>
        <Ionicons name="star" color="red" size={18} />
      </Text>
      <Text style={styles.reviewRate}>{service?.ratings} (5)</Text>
    </View>

    {/* service provider */}
    <View style={styles.shopContainer}>
      {/* <Image
source={shop3Image}
style={styles.shopImage}
/> */}
      <Text style={styles.shopName}>{service?.provider}</Text>
    </View>
  </View>
);
