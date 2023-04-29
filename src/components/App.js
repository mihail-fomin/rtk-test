import { addTodo, removeLastTodo } from "@/store/counterSlice";
import { decrement, increment } from "@/store/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
	const count = useSelector(state => state.toolkit.count)
	const todos = useSelector(state => state.toolkit.todos)
	const dispatch = useDispatch()

	return (
		<div className="mx-auto container-xl">
			<h1 className="mt-3 text-3xl">Counter: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(removeLastTodo())}>Remove last TODO</button>
			<button onClick={() => dispatch(addTodo(prompt()))}>Add TODO</button>
			<ul>
				{
					todos.map(todo => (
						<li key={todo}>{todo}</li>
					))
				}
			</ul>
		</div>
	)
}