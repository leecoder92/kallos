import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type UserState = {
  userInfo: Object;
  fulfilled: boolean;
};

const initialState: UserState = {
  userInfo: {},
  fulfilled: false,
};

export const getUserInfo = createAsyncThunk(
  "GET/USERINFO", //action명
  async (userAddress, { rejectWithValue }) => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users/${userAddress}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const userSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  //액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.userInfo = payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.fulfilled = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
