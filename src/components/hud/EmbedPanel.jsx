import { useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import HudPanelWrapper from './HudPanelWrapper';

/**
 * Slide-up HUD panel that provides Markdown, HTML, and raw image URLs
 * to embed the CodeCanvas card in GitHub Profile READMEs.
 * Uses HudPanelWrapper for unified transitions and styles.
 */
export default function EmbedPanel({ username, onClose }) {
  const [activeTab, setActiveTab] = useState('markdown'); // 'markdown' | 'html' | 'url'
  const [copiedTab, setCopiedTab] = useState(null); // 'markdown' | 'html' | 'url' | null

  // Determine API base URL
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const cardUrl = `${apiBaseUrl}/api/card/${username}`;
  
  // Create embed codes
  const embedCodes = {
    markdown: `![CodeCanvas Universe](${cardUrl})`,
    html: `<img src="${cardUrl}" width="800" alt="CodeCanvas Universe" />`,
    url: cardUrl,
  };

  const handleCopy = async (text, tab) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg pointer-events-none px-4">
      <HudPanelWrapper
        direction="bottom"
        className="w-full p-5 overflow-hidden backdrop-blur-lg bg-space-dark/90 border-space-border"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 hover:bg-white/5 p-1.5 rounded-lg transition cursor-pointer"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-sm font-bold text-gray-100 font-mono uppercase tracking-wider mb-1">
          Share Your Universe
        </h3>
        <p className="text-[10px] text-gray-400 mb-4 font-mono">
          Embed this dynamic card in your GitHub Profile README.
        </p>

        {/* Live Card Preview */}
        <div className="w-full bg-space-dark border border-space-border/60 rounded-xl p-2.5 mb-4 flex items-center justify-center min-h-[100px] overflow-hidden">
          <img
            src={cardUrl}
            alt="CodeCanvas Card Preview"
            className="w-full h-auto max-h-[110px] rounded-lg object-contain bg-space-dark"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${apiBaseUrl}/api/card/nishcheyk`; // Fallback image check
            }}
          />
        </div>

        {/* Tab System */}
        <div className="flex border-b border-space-border text-[10px] font-bold font-mono tracking-wider uppercase mb-3">
          {['markdown', 'html', 'url'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2 transition-colors text-center cursor-pointer ${
                activeTab === tab
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'url' ? 'Direct URL' : tab}
            </button>
          ))}
        </div>

        {/* Embed Output with Copy Button */}
        <div className="relative bg-space-bg/80 border border-space-border/40 rounded-xl p-3 pr-12 font-mono text-xs text-gray-300 break-all leading-normal min-h-[48px] flex items-center">
          <span className="select-all pr-2">{embedCodes[activeTab]}</span>
          <button
            onClick={() => handleCopy(embedCodes[activeTab], activeTab)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 transition cursor-pointer"
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
            Snippet copied to clipboard!
          </span>
        )}

        {/* Action Link to Preview */}
        <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500">
          <span>Updates automatically with your activity</span>
          <a
            href={`/preview/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 hover:underline transition"
          >
            <span>Open preview page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </HudPanelWrapper>
    </div>
  );
}
