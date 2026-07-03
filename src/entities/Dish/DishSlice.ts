import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/api/axiosInstance.ts";
import type { Dish, DishObj, DishState } from "./types.ts";

const initialState: DishState = {
  dishes: [],
  isLoading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk<Dish[], void, {
  rejectValue: string
}>(
  'dish/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<{
        [key: string]: DishObj
      }>('/dishes.json');
      const data = response.data;
      if (!data) return [];

      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } catch {
      return rejectWithValue('Failed to fetch dishes');
    }
  }
);

export const createDish = createAsyncThunk<void, DishObj, {
  rejectValue: string
}>(
  'dish/create',
  async (dishObj, {rejectWithValue, dispatch}) => {
    try {
      await axiosInstance.post('/dishes.json', dishObj);
      dispatch(fetchDishes());
    } catch {
      return rejectWithValue('Failed to create dish');
    }
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dish/delete',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await axiosInstance.delete(`/dishes/${id}.json`);
      dispatch(fetchDishes());
    } catch {
      return rejectWithValue('Failed to delete dish');
    }
  }
);

export const updateDish = createAsyncThunk<void, Dish, { rejectValue: string }>(
  'dish/update',
  async (dish, {rejectWithValue, dispatch}) => {
    const {id, ...dto} = dish;
    try {
      await axiosInstance.put(`/dishes/${id}.json`, dto);
      dispatch(fetchDishes());
    } catch {
      return rejectWithValue('Failed to update dish');
    }
  }
);


const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
        state.isLoading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(createDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(updateDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDish.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});


export const dishReducer = dishSlice.reducer;