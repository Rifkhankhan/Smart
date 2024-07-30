import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
		userShopProducts: [],
		productsIsLoading: false
	},
	reducers: {
		setProducts: (state, action) => {
			const newProducts = action.payload.products

			const existingProducts = state.products

			// Iterate over new products
			newProducts.forEach(newProduct => {
				// Check if the product already exists in the existingProducts array
				const index = existingProducts.findIndex(
					existingProduct =>
						existingProduct.productKey === newProduct.productKey
				)

				if (index !== -1) {
					// If the product exists, replace it with the new product
					existingProducts[index] = newProduct
				} else {
					// If the product doesn't exist, add it to the array
					existingProducts.push(newProduct)
				}
			})

			state.products = existingProducts
		},
		setProductsLoading: state => {
			state.productsIsLoading = !state.productsIsLoading
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(
				product => product.productKey !== action.payload
			)
		},
		resetProducts: state => {
			state.products = []
		}
	}
})
export const { setProducts, setProductsLoading, resetProducts, removeProduct } =
	productSlice.actions
export default productSlice.reducer
