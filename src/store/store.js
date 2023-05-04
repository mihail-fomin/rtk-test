import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

const rootReducer = combineReducers({
	todos: counterSlice
})

export const store = configureStore({
	reducer: rootReducer,
})
