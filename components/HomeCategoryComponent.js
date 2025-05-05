import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CardDesign1 from "../screens/product/CardDesign1";
import { useNavigation } from "@react-navigation/native";

const HomeCategoryComponent = ({ title, subTitle }) => {
  const data = Array(6).fill(null); // Replace with real data
  const navigate = useNavigation();

  const renderItem = () => <CardDesign1 />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigate.navigate("ProductCategoryStack")}
        >
          <Text style={styles.subTitle}>{subTitle}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

export default memo(HomeCategoryComponent); // Prevent re-renders if props unchanged

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: "white",
    padding: 4,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 14,
  },
  header: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    textTransform: "capitalize",
    fontWeight: "700",
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6F61",
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
});
