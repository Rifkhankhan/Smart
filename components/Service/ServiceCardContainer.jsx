import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { services } from "./../../assets/data/services";
import CardSkeleton from "./../Common/CardSkeleton";

const SKELETON_COUNT = 6;
// Memoized Card component
const MemoizedCard = memo(({ service }) => <ServiceCard service={service} />);

const ServiceCardContainer = ({ category }) => {
  //   const services = useSelector((state) => state.service.services);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = services.filter((p) => p.type === category);
      setFiltered(result);
      setLoading(false);
    }, 100); // Simulate loading delay (adjust if needed)

    return () => clearTimeout(timer);
  }, [category, services]);

  const renderSkeleton = () => {
    return (
      <FlatList
        data={Array.from({ length: SKELETON_COUNT })}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={() => <CardSkeleton />}
        contentContainerStyle={styles.listContainer}
        scrollEnabled
      />
    );
  };
  if (loading) return renderSkeleton();

  if (filtered.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products in this category</Text>
      </View>
    );
  }
  // Optimize renderItem to avoid unnecessary re-renders
  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => <MemoizedCard service={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ServiceCardContainer;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  skeletonCard: {
    backgroundColor: "#e0e0e0",
    height: 180,
    flex: 1,
    margin: 5,
    borderRadius: 12,
  },
});
