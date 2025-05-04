import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";

const TABS = [
  "Recommended",
  "Trending",
  "Nearby",
  "Popular",
  "New",
  "Featured",
  "Top Rated",
  "Essentials",
  "Deals",
  "Explore",
];

const TopTabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);
  const tabRefs = useRef([]);
  const indicatorLeft = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Trigger animation on first render
    handleTabPress(0, false);
  }, []);

  const handleTabPress = (index, scrollTo = true) => {
    setActiveTab(index);

    tabRefs.current[index]?.measureLayout(
      scrollViewRef.current,
      (x, y, width) => {
        Animated.parallel([
          Animated.timing(indicatorLeft, {
            toValue: x,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(indicatorWidth, {
            toValue: width,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();

        if (scrollTo) {
          scrollViewRef.current.scrollTo({
            x: x - 10, // Scroll just enough to show active tab at left
            animated: true,
          });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View
                ref={(ref) => (tabRefs.current[index] = ref)}
                style={styles.tabInner}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.indicator,
              {
                left: indicatorLeft,
                width: indicatorWidth,
              },
            ]}
          />
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>
          Showing content for: {TABS[activeTab]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollViewContent: {
    position: "relative",
    paddingBottom: 4,
  },
  tabButton: {
    paddingHorizontal: 16,
  },
  tabInner: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "700",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    backgroundColor: "#007AFF",
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
});

export default TopTabsComponent;
