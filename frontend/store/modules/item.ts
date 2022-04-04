import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";

export type ItemState = {
  allItems: Array<Object>;
  itemDetail: Object;
  fulfilled: boolean;
};

const initialState: ItemState = {
  allItems: [],
  itemDetail: {},
  fulfilled: false,
};

export const getAllItems = createAsyncThunk(
  "GET/ALLITEMS", //action명
  async (
    {
      option,
      keyword,
      pageNo,
      itemPerPage,
      onSaleYN,
    }: {
      option: string;
      keyword: string;
      pageNo: string;
      itemPerPage: string;
      onSaleYN: string;
    },
    { rejectWithValue }
  ) => {
    return await axios
      .get(`${BACKEND_URL}/item/view`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getItemDetail = createAsyncThunk(
  "GET/ITEMDETAIL", //action명
  async ({ tokenId }: { tokenId: number }, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/item/detail`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const addNewItem = createAsyncThunk(
  "POST/NEWITEM", //action명
  async (itemInfo, { rejectWithValue }) => {
    return await axios
      .post(`https://jsonplaceholder.typicode.com/users`, itemInfo)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  //액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getAllItems.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.allItems = payload;
      })
      .addCase(getAllItems.rejected, (state) => {
        state.fulfilled = false;
      })
      .addCase(getItemDetail.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getItemDetail.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.itemDetail = payload;
      })
      .addCase(getItemDetail.rejected, (state) => {
        state.fulfilled = false;
      });
  },
});

export const {} = itemSlice.actions;
export default itemSlice.reducer;
