import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    increment: (state, action) => {
      const itemIndex = state.products.findIndex(item => item._id === action.payload._id)
      state.products[itemIndex].quantity += 1
      state.quantity += 1
    },
    decrement: (state, action) => {
      const itemIndex = state.products.findIndex(item => item._id === action.payload._id)
      if (state.quantity > 1) {
        state.products[itemIndex].quantity -= 1
        state.quantity -= 1
      }
    },
    calculateQuantity(state, action) {
      let quantity = 0;
      state.products.map((basket) => {
        quantity += basket.price * basket.quantity;
      });
      state.total = quantity;
    },

    reset: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increment, decrement, calculateQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;
