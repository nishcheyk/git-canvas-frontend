import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUniverseByUsernameQuery } from './store/services/githubApi';
import { resetUniverse } from './store/slices/universeSlice';
import Home from './pages/Home';
import UniversePage from './pages/Universe';

/**
 * Main application frame. Uses state queries to manage transitions
 * between the landing dashboard search and the WebGL canvas galaxy.
 */
export default function App() {
  const dispatch = useDispatch();
  const [activeUsername, setActiveUsername] = useState('');
  
  // RTK Query fetches data and handles store cache states
  const { data, error, isFetching, isError } = useGetUniverseByUsernameQuery(activeUsername, {
    skip: !activeUsername,
  });

  const handleSearch = (username) => {
    setActiveUsername(username);
  };

  const handleBack = () => {
    setActiveUsername('');
    dispatch(resetUniverse());
  };

  // If search encounters error, clean username to allow search retry
  useEffect(() => {
    if (isError && !isFetching) {
      // Keep username state in search input so user can see what failed,
      // but reset query parameter so they can input again
    }
  }, [isError, isFetching]);

  // Loading state shimmer panel
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
            AGGREGATING GALAXY FOR @{activeUsername}
          </div>
        </div>
      </div>
    );
  }

  // Map API error responses cleanly
  const displayError = error 
    ? (error.status === 404 
        ? { message: `Developer profile "@${activeUsername}" not found.` } 
        : (error.data?.detail ? { message: error.data.detail } : { message: 'Internal Server Error. Please verify your connection.' }))
    : null;

  // Render main 3D page if search completes successfully
  if (data && activeUsername && !isError) {
    return <UniversePage data={data} onBack={handleBack} />;
  }

  return (
    <Home 
      onSearch={handleSearch} 
      isLoading={isFetching} 
      error={displayError} 
    />
  );
}
