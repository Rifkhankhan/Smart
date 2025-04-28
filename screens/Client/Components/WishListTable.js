import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Provider as PaperProvider,
} from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const WishListTable = () => {
  const wishlistData = [
    { id: "1", name: "Sneakers", users: 45 },
    { id: "2", name: "Backpack", users: 30 },
    { id: "3", name: "Fitness Band", users: 20 },
    { id: "4", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "5", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "6", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "7", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "8", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "9", name: "Smartwatch", qty: 10, revenue: "$200" },
  ];

  const [wishlistCurrentPage, setWishlistCurrentPage] = React.useState(1);
  const wishlistItemsPerPage = 3;

  const totalWishlistPages = Math.ceil(
    wishlistData.length / wishlistItemsPerPage
  );
  const paginatedWishlist = wishlistData.slice(
    (wishlistCurrentPage - 1) * wishlistItemsPerPage,
    wishlistCurrentPage * wishlistItemsPerPage
  );
  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Text style={styles.sectionTitle}>Wishlist Table</Text>
        <FlatList
          data={paginatedWishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchRow} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={22}
                color="#e74c3c"
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.tableTitle}>{item.name}</Text>
                <Text style={styles.tableSub}>
                  Wished by {item.users} users
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.paginationContainer}>
              {[...Array(totalWishlistPages).keys()].map((index) => {
                const pageNum = index + 1;
                return (
                  <TouchableOpacity
                    key={pageNum}
                    onPress={() => setWishlistCurrentPage(pageNum)}
                    style={[
                      styles.pageBtn,
                      wishlistCurrentPage === pageNum && styles.activePageBtn,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pageText,
                        wishlistCurrentPage === pageNum &&
                          styles.activePageText,
                      ]}
                    >
                      {pageNum}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
      </Card.Content>
    </Card>
  );
};

export default WishListTable;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  sectionCard: {
    borderRadius: 12,
    elevation: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  tableRow: {
    fontSize: 15,
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    color: "#333",
  },
  touchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 1,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  pageBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  activePageBtn: {
    backgroundColor: "#e74c3c",
  },
  pageText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },
  activePageText: {
    color: "#fff",
  },
});
