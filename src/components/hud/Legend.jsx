import { LANGUAGE_COLORS } from '../../lib/colors';

/**
 * Sidebar overlay explaining the language-to-color celestial mapping rules.
 */
export default function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-10 p-4 rounded-xl bg-[#080818]/70 border border-[#1b1b3a] backdrop-blur-md shadow-lg pointer-events-auto max-h-[35vh] overflow-y-auto w-40 flex flex-col">
      <h3 className="text-[10px] font-bold text-gray-500 font-mono tracking-wider uppercase mb-3 select-none">
        Language Key
      </h3>
      
      <div className="space-y-2.5 overflow-y-auto pr-1">
        {Object.entries(LANGUAGE_COLORS)
          .filter(([lang]) => lang !== 'Unknown')
          .map(([lang, color]) => (
            <div 
              key={lang} 
              className="flex items-center gap-2.5 text-xs font-mono select-none"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-glow"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}80`
                }}
              />
              <span className="text-gray-300 truncate">{lang}</span>
            </div>
          ))
        }
        {/* Fallback unknown marker */}
        <div className="flex items-center gap-2.5 text-xs font-mono select-none">
          <span 
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0 bg-gray-500"
            style={{ boxShadow: '0 0 6px #66666680' }}
          />
          <span className="text-gray-400">Others</span>
        </div>
      </div>
    </div>
  );
}
