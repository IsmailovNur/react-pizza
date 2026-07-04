import type { Dish } from "../Dish/types.ts";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}