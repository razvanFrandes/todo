import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoStats } from './TodoStats';
import { TodoStats as StatsType } from '../../types/todo.types';

describe('TodoStats', () => {
  it('should render all stat labels', () => {
    const stats: StatsType = {
      total: 5,
      active: 3,
      completed: 2,
    };

    render(<TodoStats stats={stats} />);

    expect(screen.getByText(/total:/i)).toBeInTheDocument();
    expect(screen.getByText(/active:/i)).toBeInTheDocument();
    expect(screen.getByText(/completed:/i)).toBeInTheDocument();
  });

  it('should display correct stat values', () => {
    const stats: StatsType = {
      total: 10,
      active: 7,
      completed: 3,
    };

    render(<TodoStats stats={stats} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render zero values correctly', () => {
    const stats: StatsType = {
      total: 0,
      active: 0,
      completed: 0,
    };

    render(<TodoStats stats={stats} />);

    const zeroValues = screen.getAllByText('0');
    expect(zeroValues).toHaveLength(3);
  });
});
