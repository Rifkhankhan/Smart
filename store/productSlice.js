import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    userShopProducts: [],
    searchProducts: [],
    productsIsLoading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      const newProducts = action.payload;

      for (let index = 0; index < newProducts.length; index++) {
        const product = newProducts[index];

        if (
          !state.products.find(
            (product) => product.productKey === newProducts[index].productKey
          )
        ) {
          state.products.push(product);
        }
      }
    },
    setSearchProducts: (state, action) => {
      console.log(action.payload);
    },
    setProductsLoading: (state) => {
      state.productsIsLoading = !state.productsIsLoading;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.productKey !== action.payload
      );
    },
    resetProducts: (state) => {
      state.products = [];
    },
  },
});
export const {
  setProducts,
  setProductsLoading,
  resetProducts,
  removeProduct,
  setSearchProducts,
} = productSlice.actions;
export default productSlice.reducer;
