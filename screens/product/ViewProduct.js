import React, { useCallback, useLayoutEffect } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteUser, updateCutomer } from "./../../utils/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../utils/actions/productActions";

const ViewProduct = ({ route, navigation }) => {
  const { product, shop } = route.params || {}; // Destructure customer
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);

  const editHandler = useCallback(() => {
    navigation.navigate("EditProduct", {
      product: product || {},
      shop: shop || {},
    });
  }, [navigation, route.params]);

  const toggleBlock = async () => {
    try {
      const productData = { status: !product?.status };
      await updateProduct(product?.shopKey, product?.productKey, productData);
      navigation.navigate("ProductListPage");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteUserHandler = async () => {
    try {
      const action = await deleteProduct(product?.shopKey, product.productKey);
      dispatch(action);
      navigation.navigate("ProductListPage");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.name,
      headerStyle: { backgroundColor: "#333" },
      headerTintColor: "#fff",
      headerRight: () => (
        <Pressable
          onPress={editHandler}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Ionicons name="pencil" size={24} color="white" style={styles.icon} />
        </Pressable>
      ),
    });
  }, [navigation, product, editHandler, shop]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              product?.profilePicture ||
              "https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png",
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Product Details</Text>
        <DetailItem label="Name" value={product?.name} />
        <DetailItem label="Shop" value={shop?.name} />
        <DetailItem label="Stock" value={product?.stock} />
        <DetailItem label="Brand" value={product?.brand} />
        <DetailItem label="Category" value={product?.category} />
        <DetailItem label="Price" value={product?.price} />
        <DetailItem label="Old Price" value={product?.oPrice} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Product Details</Text>
        <DetailItem label="Description" value={product?.description} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Activity Details</Text>
        <DetailItem label="Orders" value="5" />
        <DetailItem label="Rank" value={product?.rank} />
        <DetailItem
          label="Status"
          value={product?.status ? "Active" : "Blocked"}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Actions</Text>
        {authData.role === "admin" && (
          <Button
            title={product?.status ? "Block" : "Unblock"}
            color="#333"
            onPress={toggleBlock}
          />
        )}
        <View style={styles.spacer} />
        <Button title="Delete" color="red" onPress={deleteUserHandler} />
      </View>
    </ScrollView>
  );
};

const DetailItem = React.memo(({ label, value }) => (
  <View style={styles.details}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detail}>{value}</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  detail: {
    fontSize: 18,
    color: "#555",
  },
  icon: {
    marginRight: 15,
  },
  spacer: {
    paddingVertical: 3,
  },
});

export default ViewProduct;
