import { useTrailhead } from '../hooks/useTrailhead';

export default function ErrorBanner() {
  const { state, dispatch } = useTrailhead();
  if (!state.error) return null;

  return (
    <div className="error-banner" role="alert">
      <span>{state.error}</span>
      <button onClick={() => dispatch({ type: 'SET_ERROR', payload: null })} aria-label="Dismiss error">✕</button>
    </div>
  );
}
