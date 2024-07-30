import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
// import chatSlice from "./chatSlice";
// import messagesSlice from "./messagesSlice";
import userSlice from './userSlice'
import shopSlice from './shopSlice'
import { thunk } from 'redux-thunk'
import productSlice from './productSlice'
import orderSlice from './orderSlice'
import cartSlice from './cartSlice'
export const store = configureStore({
	reducer: {
		auth: authSlice,
		shop: shopSlice,
		cart: cartSlice,
		product: productSlice,
		order: orderSlice,
		user: userSlice
	}
})
