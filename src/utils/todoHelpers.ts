import { Todo, TodoFilter, TodoStats } from '../types/todo.types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const calculateStats = (todos: Todo[]): TodoStats => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return { total, active, completed };
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
  }
};

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
  }
  return [];
};
