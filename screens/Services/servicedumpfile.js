import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

const ViewService = () => {
  return (
    <>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Quick Delivery Service</Text>
        </View>

        {/* Service Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Get your items delivered in lightning speed with our trusted delivery service. Seamless, reliable, and fast!
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresHeader}>Key Features</Text>
          <FlatList
            data={[
              { key: "Same-day delivery" },
              { key: "Real-time tracking" },
              { key: "Affordable pricing" },
              { key: "Wide coverage" },
            ]}
            renderItem={({ item }) => (
              <Text style={styles.featureItem}>• {item.key}</Text>
            )}
          />
        </View>

        {/* Service Image or Icon */}
        <View style={styles.imageContainer}>
          <Image
            source={require("./../../assets/images/service/quickdelivery.jpg")}
            style={styles.serviceImage}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 16,
  },
  featuresHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },
  featureItem: {
    fontSize: 16,
    color: "#666",
    paddingVertical: 4,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  serviceImage: {
    width: 150,
    height: 150,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#ff5400",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#ff5400",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff5400",
  },
});

export default ViewService;
