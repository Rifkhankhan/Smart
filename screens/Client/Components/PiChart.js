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
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const PiChart = () => {
  const pieData = [
    {
      name: "Shoes",
      population: 400,
      color: "#4e73df",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Bags",
      population: 300,
      color: "#1cc88a",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Watches",
      population: 200,
      color: "#36b9cc",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
  ];
  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 60}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
          style={styles.chart}
        />
      </Card.Content>
    </Card>
  );
};

export default PiChart;
const chartConfig = {
  backgroundGradientFrom: "#f1f3f6",
  backgroundGradientTo: "#f1f3f6",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(78, 115, 223, ${opacity})`,
  labelColor: () => "#000",
  propsForDots: { r: "5", strokeWidth: "2", stroke: "#4e73df" },
};
const styles = StyleSheet.create({
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
  chart: {
    borderRadius: 12,
  },
});
