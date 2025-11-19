import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('should render empty state initially', () => {
    render(<App />);
    expect(
      screen.getByText(/no todos yet. add one to get started!/i)
    ).toBeInTheDocument();
  });

  it('should add a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'New todo item');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(screen.getByText('New todo item')).toBeInTheDocument();
  });

  it('should toggle todo completion', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Toggle test');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should delete a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Delete test');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(screen.getByText('Delete test')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: /delete "delete test"/i,
    });
    await user.click(deleteButton);

    expect(screen.queryByText('Delete test')).not.toBeInTheDocument();
  });

  it('should filter todos correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await user.type(input, 'Active todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    await user.type(input, 'Completed todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    await user.click(screen.getByRole('button', { name: /show active todos/i }));
    expect(screen.getByText('Active todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /show completed todos/i }));
    expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toBeInTheDocument();
  });

  it('should display stats correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'First todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    await user.type(input, 'Second todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(screen.getByText(/total:/i)).toBeInTheDocument();

    const statValues = screen.getAllByText('2');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('should clear completed todos', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Todo to complete');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    const clearButton = screen.getByRole('button', { name: /clear completed/i });
    await user.click(clearButton);

    expect(screen.queryByText('Todo to complete')).not.toBeInTheDocument();
    expect(
      screen.getByText(/no todos yet. add one to get started!/i)
    ).toBeInTheDocument();
  });
});
