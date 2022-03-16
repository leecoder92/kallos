import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";

const rootReducer = combineReducers({
    counterReducer,
  // 모듈 추가시 여기에 추가
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
