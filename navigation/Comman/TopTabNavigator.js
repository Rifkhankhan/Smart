import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

const CategoryTabs = ({ activeTab, setActiveTab, categories }) => {
  const tabRefs = useRef([]);
  const underlineX = useRef(new Animated.Value(0)).current;
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef && scrollViewRef.current) {
      activeTabRef.measureLayout(
        scrollViewRef.current,
        (x, y, width) => {
          const targetX = x + width * 0.25;
          const targetWidth = width * 0.5;

          setUnderlineWidth(targetWidth);
          Animated.timing(underlineX, {
            toValue: x + width * 0.25,
            duration: 200,
            useNativeDriver: true,
          }).start();

          scrollViewRef.current.scrollTo({ x: x - 10, animated: true }); // scroll active tab to left
        },
        (error) => console.warn("measureLayout error", error)
      );
    }
  }, [activeTab]);

  return (
    <View style={styles.tabContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => {
          const isActive = index === activeTab;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(index)}
              style={styles.tabButton}
            >
              <Text
                style={[styles.tabText, isActive && styles.activeTabText]}
                ref={(ref) => (tabRefs.current[index] = ref)}
              >
                {category.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.underline,
            {
              width: underlineWidth,
              transform: [{ translateX: underlineX }],
            },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#f9fafd",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    position: "relative",
  },
  tabButton: {
    marginHorizontal: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#7a7a7a",
    fontFamily: "Poppins-Regular",
    marginBottom: 6, // adds space between label and underline
  },
  activeTabText: {
    color: "#007AFF",
    fontFamily: "Poppins-SemiBold",
  },
  underline: {
    position: "absolute",
    height: 3,
    backgroundColor: "#007AFF",
    bottom: 0,
    borderRadius: 2,
  },
});
