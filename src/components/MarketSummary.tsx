import React, { useState } from 'react';
import { MarketCategory, TickerInfo } from '../types';

interface MarketSummaryProps {
  tickers: TickerInfo[];
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  onSelectTicker: (ticker: TickerInfo) => void;
  flashTickerSymbol?: string | null;
}

export const MarketSummary: React.FC<MarketSummaryProps> = ({
  tickers,
  selectedCategory,
  onSelectCategory,
  onSelectTicker,
  flashTickerSymbol
}) => {
  const categories: MarketCategory[] = [
    'Major indices',
    'Crypto market cap',
    'Bitcoin dominance',
    'US Dollar index',
    'Futures',
    'US 10Y yield'
  ];

  const currentTickers = tickers.filter((t) => t.category === selectedCategory);

  // Helper to build SVG path for sparklines
  const buildSparklinePath = (points: number[], width = 100, height = 30): { linePath: string; areaPath: string } => {
    if (!points || points.length < 2) return { linePath: '', areaPath: '' };
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      // Invert Y so highest value is near top (height 2)
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return { x, y };
    });

    let linePath = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      // Smooth cubic bezier or straight lines
      const prev = coords[i - 1];
      const curr = coords[i];
      const cpX = (prev.x + curr.x) / 2;
      linePath += ` C ${cpX},${prev.y} ${cpX},${curr.y} ${curr.x},${curr.y}`;
    }

    const areaPath = `${linePath} L ${width},${height} L 0 revolutionary L 0,${height} Z`.replace('revolutionary', '');
    const cleanAreaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return { linePath, areaPath: cleanAreaPath };
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10" data-purpose="market-summary" id="markets">
      {/* Section Title & Tabs Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2a2e39] pb-3 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Market summary</h2>
        </div>

        {/* Category Navigation Chips */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 text-xs font-semibold">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#2a2e39] text-white shadow-sm'
                    : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
                }`}
                type="button"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Financial Ticker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {currentTickers.map((ticker) => {
          const isPositive = ticker.changePercent >= 0;
          const strokeColor = isPositive ? '#089981' : '#f23645';
          const isFlashing = flashTickerSymbol === ticker.symbol;
          const { linePath, areaPath } = buildSparklinePath(ticker.sparkline);
          const gradientId = `grad-${ticker.symbol.replace(/[^a-zA-Z0-9]/g, '')}`;

          return (
            <div
              key={ticker.symbol}
              onClick={() => onSelectTicker(ticker)}
              className={`bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between h-36 group relative overflow-hidden ${
                isFlashing ? 'ring-1 ring-blue-500/50' : ''
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectTicker(ticker);
              }}
            >
              {/* Header: Name, Symbol, and Percent Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#787b86] font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                      {ticker.name}
                    </span>
                    <span className="text-[10px] bg-[#1e222d] group-hover:bg-[#2a2e39] text-[#868993] px-1.5 py-0.5 rounded font-mono border border-transparent group-hover:border-[#363a45]">
                      {ticker.symbol}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-white mt-1 font-mono tabular-nums tracking-tight flex items-center gap-2">
                    <span>
                      {ticker.price >= 1000
                        ? ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : ticker.price.toFixed(ticker.price < 10 ? 2 : 2)}
                    </span>
                    {ticker.unit && (
                      <span className="text-xs font-normal text-[#868993]">{ticker.unit}</span>
                    )}
                  </div>
                </div>

                {/* Percentage badge */}
                <span
                  className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded font-mono ${
                    isPositive
                      ? 'text-[#089981] bg-[#089981]/10'
                      : 'text-[#f23645] bg-[#f23645]/10'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {ticker.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Sparkline chart SVG */}
              <div className="w-full h-10 flex items-end pt-2">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 30"
                >
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill */}
                  <path d={areaPath} fill={`url(#${gradientId})`} />

                  {/* Line Stroke */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Hover indicator cue */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-blue-400 font-medium">
                View chart →
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
