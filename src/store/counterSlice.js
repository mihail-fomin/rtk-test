const { createSlice } = require("@reduxjs/toolkit");


const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
		todos: ['Visit Venice', 'Visit Rome', 'Visit Florencia']
	},
	reducers: {
		increment(state) {
			state.count = state.count + 1
		},
		decrement(state) {
			state.count = state.count - 1
		},
		addTodo(state, action) {
			state.todos.push(action.payload)
		},
		removeLastTodo(state) {
			state.todos.pop()
		}
	}
})

export default counterSlice.reducer
export const { increment, decrement, addTodo, removeLastTodo } = counterSlice.actions