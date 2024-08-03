import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import PageContainer from "../components/PageContainer";
import { useDebouncedCallback } from "use-debounce";
import { searchItems } from "../utils/actions/searchAction";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleSearch = useDebouncedCallback(async (searchTerm) => {
    if (searchTerm && searchTerm.length > 2) {
      const result = await searchItems(searchTerm, (type = "products"));
      console.log(result);
    } else {
      setNoResultsFound(false);
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
      style={{
        width: "auto",
        paddingLeft: 16,
      }}
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
        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          style={{
            padding: 2,
            borderWidth: 1,
            width: "70%",
            paddingHorizontal: 8,
            borderRadius: 8,

            borderColor: "red",
            fontSize: 16,
          }}
        />

        <TouchableOpacity
          onPress={() => console.log("pressed")}
          style={{
            width: "auto",
            paddingLeft: 16,
          }}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

export default SearchScreen;
