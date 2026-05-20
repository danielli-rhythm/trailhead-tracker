import Dashboard from '../components/Dashboard';
import ItemList from '../components/ItemList';

export default function HomePage() {
  return (
    <div className="home-page">
      <Dashboard />
      <ItemList />
    </div>
  );
}
