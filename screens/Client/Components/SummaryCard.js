import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SummaryCard = ({ title, value, icon }) => (
  <Card style={styles.summaryCard}>
    <Card.Content style={styles.cardContent}>
      <MaterialCommunityIcons
        name={icon}
        size={28}
        color="#4e73df"
        style={{ marginRight: 10 }}
      />
      <View>
        <Title style={styles.cardTitle}>{title}</Title>
        <Paragraph style={styles.cardValue}>${value}</Paragraph>
      </View>
    </Card.Content>
  </Card>
);

export default SummaryCard;

const styles = StyleSheet.create({
  summaryCard: {
    width: "48%",
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
});
