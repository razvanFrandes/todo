import { TodoFilter as FilterType } from '../../types/todo.types';
import './TodoFilter.css';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="todo-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`filter-button ${currentFilter === filter ? 'active' : ''}`}
          aria-label={`Show ${filter} todos`}
          aria-pressed={currentFilter === filter}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};
