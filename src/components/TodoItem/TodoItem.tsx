import { Todo } from '../../types/todo.types';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </div>
  );
};
