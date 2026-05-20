import { useParams } from 'react-router-dom';

export default function EditItemPage() {
  const { id } = useParams();
  return <h2>Edit Item: {id}</h2>;
}
