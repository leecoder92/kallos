import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoginState = {
  value: boolean;
};

const initialState: LoginState = {
  value: false,
};

const loginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    login(state: LoginState) {
      state.value = true;
    },
    logout(state: LoginState) {
      state.value = false;
    },
  },
});

// const { reducer, actions } = counterSlice;
// export const { increment, decrement } = actions;
// export default reducer;
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
