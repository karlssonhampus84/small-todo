import { useState } from 'react'

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function deadlineStatus(iso) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [y, m, d] = iso.split('-').map(Number)
  const diff = (new Date(y, m - 1, d) - today) / 86400000
  if (diff < 0) return 'overdue'
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  return 'future'
}

export default function TodoItem({ todo, onToggle, onDelete, onSetPriority, onSetDeadline }) {
  const [editingDate, setEditingDate] = useState(false)

  return (
    <li className={`todo-item${todo.done ? ' done' : ''}`}>
      <button
        data-testid="priority-btn"
        className={`priority-btn${todo.priority ? ' active' : ''}`}
        onClick={() => onSetPriority(todo.id)}
        aria-label={todo.priority ? 'Ta bort brådskande' : 'Markera som brådskande'}
      >
        {todo.priority ? '!' : '·'}
      </button>
      <input
        data-testid="todo-checkbox"
        className="todo-checkbox"
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Markera "${todo.text}" som klar`}
      />
      <span className="todo-text">{todo.text}</span>
      {todo.deadline && !editingDate && (
        <span
          data-testid="deadline-chip"
          className={`deadline-chip ${deadlineStatus(todo.deadline)}`}
          onClick={() => setEditingDate(true)}
          title="Klicka för att ändra deadline"
        >
          {formatDate(todo.deadline)}
          <button
            className="deadline-remove"
            onClick={e => { e.stopPropagation(); onSetDeadline(todo.id, null) }}
            aria-label="Ta bort deadline"
          >
            ×
          </button>
        </span>
      )}
      {editingDate && (
        <input
          className="date-input inline"
          type="date"
          defaultValue={todo.deadline || ''}
          autoFocus
          onChange={e => {
            onSetDeadline(todo.id, e.target.value || null)
            setEditingDate(false)
          }}
          onBlur={() => setEditingDate(false)}
        />
      )}
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
