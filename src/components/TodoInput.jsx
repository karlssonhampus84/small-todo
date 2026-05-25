import { useState, useRef, useEffect } from 'react'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setValue('')
  }

  return (
    <form className="input-row" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-testid="todo-input"
        className="todo-input"
        type="text"
        placeholder="Ny uppgift..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button data-testid="add-btn" className="add-btn" type="submit">
        Lägg till
      </button>
    </form>
  )
}
