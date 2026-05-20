import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function ItemRow({ item }) {
  return (
    <tr className="item-row">
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td><StatusBadge status={item.status} /></td>
      <td>{item.priority || '—'}</td>
      <td>
        <Link to={`/edit/${item.id}`}>Edit</Link>
      </td>
    </tr>
  );
}
