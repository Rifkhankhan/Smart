import React, { useState, useLayoutEffect, useMemo, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./../../UI/IconButton";
import UserListItem from "./../../components/UserListItem";
import PageTitle from "./../../components/PageTitle";
import PageContainer from "./../../components/PageContainer";
import ProductListItem from "../../components/ProductListItem";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import plusImage from "./../../assets/images/plus.png";

const ProductListPage = ({ navigation }) => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.product.products);
  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(isClicked);

  const { authData } = useSelector((state) => state.auth);

  if (authData.role === "shop") {
    products = products.filter(
      (product) => product.shopKey === authData.shopKey
    );
  }

  useEffect(() => {}, [products]);

  products = useMemo(() => Object.values(products), [products]);

  const searchHandler = () => {
    setSearchQuery("");
    setIsClicked((current) => !current);
  };

  const searchProducts = useMemo(
    () =>
      products.filter((product) =>
        new RegExp(searchQuery, "i").test(product.name)
      ),
    [products, searchQuery]
  );

  const addCustomerHandler = () => {
    navigation.navigate("CreateProduct");
  };

  return (
    <PageContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <PageTitle text="Products" />

        {!isClicked && (
          <Ionicons
            name="search"
            color="lightgray"
            size={30}
            onPress={searchHandler}
          />
        )}
      </View>
      {isClicked && (
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Type..."
            style={styles.searchBar}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          <Ionicons
            name="close"
            color="gray"
            size={20}
            style={{ position: "absolute", right: 0, top: 2 }}
            onPress={searchHandler}
          />
        </View>
      )}
      <FlatList
        data={searchProducts}
        keyExtractor={(product) => product?.productKey}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
      {!isClicked && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={addCustomerHandler}
          style={styles.plusBtnContainer}
        >
          <Image
          					source={plusImage}

            style={styles.plusbtn}
          />
        </TouchableOpacity>
      )}
    </PageContainer>
  );
};

export default ProductListPage;

const styles = StyleSheet.create({
  plusbtn: {
    width: 50,
    height: 50,
  },
  plusBtnContainer: {
    position: "absolute",
    right: 15,
    bottom: 20,
    width: 50,
    height: 50,
  },
  searchBarContainer: {
    position: "relative",
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
  },
  searchBar: {
    padding: 5,
    fontSize: 16,
    height: 25,
    width: "100%",
  },
});
