import React from "react";
import { View, StyleSheet } from "react-native";

const CardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image} />

      <View style={styles.details}>
        <View style={styles.textLineShort} />
        <View style={styles.starRow}>
          <View style={styles.iconCircle} />
          <View style={styles.textLineSmall} />
        </View>

        <View style={styles.couponRow}>
          <View style={styles.couponBoxBlue} />
          <View style={styles.couponBoxRed} />
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceBox} />
          <View style={styles.oldPriceBox} />
        </View>
      </View>
    </View>
  );
};

export default CardSkeleton;

const styles = StyleSheet.create({
  card: {
    height: 300,
    backgroundColor: "#f2f2f2",
    width: "48%",
    marginLeft: 4,
    marginBottom: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 170,
    width: "100%",
    backgroundColor: "#ddd",
  },
  details: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  textLineShort: {
    height: 14,
    width: "60%",
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginBottom: 6,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconCircle: {
    width: 20,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginRight: 6,
  },
  textLineSmall: {
    width: 60,
    height: 12,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  couponRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  couponBoxBlue: {
    width: 70,
    height: 18,
    backgroundColor: "#b3d4fc",
    borderRadius: 3,
  },
  couponBoxRed: {
    width: 60,
    height: 18,
    backgroundColor: "#fcb3b3",
    borderRadius: 3,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceBox: {
    width: 60,
    height: 16,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  oldPriceBox: {
    width: 40,
    height: 14,
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
});
