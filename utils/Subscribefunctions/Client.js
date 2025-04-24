// get user Carts

import { child, onValue } from "firebase/database";
import {
  resetCarts,
  resetWishes,
  setCarts,
  setWishItem,
} from "../../store/cartSlice";
import {
  resetOrders,
  resetUserOrders,
  setOrders,
  setUserOrders,
} from "../../store/orderSlice";
import { setProducts } from "../../store/productSlice";
import { setOrderedUsers } from "../../store/userSlice";

export const getUserCarts = (dbRef, cartIdsRef, refs) => {
  return (dispatch) => {
    // Fetch user cart IDs
    onValue(cartIdsRef, (cartSnapshot) => {
      const rawCartData = cartSnapshot.val() || {};

      // Fetch products
      const carts = [];

      const products = getProducts(dbRef, refs);

      dispatch(resetCarts());
      Object.entries(rawCartData).forEach(([cartKey, cartProductKey]) => {
        if (products.find((product) => product.productKey === cartProductKey)) {
          if (cartKey) {
            carts.push({
              ...products.find(
                (product) => product.productKey === cartProductKey
              ),
              productKey: cartProductKey,
              cartkey: cartKey,
            });
          }
        }
      });

      dispatch(setCarts(carts));
    });
  };
};

export const getUserWishes = (dbRef, wishIdsRef, refs) => {
  return (dispatch) => {
    // Fetch user cart IDs
    onValue(wishIdsRef, (cartSnapshot) => {
      const rawCartData = cartSnapshot.val() || {};

      // Fetch products
      const wishes = [];

      const products = getProducts(dbRef, refs);

      dispatch(resetWishes());
      Object.entries(rawCartData).forEach(([wishKey, wishProductKey]) => {
        if (products.find((product) => product.productKey === wishProductKey)) {
          if (wishKey) {
            wishes.push({
              ...products.find(
                (product) => product.productKey === wishProductKey
              ),
              productKey: wishProductKey,
              wishKey: wishKey,
            });
          }
        }
      });

      dispatch(setWishItem(wishes));
    });
  };
};

const getProducts = (dbRef, refs) => {
  const productsRef = child(dbRef, "products");
  refs.push(productsRef);
  const products = [];

  onValue(productsRef, (productsRefSnapshot) => {
    const productsObjects = productsRefSnapshot.val() || {};

    // Flatten the nested products map
    Object.entries(productsObjects).map(([productKey, productData]) => {
      const product = { ...productData, productKey: productKey };

      products.push(product);
    });
  });

  
  return products;
};
// Function to find the key by value
function findKeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

// Function to find product by key
function findProductByKey(data, key) {
  for (const item of data) {
    if (item[key]) {
      return item;
    }
  }
  return null;
}

export const getProductOfaShop = (productsRef, refs) => {
  return (dispatch) => {
    onValue(productsRef, (productsSnapShot) => {
      const productsObjects = productsSnapShot.val() || {};

      const productKeys = [];

      // Iterate over each product using Object.entries()
      Object.entries(productsObjects).forEach(([key, productKey]) => {
        // Add the productKey to the product data
        productKeys.push(productKey);
      });

      // console.log(productKeys);

      // onValue()
      //   dispatch(setProducts({ products }));
    });
  };
};

export const getOrdersOfaShop = (dbRef, orderRef, orderId, refs, key) => {
  return (dispatch) => {
    // get orders for the shop
    // console.log(refs.length)

    onValue(orderRef, (orderRefSnapshot) => {
      const order = orderRefSnapshot.val() || {};

      dispatch(
        setOrders({ order: { ...order, orderKey: orderId, shopOrderKey: key } })
      );

      const userRef = child(dbRef, `users/${order?.uid}`);
      refs.push(userRef);

      const userAction = getOrderedUsers(userRef);
      dispatch(userAction);
    });
  };
};

export const getOrderedUsers = (userRef) => {
  return (dispatch) => {
    // get orders for the shop
    onValue(userRef, (userRefSnapshot) => {
      const user = userRefSnapshot.val() || {};

      dispatch(setOrderedUsers({ user }));
    });
  };
};

export const getOrdersOfaUser = (dbRef, orderIdsRef, refs) => {
  return (dispatch) => {
    // get orders for the user

    dispatch(resetUserOrders());

    onValue(orderIdsRef, (orderRefSnapshot) => {
      const ordersIds = orderRefSnapshot.val() || {};

      Object.entries(ordersIds)?.forEach(([key, orderKey]) => {
        const orderRef = child(dbRef, `orders/${orderKey}`);
        refs.push(orderRef);

        onValue(orderRef, (orderSnafshot) => {
          const orderObject = orderSnafshot.val() || {};
          if (orderObject) {
            const order = { ...orderObject, orderKey: orderKey, key: key };
            dispatch(setUserOrders(order));
          }
        });
      });
    });
  };
};
