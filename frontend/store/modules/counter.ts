import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state: CounterState) {
      state.value += 1;
    },
    decrement(state: CounterState) {
      state.value -= 1;
    },
  },
});

const { reducer, actions } = counterSlice;
export const { increment, decrement } = actions;
export default reducer;
