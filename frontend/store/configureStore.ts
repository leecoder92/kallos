import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "./modules";
const store = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
  return store;
};
const wrapper = createWrapper(store, {
  // debug: process.env.NODE_ENV === "development",
  // 개발할때는 true로
  debug: true,
});
export default wrapper;