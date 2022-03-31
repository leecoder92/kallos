import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type CounterState = {
  value: number;
  users: Array<string>;
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
};

const initialState: CounterState = {
  value: 0,
  users: [],
  pending: false,
  fulfilled: false,
  rejected: false,
};

export const fetchUser = createAsyncThunk(
  "GET/USER", //action명
  async ({user}:{user:string}, { rejectWithValue }) => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/${user}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state: CounterState) {
      state.value += 1;
    },
    decrement(state: CounterState) {
      state.users = [];
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
  //액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.fulfilled = false;
        state.users = payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.rejected = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
