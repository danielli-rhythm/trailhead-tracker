// Swappable data layer boundary.
// Phase 1: localStorage adapter. Phase 2: HTTP adapter pointing at API Gateway.
import { httpAdapter } from './httpAdapter';

export const trailheadClient = httpAdapter;
