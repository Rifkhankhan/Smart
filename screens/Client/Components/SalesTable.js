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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SalesTable = () => {
  const salesData = [
    { id: "1", name: "Running Shoes", qty: 20, revenue: "$400" },
    { id: "2", name: "Handbag", qty: 15, revenue: "$300" },
    { id: "3", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "4", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "5", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "6", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "7", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "8", name: "Smartwatch", qty: 10, revenue: "$200" },
    { id: "9", name: "Smartwatch", qty: 10, revenue: "$200" },
  ];
  const [salesPage, setSalesPage] = React.useState(1);
  const itemsPerPage = 3;

  const paginatedSales = salesData.slice(0, salesPage * itemsPerPage);

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Text style={styles.sectionTitle}>Sales Table</Text>
        <FlatList
          data={paginatedSales}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchRow} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={22}
                color="#4e73df"
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.tableTitle}>{item.name}</Text>
                <Text style={styles.tableSub}>
                  Qty: {item.qty} • Revenue: {item.revenue}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            salesPage * itemsPerPage < salesData.length && (
              <TouchableOpacity
                onPress={() => setSalesPage(salesPage + 1)}
                style={styles.loadMoreBtn}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )
          }
        />
      </Card.Content>
    </Card>
  );
};

export default SalesTable;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
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
  tableSub: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  loadMoreBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4e73df",
    borderRadius: 8,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "600",
  },
});
