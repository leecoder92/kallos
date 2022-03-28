import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import loginReducer from "./login";
import navBarReducer from "./navbar";
import itemReducer from "./item";

const rootReducer = combineReducers({
  counterReducer,
  loginReducer,
  navBarReducer,
  itemReducer,
  // 모듈 추가시 여기에 추가
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
