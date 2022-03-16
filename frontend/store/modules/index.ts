import { combineReducers } from "@reduxjs/toolkit";

import counter from "./counter";

const rootReducer = combineReducers({
  counter,
  // 모듈 추가시 여기에 추가
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
