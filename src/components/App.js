import { addTodo, removeLastTodo, fetchTodos, addNewTodo } from "@/store/counterSlice";
import { decrement, increment } from "@/store/counterSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";


export default function App() {
	const [text, setText] = useState('')
	const count = useSelector(state => state.todos.count)
	const { status, error } = useSelector(state => state.todos)
	const dispatch = useDispatch()

	const addTask = () => {
		text.length && dispatch(addNewTodo(text))
		setText('')
	}

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className="container mx-auto">
			<h1 className="mt-3 text-3xl">Counter: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(removeLastTodo())}>Remove last TODO</button>
			<button onClick={() => addTask()}>Add TODO</button>
			<label>

				<input
					className="block px-2 mt-3 border-2 rounded border-sky-700"
					type='text'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</label>

			{status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>An error occured: {error}</h2>}

			<TodoList />
		</div>
	)
}