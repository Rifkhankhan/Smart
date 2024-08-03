import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    userShopProducts: [],
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
export const { setProducts, setProductsLoading, resetProducts, removeProduct } =
  productSlice.actions;
export default productSlice.reducer;
