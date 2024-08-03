import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  startAt,
  update,
} from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";
import { removeProduct } from "./../../store/productSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const searchUsers = async (queryText) => {
  const searchTerm = queryText.toLowerCase();

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, "users");

    const queryRef = query(
      userRef,
      orderByChild("firstLast"),
      startAt(searchTerm),
      endAt(searchTerm + "\uf8ff")
    );

    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProduct = async (data) => {
  const app = getFirebaseApp();
  const db = getDatabase(app);

  try {
    console.log("Creating product with data:", data);

    // Add timestamps to the product data
    const userData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Reference to the products node
    const productRef = child(ref(db), "products");
    const newProductRef = await push(productRef, userData);
    console.log("Product added with key:", newProductRef.key);

    // Reference to the shopProducts node
    const userProductRef = child(ref(db), `shopProducts/${data.shopKey}`);
    await push(userProductRef, newProductRef.key);
    console.log("Product reference added to shopProducts");
  } catch (error) {
    console.error("Error creating product:", error);
    const errorCode = error.code;

    let message = "Something went wrong.";

    // Customize error messages based on error codes
    if (errorCode === "auth/email-already-in-use") {
      message = "This email is already in use";
    } else {
      message = errorCode;
    }

    throw new Error(message);
  }
};

export const updateProduct = async (shopKey, productKey, data) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));

  const productRef = child(dbRef, `products/${productKey}`);

  try {
    const cleanedCustomer = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== null && v !== "")
    );

    await Promise.all([
      update(productRef, {
        ...cleanedCustomer,
        updatedAt: new Date().toISOString(),
      }),
    ]);
  } catch (error) {
    console.log(error);
    const errorCode = error.code;

    let message = "Something went wrong.";

    if (errorCode === "auth/email-already-in-use") {
      message = "This email is already in use";
    } else {
      message = errorCode;
    }

    throw new Error(message);
  }
};

export const deleteProduct = (shopKey, productKey) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    // Reference to the shop to be deleted

    const shopProductsRef = child(dbRef, `shopProducts/${shopKey}`);

    try {
      // Get the current data
      const snapshot = await get(shopProductsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Remove the product key

        Object.entries(data).map(async ([key, pKey]) => {
          console.log(key);

          if (pKey === productKey) {
            const productRef = child(dbRef, `shopProducts/${shopKey}/${key}`);

            // await remove(productRef);
            // Update the data in Firebase
          }
        });

        console.log("Product key removed successfully.");
      } else {
        console.log("No data found for the specified shop.");
      }
    } catch (error) {
      console.error("Error removing product key:", error);
    }

    const productRef = child(dbRef, `products/${productKey}`);

    try {
      // Perform the delete operation
      // Perform updates concurrently
      await Promise.all([
        // update(shopRef, { updatedAt: new Date().toISOString() }),
        // await remove(productRef),
      ]);
      dispatch(removeProduct(productKey));
    } catch (error) {
      console.error("Error deleting shop:", error);

      const errorCode = error.code || "unknown";

      let message = "Something went wrong.";

      // Customize error messages based on Firebase error codes
      switch (errorCode) {
        case "auth/email-already-in-use":
          message = "This email is already in use";
          break;
        // Add other cases as needed
        default:
          message = "An unexpected error occurred";
      }

      throw new Error(message);
    }
  };
};
