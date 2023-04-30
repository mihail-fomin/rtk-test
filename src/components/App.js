import { addTodo, removeLastTodo } from "@/store/counterSlice";
import { decrement, increment } from "@/store/counterSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";

const addAsyncTodo = () => {
	return async dispatch => {
		setTimeout(() => {
			dispatch(addTodo('ASYNC TODO'))
		}, 2000)
	}
}


export default function App() {
	const [text, setText] = useState('')
	const count = useSelector(state => state.toolkit.count)
	const dispatch = useDispatch()

	const addTask = () => {
		dispatch(addTodo(text))
		setText('')
	}

	return (
		<div className="container mx-auto">
			<h1 className="mt-3 text-3xl">Counter: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(removeLastTodo())}>Remove last TODO</button>
			<button onClick={() => addTask()}>Add TODO</button>
			<button onClick={() => dispatch(addAsyncTodo(text))}>Add Async TODO</button>
			<label>

				<input
					className="block px-2 mt-3 border-2 rounded border-sky-700"
					type='text'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</label>
			<TodoList />
		</div>
	)
}