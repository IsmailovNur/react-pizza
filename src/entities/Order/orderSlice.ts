import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {}
});


export const orderReducer = orderSlice.reducer;