import Hero from '../components/landing/Hero';
import SearchInput from '../components/landing/SearchInput';

/**
 * Main landing page layout. Displays code canvas visual headers,
 * background cosmic depth grid, search inputs, and errors.
 */
export default function Home({ onSearch, isLoading, error }) {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#050510] flex flex-col items-center justify-center overflow-hidden">
      {/* Visual background depth grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Decorative cosmic central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-10 flex flex-col items-center">
        <Hero />
        
        {/* Search Console */}
        <SearchInput onSearch={onSearch} isLoading={isLoading} />
        
        {/* Error notification banner */}
        {error && (
          <div className="text-red-400 font-mono text-xs text-center border border-red-500/25 bg-red-950/20 px-4 py-2.5 rounded-lg animate-fade-in max-w-sm">
            {error.data?.detail || error.message || 'Error scanning the developer universe. Please check the spelling or rate limit.'}
          </div>
        )}
      </div>

      {/* Subtle credits footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-gray-600 select-none">
        CODECANVAS &bull; BUILT FOR ENTERPRISE DEVS
      </div>
    </div>
  );
}
