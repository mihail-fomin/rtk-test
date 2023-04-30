import { useDispatch } from "react-redux"
import { removeTodo } from "../store/counterSlice"

export default function TodoItem({ id, title, checked }) {
	const dispatch = useDispatch()

	return (
		<>
			<li key={id}>
				<input
					className=""
					type='checkbox'
					checked={checked}

				/>
				{title}
				<button onClick={() => dispatch(removeTodo(id))}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</li>
		</>
	)
}