import { ArrowLeft, Star, Code, FolderGit, Share2 } from 'lucide-react';

/**
 * Top HUD navigation overlay showing aggregate statistics and quick exit controls.
 */
export default function StatsBar({ onBack, stats, user, onEmbedClick }) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none select-none">
      
      {/* Return button and active target user */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          onClick={onBack}
          title="Return to Search"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#080818]/70 border border-[#1b1b3a] hover:border-indigo-500/80 hover:text-indigo-400 text-gray-100 transition-all cursor-pointer backdrop-blur-md shadow-lg border-0 outline-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#080818]/70 border border-[#1b1b3a] backdrop-blur-md shadow-lg">
          <img 
            src={user.avatar_url} 
            alt="user avatar" 
            className="w-5.5 h-5.5 rounded-full border border-indigo-500/50 object-cover"
          />
          <span className="font-mono text-xs font-bold text-gray-200 tracking-wide">{user.login}</span>
        </div>
      </div>
      
      {/* Stats and Embed Button */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Aggregated galaxy statistics */}
        <div className="flex items-center gap-5 px-5 py-2 rounded-xl bg-[#080818]/70 border border-[#1b1b3a] backdrop-blur-md shadow-lg w-fit">
          {/* Star aggregate */}
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">Stars</span>
              <span className="text-xs font-mono font-bold text-gray-200 mt-0.5">{stats.total_stars}</span>
            </div>
          </div>
          
          <div className="h-5 w-px bg-indigo-900/35" />
          
          {/* Repo aggregate */}
          <div className="flex items-center gap-2.5">
            <FolderGit className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">Repos</span>
              <span className="text-xs font-mono font-bold text-gray-200 mt-0.5">{stats.total_repos}</span>
            </div>
          </div>
          
          <div className="h-5 w-px bg-indigo-900/35" />
          
          {/* Top language aggregate */}
          <div className="flex items-center gap-2.5">
            <Code className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">Top Lang</span>
              <span className="text-xs font-mono font-bold text-gray-200 mt-0.5">{stats.top_language}</span>
            </div>
          </div>
        </div>

        {/* Share/Embed Action Button */}
        <button
          onClick={onEmbedClick}
          title="Share or embed this universe"
          className="flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-[#080818]/70 border border-[#1b1b3a] hover:border-indigo-500/80 hover:text-indigo-400 text-gray-100 font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg border-0 outline-none"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Embed</span>
        </button>
      </div>
    </div>
  );
}
