import { motion } from 'framer-motion';
import { X, Star, GitFork, ExternalLink, Calendar, Database } from 'lucide-react';
import { getLangClassName } from '../../lib/colors';

/**
 * Slide-out HUD detail panel inspector that renders repository stats.
 * Uses Framer Motion spring layouts.
 */
export default function RepoPanel({ planet, onClose }) {
  if (!planet) return null;

  // Render nicely formatted dates
  const formattedDate = planet.updated_at
    ? new Date(planet.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  // Format file size indicators
  const formattedSize = planet.size > 1024 
    ? `${(planet.size / 1024).toFixed(1)} MB` 
    : `${planet.size} KB`;

  return (
    <div className="absolute top-20 right-4 bottom-4 z-10 w-full max-w-sm pointer-events-none">
      <motion.div
        initial={{ x: '110%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '110%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 190 }}
        className="w-full h-full glass-panel rounded-2xl border border-[#1b1b3a] p-6 flex flex-col pointer-events-auto shadow-2xl relative overflow-y-auto"
      >
        {/* Exit Button */}
        <button
          onClick={onClose}
          title="Close details"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 hover:bg-white/5 p-1.5 rounded-lg transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Coded language badge */}
        <div className="mt-2 flex">
          <span 
            className={`text-[9px] font-mono font-bold px-3 py-1 rounded-full text-white/95 uppercase tracking-wider lang-color-${getLangClassName(planet.language)} lang-badge`}
          >
            {planet.language}
          </span>
        </div>

        {/* Repository Name */}
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-100 tracking-tight mt-4 break-words">
          {planet.name}
        </h2>

        {/* Stars and Forks widgets */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="p-3 bg-[#050510]/50 border border-indigo-900/20 rounded-xl flex items-center gap-2.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/10" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-500 uppercase leading-none">Stars</span>
              <span className="text-sm font-mono font-bold text-gray-200 mt-1">{planet.stars}</span>
            </div>
          </div>

          <div className="p-3 bg-[#050510]/50 border border-indigo-900/20 rounded-xl flex items-center gap-2.5">
            <GitFork className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-500 uppercase leading-none">Forks</span>
              <span className="text-sm font-mono font-bold text-gray-200 mt-1">{planet.forks}</span>
            </div>
          </div>
        </div>

        {/* Project Description info */}
        <div className="mt-6 flex-1">
          <h4 className="text-[10px] font-mono font-bold text-gray-500 tracking-wider uppercase mb-2">Description</h4>
          <p className="text-gray-300 text-sm font-sans leading-relaxed pr-1 max-h-[30vh] overflow-y-auto">
            {planet.description || 'No description provided for this repository.'}
          </p>
        </div>

        {/* Meta file indicators */}
        <div className="mt-6 pt-4 border-t border-indigo-900/25 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Updated
            </span>
            <span className="text-gray-300">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Size
            </span>
            <span className="text-gray-300">{formattedSize}</span>
          </div>
        </div>

        {/* Visit External Codebase button */}
        <a
          href={planet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-glow-accent hover:shadow-indigo-500/30 text-sm"
        >
          <span>Explore Codebase</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
