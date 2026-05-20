import { useNavigate } from 'react-router-dom';
import { useTrailhead } from '../hooks/useTrailhead';
import { trailheadClient } from '../api/trailheadClient';
import ItemForm from '../components/ItemForm';

export default function NewItemPage() {
  const { dispatch } = useTrailhead();
  const navigate = useNavigate();

  async function handleSubmit(data) {
    try {
      const item = await trailheadClient.create(data);
      dispatch({ type: 'ADD', payload: item });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }

  return (
    <div>
      <h2>New Item</h2>
      <ItemForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}
