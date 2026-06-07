import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import { ExternalLink } from 'lucide-react';

export default function AboutSection() {
  const stackTags = ['React', 'FastAPI', 'Three.js', 'Qdrant'];

  return (
    <section id="about-section" className="w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center bg-space-bg select-none">
      <ScrollAnimateWrapper className="w-full max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-16">
          Built by a Developer, for <span className="text-indigo-500">Developers</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Description Column */}
          <ScrollAnimateWrapper animationType="slide-left" className="md:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-white">Why CodeCanvas?</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              As developers, we commit code, review pull requests, and deploy code daily. But our GitHub profile pages have looked the same for a decade—just static text and green grid squares. 
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              CodeCanvas was built to bring your developer stats to life. By mapping your repositories to orbiting planets, commit frequencies to orbital velocity, and repository size to planet dimensions, we render your entire coding universe into a stunning 3D graphic system.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              The platform is built on modern stacks. It uses **React** for user controls, **FastAPI** on the backend to dynamically serve caching SVG profile cards, and **Three.js** to construct the interactive WebGL cosmos.
            </p>
          </ScrollAnimateWrapper>

          {/* Right Builder Badge Column */}
          <ScrollAnimateWrapper animationType="slide-right" className="md:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20">
              {/* Creator details */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full border-2 border-indigo-500/35 overflow-hidden bg-indigo-950/20">
                  <img
                    src="https://avatars.githubusercontent.com/u/84687611?v=4"
                    alt="Nishchey Khajuria"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://github.com/github.png';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-tight">Nishchey Khajuria</h4>
                  <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest mt-1">Full Stack Developer</p>
                </div>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                I enjoy building interactive graphics interfaces, developer tooling, and APIs. Let's connect and share what we're working on next!
              </p>

              {/* Stacks */}
              <div className="flex flex-wrap gap-2 mb-8">
                {stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider bg-indigo-950/30 border border-indigo-900/35 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <a
                  href="https://github.com/nishcheyk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </a>

                <a
                  href="https://linkedin.com/in/nishchey-khajuria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </a>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </ScrollAnimateWrapper>
    </section>
  );
}
