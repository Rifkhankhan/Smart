import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PageContainer from "../components/PageContainer";
import { useDebouncedCallback } from "use-debounce";
import { searchItems } from "../utils/actions/searchAction";
import { setSearchProducts } from "../store/productSlice";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handleSearch = useDebouncedCallback(async (searchTerm) => {
    if (searchTerm && searchTerm.length > 0) {
      const result = await searchItems(searchTerm, (type = "products"));

      if (Object.keys(result).length === 0) {
        setNoResultsFound(true);
        setSearchedProducts([]);
      } else {
        setNoResultsFound(false);

        const newProducts = Object.entries(result).map(
          ([productKey, productData]) => ({
            ...productData,
            productKey: productKey,
          })
        );

        // setSearchedProducts((prev) => {
        //   // Filter out new products that already exist in prev
        //   const filteredNewProducts = newProducts.filter(
        //     (newProduct) =>
        //       !prev.some(
        //         (existingProduct) =>
        //           existingProduct.productKey === newProduct.productKey
        //       )
        //   );

        //   // Return updated state only if there are new products
        //   return filteredNewProducts.length > 0
        //     ? [...prev, ...filteredNewProducts]
        //     : prev;
        // });

        setSearchedProducts([...newProducts]);
      }

      // dispatch(setSearchProducts(result));
    } else {
      setNoResultsFound(true);
    }
  }, 300);

  const headerLeft = () => (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{ marginRight: "auto" }}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </Pressable>
  );

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => console.log("pressed")}
      style={{ width: "auto", paddingLeft: 16 }}
    >
      <Text>Search</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerLeft: headerLeft,
      headerRight,
    });
  }, [navigation]);

  const closeHandler = () => {
    setNoResultsFound(true);
    setSearchTerm(""); // Clear the text input by setting state to an empty string
  };

  const renderHighlightedText = (text, term) => {
    if (!term) return <Text>{text}</Text>;

    // Find the first occurrence of the searchTerm
    const index = text.toLowerCase().indexOf(term.toLowerCase());

    if (index === -1) return <Text>{text}</Text>;

    // Split the text into parts
    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const afterMatch = text.slice(index + term.length);

    return (
      <Text>
        {beforeMatch}
        <Text style={{ fontWeight: 500 }}>{match}</Text>
        {afterMatch}
      </Text>
    );
  };

  return (
    <PageContainer>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginRight: "auto" }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={{ position: "relative", flex: 1 }}>
          <Ionicons
            name="search-outline"
            style={{ position: "absolute", left: 5, top: 8 }}
            size={18}
            color="lightgray"
          />
          <TextInput
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              handleSearch(text);
            }}
            placeholder="Search"
            style={{
              padding: 2,
              borderWidth: 1,
              width: "100%",
              paddingHorizontal: 8,
              borderRadius: 8,
              paddingLeft: 28,
              borderColor: "red",
              fontSize: 16,
            }}
          />
          <Ionicons
            name="close-circle"
            onPress={closeHandler}
            size={24}
            color="lightgray"
            style={{ position: "absolute", right: 5, top: 5 }}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            searchTerm.length > 0 &&
            searchedProducts.length > 0 &&
            navigation.navigate("SearchedProductsScreen", {
              products: searchedProducts,
              searchTerm,
            })
          }
          style={{ width: "auto", paddingHorizontal: 8 }}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {!noResultsFound && (
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={searchedProducts.slice(0, 10)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.productKey}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="lightgray"
                style={{
                  padding: 2,
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "lightgray",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setSearchTerm(item.name);
                  navigation.navigate("SearchedProductsScreen", {
                    products: searchedProducts,
                    searchTerm: item.name,
                  });
                }}
              >
                <>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "300",
                      flex: 1,
                      paddingVertical: 10,
                      paddingLeft: 25,
                    }}
                  >
                    {renderHighlightedText(item.name, searchTerm)}
                  </Text>

                  <Feather name="arrow-up-left" size={15} color="gray" />
                </>
              </TouchableHighlight>
            )}
          />
        </View>
      )}

      {noResultsFound && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Result</Text>
        </View>
      )}
    </PageContainer>
  );
};

export default SearchScreen;
