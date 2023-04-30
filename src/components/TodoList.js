import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"


export default function TodoList() {
	const todos = useSelector(state => state.toolkit.todos)


	return (
		<>
			<ul className="mt-3">
				{
					todos.map(todo => (
						<TodoItem
							key={todo.id}
							{...todo}
						/>
					))
				}
			</ul>
		</>

	)
}