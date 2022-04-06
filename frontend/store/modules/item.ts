import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";
import { useRouter } from "next/router";

export type ItemState = {
  allItems: Array<Object>;
  itemDetail: Object;
  fulfilled: boolean;
  allItemTotalPage: number;
};

const initialState: ItemState = {
  allItems: [],
  itemDetail: {},
  fulfilled: false,
  allItemTotalPage: 0,
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
      .get(`${BACKEND_URL}/item/view/`, {
        params: {
          option,
          keyword,
          pageNo,
          itemPerPage,
          onSaleYN,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getItemDetail = createAsyncThunk(
  "GET/ITEMDETAIL", //action명
  async (tokenId: string, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/item/detail/${tokenId}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const changeOwnerAfterBuy = createAsyncThunk(
  "PUT/CHANGEOWNER",
  async (
    { address, tokenId }: { address: string; tokenId: string },
    { rejectWithValue }
  ) => {
    const router = useRouter();
    return await axios
      .put(`${BACKEND_URL}/item/buy/`, { address, tokenId })
      .then((res) => {
        console.log(res);
        router.push("/mypage");
      })
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
        state.allItems = payload.itemsByAll;
        state.allItemTotalPage = payload.totalPage;
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
