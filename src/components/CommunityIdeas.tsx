import React from 'react';
import { TradingIdea } from '../types';
import { MessageSquare, Flame } from 'lucide-react';

interface CommunityIdeasProps {
  ideas: TradingIdea[];
  activeTab: "Editors' picks" | 'Popular' | 'More';
  onSelectTab: (tab: "Editors' picks" | 'Popular' | 'More') => void;
  onSelectIdea: (idea: TradingIdea) => void;
  onLikeIdea: (ideaId: string, e: React.MouseEvent) => void;
  onShowAllToggle: () => void;
  showAll: boolean;
  onPublishClick: () => void;
}

export const CommunityIdeas: React.FC<CommunityIdeasProps> = ({
  ideas,
  activeTab,
  onSelectTab,
  onSelectIdea,
  onLikeIdea,
  onShowAllToggle,
  showAll,
  onPublishClick
}) => {
  const tabs: ("Editors' picks" | 'Popular' | 'More')[] = ["Editors' picks", 'Popular', 'More'];

  const filteredIdeas = ideas.filter((idea) => {
    if (activeTab === "Editors' picks") return idea.category === "Editors' picks" || showAll;
    if (activeTab === 'Popular') return idea.category === 'Popular' || idea.likes > 300;
    return true;
  });

  const displayedIdeas = showAll ? filteredIdeas : filteredIdeas.slice(0, 3);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10" data-purpose="community-ideas" id="community">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2a2e39] pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">Community ideas</h2>
          <div className="flex items-center gap-1.5 bg-[#2962ff]/15 text-[#2962ff] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2962ff] animate-ping" />
            <span>Live</span>
          </div>
        </div>

        {/* Filter Sub-tabs & Action */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm font-semibold">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onSelectTab(tab)}
                  className={`pb-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white border-b-2 border-[#2962ff]'
                      : 'text-[#787b86] hover:text-white'
                  }`}
                  type="button"
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <button
            onClick={onPublishClick}
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-full transition-colors cursor-pointer border border-blue-500/20"
            type="button"
          >
            <span>+ Share idea</span>
          </button>
        </div>
      </div>

      {/* Trade Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIdeas.map((idea) => {
          const isLong = idea.type === 'Long';

          return (
            <article
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#131722] border border-[#2a2e39] hover:border-[#434651] rounded-2xl overflow-hidden transition-all duration-200 group flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-black/60"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectIdea(idea);
              }}
            >
              {/* Chart Preview Simulation Container */}
              <div className="relative h-44 bg-[#181b27] overflow-hidden border-b border-[#2a2e39]/60 p-3 select-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-transparent to-transparent z-10 pointer-events-none" />

                {/* Subtle horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-4 opacity-15 pointer-events-none">
                  <div className="w-full border-b border-dashed border-[#787b86]" />
                  <div className="w-full border-b border-dashed border-[#787b86]" />
                  <div className="w-full border-b border-dashed border-[#787b86]" />
                </div>

                {/* Candlestick Simulation Pattern */}
                <div className="flex justify-between items-end h-28 pt-4 px-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  {idea.candlestickPattern.map((candle, idx) => {
                    const isGreen = candle.color === 'green';
                    const colorHex = isGreen ? '#089981' : '#f23645';

                    return (
                      <div key={idx} className="relative flex flex-col items-center">
                        {/* Upper & lower wick */}
                        <div
                          className="w-[1.5px] rounded-sm absolute"
                          style={{
                            height: `${candle.wickBottom}px`,
                            bottom: '0px',
                            backgroundColor: colorHex
                          }}
                        />
                        {/* Real Candlestick Body */}
                        <div
                          className="w-2.5 rounded-[1px] relative z-10 transition-transform group-hover:scale-y-105"
                          style={{
                            height: `${candle.height}px`,
                            marginBottom: `${candle.wickTop}px`,
                            backgroundColor: colorHex
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Pair Badge & Position Tag */}
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  <span className="bg-black/75 backdrop-blur text-white text-xs font-mono font-bold px-2 py-0.5 rounded border border-[#363a45]">
                    {idea.symbolTag}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isLong
                        ? 'bg-[#089981]/20 text-[#089981]'
                        : 'bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {idea.type}
                  </span>
                </div>

                {/* Timeframe tag if available */}
                {idea.timeframe && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-[10px] text-[#868993] bg-[#1e222d]/80 px-1.5 py-0.5 rounded font-mono">
                      {idea.timeframe}
                    </span>
                  </div>
                )}
              </div>

              {/* Content body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#2962ff] transition-colors leading-snug mb-2 line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#787b86] line-clamp-3 leading-relaxed mb-4">
                    {idea.summary}
                  </p>
                </div>

                {/* Author, Time, and Engagement Metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1e222d] text-xs text-[#787b86]">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full ${idea.authorAvatarColor} text-white flex items-center justify-center font-bold text-[10px]`}
                    >
                      {idea.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[#d1d4dc] font-medium">by {idea.author}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Like button */}
                    <button
                      onClick={(e) => onLikeIdea(idea.id, e)}
                      className={`flex items-center gap-1 transition-colors hover:text-amber-400 cursor-pointer ${
                        idea.liked ? 'text-amber-400 font-semibold' : 'text-[#787b86]'
                      }`}
                      title="Boost idea"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px]">{idea.likes}</span>
                    </button>

                    {/* Comments count */}
                    <div className="flex items-center gap-1 text-[#787b86]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px]">{idea.comments.length}</span>
                    </div>

                    <span className="text-[11px]">{idea.timeAgo}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* See All Ideas Button */}
      <div className="text-center mt-10">
        <button
          onClick={onShowAllToggle}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] hover:border-[#363a45] px-6 py-2.5 rounded-full transition-all cursor-pointer"
          type="button"
        >
          <span>{showAll ? 'Show fewer ideas' : "See all editors' picks ideas"}</span>
          <span className="transition-transform group-hover:translate-x-1">{showAll ? '↑' : '→'}</span>
        </button>
      </div>
    </section>
  );
};
