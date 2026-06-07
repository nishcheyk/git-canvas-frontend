import ScrollAnimateWrapper from '../landing/ScrollAnimateWrapper';
import { ShieldCheck, TrendingUp } from 'lucide-react';

export default function StrengthsImprovements({ strengths, recommendations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Strengths */}
      <ScrollAnimateWrapper animationType="slide-left" className="w-full bg-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-green-500/40">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-green-500/10 rounded-lg border border-green-500/30">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">What You're Doing Right</h3>
        </div>
        <ul className="space-y-4">
          {strengths.map((str, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>{str}</span>
            </li>
          ))}
        </ul>
      </ScrollAnimateWrapper>

      {/* Recommendations */}
      <ScrollAnimateWrapper animationType="slide-right" className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-indigo-500/40">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white">How to Actually Get Hired</h3>
        </div>
        <ul className="space-y-4">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
              <span className="text-indigo-400 font-bold mt-0.5">→</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </ScrollAnimateWrapper>
    </div>
  );
}
