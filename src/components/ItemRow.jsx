import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrailhead } from '../hooks/useTrailhead';
import { trailheadClient } from '../api/trailheadClient';
import StatusBadge from './StatusBadge';
import ConfirmDialog from './ConfirmDialog';

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
      <tr className="item-row">
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td><StatusBadge status={item.status} /></td>
        <td>{item.priority || '—'}</td>
        <td>
          <Link to={`/edit/${item.id}`}>Edit</Link>
          {' '}
          <button className="btn-danger-sm" onClick={() => setConfirming(true)}>Delete</button>
        </td>
      </tr>
      {confirming && (
        <tr><td colSpan={5}>
          <ConfirmDialog
            message={`Delete "${item.name}"?`}
            onConfirm={handleDelete}
            onCancel={() => setConfirming(false)}
          />
        </td></tr>
      )}
    </>
  );
}
