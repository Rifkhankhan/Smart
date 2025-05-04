import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import CardSkeleton from "./Common/CardSkeleton";

const SKELETON_COUNT = 6;

const CardContainer = ({ category }) => {
  const products = useSelector((state) => state.product.products);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(products);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = products.filter((p) => p.category === category);
      setFiltered(result);
      setLoading(false);
    }, 100); // Simulate loading delay (adjust if needed)

    return () => clearTimeout(timer);
  }, [category, products]);

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

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.productKey}
      numColumns={2}
      renderItem={({ item }) => <Card product={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CardContainer;

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
