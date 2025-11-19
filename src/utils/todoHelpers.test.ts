import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateId,
  filterTodos,
  calculateStats,
  saveTodosToStorage,
  loadTodosFromStorage,
} from './todoHelpers';
import { Todo } from '../types/todo.types';

describe('todoHelpers', () => {
  describe('generateId', () => {
    it('should generate a unique id', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should generate an id as a string', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
    });
  });

  describe('filterTodos', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        text: 'Active todo',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        text: 'Completed todo',
        completed: true,
        createdAt: new Date(),
      },
      {
        id: '3',
        text: 'Another active',
        completed: false,
        createdAt: new Date(),
      },
    ];

    it('should return all todos when filter is "all"', () => {
      const result = filterTodos(mockTodos, 'all');
      expect(result).toHaveLength(3);
    });

    it('should return only active todos when filter is "active"', () => {
      const result = filterTodos(mockTodos, 'active');
      expect(result).toHaveLength(2);
      expect(result.every((todo) => !todo.completed)).toBe(true);
    });

    it('should return only completed todos when filter is "completed"', () => {
      const result = filterTodos(mockTodos, 'completed');
      expect(result).toHaveLength(1);
      expect(result.every((todo) => todo.completed)).toBe(true);
    });
  });

  describe('calculateStats', () => {
    it('should calculate correct stats for mixed todos', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Todo 1',
          completed: false,
          createdAt: new Date(),
        },
        {
          id: '2',
          text: 'Todo 2',
          completed: true,
          createdAt: new Date(),
        },
        {
          id: '3',
          text: 'Todo 3',
          completed: true,
          createdAt: new Date(),
        },
      ];

      const stats = calculateStats(todos);
      expect(stats.total).toBe(3);
      expect(stats.active).toBe(1);
      expect(stats.completed).toBe(2);
    });

    it('should return zero stats for empty array', () => {
      const stats = calculateStats([]);
      expect(stats.total).toBe(0);
      expect(stats.active).toBe(0);
      expect(stats.completed).toBe(0);
    });
  });

  describe('localStorage operations', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should save todos to localStorage', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: new Date(),
        },
      ];

      saveTodosToStorage(todos);
      const stored = localStorage.getItem('todos');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toHaveLength(1);
    });

    it('should load todos from localStorage', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: new Date('2024-01-01'),
        },
      ];

      localStorage.setItem('todos', JSON.stringify(todos));
      const loaded = loadTodosFromStorage();

      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe('1');
      expect(loaded[0].text).toBe('Test todo');
      expect(loaded[0].createdAt).toBeInstanceOf(Date);
    });

    it('should return empty array when localStorage is empty', () => {
      const loaded = loadTodosFromStorage();
      expect(loaded).toEqual([]);
    });
  });
});
