import React from 'react';

interface HeroProps {
  onStartFree: () => void;
  onOpenSpaceStory: () => void;
  translations?: {
    headline: string;
    subtitle: string;
    cta: string;
    subCta: string;
    spaceStoryTitle: string;
    spaceStorySub: string;
  };
}

export const Hero: React.FC<HeroProps> = ({
  onStartFree,
  onOpenSpaceStory,
  translations
}) => {
  const content = translations || {
    headline: 'Where the world does\nmarkets',
    subtitle: 'Join 100 million traders and investors taking the future into their own hands.',
    cta: 'Get started for free',
    subCta: '$0 forever, no credit card needed',
    spaceStoryTitle: 'See our space story',
    spaceStorySub: 'With astronaut Scott "Kidd" Poteet'
  };

  return (
    <section
      className="relative min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-between text-center pt-24 pb-14 px-4 bg-gradient-to-b from-black via-black to-[#05070a] overflow-hidden"
      data-purpose="hero"
    >
      {/* Subtle background ambient dot grid overlay matching TradingView */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#1e222d_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-35 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial soft glow behind headline */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-6">
        {/* Main headline with balanced typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 whitespace-pre-line text-balance">
          {content.headline}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#868993] max-w-2xl font-normal leading-relaxed mb-8 text-balance">
          {content.subtitle}
        </p>

        {/* Main Hero CTA Button (Slanted White Pill) */}
        <div className="flex flex-col items-center group">
          <button
            onClick={onStartFree}
            className="tv-slant-btn inline-block bg-white text-black font-bold text-base px-8 py-3.5 rounded-lg shadow-xl shadow-white/5 active:scale-95 cursor-pointer hover:bg-neutral-100"
            type="button"
          >
            <span className="tracking-tight">{content.cta}</span>
          </button>
          <span className="text-xs text-[#5d606b] font-medium mt-3">
            {content.subCta}
          </span>
        </div>
      </div>

      {/* Space Story Floating Badge at Bottom Hero */}
      <div className="relative z-10 mt-16 sm:mt-24">
        <button
          onClick={onOpenSpaceStory}
          className="group flex items-center gap-3 bg-[#131722]/90 hover:bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] rounded-full p-1.5 pr-5 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-blue-500/5 text-left"
          type="button"
        >
          {/* Authentic Astronaut Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#434651] bg-[#1a202c] flex-shrink-0 flex items-center justify-center relative">
            {/* Astronaut helmet icon with visor glare */}
            <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2a7 7 0 0 0-7 7v4a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7z" />
              <path d="M8 11h8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" />
              <path d="M9 19v3M15 19v3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-400/20 to-transparent pointer-events-none rounded-full" />
          </div>

          {/* Text and arrow */}
          <div className="text-left leading-tight">
            <div className="text-white text-xs font-semibold flex items-center gap-1 group-hover:text-blue-400 transition-colors">
              <span>{content.spaceStoryTitle}</span>
              <span className="text-[10px] text-blue-400">▶</span>
            </div>
            <div className="text-[#787b86] text-[11px] font-normal">{content.spaceStorySub}</div>
          </div>
        </button>
      </div>
    </section>
  );
};
