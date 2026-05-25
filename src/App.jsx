import { useTodos } from './hooks/useTodos.js'
import TodoInput from './components/TodoInput.jsx'
import TodoList from './components/TodoList.jsx'

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, setPriority, setDeadline } = useTodos()
  const remaining = todos.filter(t => !t.done).length

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span>_</span>todo
        </h1>
        <span className="header-count">
          {remaining === 0 ? 'klart' : `${remaining} kvar`}
        </span>
      </header>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onSetPriority={setPriority}
        onSetDeadline={setDeadline}
      />
    </div>
  )
}
