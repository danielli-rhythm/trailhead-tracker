// Swappable data layer boundary.
// Phase 1: localStorage adapter. Phase 2: swap import to httpAdapter.
import { localStorageAdapter } from './localStorageAdapter';

export const trailheadClient = localStorageAdapter;
