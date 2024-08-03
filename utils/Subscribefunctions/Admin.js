import { onValue } from "firebase/database";
import {
  resetUsers,
  setStoredUsers,
  setUserLoading,
} from "../../store/userSlice";
import { resetShops, setStoredShops } from "../../store/shopSlice";
import { resetProducts, setProducts } from "../../store/productSlice";
import { setShopKey } from "../../store/authSlice";

export const getUsers = (usersRef) => {
  return (dispatch) => {
    onValue(usersRef, (querySnapshot) => {
      dispatch(resetUsers());
      // Log the raw data
      const rawData = querySnapshot.val();

      const usersObjects = rawData || {};

      const users = [];

      Object.entries(usersObjects).forEach(([uid, user]) => {
        user["uid"] = uid;
        users.push(user);
      });

      dispatch(setStoredUsers(users));
    });
  };
};

export const getShops = (userShopsRef, authData) => {
  return (dispatch) => {
    onValue(userShopsRef, (querySnapshot) => {
      dispatch(resetShops());

      // Log the raw data
      const rawData = querySnapshot.val() || {};

      const shops = [];

      Object.entries(rawData).forEach(([shopKey, shop]) => {
        if (authData.uid === shop.uid) {
          dispatch(setShopKey(shopKey));
        }

        shop["shopKey"] = shopKey;

        shops.push(shop);
      });

      dispatch(setStoredShops(shops));
    });
  };
};

export const getProducts = (prouctsRef) => {
  return (dispatch) => {
    onValue(prouctsRef, (querySnapshot) => {
      dispatch(resetProducts());
      // Log the raw data
      const rawData = querySnapshot.val() || {};

      const products = [];

      Object.entries(rawData).forEach(([productKey, product]) => {
        product["productKey"] = productKey;
        products.push(product);
      });

      dispatch(setProducts(products));
    });
  };
};
