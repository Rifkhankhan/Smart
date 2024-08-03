// get user Carts

import { child, onValue } from "firebase/database";
import { resetCarts, setCarts } from "../../store/cartSlice";
import { setOrders } from "../../store/orderSlice";
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

      console.log(productKeys);

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
      dispatch(setOrders({ order: { ...order, orderKey: orderId, key } }));

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
