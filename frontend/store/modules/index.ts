import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import loginReducer from "./login";
import navBarReducer from "./navbar";
import itemReducer from "./item";
import artistReducer from "./artist";
import userReducer from "./user";

const rootReducer = combineReducers({
  counterReducer,
  loginReducer,
  navBarReducer,
  itemReducer,
  artistReducer,
  userReducer
  // 모듈 추가시 여기에 추가
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
