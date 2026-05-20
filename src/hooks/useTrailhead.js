import { useContext } from 'react';
import { TrailheadContext } from '../context/TrailheadContext';

export function useTrailhead() {
  const context = useContext(TrailheadContext);
  if (!context) {
    throw new Error('useTrailhead must be used within TrailheadProvider');
  }
  return context;
}
