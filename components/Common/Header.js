import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ logo, backgroundColor = "#fff", placeHolder }) => {
  const navigate = useNavigation();
  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Logo or Back Icon */}
      <View style={styles.logoContainer}>
        {logo ? (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../../assets/logo.png")} // Replace with your logo path
            style={styles.logo}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={placeHolder}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* Icons */}
      <View style={styles.iconGroup}>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    elevation: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
});
