import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  Card,
  Title,
  Paragraph,
  Provider as PaperProvider,
} from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

const LinChart = () => {
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{ data: [500, 800, 600, 1200, 900] }],
  };

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Text style={styles.sectionTitle}>Weekly Sales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={lineData}
            width={screenWidth} // slightly more if needed
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </ScrollView>
      </Card.Content>
    </Card>
  );
};
const chartConfig = {
  backgroundGradientFrom: "#f1f3f6",
  backgroundGradientTo: "#f1f3f6",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(78, 115, 223, ${opacity})`,
  labelColor: () => "#000",
  propsForDots: { r: "5", strokeWidth: "2", stroke: "#4e73df" },
};
export default LinChart;

const styles = StyleSheet.create({});
