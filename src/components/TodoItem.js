import { useDispatch } from "react-redux"
import { removeTodo, toggleTodoChecked } from "../store/counterSlice"

export default function TodoItem({ id, title, checked }) {
	const dispatch = useDispatch()

	return (
		<>
			<li key={id} className='flex items-center gap-2'>
				<input
					className=""
					type='checkbox'
					checked={checked}
					onChange={() => dispatch(toggleTodoChecked({ id }))}
				/>
				{checked ? <s>{title}</s> : title}
				<button
					className="p-0 m-0 border-none"
					onClick={() => dispatch(removeTodo({ id }))}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</li>
		</>
	)
}