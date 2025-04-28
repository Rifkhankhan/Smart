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
import ProductSalesAnalytics from "./Components/ProductSalesAnalytics";
import SalesTable from "./Components/SalesTable";
import WishListTable from "./Components/WishListTable";
import PiChart from "./Components/PiChart";
import LinChart from "./Components/LinChart";
import SummaryCard from "./Components/SummaryCard";

const screenWidth = Dimensions.get("window").width;

const DashboardScreen = () => {
  const todaySales = 1240;
  const totalRevenue = 102340;

  // wish list table

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Summary Cards */}
        <View style={styles.cardRow}>
          <SummaryCard
            title="Today's Sales"
            value={todaySales}
            icon="cash-multiple"
          />
          <SummaryCard
            title="Total Revenue"
            value={totalRevenue}
            icon="currency-usd"
          />
        </View>

        {/* Line Chart */}

        <LinChart />

        {/* Pie Chart */}
        <PiChart />

        {/* Anylise */}
        <ProductSalesAnalytics />

        {/* Sales Table */}

        <SalesTable />

        {/* Wishlist Table */}

        <WishListTable />
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: "#f9f9f9",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default DashboardScreen;
