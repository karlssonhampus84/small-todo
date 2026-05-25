import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <p data-testid="empty-state" className="empty-state">
        Inget att göra.
      </p>
    )
  }

  return (
    <ul data-testid="todo-list" className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
