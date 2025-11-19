import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  it('should render input and button', () => {
    render(<TodoForm onAdd={vi.fn()} />);

    expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('should call onAdd with trimmed input when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, '  New todo  ');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(mockOnAdd).toHaveBeenCalledWith('New todo');
  });

  it('should clear input after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'New todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(input).toHaveValue('');
  });

  it('should not call onAdd when input is empty or whitespace', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const button = screen.getByRole('button', { name: /add todo/i });
    await user.click(button);
    expect(mockOnAdd).not.toHaveBeenCalled();

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, '   ');
    await user.click(button);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should disable button when input is empty', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    const button = screen.getByRole('button', { name: /add todo/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when input has value', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAdd={vi.fn()} />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const button = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'New todo');
    expect(button).not.toBeDisabled();
  });
});
