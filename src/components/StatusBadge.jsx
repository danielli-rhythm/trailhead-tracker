const COLORS = {
  not_started: '#6b7280',
  in_progress: '#2563eb',
  completed: '#16a34a',
};

const LABELS = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className="status-badge"
      style={{ backgroundColor: COLORS[status] || '#6b7280' }}
    >
      {LABELS[status] || status}
    </span>
  );
}
