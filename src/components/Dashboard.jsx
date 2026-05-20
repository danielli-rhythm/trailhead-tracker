import { useTrailhead } from '../hooks/useTrailhead';
import { Circle, Clock, Check } from './Icon';

export default function Dashboard() {
  const { state } = useTrailhead();
  const { items } = state;
  const total = items.length;
  const notStarted = items.filter((i) => i.status === 'not_started').length;
  const inProgress = items.filter((i) => i.status === 'in_progress').length;
  const completed = items.filter((i) => i.status === 'completed').length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <span className="dashboard-value">{total}</span>
        <span className="dashboard-label">Total</span>
      </div>
      <div className="dashboard-card">
        <Circle size={18} className="dashboard-icon" />
        <span className="dashboard-value">{notStarted}</span>
        <span className="dashboard-label">Not Started</span>
      </div>
      <div className="dashboard-card">
        <Clock size={18} className="dashboard-icon" />
        <span className="dashboard-value">{inProgress}</span>
        <span className="dashboard-label">In Progress</span>
      </div>
      <div className="dashboard-card">
        <Check size={18} className="dashboard-icon" />
        <span className="dashboard-value">{completed}</span>
        <span className="dashboard-label">Completed</span>
      </div>
      <div className="dashboard-card">
        <span className="dashboard-value">{pct}%</span>
        <span className="dashboard-label">Complete</span>
      </div>
    </div>
  );
}
