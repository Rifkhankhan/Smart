import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    userOrders: [],
    ordersIsLoading: false,
  },
  reducers: {
    setOrders: (state, action) => {
      const newOrder = action.payload.order;
      const existingOrderIndex = state.orders.findIndex(
        (order) => order.orderKey === newOrder.orderKey
      );

      if (existingOrderIndex !== -1) {
        // Order exists, check if we need to update it
        const existingOrder = state.orders[existingOrderIndex];

        if (existingOrder.orderStatus !== newOrder.orderStatus) {
          // Update the existing order with new details
          state.orders[existingOrderIndex] = newOrder;
        }
        // If the status is the same, no action needed
      } else {
        // Order does not exist, add the new order
        state.orders.push(newOrder);
      }
    },

    setUserOrders: (state, action) => {
      const newOrder = action.payload;
      const existingOrderIndex = state.userOrders.findIndex(
        (order) => order.orderKey === newOrder.orderKey
      );

      if (existingOrderIndex !== -1) {
        // Order exists, check if we need to update it
        const existingOrder = state.userOrders[existingOrderIndex];

        if (existingOrder.orderStatus !== newOrder.orderStatus) {
          // Update the existing order with new details
          state.userOrders[existingOrderIndex] = newOrder;
        }
        // If the status is the same, no action needed
      } else {
        // Order does not exist, add the new order
        state.userOrders.push(newOrder);
      }
    },

    setOrdersLoading: (state) => {
      state.ordersIsLoading = !state.ordersIsLoading;
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.orderKey !== action.payload
      );
    },
    resetOrders: (state) => {
      state.orders = [];
    },
    resetUserOrders: (state) => {
      state.userOrders = [];
    },
  },
});
export const {
  setOrders,
  setOrdersLoading,
  resetUserOrders,
  setUserOrders,
  resetOrders,
  removeOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
