import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ErrorBanner from './components/ErrorBanner';
import HomePage from './pages/HomePage';
import NewItemPage from './pages/NewItemPage';
import EditItemPage from './pages/EditItemPage';
import './App.css';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav className="nav-header">
        <Link to="/">Home</Link>
        <Link to="/new">New Item</Link>
      </nav>
      <ErrorBanner />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewItemPage />} />
          <Route path="/edit/:id" element={<EditItemPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
