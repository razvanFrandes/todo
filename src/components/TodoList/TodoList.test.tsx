import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { Todo } from '../../types/todo.types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'First todo',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      text: 'Second todo',
      completed: true,
      createdAt: new Date(),
    },
  ];

  it('should render all todos', () => {
    render(
      <TodoList todos={mockTodos} onToggle={vi.fn()} onDelete={vi.fn()} />
    );

    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
  });

  it('should render empty state when no todos', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(
      screen.getByText(/no todos yet. add one to get started!/i)
    ).toBeInTheDocument();
  });

  it('should not render empty state when todos exist', () => {
    render(
      <TodoList todos={mockTodos} onToggle={vi.fn()} onDelete={vi.fn()} />
    );

    expect(
      screen.queryByText(/no todos yet. add one to get started!/i)
    ).not.toBeInTheDocument();
  });
});
