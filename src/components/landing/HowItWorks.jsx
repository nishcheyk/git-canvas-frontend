import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import { Search, Sparkles, Copy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Search className="w-6 h-6 text-indigo-400" />,
      title: 'Enter Username',
      description: 'Input your GitHub profile name to scan your codebase metadata and statistics.'
    },
    {
      number: '02',
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: 'Generate Universe',
      description: 'Watch your repositories instantly render into a 3D animated solar system map.'
    },
    {
      number: '03',
      icon: <Copy className="w-6 h-6 text-indigo-400" />,
      title: 'Copy Embed Code',
      description: 'Grab the Markdown snippet and paste it to showcase your galaxy live on your README.'
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center select-none bg-space-bg">
      <ScrollAnimateWrapper className="w-full max-w-5xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-3">
          How It <span className="text-indigo-500">Works</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-lg mb-16 leading-relaxed">
          Showcase your open source activity in three simple steps.
        </p>

        {/* Steps container */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden md:block absolute top-[5.25rem] left-[15%] right-[15%] h-[2px] z-0 pointer-events-none">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <ScrollAnimateWrapper animationType="svg-line">
                <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(49, 46, 129, 0.6)" strokeWidth="2" strokeDasharray="6 6" />
              </ScrollAnimateWrapper>
            </svg>
          </div>

          {steps.map((step, idx) => (
            <ScrollAnimateWrapper
              key={idx}
              animationType="stagger"
              delay={idx * 0.2}
              className="relative bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-start z-10 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              {/* Step number badge */}
              <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider bg-indigo-950/45 px-2.5 py-1 rounded-full border border-indigo-900/35 mb-6">
                Step {step.number}
              </span>

              {/* Icon */}
              <div className="p-3 bg-[#0a0a20] rounded-xl border border-indigo-500/25 mb-4 shadow-inner">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.description}</p>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </ScrollAnimateWrapper>
    </section>
  );
}
