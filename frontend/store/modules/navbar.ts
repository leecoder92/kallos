import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type NavBarState = {
  artists: Array<object>;
  items: Array<object>;
  fulfilled: boolean;
};

const initialState: NavBarState = {
  artists: [],
  items: [],
  fulfilled: false,
};

export const getArtists = createAsyncThunk(
  "GET/ARTISTS", //action명
  async (keyword, { rejectWithValue }) => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/${keyword}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {},
  //액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getArtists.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.artists = payload;
      })
      .addCase(getArtists.rejected, (state) => {
        state.fulfilled = false;
      });
  },
});

export const {} = navBarSlice.actions;
export default navBarSlice.reducer;
