import { useState, useRef, useEffect } from 'react'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')
  const [deadline, setDeadline] = useState('')
  const [showDate, setShowDate] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(value, deadline || null)
    setValue('')
    setDeadline('')
    setShowDate(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setValue('')
      setDeadline('')
      setShowDate(false)
    }
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
      {showDate && (
        <input
          data-testid="deadline-input"
          className="date-input"
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
      )}
      <button
        type="button"
        data-testid="calendar-btn"
        className={`calendar-btn${showDate ? ' active' : ''}`}
        onClick={() => setShowDate(s => !s)}
        aria-label="Sätt deadline"
      >
        ⊞
      </button>
      <button data-testid="add-btn" className="add-btn" type="submit">
        Lägg till
      </button>
    </form>
  )
}
