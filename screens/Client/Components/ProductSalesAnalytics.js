import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const dummyProductSales = [
  { id: "1", name: "iPhone 14", todaySold: 3, totalSold: 22 },
  { id: "2", name: "Nike Air Max", todaySold: 5, totalSold: 50 },
  { id: "3", name: "Sony Headphones", todaySold: 2, totalSold: 18 },
  { id: "4", name: "MacBook Air", todaySold: 1, totalSold: 9 },
  { id: "5", name: "Backpack", todaySold: 4, totalSold: 31 },
  { id: "6", name: "Laptop Stand", todaySold: 3, totalSold: 15 },
  { id: "7", name: "Smartwatch", todaySold: 6, totalSold: 35 },
  { id: "8", name: "Wireless Charger", todaySold: 2, totalSold: 14 },
];

const ProductSalesAnalytics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(dummyProductSales.length / itemsPerPage);

  // Calculate the products to show on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = dummyProductSales.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Sales Overview</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Product</Text>
          <Text style={styles.headerText}>Sold Today</Text>
          <Text style={styles.headerText}>Total Sold</Text>
        </View>
        <FlatList
          data={currentPageData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
              <View style={styles.tableCell}>
                <MaterialIcons
                  name="inventory"
                  size={22}
                  color="#4e73df"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.productName}>{item.name}</Text>
              </View>
              <Text style={styles.tableCell}>{item.todaySold}</Text>
              <Text style={styles.tableCell}>{item.totalSold}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => goToPage(currentPage - 1)}
          style={[styles.pageBtn, currentPage === 1 && styles.disabledBtn]}
        >
          <MaterialIcons name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.pageNumbers}>
          {currentPage > 1 && (
            <TouchableOpacity
              onPress={() => goToPage(currentPage - 1)}
              style={styles.pageNumber}
            >
              <Text style={styles.pageText}>{currentPage - 1}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => goToPage(currentPage)}
            style={styles.pageNumber}
          >
            <Text style={[styles.pageText, styles.activePage]}>
              {currentPage}
            </Text>
          </TouchableOpacity>
          {currentPage < totalPages && (
            <TouchableOpacity
              onPress={() => goToPage(currentPage + 1)}
              style={styles.pageNumber}
            >
              <Text style={styles.pageText}>{currentPage + 1}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => goToPage(currentPage + 1)}
          style={[
            styles.pageBtn,
            currentPage === totalPages && styles.disabledBtn,
          ]}
        >
          <MaterialIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductSalesAnalytics;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2c3e50",
  },
  table: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#4e73df",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  tableCell: {
    fontSize: 14,
    color: "#34495e",
    fontWeight: "400",
    flex: 1,
    textAlign: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495e",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  pageBtn: {
    backgroundColor: "#4e73df",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 6,
    elevation: 3,
  },
  pageNumbers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumber: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginHorizontal: 6,
  },
  pageText: {
    fontSize: 14,
    color: "#34495e",
    fontWeight: "600",
  },
  activePage: {
    backgroundColor: "#4e73df",
    color: "#fff",
  },
  disabledBtn: {
    opacity: 0.4,
  },
});
