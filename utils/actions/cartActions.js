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
import {
  checkCartExistance,
  removeCart,
  removeWishItem,
} from "../../store/cartSlice";

export const searchCarts = async (queryText) => {
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

export const createCart = async (data) => {
  const app = getFirebaseApp();

  try {
    const dbRef = ref(getDatabase(app));
    const dataRef = child(dbRef, `carts/${data.uid}`);

    // need to check already is there are not

    await push(dataRef, data.productKey);
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

export const placeOrder = async (data) => {
  const app = getFirebaseApp();

  try {
    const dbRef = ref(getDatabase(app));
    const orderRef = child(dbRef, `orders`);
    const shopOrderRef = child(dbRef, `shopsOrders/${data.shopKey}`);
    const userOrderRef = child(dbRef, `usersOrders/${data.uid}`);

    // need to check already is there are not

    console.log(data);

    const newOrder = await push(orderRef, data);
    const newShopOrder = await push(shopOrderRef, newOrder.key);
    const newUserOrder = await push(userOrderRef, newOrder.key);
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

export const updateCart = async (shopKey, productKey, data) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));

  const shopRef = child(dbRef, `shops/${shopKey}`);
  const productRef = child(dbRef, `products/${shopKey}/${productKey}`);

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

export const deleteCart = (uid, selectedItemList) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    // Reference to the shop to be deleted

    try {
      // Perform the delete operation

      for (let index = 0; index < selectedItemList.length; index++) {
        const cart = selectedItemList[index];

        // console.log(cart)

        if (cart.cartkey) {
          const cartRef = child(dbRef, `carts/${uid}/${cart.cartkey}`);

          await Promise.all([await remove(cartRef)]);
          dispatch(removeCart(cart));
        }
      }
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

export const checkOut = (uid, selectedItemList) => {
  return async (dispatch) => {
    const app = getFirebaseApp();

    try {
      const dbRef = ref(getDatabase(app));
      const orderRef = child(dbRef, `orders`);

      for (let index = 0; index < selectedItemList.length; index++) {
        const cart = selectedItemList[index];
        const data = {
          total: cart.qty * cart.price,
          shopKey: cart.shopKey,
          productKey: cart.productKey,
          uid: uid,
          qty: cart.qty,
        };
        const newOrder = await push(orderRef, data);

        const userOrderRef = child(dbRef, `usersOrders/${uid}`);

        const shopOrderRef = child(dbRef, `shopsOrders/${cart.shopKey}`);
        const newUserOrder = await push(userOrderRef, newOrder.key);
        const newShopOrder = await push(shopOrderRef, newOrder.key);

        // delete carts from carts

        const action = await deleteCart(uid, [cart]);
        dispatch(action);
      }
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
};

export const addIntoWish = async (data) => {
  const app = getFirebaseApp();

  try {
    const dbRef = ref(getDatabase(app));
    const dataRef = child(dbRef, `wishes/${data.uid}`);

    // need to check already is there are not

    await push(dataRef, data.productKey);
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

export const deleteWishItem = (data) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    // Reference to the shop to be deleted

    try {
      const wishRef = child(dbRef, `wishes/${data.uid}/${data.wishKey}`);

      await Promise.all([remove(wishRef)]);
      dispatch(removeWishItem(data.wishKey));
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
