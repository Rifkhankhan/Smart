import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    wishList: [],
    cartsIsLoading: false,
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    setWishItem: (state, action) => {
      state.wishList = action.payload;
    },
    setCartLoading: (state) => {
      state.cartsIsLoading = !state.cartsIsLoading;
    },
    removeCart: (state, action) => {
      // console.log(action.payload)
      state.carts = state.carts.filter(
        (cart) => cart.productKey !== action.payload.productKey
      );
    },
    removeWishItem: (state, action) => {
      // console.log(action.payload)
      state.wishList = state.wishList.filter(
        (cart) => cart.wishKey !== action.payload.wishKey
      );
    },
    checkCartExistance: (state, action) => {
      if (state.carts.find((cart) => cart === action.payload)) {
        return;
      }

      state.carts.push(action.payload);
    },
    resetCarts: (state) => {
      state.carts = [];
    },
    resetWishes: (state) => {
      state.wishList = [];
    },
  },
});
export const {
  setCarts,
  setCartLoading,
  resetCarts,
  removeCart,
  checkCartExistance,
  setWishItem,
  resetWishes,
  removeWishItem,
} = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     carts: [],
//     wishList: [],
//     cartsIsLoading: false,
//   },
//   reducers: {
//     setCarts: (state, action) => {
//       state.carts = action.payload;
//     },
//     setWishItem: (state, action) => {
//       state.wishList = action.payload;
//     },
//     setCartLoading: (state) => {
//       state.cartsIsLoading = !state.cartsIsLoading;
//     },
//     removeCart: (state, action) => {
//       const productKeyToRemove = action.payload.productKey;
//       state.carts = state.carts.filter((cart) => cart.productKey !== productKeyToRemove);
//     },
//     removeWishItem: (state, action) => {
//       const wishKeyToRemove = action.payload.wishKey;
//       state.wishList = state.wishList.filter((item) => item.wishKey !== wishKeyToRemove);
//     },
//     checkCartExistance: (state, action) => {
//       const itemToCheck = action.payload;
//       // Use a Set for quick lookup of productKey in carts
//       const cartProductKeys = new Set(state.carts.map(cart => cart.productKey));

//       if (!cartProductKeys.has(itemToCheck.productKey)) {
//         state.carts.push(itemToCheck);
//       }
//     },
//     resetCarts: (state) => {
//       state.carts = [];
//     },
//     resetWishes: (state) => {
//       state.wishList = [];
//     },
//   },
// });

// export const {
//   setCarts,
//   setCartLoading,
//   resetCarts,
//   removeCart,
//   checkCartExistance,
//   setWishItem,
//   resetWishes,
//   removeWishItem,
// } = cartSlice.actions;

// export default cartSlice.reducer;
