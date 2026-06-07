import { useState } from 'react';
import { LANGUAGE_COLORS, getLangClassName } from '../../lib/colors';

/**
 * Sidebar overlay explaining the celestial mapping rules and language color key.
 */
export default function Legend() {
  const [activeTab, setActiveTab] = useState('languages'); // 'languages' | 'mechanics'

  return (
    <div className="absolute bottom-4 left-4 z-10 p-4 rounded-xl bg-[#080818]/85 border border-[#1b1b3a] backdrop-blur-md shadow-2xl pointer-events-auto max-h-[45vh] w-64 flex flex-col transition-all duration-300">
      {/* Sleek Tab Bar */}
      <div className="flex border-b border-[#1b1b3a] mb-3 pb-1 text-[10px] font-bold font-mono tracking-wider uppercase">
        <button
          onClick={() => setActiveTab('languages')}
          className={`flex-1 pb-1.5 transition-colors text-center ${
            activeTab === 'languages' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Languages
        </button>
        <button
          onClick={() => setActiveTab('mechanics')}
          className={`flex-1 pb-1.5 transition-colors text-center ${
            activeTab === 'mechanics' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          System Rules
        </button>
      </div>

      {activeTab === 'languages' ? (
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 custom-scrollbar">
          {Object.entries(LANGUAGE_COLORS)
            .filter(([lang]) => lang !== 'Unknown')
            .map(([lang]) => (
              <div 
                key={lang} 
                className="flex items-center gap-2.5 text-xs font-mono select-none"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block shrink-0 lang-color-${getLangClassName(lang)} lang-dot`}
                />
                <span className="text-gray-300 capitalize">{lang}</span>
              </div>
            ))
          }
          {/* Fallback unknown marker */}
          <div className="flex items-center gap-2.5 text-xs font-mono select-none">
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0 lang-color-unknown lang-dot"
            />
            <span className="text-gray-400">Others</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 text-xs font-mono text-gray-300 select-none custom-scrollbar">
          <div className="border-b border-[#1b1b3a]/50 pb-2">
            <div className="flex items-center gap-1.5 text-yellow-500 font-semibold mb-1">
              <span>☀️</span>
              <span>Central Sun</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              Represents your GitHub profile and avatar at the center of the universe.
            </p>
          </div>

          <div className="border-b border-[#1b1b3a]/50 pb-2">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1">
              <span>🪐</span>
              <span>Planet Size</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              Determined by repository popularity (stars, forks, and codebase size).
            </p>
          </div>

          <div className="border-b border-[#1b1b3a]/50 pb-2">
            <div className="flex items-center gap-1.5 text-purple-400 font-semibold mb-1">
              <span>🛰️</span>
              <span>Orbit Radius</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              Recency of updates. Active repositories orbit closest to the Sun; inactive ones drift outward.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-green-400 font-semibold mb-1">
              <span>🚀</span>
              <span>Orbit Speed</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              Keplerian dynamics: inner planets travel faster, outer planets move slower.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
