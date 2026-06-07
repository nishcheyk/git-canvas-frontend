export default function Footer() {
  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#03030c] border-t border-white/5 py-12 px-6 md:px-12 select-none">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
        
        {/* Brand layout */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-bold tracking-wider text-white">
            <span className="text-indigo-400 text-lg">✦</span>
            <span className="text-sm font-mono tracking-widest uppercase">CodeCanvas</span>
          </div>
          <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-wide mt-1">
            Your GitHub. Visualized.
          </p>
        </div>

        {/* Navigation center linkages */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] md:text-xs font-mono tracking-wider uppercase">
          <a
            href="#hero-section"
            onClick={handleScrollTo('hero-section')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="https://github.com/nishcheyk/git-canvas-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub (FE)
          </a>
          <a
            href="https://github.com/nishcheyk/git-canvas-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub (BE)
          </a>
          <a
            href="#embed-section"
            onClick={handleScrollTo('embed-section')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Embed
          </a>
          <a
            href="#about-section"
            onClick={handleScrollTo('about-section')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>
        </div>

        {/* Right Author signature */}
        <div className="text-[10px] md:text-xs font-mono text-gray-500 text-center md:text-right">
          Built with <span className="text-indigo-400">🤍</span> by Nishchey
        </div>
      </div>

      {/* Under line credits */}
      <div className="max-w-5xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-gray-600 uppercase tracking-widest gap-4">
        <span>&copy; 2025 CodeCanvas &bull; Open Source</span>
        <span>Made for developers</span>
      </div>
    </footer>
  );
}
