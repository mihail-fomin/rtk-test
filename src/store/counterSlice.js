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

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Can\'t delete task. Server error.')
			}

			dispatch(removeTodo({ id }))

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const toggleStatus = createAsyncThunk(
	'todos/toggleStatus',
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find(todo => todo.id === id)

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					completed: !todo.completed,
				})
			})

			if (!response.ok) {
				throw new Error('Can\'t toggle status. Server error.')
			}

			dispatch(toggleTodoChecked({ id }))

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async function (text, { rejectWithValue, dispatch }) {
		try {
			const todo = {
				title: text,
				userId: 1,
				completed: false,
			}

			const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(todo)
			})

			if (!response.ok) {
				throw new Error('Can\'t add task. Server error.')
			}

			const data = await response.json()
			dispatch(addTodo(data))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

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
			state.todos.push(action.payload)
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
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
		[addNewTodo.rejected]: setError,
	}
})

export default counterSlice.reducer
export const { increment, decrement, addTodo, removeLastTodo, removeTodo, toggleTodoChecked } = counterSlice.actions