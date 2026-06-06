import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { clearSelectedPlanet } from '../store/slices/universeSlice';
import UniverseCanvas from '../components/canvas/Universe';
import StatsBar from '../components/hud/StatsBar';
import Legend from '../components/hud/Legend';
import RepoPanel from '../components/hud/RepoPanel';

/**
 * 3D visual workspace page layout, composing the WebGL graphics canvas
 * and modern overlay HUD grids (Stats, Legend, sliding inspectors).
 */
export default function UniversePage({ data, onBack }) {
  const dispatch = useDispatch();
  const selectedPlanet = useSelector((state) => state.universe.selectedPlanet);

  const handleClosePanel = () => {
    dispatch(clearSelectedPlanet());
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050510] overflow-hidden">
      {/* Main 3D graphic layers */}
      <UniverseCanvas planets={data.planets} avatarUrl={data.user.avatar_url} />

      {/* Top dashboard info widget */}
      <StatsBar onBack={onBack} stats={data.stats} user={data.user} />

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

      {/* Lower navigation tips label */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none select-none text-right">
        <span className="text-[10px] font-mono text-gray-500 bg-[#080818]/60 px-3 py-1.5 rounded-lg border border-[#1b1b3a]/40 backdrop-blur-sm">
          Left Click+Drag: Rotate &bull; Scroll: Zoom &bull; Click Planet to Inspect
        </span>
      </div>
    </div>
  );
}
