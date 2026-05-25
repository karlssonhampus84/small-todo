export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item${todo.done ? ' done' : ''}`}>
      <input
        data-testid="todo-checkbox"
        className="todo-checkbox"
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Markera "${todo.text}" som klar`}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        data-testid="delete-btn"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Ta bort "${todo.text}"`}
      >
        ×
      </button>
    </li>
  )
}
