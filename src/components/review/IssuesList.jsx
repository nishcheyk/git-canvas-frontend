import ScrollAnimateWrapper from '../landing/ScrollAnimateWrapper';
import { Flame } from 'lucide-react';

export default function IssuesList({ weaknesses }) {
  return (
    <ScrollAnimateWrapper animationType="fade-up" delay={0.4} className="w-full bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-red-500/40">
      <div className="flex items-center justify-between mb-6 border-b border-red-500/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/30">
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">The Roast</h3>
            <p className="text-xs font-mono text-red-400/70 uppercase tracking-widest mt-1">Brutal Honesty Mode</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {weaknesses.map((weakness, i) => (
          <ScrollAnimateWrapper 
            key={i} 
            animationType="stagger" 
            delay={i * 0.1}
            className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 transition-colors hover:bg-red-500/10"
          >
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/30">
              <span className="text-red-400 text-xs font-bold font-mono">{i + 1}</span>
            </div>
            <p className="text-sm md:text-base text-red-200/90 leading-relaxed">
              {weakness}
            </p>
          </ScrollAnimateWrapper>
        ))}
      </div>
    </ScrollAnimateWrapper>
  );
}
