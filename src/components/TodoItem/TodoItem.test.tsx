import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types/todo.types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date(),
  };

  it('should render todo text', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should render unchecked checkbox for incomplete todo', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox for completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle with todo id when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={vi.fn()} />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should call onDelete with todo id when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByRole('button', {
      name: /delete "test todo"/i,
    });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { container } = render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );

    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });
});
