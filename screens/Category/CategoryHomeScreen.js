import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import { categoriesData } from "../../assets/data/categoriesData";

const screenWidth = Dimensions.get("window").width;
const gridItemWidth = (screenWidth * 0.7 - 40) / 3;

const CategoryHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  const renderSubcategoryItem = (item) => {
    if (typeof item === "string") {
      return (
        <TouchableOpacity style={styles.subcategoryItem}>
          <Text style={styles.subcategoryText}>{item}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.subcategoryDropdown}>
          <View style={styles.subcategoryBox}>
            <TouchableOpacity
              style={styles.subcategoryItemRow}
              onPress={() => {
                setExpandedSubcategories((prevState) => ({
                  ...prevState,
                  [item.name]: !prevState[item.name],
                }));
              }}
            >
              <Text style={styles.subcategoryText}>{item.name}</Text>
              <View style={styles.dropdownRight}>
                <View style={styles.verticalDivider} />
                <Ionicons
                  name={
                    expandedSubcategories[item.name]
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={16}
                  color="#555"
                  style={styles.dropdownIcon}
                />
              </View>
            </TouchableOpacity>

            {expandedSubcategories[item.name] && (
              <View style={styles.dropdownContent}>
                <FlatList
                  data={item.categories}
                  keyExtractor={(cat, index) => index.toString()}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.dropdownItem}>
                      <Image source={item.image} style={styles.icon} />
                      <Text style={styles.subSubText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{selectedCategory.name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="shopping-cart" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="more-vert" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.body}>
        {/* Left: Categories */}
        <View style={styles.leftColumn}>
          <FlatList
            data={categoriesData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory.id === item.id && styles.selectedCategory,
                ]}
                onPress={() => {
                  setSelectedCategory(item);
                }}
              >
                <Image source={item.icon} style={styles.icon} />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory.id === item.id && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Right: Subcategories Grid */}
        <View style={styles.rightColumn}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selectedCategory.subcategories}
            keyExtractor={(item, index) =>
              typeof item === "string" ? item : item.name
            }
            renderItem={({ item }) => renderSubcategoryItem(item)}
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f57224",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    width: "22%",
    backgroundColor: "#fafafa",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    paddingVertical: 10,
  },
  rightColumn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  selectedCategory: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#f57224",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    marginTop: 6,
  },
  selectedText: {
    color: "#f57224",
    fontWeight: "bold",
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "cover",
  },
  subcategoryDropdown: {
    overflow: "hidden",
  },
  subcategoryBox: {
    backgroundColor: "#fefefe",
    overflow: "hidden",
  },
  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  subcategoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  subcategoryItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 0.5,
  },
  dropdownRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  dropdownIcon: {
    fontSize: 20,
    color: "#555",
  },

  dropdownContent: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownItem: {
    width: (screenWidth * 0.7) / 3,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 6,
  },
  subSubText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
});
