import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTrailhead } from '../hooks/useTrailhead';
import ItemRow from './ItemRow';
import { Inbox, Plus } from './Icon';

const STATUSES = ['all', 'not_started', 'in_progress', 'completed'];
const LABELS = { all: 'All', not_started: 'Not Started', in_progress: 'In Progress', completed: 'Completed' };

export default function ItemList() {
  const { state } = useTrailhead();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return state.items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [state.items, search, statusFilter]);

  if (state.loading) return <p>Loading...</p>;

  return (
    <div className="item-list">
      <div className="item-list-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search items"
        />
        <div className="status-filters" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              className={statusFilter === s ? 'active' : ''}
              onClick={() => setStatusFilter(s)}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Inbox size={48} className="empty-state-icon" />
          <h3>No items yet</h3>
          <p>Add your first Trailhead module to start tracking progress.</p>
          <Link to="/new" className="btn-primary"><Plus size={14} /> Add Item</Link>
        </div>
      ) : (
        <div className="item-cards">
          {filtered.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
