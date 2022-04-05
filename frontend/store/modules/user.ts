import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type UserState = {
  userInfo: Object;
  userItems: Array<Object>;
  fulfilled: boolean;
};

const initialState: UserState = {
  userInfo: {},
  userItems: [],
  fulfilled: false,
};

export const getUserInfo = createAsyncThunk(
  "GET/USERINFO", //action명
  async (userAddress: string, { rejectWithValue }) => {
    return await axios
      .get(
        `https://j6c107.p.ssafy.io:8443/api/user/mypage/userInfo/${userAddress}`
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getAllItemsOfUser = createAsyncThunk(
  "GET/ALLITEMSOFUSER", //action명
  async (paramObj, { rejectWithValue }) => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users`, { params: paramObj })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//paramsObj
//{
// saleStatus: true,
// price: 50
//}
export const updateItemInfo = createAsyncThunk(
  "PUT/ITEMINFO", //action명
  async (paramObj, { rejectWithValue }) => {
    return await axios
      .put(`https://jsonplaceholder.typicode.com/users`, { params: paramObj })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const updateUserInfo = createAsyncThunk(
  "PUT/USERINFO", //action명
  async (
    {
      address,
      name,
      description,
      profile_img,
    }: {
      address: string;
      name: string;
      description: string;
      profile_img: string;
    },
    { rejectWithValue }
  ) => {
    return await axios
      .put(`https://j6c107.p.ssafy.io:8443/api/user/mypageupdate`, {
        address,
        name,
        description,
        profile_img,
      })
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
      })
      .addCase(getAllItemsOfUser.pending, (state) => {
        state.fulfilled = false;
      })
      .addCase(getAllItemsOfUser.fulfilled, (state, { payload }) => {
        state.fulfilled = true;
        state.userItems = payload;
      })
      .addCase(getAllItemsOfUser.rejected, (state) => {
        state.fulfilled = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
