import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoFilter } from './TodoFilter';

describe('TodoFilter', () => {
  it('should render all filter buttons', () => {
    render(<TodoFilter currentFilter="all" onFilterChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /show all todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show active todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show completed todos/i })).toBeInTheDocument();
  });

  it('should apply active class to current filter', () => {
    render(<TodoFilter currentFilter="active" onFilterChange={vi.fn()} />);

    const activeButton = screen.getByRole('button', { name: /show active todos/i });
    expect(activeButton).toHaveClass('active');
  });

  it('should call onFilterChange when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    const completedButton = screen.getByRole('button', { name: /show completed todos/i });
    await user.click(completedButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });

  it('should set aria-pressed to true for active filter', () => {
    render(<TodoFilter currentFilter="completed" onFilterChange={vi.fn()} />);

    const completedButton = screen.getByRole('button', { name: /show completed todos/i });
    expect(completedButton).toHaveAttribute('aria-pressed', 'true');
  });
});
