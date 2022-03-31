import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import {rootReducer, persistedReducer} from "./modules";
import { persistStore } from "redux-persist";

const makeConfiguredStore = (reducer) => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if(isServer) {
      return makeConfiguredStore(rootReducer);
  }else{
      const store = makeConfiguredStore(persistedReducer);
      let persistor = persistStore(store);
      return {persistor, ...store};
  }
};

const wrapper = createWrapper(makeStore, {
  // debug: process.env.NODE_ENV === "development",
  // 개발할때는 true로
  debug: true,
});

export default wrapper;
