import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Copy, Check, ArrowLeft, ExternalLink } from 'lucide-react';

/**
 * Large preview page for a user's generated CodeCanvas card,
 * providing direct copy codes and action linkages to their full 3D universe.
 */
export default function CardPreview() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('markdown');
  const [copiedTab, setCopiedTab] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const cardUrl = `${apiBaseUrl}/api/card/${username}`;

  const embedCodes = {
    markdown: `![CodeCanvas Universe](${cardUrl})`,
    html: `<img src="${cardUrl}" alt="CodeCanvas Universe" />`,
    url: cardUrl,
  };

  const handleCopy = async (text, tab) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050510] flex flex-col items-center justify-center p-6 overflow-y-auto">
      {/* Background celestial matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-gray-100 transition self-start cursor-pointer bg-transparent border-0 outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        {/* Card Display Box */}
        <div className="w-full glass-panel border border-[#1b1b3a] rounded-2xl p-6 flex flex-col items-center shadow-2xl bg-[#080818]/60 backdrop-blur-md">
          <h2 className="text-lg font-bold font-mono text-gray-100 uppercase tracking-wider mb-2 self-start select-none">
            Card Preview for @{username}
          </h2>
          <p className="text-xs text-gray-400 mb-6 font-mono self-start select-none">
            This card renders dynamically inside your GitHub README using only HTML/CSS.
          </p>

          {/* SVG Frame */}
          <div className="w-full bg-[#020818] border border-[#1b1b3a]/60 rounded-xl p-4 flex items-center justify-center shadow-inner overflow-hidden mb-6">
            <img
              src={cardUrl}
              alt="CodeCanvas GitHub Card"
              className="w-full h-auto max-h-[160px] object-contain rounded-lg"
            />
          </div>

          {/* Tab Selection */}
          <div className="w-full flex border-b border-[#1b1b3a] text-xs font-bold font-mono tracking-wider uppercase mb-4">
            {['markdown', 'html', 'url'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 pb-2 transition-colors text-center cursor-pointer border-0 outline-none ${
                  activeTab === tab
                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-transparent'
                    : 'text-gray-500 hover:text-gray-300 bg-transparent'
                }`}
              >
                {tab === 'url' ? 'Direct URL' : tab}
              </button>
            ))}
          </div>

          {/* Text Code Block */}
          <div className="relative w-full bg-[#050510]/90 border border-[#1b1b3a]/50 rounded-xl p-4 pr-14 font-mono text-xs text-gray-300 break-all leading-normal flex items-center min-h-[56px]">
            <span className="select-all">{embedCodes[activeTab]}</span>
            <button
              onClick={() => handleCopy(embedCodes[activeTab], activeTab)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 transition cursor-pointer"
              title="Copy to clipboard"
            >
              {copiedTab === activeTab ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {copiedTab === activeTab && (
            <span className="text-[10px] font-mono text-green-400 mt-2 self-end animate-pulse">
              Copied to clipboard!
            </span>
          )}
        </div>

        {/* Explore Universe Action Button */}
        <button
          onClick={() => navigate(`/universe/${username}`)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-glow-accent hover:shadow-indigo-500/30 text-sm font-mono tracking-wider uppercase border-0 outline-none"
        >
          <span>View Full 3D Universe</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
