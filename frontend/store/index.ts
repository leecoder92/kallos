import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
// import testReducer from "./reducers/testReducer";
// import roomReducer from "./roomReducer";
// import resumeReducer from "./resumeReducer";
// import boardReducer from "./boardReducer";
// import adminReducer from "./adminReducer";
// import videoReducer from "./videoReducer";
// import questionReducer from "./questionReducer";
// import userReducer from "./userReducer";
// import wsReducer from "./wsReducer";
// import timerReducer from "./timerReducer";

const combinedReducer = combineReducers({
    // testReducer,
//   roomReducer,
//   resumeReducer,
//   boardReducer,
//   adminReducer,
//   videoReducer,
//   questionReducer,
//   userReducer,
//   wsReducer,
//   timerReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
