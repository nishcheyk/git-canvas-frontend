import { useState, useEffect } from 'react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import { Copy, Check, RotateCcw, AlertTriangle } from 'lucide-react';

/**
 * EmbedSection renders instructions and interactive copy-markdown inputs
 * along with a live preview card with loader/error configurations.
 */
export default function EmbedSection() {
  const [username, setUsername] = useState('nishcheyk');
  const [copied, setCopied] = useState(false);

  const displayUser = username.trim() || 'YOUR_USERNAME';
  const backendBaseUrl = import.meta.env.VITE_API_URL || 'https://codecanvas-backend.onrender.com';
  const embedCode = `![CodeCanvas](${backendBaseUrl}/api/card/${displayUser})`;
  const cardPreviewUrl = `${backendBaseUrl}/api/card/${username.trim() || 'nishcheyk'}`;

  const [imgState, setImgState] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [currentSrc, setCurrentSrc] = useState(cardPreviewUrl);
  const [fallbackCount, setFallbackCount] = useState(0);

  // Trigger loading when preview URL changes (as user types)
  useEffect(() => {
    setImgState('loading');
    setCurrentSrc(cardPreviewUrl);
    setFallbackCount(0);
  }, [cardPreviewUrl]);

  const handleImageLoad = () => {
    setImgState('loaded');
  };

  const handleImageError = () => {
    if (fallbackCount === 0) {
      setFallbackCount(1);
      // Fallback username check in case backend is asleep/building
      setCurrentSrc(`${backendBaseUrl}/api/card/nishcheyk`);
    } else {
      setImgState('error');
    }
  };

  const handleRetry = () => {
    setImgState('loading');
    setFallbackCount(0);
    setCurrentSrc(`${cardPreviewUrl}?t=${Date.now()}`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="embed-section" className="w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center bg-space-bg">
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

      <ScrollAnimateWrapper className="w-full max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-3">
          Add To Your GitHub <span className="text-indigo-500">README</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-lg mb-12 leading-relaxed">
          One line. Your entire developer journey, animated.
        </p>

        {/* Input panel & terminal */}
        <ScrollAnimateWrapper animationType="spotlight" className="w-full bg-[#0a0a1a] border border-indigo-500/30 rounded-xl p-6 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-indigo-950/65 pb-4 select-none">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-[10px] font-mono text-gray-500 ml-2 uppercase tracking-widest">embed_terminal.sh</span>
          </div>

          {/* Username Input Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              1. Type Your Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
              placeholder="e.g. nishcheyk"
              className="w-full bg-[#04040d] border border-indigo-900/40 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/70 transition-colors"
            />
          </div>

          {/* Code Output Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              2. Copy Code Block
            </label>
            <div className="relative w-full bg-[#04040d] border border-indigo-900/40 rounded-lg p-4 pr-16 flex items-center min-h-[50px] overflow-x-auto">
              <span className="font-mono text-xs text-indigo-400 break-all select-all whitespace-nowrap">
                {embedCode}
              </span>
              <button
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 transition cursor-pointer"
                title="Copy snippet"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Visual Live Preview */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider select-none">
              3. Live Preview
            </label>
            <div className="w-full bg-[#02040a] border border-indigo-950/50 rounded-lg p-2.5 flex items-center justify-start md:justify-center overflow-x-auto min-h-[140px] select-none relative">
              
              {/* Loader UI */}
              {imgState === 'loading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#02040a] z-10 gap-4">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#02040a] z-10 gap-3 px-4 text-center">
                  <AlertTriangle className="w-7 h-7 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-bounce" />
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    Preview Offline
                  </span>
                  <p className="text-[10px] text-gray-500 max-w-xs leading-normal">
                    Unable to fetch preview. Please check username spelling or retry.
                  </p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-900/40 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 transition-all font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer outline-none"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry Preview</span>
                  </button>
                </div>
              )}

              {/* Preview Image */}
              <img
                src={currentSrc}
                alt="CodeCanvas README Card Preview"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`min-w-[760px] md:min-w-0 w-full h-auto max-h-[160px] object-contain rounded-lg shadow-inner bg-[#02040a] transition-opacity duration-500 ${
                  imgState === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </ScrollAnimateWrapper>
      </ScrollAnimateWrapper>
    </section>
  );
}
