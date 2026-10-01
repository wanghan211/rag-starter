import React, { useState } from 'react';
import { TickerInfo, CandleData } from '../types';
import { X, Star, BarChart2, TrendingUp, Check, Volume2 } from 'lucide-react';

interface TickerModalProps {
  ticker: TickerInfo | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
  onExecuteTrade: (trade: { symbol: string; type: 'BUY' | 'SELL'; quantity: number; price: number }) => void;
}

export const TickerModal: React.FC<TickerModalProps> = ({
  ticker,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onExecuteTrade
}) => {
  if (!ticker) return null;

  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [showMA, setShowMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [tradeShares, setTradeShares] = useState(1);
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState<string | null>(null);

  const isPositive = ticker.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#f23645';

  const candles = ticker.candles;
  const candleCount = candles.length;

  // Chart dimensions & scaling
  const chartWidth = 720;
  const chartHeight = 320;
  const volumeHeight = 60;
  const mainHeight = chartHeight - volumeHeight - 20;

  const allLows = candles.map((c) => c.low);
  const allHighs = candles.map((c) => c.high);
  const minPrice = Math.min(...allLows);
  const maxPrice = Math.max(...allHighs);
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candles.map((c) => c.volume || 1));

  const scaleY = (price: number) => {
    return mainHeight - ((price - minPrice) / priceRange) * (mainHeight - 20) + 10;
  };

  const candleSlotWidth = chartWidth / candleCount;
  const candleBodyWidth = Math.max(candleSlotWidth * 0.55, 8);

  const handleTrade = (type: 'BUY' | 'SELL') => {
    onExecuteTrade({
      symbol: ticker.symbol,
      type,
      quantity: tradeShares,
      price: ticker.price
    });
    setTradeSuccessMsg(`Simulated ${type} executed: ${tradeShares}x ${ticker.symbol} @ $${ticker.price.toFixed(2)}`);
    setTimeout(() => setTradeSuccessMsg(null), 3500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#131722] border border-[#2a2e39] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#0c0e14]">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{ticker.name}</h3>
                <span className="text-xs bg-[#1e222d] text-[#868993] px-2 py-0.5 rounded font-mono border border-[#363a45]">
                  {ticker.symbol}
                </span>
                <span className="text-xs text-[#787b86] font-medium">{ticker.exchange}</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                  {ticker.price >= 1000
                    ? ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : ticker.price.toFixed(2)}
                  {ticker.unit && <span className="text-xs font-normal text-[#868993] ml-1">{ticker.unit}</span>}
                </span>
                <span
                  className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${
                    isPositive ? 'text-[#089981] bg-[#089981]/15' : 'text-[#f23645] bg-[#f23645]/15'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {ticker.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {ticker.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Watchlist toggle */}
            <button
              onClick={() => onToggleWatchlist(ticker.symbol)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                isWatchlisted
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-[#1e222d] border-[#2a2e39] text-[#787b86] hover:text-white'
              }`}
              type="button"
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isWatchlisted ? 'Watchlisted' : 'Add to watchlist'}</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 text-[#787b86] hover:text-white hover:bg-[#1e222d] rounded-lg transition-colors cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trade notification banner if simulated */}
        {tradeSuccessMsg && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{tradeSuccessMsg}</span>
          </div>
        )}

        {/* Chart Controls Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-2.5 bg-[#181b27] border-b border-[#2a2e39] gap-3 text-xs">
          {/* Timeframe Chips */}
          <div className="flex items-center gap-1 bg-[#131722] p-1 rounded-lg border border-[#2a2e39]">
            {(['1D', '5D', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  timeframe === tf ? 'bg-[#2a2e39] text-white shadow-sm' : 'text-[#787b86] hover:text-white'
                }`}
                type="button"
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Display Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#131722] p-1 rounded-lg border border-[#2a2e39]">
              <button
                onClick={() => setChartType('candles')}
                className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === 'candles' ? 'bg-[#2a2e39] text-white' : 'text-[#787b86] hover:text-white'
                }`}
                type="button"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Candles</span>
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === 'line' ? 'bg-[#2a2e39] text-white' : 'text-[#787b86] hover:text-white'
                }`}
                type="button"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Area</span>
              </button>
            </div>

            <button
              onClick={() => setShowMA(!showMA)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                showMA ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' : 'bg-[#1e222d] border-[#2a2e39] text-[#787b86]'
              }`}
              type="button"
            >
              MA (20)
            </button>

            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                showVolume ? 'bg-blue-500/15 border-blue-500/30 text-blue-300' : 'bg-[#1e222d] border-[#2a2e39] text-[#787b86]'
              }`}
              type="button"
            >
              <Volume2 className="w-3.5 h-3.5 inline mr-1" />
              Vol
            </button>
          </div>
        </div>

        {/* OHLC Inspection Bar on Hover */}
        <div className="px-6 py-2 bg-[#131722] text-xs font-mono text-[#868993] flex flex-wrap items-center gap-4 border-b border-[#2a2e39]">
          {hoveredCandle ? (
            <>
              <span className="text-white font-bold">{hoveredCandle.time}</span>
              <span>O: <strong className="text-white">{hoveredCandle.open.toFixed(2)}</strong></span>
              <span>H: <strong className="text-emerald-400">{hoveredCandle.high.toFixed(2)}</strong></span>
              <span>L: <strong className="text-rose-400">{hoveredCandle.low.toFixed(2)}</strong></span>
              <span>C: <strong className="text-white">{hoveredCandle.close.toFixed(2)}</strong></span>
              {hoveredCandle.volume && (
                <span>Vol: <strong className="text-blue-400">{hoveredCandle.volume.toLocaleString()}</strong></span>
              )}
            </>
          ) : (
            <span>Hover across the chart candles to inspect precision Open, High, Low, Close & Volume</span>
          )}
        </div>

        {/* Main Chart Canvas Area */}
        <div className="p-6 overflow-x-auto select-none bg-[#0e111a] flex justify-center">
          <div className="relative w-full max-w-[760px]">
            <svg
              className="w-full h-[320px] overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Background grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => (
                <line
                  key={i}
                  x1={0}
                  y1={mainHeight * ratio}
                  x2={chartWidth}
                  y2={mainHeight * ratio}
                  stroke="#1e222d"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {/* Price labels on right edge */}
              <text x={chartWidth - 5} y={15} fill="#787b86" fontSize="10" textAnchor="end" fontFamily="monospace">
                {maxPrice.toFixed(2)}
              </text>
              <text x={chartWidth - 5} y={mainHeight / 2} fill="#787b86" fontSize="10" textAnchor="end" fontFamily="monospace">
                {((maxPrice + minPrice) / 2).toFixed(2)}
              </text>
              <text x={chartWidth - 5} y={mainHeight - 5} fill="#787b86" fontSize="10" textAnchor="end" fontFamily="monospace">
                {minPrice.toFixed(2)}
              </text>

              {/* Moving Average Line if enabled */}
              {showMA && (
                <path
                  d={candles.reduce((acc, c, idx) => {
                    const x = idx * candleSlotWidth + candleSlotWidth / 2;
                    // Mock smoothed MA point
                    const avg = (c.open + c.close + c.high + c.low) / 4;
                    const y = scaleY(avg);
                    return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
                  }, '')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                  opacity="0.85"
                />
              )}

              {/* Render Candlesticks or Area Line */}
              {chartType === 'candles' ? (
                candles.map((candle, idx) => {
                  const isUp = candle.close >= candle.open;
                  const candleColor = isUp ? '#089981' : '#f23645';
                  const xCenter = idx * candleSlotWidth + candleSlotWidth / 2;
                  const xLeft = xCenter - candleBodyWidth / 2;

                  const yHigh = scaleY(candle.high);
                  const yLow = scaleY(candle.low);
                  const yOpen = scaleY(candle.open);
                  const yClose = scaleY(candle.close);

                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 3);

                  // Volume bar coords
                  const vHeight = candle.volume ? (candle.volume / maxVolume) * (volumeHeight - 10) : 10;
                  const vY = chartHeight - vHeight;

                  return (
                    <g
                      key={idx}
                      className="cursor-crosshair group"
                      onMouseEnter={() => setHoveredCandle(candle)}
                    >
                      {/* Invisible hover capture area */}
                      <rect
                        x={idx * candleSlotWidth}
                        y={0}
                        width={candleSlotWidth}
                        height={chartHeight}
                        fill="transparent"
                      />

                      {/* Wick Line */}
                      <line
                        x1={xCenter}
                        y1={yHigh}
                        x2={xCenter}
                        y2={yLow}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />

                      {/* Body Rectangle */}
                      <rect
                        x={xLeft}
                        y={bodyTop}
                        width={candleBodyWidth}
                        height={bodyHeight}
                        fill={candleColor}
                        rx="1"
                      />

                      {/* Volume Bar at Bottom */}
                      {showVolume && (
                        <rect
                          x={xLeft}
                          y={vY}
                          width={candleBodyWidth}
                          height={vHeight}
                          fill={candleColor}
                          opacity="0.35"
                        />
                      )}

                      {/* Time text below */}
                      <text
                        x={xCenter}
                        y={chartHeight - 2}
                        fill="#787b86"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {candle.time}
                      </text>
                    </g>
                  );
                })
              ) : (
                <>
                  {/* Area fill */}
                  <defs>
                    <linearGradient id="areaGradientModal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${candles.reduce((acc, c, idx) => {
                      const x = idx * candleSlotWidth + candleSlotWidth / 2;
                      const y = scaleY(c.close);
                      return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
                    }, '')} L ${chartWidth},${mainHeight} L 0,${mainHeight} Z`}
                    fill="url(#areaGradientModal)"
                  />
                  <path
                    d={candles.reduce((acc, c, idx) => {
                      const x = idx * candleSlotWidth + candleSlotWidth / 2;
                      const y = scaleY(c.close);
                      return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
                    }, '')}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2.5"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Key Statistics & Paper Trade Row */}
        <div className="p-6 border-t border-[#2a2e39] bg-[#131722] grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Stats */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key Statistics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-[#181b27] rounded-xl border border-[#2a2e39]">
                <div className="text-[#787b86]">24h High</div>
                <div className="text-white font-mono font-bold mt-1">${ticker.high24h.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#181b27] rounded-xl border border-[#2a2e39]">
                <div className="text-[#787b86]">24h Low</div>
                <div className="text-white font-mono font-bold mt-1">${ticker.low24h.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#181b27] rounded-xl border border-[#2a2e39]">
                <div className="text-[#787b86]">Volume</div>
                <div className="text-white font-mono font-bold mt-1">{ticker.volume}</div>
              </div>
              <div className="p-3 bg-[#181b27] rounded-xl border border-[#2a2e39]">
                <div className="text-[#787b86]">Market Cap</div>
                <div className="text-white font-mono font-bold mt-1">{ticker.marketCap || 'N/A'}</div>
              </div>
            </div>
            <p className="text-xs text-[#787b86] mt-3 leading-relaxed">{ticker.description}</p>
          </div>

          {/* Quick Simulated Trade Box */}
          <div className="bg-[#181b27] border border-[#2a2e39] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Paper Trading Simulator</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                  Live $0 Risk
                </span>
              </div>
              <div className="text-[11px] text-[#787b86] mb-3">
                Practice executing market orders at real-time market prices.
              </div>

              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[#868993]">Order Quantity:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTradeShares(Math.max(1, tradeShares - 1))}
                    className="w-6 h-6 bg-[#2a2e39] rounded text-white font-bold hover:bg-[#363a45] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-white font-bold">{tradeShares}</span>
                  <button
                    onClick={() => setTradeShares(tradeShares + 1)}
                    className="w-6 h-6 bg-[#2a2e39] rounded text-white font-bold hover:bg-[#363a45] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#868993] flex justify-between mb-3 border-t border-[#2a2e39] pt-2">
                <span>Estimated Value:</span>
                <span className="text-white font-mono font-bold">
                  ${(ticker.price * tradeShares).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleTrade('BUY')}
                className="bg-[#089981] hover:bg-[#078873] text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                type="button"
              >
                Buy {ticker.symbol}
              </button>
              <button
                onClick={() => handleTrade('SELL')}
                className="bg-[#f23645] hover:bg-[#d92c3a] text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                type="button"
              >
                Sell {ticker.symbol}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
