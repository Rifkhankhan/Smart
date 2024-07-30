import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		orders: {},
		ordersIsLoading: false
	},
	reducers: {
		setOrders: (state, action) => {
			const newOrder = action.payload.order
			// console.log(newOrder)

			state.orders[newOrder.orderKey] = newOrder
		},
		setOrdersLoading: state => {
			state.ordersIsLoading = !state.ordersIsLoading
		},
		removeOrder: (state, action) => {
			state.orders = state.orders.filter(
				order => order.orderKey !== action.payload
			)
		},
		resetOrders: state => {
			state.orders = []
		}
	}
})
export const { setOrders, setOrdersLoading, resetOrders, removeOrder } =
	orderSlice.actions
export default orderSlice.reducer
