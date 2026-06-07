import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useGetUniverseByUsernameQuery } from './store/services/githubApi';
import { resetUniverse } from './store/slices/universeSlice';
import Home from './pages/Home';
import UniversePage from './pages/Universe';
import CardPreview from './pages/CardPreview';

/**
 * Route wrapper component to handle data loading, loading shimmers,
 * and error screens for a specific universe username.
 */
function UniverseRouteWrapper() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, error, isFetching, isError } = useGetUniverseByUsernameQuery(username, {
    skip: !username,
  });

  const handleBack = () => {
    dispatch(resetUniverse());
    navigate('/');
  };

  if (isFetching) {
    return (
      <div className="relative w-full h-full min-h-screen bg-[#050510] flex flex-col items-center justify-center overflow-hidden">
        {/* Pulsating glowing backdrop */}
        <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[90px] animate-pulse" />
        
        <div className="text-center space-y-6 z-10 select-none">
          {/* Custom cosmic spinner */}
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/25 border-t-indigo-500 animate-spin" />
            <div className="w-8 h-8 rounded-full bg-indigo-900/30 border border-indigo-500/40 animate-pulse" />
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-gray-200 tracking-wider">
            Scanning the universe...
          </h2>
          
          {/* Shimmer subtext */}
          <div className="scanner-shimmer px-4 py-1.5 rounded-lg border border-indigo-900/30 text-[10px] font-mono text-indigo-400 tracking-widest uppercase">
            AGGREGATING GALAXY FOR @{username}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    const displayError = error 
      ? (error.status === 404 
          ? { message: `Developer profile "@${username}" not found.` } 
          : (error.data?.detail ? { message: error.data.detail } : { message: 'Internal Server Error. Please verify your connection.' }))
      : { message: 'An unexpected error occurred.' };

    return (
      <Home 
        onSearch={(user) => navigate(`/universe/${user}`)} 
        isLoading={false} 
        error={displayError} 
      />
    );
  }

  if (data && !isError) {
    return <UniversePage data={data} onBack={handleBack} />;
  }

  return null;
}

/**
 * Simple wrapper for the main landing dashboard root path.
 */
function HomeRouteWrapper() {
  const navigate = useNavigate();
  return (
    <Home 
      onSearch={(username) => navigate(`/universe/${username}`)} 
      isLoading={false} 
      error={null} 
    />
  );
}

/**
 * Main application frame. Registers router configurations.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRouteWrapper />} />
        <Route path="/universe/:username" element={<UniverseRouteWrapper />} />
        <Route path="/preview/:username" element={<CardPreview />} />
      </Routes>
    </Router>
  );
}
