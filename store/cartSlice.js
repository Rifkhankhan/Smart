import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    cartsIsLoading: false,
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
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
    checkCartExistance: (state, action) => {
      if (state.carts.find((cart) => cart === action.payload)) {
        return;
      }

      state.carts.push(action.payload);
    },
    resetCarts: (state) => {
      state.carts = [];
    },
  },
});
export const {
  setCarts,
  setCartLoading,
  resetCarts,
  removeCart,
  checkCartExistance,
} = cartSlice.actions;
export default cartSlice.reducer;
