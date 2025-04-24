import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { services } from "./../../assets/data/services";

// Memoized Card component
const MemoizedCard = memo(({ service }) => <ServiceCard service={service} />);

const ServiceCardContainer = ({ header }) => {
  //   const services = useSelector((state) => state.pro.services);

  // Optimize renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(
    ({ item }) => <MemoizedCard service={item} />,
    [] // Empty dependency array ensures this function is created only once
  );

  return (
    <View style={styles.serviceCardContainer}>
      {header && <Text style={styles.title}>{header}</Text>}
      <View style={styles.cards}>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          initialNumToRender={10} // Optimizing initial render
          maxToRenderPerBatch={10} // Batch rendering for better performance
          windowSize={5} // The number of items to keep in memory
        />
      </View>
    </View>
  );
};

export default ServiceCardContainer;

const styles = StyleSheet.create({
  serviceCardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingLeft: 8,
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "600",
    paddingVertical: 8,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
