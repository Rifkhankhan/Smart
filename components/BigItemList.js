import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import HomeCard from "./HomeCard";

const BigItemList = ({ title, subTitle }) => {
  const list = Array.from({ length: 16 }, (_, index) => ({ id: index + 1 }));
  const displayItems = list.slice(0, 10);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>

      {/* Scrollable Offers List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {displayItems.map((item) => (
          <HomeCard key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default BigItemList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF", // White background for a clean look
    marginVertical: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Shadow for Android
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333", // Neutral, strong color for readability
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5400", // Vibrant accent color for emphasis
  },
  list: {
    flexDirection: "row",
    paddingLeft: 8,
  },
});
