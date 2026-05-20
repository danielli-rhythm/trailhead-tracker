import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrailhead } from '../hooks/useTrailhead';
import { trailheadClient } from '../api/trailheadClient';
import ItemForm from '../components/ItemForm';

export default function EditItemPage() {
  const { id } = useParams();
  const { dispatch } = useTrailhead();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const found = await trailheadClient.get(id);
        setItem(found);
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, dispatch]);

  async function handleSubmit(data) {
    try {
      const updated = await trailheadClient.update(id, data);
      dispatch({ type: 'PATCH', payload: updated });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  const initialValues = {
    name: item.name,
    type: item.type,
    url: item.url || '',
    status: item.status,
    priority: item.priority ? String(item.priority) : '',
    points: item.points ? String(item.points) : '',
    estimatedMinutes: item.estimatedMinutes ? String(item.estimatedMinutes) : '',
    startedAt: item.startedAt ? item.startedAt.slice(0, 10) : '',
    completedAt: item.completedAt ? item.completedAt.slice(0, 10) : '',
    notes: item.notes || '',
  };

  return (
    <div>
      <h2 className="page-heading">Edit Item</h2>
      <ItemForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
}
