import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Universe from './pages/Universe';
import CardPreview from './pages/CardPreview';

/**
 * Main application routing configurations mapping routes to pages.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/universe/:username" element={<Universe />} />
        <Route path="/preview/:username" element={<CardPreview />} />
      </Routes>
    </Router>
  );
}
