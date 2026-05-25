import { useState, useEffect } from 'react'

const STORAGE_KEY = 'small-todo-items'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState(load)

  useEffect(() => {
    save(todos)
  }, [todos])

  function addTodo(text, deadline = null) {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      { id: crypto.randomUUID(), text: trimmed, done: false, priority: false, deadline },
      ...prev,
    ])
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function setPriority(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, priority: !t.priority } : t))
    )
  }

  function setDeadline(id, date) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, deadline: date } : t))
    )
  }

  const sorted = [
    ...todos.filter(t => !t.done && t.priority),
    ...todos.filter(t => !t.done && !t.priority),
    ...todos.filter(t => t.done),
  ]

  return { todos: sorted, addTodo, toggleTodo, deleteTodo, setPriority, setDeadline }
}
