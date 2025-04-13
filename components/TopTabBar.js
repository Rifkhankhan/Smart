import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

const TopTabBar = ({ tabs, customeStyles, activeTab, setActiveTab }) => {
  const handlePress = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <ScrollView
      style={[styles.topBarContainer, customeStyles]}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => handlePress(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TopTabBar;

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: "row",
    paddingBottom: 5,
    paddingVertical: 3,

    borderBottomColor: "#b0b0b0", // Slightly darker grey border color
  },
  tab: {
    marginVertical: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#f5f5f5", // Light grey for tabs
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 15,
    color: "#333333", // Dark grey text
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: "#007aff", // Blue color for active tab
    backgroundColor: "#d9d9d9", // Slightly darker grey for active tab
  },
  activeTabText: {
    color: "#007aff", // Blue color for active tab text
  },
});
