import { useState, FormEvent } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput) {
      onAdd(trimmedInput);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        aria-label="New todo text"
      />
      <button type="submit" className="add-button" disabled={!input.trim()}>
        Add Todo
      </button>
    </form>
  );
};
