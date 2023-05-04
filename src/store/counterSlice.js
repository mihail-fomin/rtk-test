const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

			if (!response.ok) {
				throw new Error('Server Error!')
			}

			const data = await response.json()

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const counterSlice = createSlice({
	name: 'todos',
	initialState: {
		count: 0,
		todos: [
			// { id: 1, title: 'Visit Venice', completed: true },
			// { id: 2, title: 'Visit Rome', completed: false },
			// { id: 3, title: 'Visit Florencia', completed: false }
		],
		status: null,
		error: null,
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
				completed: false,
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
			toggledTodo.completed = !toggledTodo.completed
		}
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		},
	}
})

export default counterSlice.reducer
export const { increment, decrement, addTodo, removeLastTodo, removeTodo, toggleTodoChecked } = counterSlice.actions