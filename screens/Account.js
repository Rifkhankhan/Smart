import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Account = ({ route, navigation }) => {
  const list = [{ id: 1 }, { id: 12 }, { id: "sdf" }];
  const trackPackageRef = useRef(null);
  const deliveredProductsRef = useRef(null);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: authData?.firstLast,
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, route?.params]);

  const renderItem = ({ item }) => (
    <View style={styles.trackProduct}>
      <View style={styles.trackImageContainer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
          }}
          style={styles.trackImage}
        />
      </View>
      <View style={styles.trackDetailsContainer}>
        <Text style={styles.trackingStatus}>Delivered</Text>
        <Text
          style={styles.trackingMessage}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Your Package has been delivered, Please Tap here to share a review
        </Text>
      </View>
    </View>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.trackProduct,
        { borderBottomColor: "gray", borderBottomWidth: 1 },
      ]}
    >
      <View style={styles.trackImageContainer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
          }}
          style={styles.trackImage}
        />
      </View>
      <View style={styles.trackDetailsContainer}>
        <Text
          style={styles.productDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Mens Cotton t-shirt neck short sleeve 3g3 g34gg34 trfb brbrtthrt nrtn
          bnyn errbf rbrtbrb
        </Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>Rs.5618</Text>
          <Text style={styles.productStatus}>Delivered</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.ordersContainer}>
      <Text style={styles.header}>My Orders</Text>
      <View style={styles.ordersIconsList}>
        <Pressable
          style={styles.iconsList}
          onPress={() => navigation.navigate("Orders", { type: "pay" })}
        >
          <Ionicons name="card-outline" size={35} color="gray" />
          <Text>To Pay</Text>
        </Pressable>
        <Pressable
          style={styles.iconsList}
          onPress={() => navigation.navigate("Orders", { type: "ship" })}
        >
          <FontAwesome5 name="clipboard-list" size={35} color="gray" />
          <Text>To Ship</Text>
        </Pressable>
        <Pressable
          style={styles.iconsList}
          onPress={() => navigation.navigate("Orders", { type: "receive" })}
        >
          <FontAwesome5 name="shipping-fast" size={35} color="gray" />
          <Text>To Receive</Text>
        </Pressable>
        <Pressable style={styles.iconsList} onPress={() => {}}>
          <Ionicons
            name="ios-chatbox-ellipses-outline"
            size={35}
            color="gray"
          />
          <Text>Messages</Text>
        </Pressable>
      </View>
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.actionInnerContainer}
          onPress={() => navigation.navigate("Orders", { type: "return" })}
        >
          <View style={styles.actionInnerContainerReturn}>
            <Fontisto name="arrow-return-left" size={18} color="black" />
          </View>
          <Text style={styles.actionText}>My Returns</Text>
        </Pressable>
        <Pressable
          style={styles.actionInnerContainer}
          onPress={() => navigation.navigate("Orders", { type: "cancel" })}
        >
          <MaterialCommunityIcons
            name="text-box-remove-outline"
            size={32}
            color="black"
          />
          <Text style={styles.actionText}>My Cancellations</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={list}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={() => (
        <>
          <View style={styles.trackPackage}>
            <Text style={styles.header}>Track Package</Text>
            <FlatList
              ref={trackPackageRef}
              data={list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.deliveryProducts}>
            <Text style={styles.header}>Delivered Products</Text>
            <FlatList
              ref={deliveredProductsRef}
              data={list}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={1}
            />
          </View>
        </>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
  },
  ordersContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
  },
  ordersIconsList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 16,
  },
  iconsList: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  actionContainer: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  actionInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionInnerContainerReturn: {
    borderWidth: 3,
    borderRadius: 4,
    borderColor: "gray",
    padding: 2,
  },
  actionText: {
    paddingLeft: 8,
  },
  trackPackage: {
    marginTop: 4,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 12,
  },
  trackProduct: {
    width: Dimensions.get("window").width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  trackImageContainer: {
    width: 60,
    height: 60,
  },
  trackImage: {
    flex: 1,
    borderRadius: 4,
  },
  trackDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 8,
    justifyContent: "space-around",
  },
  trackingStatus: {
    paddingHorizontal: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "red",
  },
  trackingMessage: {
    padding: 2,
    fontSize: 15,
  },
  deliveryProducts: {
    marginTop: 4,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 12,
  },
  productDescription: {
    color: "black",
    fontSize: 16,
  },
  productPriceContainer: {
    width: "100%",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
  productStatus: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "red",
    color: "red",
    fontWeight: "500",
  },
});
