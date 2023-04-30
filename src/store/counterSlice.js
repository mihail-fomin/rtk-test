const { createSlice } = require("@reduxjs/toolkit");


const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
		todos: [
			{ id: 1, title: 'Visit Venice', checked: true },
			{ id: 2, title: 'Visit Rome', checked: false },
			{ id: 3, title: 'Visit Florencia', checked: false }
		]
	},
	reducers: {
		increment(state) {
			state.count = state.count + 1
		},
		decrement(state) {
			state.count = state.count - 1
		},
		addTodo(state, action) {
			state.todos.push({
				id: new Date(),
				title: action.payload,
				checked: false,
			})
		},
		removeLastTodo(state) {
			state.todos.pop()
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		}
		// toggleTodoChecked(state, action) {
		// 	checked: action.target.checked,
		// }
	}
})

export default counterSlice.reducer
export const { increment, decrement, addTodo, removeLastTodo, removeTodo } = counterSlice.actions