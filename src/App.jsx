import { useTrailhead } from './hooks/useTrailhead';
import './App.css';

function App() {
  const { state } = useTrailhead();

  // TODO: remove — temporary verification log
  console.log('TrailheadContext state:', state);

  return (
    <div className="App">
      <h1>Trailhead Tracker</h1>
      <p>Items loaded: {state.items.length}</p>
    </div>
  );
}

export default App;
