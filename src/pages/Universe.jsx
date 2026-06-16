import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { clearSelectedPlanet, resetUniverse } from '../store/slices/universeSlice';
import { useGetUniverseByUsernameQuery } from '../store/services/githubApi';
import UniverseCanvas from '../components/canvas/Universe';
import StatsBar from '../components/hud/StatsBar';
import Legend from '../components/hud/Legend';
import RepoPanel from '../components/hud/RepoPanel';
import EmbedPanel from '../components/hud/EmbedPanel';
import Home from './Home';

/**
 * 3D visual workspace page layout, composing the WebGL graphics canvas
 * and modern overlay HUD grids (Stats, Legend, sliding inspectors).
 * Fetches and resolves Github universe data asynchronously.
 */
export default function UniversePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedPlanet = useSelector((state) => state.universe.selectedPlanet);
  const [showEmbedPanel, setShowEmbedPanel] = useState(false);

  const { data, error, isFetching, isError } = useGetUniverseByUsernameQuery(username, {
    skip: !username,
  });

  const handleBack = () => {
    dispatch(resetUniverse());
    navigate('/');
  };

  const handleClosePanel = () => {
    dispatch(clearSelectedPlanet());
  };

  if (isFetching) {
    return (
      <div className="relative w-full h-full min-h-screen bg-[#050510] flex flex-col items-center justify-center overflow-hidden">
        <Helmet>
          <title>Scanning {username}'s Universe | CodeCanvas</title>
        </Helmet>
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
      </div >
    );
  }

  if (isError) {
    const displayError = error
      ? (error.status === 404
        ? { message: `Developer profile "@${username}" not found.` }
        : (error.data?.detail ? { message: error.data.detail } : { message: 'Internal Server Error. Please verify your connection.' }))
      : { message: 'An unexpected error occurred.' };

    return (
      <>
        <Helmet>
          <title>Universe Not Found | CodeCanvas</title>
        </Helmet>
        <Home error={displayError} />
      </>
    );
  }

  if (data && !isError) {
    return (
      <div className="relative w-full h-full min-h-screen bg-[#050510] overflow-hidden">
        <Helmet>
          <title>{username}'s Universe | CodeCanvas</title>
          <meta name="description" content={`Explore ${username}'s GitHub universe! They have ${data.stats.total_stars} stars across ${data.stats.total_repos} repositories.`} />
          <meta property="og:title" content={`${username}'s Universe | CodeCanvas`} />
          <meta property="og:description" content={`Explore ${username}'s GitHub universe! They have ${data.stats.total_stars} stars across ${data.stats.total_repos} repositories.`} />
          <meta property="twitter:title" content={`${username}'s Universe | CodeCanvas`} />
          <meta property="twitter:description" content={`Explore ${username}'s GitHub universe! They have ${data.stats.total_stars} stars across ${data.stats.total_repos} repositories.`} />
        </Helmet>
        {/* Main 3D graphic layers */}
        <UniverseCanvas planets={data.planets} avatarUrl={data.user.avatar_url} />

        {/* Top dashboard info widget */}
        <StatsBar
          onBack={handleBack}
          stats={data.stats}
          user={data.user}
          onEmbedClick={() => setShowEmbedPanel(!showEmbedPanel)}
          onReviewClick={() => navigate(`/review/${username}`)}
        />

        {/* Legend sidebar */}
        <Legend />

        {/* sliding panel details */}
        <AnimatePresence>
          {selectedPlanet && (
            <RepoPanel
              planet={selectedPlanet}
              onClose={handleClosePanel}
            />
          )}
        </AnimatePresence>

        {/* Embed instructions panel */}
        <AnimatePresence>
          {showEmbedPanel && (
            <EmbedPanel
              username={data.user.login}
              onClose={() => setShowEmbedPanel(false)}
            />
          )}
        </AnimatePresence>

        {/* Lower navigation tips label */}
        <div className="hidden sm:block absolute bottom-4 right-4 z-10 pointer-events-none select-none text-right">
          <span className="text-[10px] font-mono text-gray-500 bg-[#080818]/60 px-3 py-1.5 rounded-lg border border-[#1b1b3a]/40 backdrop-blur-sm">
            Left Click+Drag: Rotate &bull; Scroll: Zoom &bull; Click Planet to Inspect
          </span>
        </div>
      </div >
    );
  }

  return null;
}
