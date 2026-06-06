/**
 * Hero display header for the landing index.
 */
export default function Hero() {
  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto px-4 select-none">
      {/* Visual Badge overlay */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/35 bg-indigo-500/5 text-indigo-400 text-xs font-mono tracking-widest uppercase shadow-glow-accent mb-2 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block" />
        <span>3D Solar System Aggregator</span>
      </div>
      
      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 pb-2">
        CodeCanvas
      </h1>
      
      {/* Tagline */}
      <p className="text-base md:text-lg text-gray-400 font-sans tracking-wide leading-relaxed">
        Map your repository profile metrics into a rotating WebGL universe. 
        Planet size maps to popularity, orbits represent update times, and colors identify coding languages.
      </p>
    </div>
  );
}
