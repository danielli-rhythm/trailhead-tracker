import { render, screen } from '@testing-library/react';
import TrailheadProvider from './context/TrailheadContext';
import App from './App';

test('renders app heading', () => {
  render(
    <TrailheadProvider>
      <App />
    </TrailheadProvider>
  );
  expect(screen.getByText(/trailhead tracker/i)).toBeInTheDocument();
});
