import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "./types.ts";
import type { Dish } from "../Dish/types.ts";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Dish>) => {
      const existingItem = state.items.find(item => item.dish.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({dish: action.payload, quantity: 1});
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.dish.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.dish.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;