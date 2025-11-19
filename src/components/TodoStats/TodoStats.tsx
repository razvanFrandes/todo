import { TodoStats as StatsType } from '../../types/todo.types';
import './TodoStats.css';

interface TodoStatsProps {
  stats: StatsType;
}

export const TodoStats = ({ stats }: TodoStatsProps) => {
  return (
    <div className="todo-stats">
      <div className="stat-item">
        <span className="stat-label">Total:</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Active:</span>
        <span className="stat-value">{stats.active}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed:</span>
        <span className="stat-value">{stats.completed}</span>
      </div>
    </div>
  );
};
