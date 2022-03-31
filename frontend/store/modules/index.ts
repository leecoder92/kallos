import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import loginReducer from "./login";
import navBarReducer from "./navbar";
import itemReducer from "./item";
import artistReducer from "./artist";
import userReducer from "./user";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  //  localstorage에 저장헐 reducer 배열로 넣기
  whitelist: ["counterReducer", "loginReducer"],
};

export const rootReducer = combineReducers({
  counterReducer,
  loginReducer,
  navBarReducer,
  itemReducer,
  artistReducer,
  userReducer,
  // 모듈 추가시 여기에 추가
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
