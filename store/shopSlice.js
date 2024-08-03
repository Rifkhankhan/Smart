import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shops: [],
    shopsIsLoading: false,
  },
  reducers: {
    setStoredShops: (state, action) => {
      const newShops = action.payload;

      for (let i = 0; i < newShops.length; i++) {
        const shop = newShops[i];

        if (!state.shops.find((shop) => shop.shopKey === newShops[i].shopKey)) {
          state.shops.push(shop);
        }
      }
    },
    setNewShops: (state, action) => {
      state.shops = action.payload.shops;
    },
    setShopsLoading: (state) => {
      state.shopsIsLoading = !state.shopsIsLoading;
    },
    resetShops: (state) => {
      state.shops = [];
    },
  },
});
export const { setStoredShops, setShopsLoading, resetShops, setNewShops } =
  shopSlice.actions;
export default shopSlice.reducer;
