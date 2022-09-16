import { combineReducers, createStore } from "redux";
import stepReducer from "./reducer/step.reducer";
import loanReducer from "./reducer/loan.reducer";

const reducers = combineReducers({ stepReducer, loanReducer });
const store = createStore(reducers);

export default store;
