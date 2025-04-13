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
import IconButton from "../UI/IconButton";
import UserListItem from "./../components/UserListItem";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { Asset } from "expo-asset";
import plusImage from "./../assets/images/plus.png";

const CustomerListPage = ({ navigation }) => {
  const dispatch = useDispatch();
  let { users } = useSelector((state) => state.user);

  useEffect(() => {}, [users]);
  let customers = users?.filter((customer) => customer.role === "customer");

  customers = useMemo(() => Object.values(customers), [customers]);

  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = () => {
    setIsClicked((current) => !current);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTitleStyle: {
        width: "100%",
      },
      headerRight: () => (
        <IconButton
          name={isClicked ? "close" : "search"}
          color="white"
          size={24}
          onPress={searchHandler}
        />
      ),
    });
  }, [isClicked, navigation, searchHandler]);

  const addCustomerHandler = () => {
    navigation.navigate("CreatePerson");
  };

  return (
    <PageContainer>
      <PageTitle text="Customers" />
      {isClicked && (
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Type..."
            style={styles.searchBar}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      )}
      <FlatList
        data={customers}
        keyExtractor={(customer) => customer?.uid}
        renderItem={({ item }) => <UserListItem customer={item} />}
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

export default CustomerListPage;

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
    marginHorizontal: "5%",
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
    padding: 5,
  },
  searchBar: {
    padding: 5,
    fontSize: 18,
    height: 40,
    width: "100%",
  },
});
