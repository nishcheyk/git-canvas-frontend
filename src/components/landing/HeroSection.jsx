import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import Hero from './Hero';
import SearchInput from './SearchInput';

export default function HeroSection({ onSearch, isLoading, error }) {
  const suggestions = ['nishcheyk'];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen pt-24 pb-20 px-6 md:px-12 flex flex-col items-center justify-center bg-space-bg overflow-hidden select-none"
    >
      {/* Self-contained CSS Floating animations & responsive overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(-20px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(-12px); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 9s ease-in-out infinite;
        }
        #hero-section h1 {
          font-size: clamp(1.8rem, 8vw, 4.5rem) !important;
          line-height: 1.15 !important;
          white-space: normal;
          overflow-wrap: break-word;
        }
      `}} />

      {/* Background celestial grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating planets (CSS keyframe animated circles) */}
      <div className="absolute top-[20%] left-[10%] w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-float-fast pointer-events-none" />

      <ScrollAnimateWrapper className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8 text-center">
        <Hero />
        
        {/* Search Console */}
        <div className="w-full">
          <SearchInput onSearch={onSearch} isLoading={isLoading} />
        </div>

        {/* Suggestion Quick Tags */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-2 select-none">
          <span>Try:</span>
          {suggestions.map((name) => (
            <button
              key={name}
              onClick={() => onSearch(name)}
              className="text-indigo-400 hover:text-indigo-300 hover:underline transition transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              {name}
            </button>
          ))}
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="text-red-400 font-mono text-xs text-center border border-red-500/25 bg-red-950/20 px-4 py-2.5 rounded-lg animate-fade-in max-w-sm mt-4">
            {error.data?.detail || error.message || 'Error scanning the developer universe. Please check the spelling or rate limit.'}
          </div>
        )}
      </ScrollAnimateWrapper>
    </section>
  );
}
