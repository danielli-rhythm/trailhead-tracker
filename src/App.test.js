import { render, screen } from '@testing-library/react';
import TrailheadProvider from './context/TrailheadContext';
import App from './App';

test('renders nav links', () => {
  render(
    <TrailheadProvider>
      <App />
    </TrailheadProvider>
  );
  expect(screen.getByRole('link', { name: /Trailhead Tracker/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /New Item/i })).toBeInTheDocument();
});
