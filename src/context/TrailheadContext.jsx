import { createContext, useReducer, useEffect } from 'react';
import { trailheadClient } from '../api/trailheadClient';

const initialState = { items: [], loading: true, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.payload, loading: false };
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'PATCH':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const TrailheadContext = createContext();

export default function TrailheadProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const items = await trailheadClient.list();
        dispatch({ type: 'LOAD', payload: items });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      }
    })();
  }, []);

  return (
    <TrailheadContext.Provider value={{ state, dispatch }}>
      {children}
    </TrailheadContext.Provider>
  );
}
