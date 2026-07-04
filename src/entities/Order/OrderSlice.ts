import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/api/axiosInstance.ts";
import type { OrderData } from "./types.ts";

export type FirebaseOrders = Record<string, OrderData>;

interface OrderState {
  orders: FirebaseOrders;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: {},
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk<void, OrderData, { rejectValue: string }>(
  'order/create',
  async (orderData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/orders.json', orderData);
    } catch {
      return rejectWithValue('Failed to save order');
    }
  }
);

export const fetchOrders = createAsyncThunk<FirebaseOrders, void, { rejectValue: string }>(
  'order/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<FirebaseOrders | null>('/orders.json');
      return response.data || {};
    } catch {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

export const completeOrder = createAsyncThunk<void, string, { rejectValue: string }>(
  'order/complete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/orders/${id}.json`);
      dispatch(fetchOrders());
    } catch {
      return rejectWithValue('Failed to complete order');
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.isLoading = true; })
      .addCase(createOrder.fulfilled, (state) => { state.isLoading = false; })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<FirebaseOrders>) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
});

export const orderReducer = orderSlice.reducer;