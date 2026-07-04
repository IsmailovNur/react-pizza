import { configureStore } from '@reduxjs/toolkit';
import { dishReducer } from "../entities/Dish/DishSlice.ts";
import { cartReducer } from "../entities/Cart/CartSlice.ts";
import { orderReducer } from "../entities/Order/OrderSlice.ts";

export const store = configureStore({
  reducer: {
    dishes: dishReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;