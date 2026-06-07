import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import { RotateCcw, AlertTriangle } from 'lucide-react';

/**
 * DemoSection renders the live SVG metric preview card.
 * Integrates an animated cosmic spinner loading stage, fallback retry pathways,
 * and standard error cards to resolve asleep/rate-limited APIs.
 */
export default function DemoSection() {
  const backendBaseUrl = import.meta.env.VITE_API_URL || 'https://codecanvas-backend.onrender.com';
  const demoUrl = `${backendBaseUrl}/api/card/nishcheyk`;

  const [imgState, setImgState] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [currentSrc, setCurrentSrc] = useState(demoUrl);

  // Reset states when the base URL configuration changes
  useEffect(() => {
    setImgState('loading');
    setCurrentSrc(demoUrl);
  }, [demoUrl]);

  const handleImageLoad = () => {
    setImgState('loaded');
  };

  const handleImageError = () => {
    setImgState('error');
  };

  const handleRetry = () => {
    setImgState('loading');
    // Append timestamp cache-buster to bypass any caching headers on retry
    setCurrentSrc(`${demoUrl}?t=${Date.now()}`);
  };

  return (
    <section id="demo-section" className="w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center bg-[#050510] select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-loader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(0.85); opacity: 0.45; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        .animate-spin-loader {
          animation: spin-loader 4s linear infinite;
        }
        .animate-pulse-core {
          animation: pulse-core 2s ease-in-out infinite;
        }
      `}} />

      <ScrollAnimateWrapper className="w-full max-w-4xl flex flex-col items-center">
        {/* Headings */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-3">
          See It In <span className="text-indigo-500">Action</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-lg mb-16 leading-relaxed">
          Every repository becomes a planet. Your commit history becomes a galaxy.
        </p>

        {/* Live Card Container */}
        <ScrollAnimateWrapper 
          animationType="parallax"
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20"
        >
          
          {/* Green Live Dot Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/35 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            <span className="text-[9px] font-mono font-bold text-green-400 uppercase tracking-widest leading-none">Live API</span>
          </div>

          {/* SVG Frame / Loading Area */}
          <div className="w-full bg-[#020308] border border-indigo-950/40 rounded-xl p-3 flex flex-col items-center justify-center overflow-x-auto min-h-[180px] shadow-inner mt-4 relative">
            
            {/* Loader UI */}
            {imgState === 'loading' && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020308] z-10 gap-4">
                 <div className="relative flex items-center justify-center w-16 h-16">
                   {/* Outer orbit */}
                   <div className="absolute w-14 h-14 border border-dashed border-indigo-500/40 rounded-full animate-spin-loader" />
                   {/* Inner orbit */}
                   <div className="absolute w-9 h-9 border border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
                   {/* Central glowing core */}
                   <div className="w-5 h-5 rounded-full bg-indigo-500 shadow-glow-accent animate-pulse-core" />
                 </div>
                 <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest animate-pulse mt-2">
                   Scanning space metrics...
                 </span>
               </div>
            )}

            {/* Error UI */}
            {imgState === 'error' && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020308] z-10 gap-3 px-4 text-center">
                 <AlertTriangle className="w-7 h-7 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-bounce" />
                 <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                   Cosmic Scan Offline
                 </span>
                 <p className="text-[10px] text-gray-500 max-w-xs leading-normal">
                   The API server took too long to resolve or rate limits were exceeded.
                 </p>
                 <button
                   onClick={handleRetry}
                   className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-900/40 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 transition-all font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer outline-none"
                 >
                   <RotateCcw className="w-3 h-3" />
                   <span>Retry Scan</span>
                 </button>
               </div>
            )}

            {/* Image (Visible once loaded) */}
            <img
              src={currentSrc}
              alt="Nishchey GitHub Universe Card Preview"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`min-w-[760px] md:min-w-0 w-full h-auto max-h-[180px] object-contain rounded-lg bg-[#020308] transition-opacity duration-500 ${
                imgState === 'loaded' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Caption */}
          <p className="text-center text-[10px] md:text-xs font-mono text-gray-500 mt-6 tracking-wide">
            Nishchey's GitHub Universe — generated live
          </p>
        </ScrollAnimateWrapper>
      </ScrollAnimateWrapper>
    </section>
  );
}
