import ScrollAnimateWrapper from '../landing/ScrollAnimateWrapper';

export default function ScoreCard({ score, title }) {
  // Determine color based on score
  let colorClass = 'text-red-500';
  if (score >= 80) colorClass = 'text-green-500';
  else if (score >= 50) colorClass = 'text-yellow-500';

  return (
    <ScrollAnimateWrapper animationType="fade-up" delay={0.2} className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full" />
      
      <div className="relative flex items-center justify-center w-40 h-40 mb-6">
        {/* Animated Outer Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="none"
            className="stroke-indigo-500 transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray="465"
            strokeDashoffset={465 - (465 * score) / 100}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Score Text */}
        <div className="flex flex-col items-center justify-center">
          <span className={`text-5xl font-extrabold tracking-tighter ${colorClass}`}>
            {score}
          </span>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
        {title}
      </h2>
    </ScrollAnimateWrapper>
  );
}
