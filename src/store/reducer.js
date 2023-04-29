import { createAction, createReducer } from "@reduxjs/toolkit";


const initialState = {
	count: 0,
	todos: ['Visit Venice', 'Visit Rome', 'Visit Florencia']
}

export const decrement = createAction('DECREMENT')
export const increment = createAction('INCREMENT')

export default createReducer(initialState, {
	[increment]: function (state) {
		state.count = state.count + 1
	},
	[decrement]: function (state) {
		state.count = state.count - 1
	},
})

