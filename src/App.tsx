import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from './types/todo.types';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter as TodoFilterComponent } from './components/TodoFilter/TodoFilter';
import { TodoStats } from './components/TodoStats/TodoStats';
import {
  generateId,
  filterTodos,
  calculateStats,
  saveTodosToStorage,
  loadTodosFromStorage,
} from './utils/todoHelpers';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    const loadedTodos = loadTodosFromStorage();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = filterTodos(todos, filter);
  const stats = calculateStats(todos);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Todo App</h1>
        </header>

        <main className="app-main">
          <TodoForm onAdd={handleAddTodo} />

          <div className="controls">
            <TodoFilterComponent
              currentFilter={filter}
              onFilterChange={setFilter}
            />
            {stats.completed > 0 && (
              <button
                onClick={handleClearCompleted}
                className="clear-completed-button"
              >
                Clear Completed
              </button>
            )}
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />

          {todos.length > 0 && <TodoStats stats={stats} />}
        </main>
      </div>
    </div>
  );
}

export default App;
