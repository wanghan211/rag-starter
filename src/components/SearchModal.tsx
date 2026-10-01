import React, { useState, useEffect, useRef } from 'react';
import { TickerInfo, TradingIdea } from '../types';
import { Search, X, TrendingUp, TrendingDown, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: TickerInfo[];
  ideas: TradingIdea[];
  onSelectTicker: (ticker: TickerInfo) => void;
  onSelectIdea: (idea: TradingIdea) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  ideas,
  onSelectTicker,
  onSelectIdea
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Stocks' | 'Crypto' | 'Forex' | 'Indices' | 'Ideas'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  // Filtered Tickers
  const matchingTickers = tickers.filter((t) => {
    if (activeFilter === 'Ideas') return false;
    if (activeFilter === 'Stocks' && t.category !== 'Major indices') return false;
    if (activeFilter === 'Crypto' && t.category !== 'Crypto market cap' && t.category !== 'Bitcoin dominance') return false;
    if (activeFilter === 'Forex' && t.category !== 'US Dollar index') return false;
    if (activeFilter === 'Indices' && t.category !== 'Major indices' && t.category !== 'Bitcoin dominance') return false;

    if (!normalized) return true;
    return (
      t.symbol.toLowerCase().includes(normalized) ||
      t.name.toLowerCase().includes(normalized) ||
      t.exchange.toLowerCase().includes(normalized)
    );
  });

  // Filtered Ideas
  const matchingIdeas = ideas.filter((idea) => {
    if (activeFilter !== 'All' && activeFilter !== 'Ideas') return false;
    if (!normalized) return activeFilter === 'Ideas';
    return (
      idea.title.toLowerCase().includes(normalized) ||
      idea.symbolTag.toLowerCase().includes(normalized) ||
      idea.author.toLowerCase().includes(normalized)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#131722] border border-[#2a2e39] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2a2e39] bg-[#0c0e14] gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbols, indices, crypto, or community ideas..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#787b86] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787b86] hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] bg-[#1e222d] text-[#868993] px-2 py-1 rounded font-mono border border-[#363a45]">
            ESC
          </span>
        </div>

        {/* Filter Categories Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#181b27] border-b border-[#2a2e39] overflow-x-auto hide-scrollbar text-xs">
          {(['All', 'Stocks', 'Crypto', 'Forex', 'Indices', 'Ideas'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#2a2e39] text-white font-semibold'
                  : 'text-[#787b86] hover:text-white'
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#1e222d] p-2">
          {matchingTickers.length === 0 && matchingIdeas.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#787b86]">
              No instruments or trade ideas found matching "{query}".
            </div>
          ) : (
            <>
              {/* Tickers List */}
              {matchingTickers.map((ticker) => {
                const isPos = ticker.changePercent >= 0;
                return (
                  <div
                    key={ticker.symbol}
                    onClick={() => {
                      onSelectTicker(ticker);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1e222d] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#181b27] border border-[#2a2e39] flex items-center justify-center font-bold text-xs text-white group-hover:border-blue-500/50">
                        {ticker.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                            {ticker.symbol}
                          </span>
                          <span className="text-[10px] text-[#868993] bg-[#2a2e39] px-1.5 py-0.2 rounded font-mono">
                            {ticker.exchange}
                          </span>
                        </div>
                        <div className="text-xs text-[#787b86] truncate max-w-xs">{ticker.name}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-white font-mono">
                        ${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-xs font-mono font-semibold flex items-center justify-end gap-1 ${
                          isPos ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>
                          {isPos ? '+' : ''}
                          {ticker.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Ideas List */}
              {matchingIdeas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => {
                    onSelectIdea(idea);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1e222d] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                          {idea.symbolTag}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            idea.type === 'Long'
                              ? 'bg-[#089981]/20 text-[#089981]'
                              : 'bg-[#f23645]/20 text-[#f23645]'
                          }`}
                        >
                          {idea.type}
                        </span>
                        <span className="text-xs text-[#787b86]">by {idea.author}</span>
                      </div>
                      <div className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors mt-0.5 line-clamp-1">
                        {idea.title}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-amber-400 font-mono flex items-center gap-1">
                    <span>★ {idea.likes}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer shortcuts tip */}
        <div className="px-4 py-2.5 bg-[#0c0e14] border-t border-[#2a2e39] text-[11px] text-[#787b86] flex justify-between items-center">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
