import { BACKEND_URL } from "../../config/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type ArtistState = {
  artistInfo: Object;
  artistItems: Array<Object>;
  fulfilled: boolean;
};

const initialState: ArtistState = {
  artistInfo: {},
  artistItems: [],
  fulfilled: false,
};

export const getArtistInfo = createAsyncThunk(
  "GET/ARTISTINFO", //action명
  async (account:string, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/user/artist/${account}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getAllItemsOfArtist = createAsyncThunk(
  "GET/ALLITEMOFARTIST", //action명
  async (
    {
      address,
      pageNo,
      itemPerPage
  } : {
    address: string;
    pageNo: string;
    itemPerPage: string;
  }, 
    { rejectWithValue }
  ) => {
    return await axios
      .get(`${BACKEND_URL}/user/artist/items`, { 
        params: {
          address,
          pageNo,
          itemPerPage,
      }, 
    })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  //액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
  extraReducers: (builder) => {
    builder
      .addCase(getArtistInfo.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getArtistInfo.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.artistInfo = payload;
      })
      .addCase(getArtistInfo.rejected, (state) => {
        state.fulfilled = false;
      })
      .addCase(getAllItemsOfArtist.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getAllItemsOfArtist.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.artistItems = payload;
      })
      .addCase(getAllItemsOfArtist.rejected, (state) => {
        state.fulfilled = false;
      });
  },
});

export const {} = artistSlice.actions;
export default artistSlice.reducer;
