import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";

const OrderProcessingScreen = ({ confirmedOrder }) => {
  const [loading, setLoading] = useState(confirmedOrder);

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Notification", message);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Simulate network call to backend
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ success: true, message: "Order placed successfully!" }),
          2000
        )
      );

      showToast(response.message);
    } catch (error) {
      showToast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default OrderProcessingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // light black background
    justifyContent: "center",
    alignItems: "center",
  },
});
