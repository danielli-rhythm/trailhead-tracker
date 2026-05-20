import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrailhead } from '../hooks/useTrailhead';
import { trailheadClient } from '../api/trailheadClient';
import StatusBadge from './StatusBadge';
import ConfirmDialog from './ConfirmDialog';
import { Pencil, Trash, ChevronRight } from './Icon';

export default function ItemRow({ item }) {
  const { dispatch } = useTrailhead();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    try {
      await trailheadClient.remove(item.id);
      dispatch({ type: 'REMOVE', payload: item.id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
    setConfirming(false);
  }

  return (
    <>
      <div className="item-card">
        <div className="item-card-body">
          <div className="item-card-name">{item.name}</div>
          <div className="item-card-meta">
            <span>{item.type}</span>
            <StatusBadge status={item.status} />
            {item.priority && <span>P{item.priority}</span>}
          </div>
        </div>
        <div className="item-card-actions">
          <Link to={`/edit/${item.id}`} className="btn-icon" aria-label="Edit">
            <Pencil size={14} />
          </Link>
          <button className="btn-icon danger" onClick={() => setConfirming(true)} aria-label="Delete">
            <Trash size={14} />
          </button>
        </div>
        <div className="item-card-chevron">
          <ChevronRight size={14} />
        </div>
      </div>
      {confirming && (
        <ConfirmDialog
          message={`Delete "${item.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirming(false)}
        />
      )}
    </>
  );
}
