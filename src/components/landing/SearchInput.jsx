import { useState } from 'react';
import { Search, Rocket } from 'lucide-react';

/**
 * Interactive search console featuring hover glow triggers and submission controls.
 */
export default function SearchInput({ onSearch, isLoading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && !isLoading) {
      onSearch(username.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto px-4 z-10 relative group"
    >
      {/* Outer gradient glow shadow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-md opacity-25 group-hover:opacity-45 transition duration-500" />
      
      <div className="relative flex w-full bg-[#080818]/90 border border-indigo-900/40 hover:border-indigo-500/50 focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/40 rounded-xl overflow-hidden transition-all duration-300 shadow-2xl">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          disabled={isLoading}
          className="w-full px-5 py-4 bg-transparent outline-none text-gray-100 font-mono text-sm placeholder-gray-600 disabled:opacity-50"
        />
        
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group/btn"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Rocket className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
