import { addTodo, removeLastTodo } from "@/store/counterSlice";
import { decrement, increment } from "@/store/counterSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
	const [value, setValue] = useState('')
	const count = useSelector(state => state.toolkit.count)
	const todos = useSelector(state => state.toolkit.todos)
	const dispatch = useDispatch()

	return (
		<div className="container mx-auto">
			<h1 className="mt-3 text-3xl">Counter: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(removeLastTodo())}>Remove last TODO</button>
			<button onClick={() => dispatch(addTodo(value))}>Add TODO</button>
			<label>
				<input
					className="block px-2 mt-3 border-2 rounded border-sky-700"
					type='text'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</label>
			<ul className="mt-3">
				{
					todos.map(todo => (
						<li key={todo}>{todo}</li>
					))
				}
			</ul>
		</div>
	)
}