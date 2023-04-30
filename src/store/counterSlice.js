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
				id: new Date().toISOString(),
				title: action.payload.text,
				checked: false,
			})
		},
		removeLastTodo(state) {
			state.todos.pop()
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
		},
		toggleTodoChecked(state, action) {
			const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
			toggledTodo.checked = !toggledTodo.checked
		}
	}
})

export default counterSlice.reducer
export const { increment, decrement, addTodo, removeLastTodo, removeTodo, toggleTodoChecked } = counterSlice.actions