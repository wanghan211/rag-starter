import React, { useState } from 'react';
import { TradingIdea } from '../types';
import { X, Send } from 'lucide-react';

interface PublishIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (idea: TradingIdea) => void;
  authorName: string;
}

export const PublishIdeaModal: React.FC<PublishIdeaModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  authorName
}) => {
  if (!isOpen) return null;

  const [symbol, setSymbol] = useState('BTCUSD');
  const [type, setType] = useState<'Long' | 'Short'>('Long');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [fullAnalysis, setFullAnalysis] = useState('');
  const [timeframe, setTimeframe] = useState('4h');
  const [entryPrice, setEntryPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newIdea: TradingIdea = {
      id: `user-idea-${Date.now()}`,
      symbol: symbol.toUpperCase(),
      symbolTag: symbol.toUpperCase(),
      type,
      title: title.trim(),
      summary: summary.trim(),
      fullAnalysis: fullAnalysis.trim() || summary.trim(),
      author: authorName,
      authorAvatarColor: 'bg-indigo-600',
      timeAgo: 'Just now',
      likes: 1,
      category: "Editors' picks",
      timeframe,
      entryPrice: entryPrice.trim() || undefined,
      targetPrice: targetPrice.trim() || undefined,
      stopLoss: stopLoss.trim() || undefined,
      candlestickPattern: [
        { height: 45, color: type === 'Long' ? 'green' : 'red', wickTop: 6, wickBottom: 60 },
        { height: 55, color: 'green', wickTop: 8, wickBottom: 75 },
        { height: 65, color: type === 'Long' ? 'green' : 'red', wickTop: 10, wickBottom: 85 },
        { height: 35, color: 'red', wickTop: 4, wickBottom: 50 },
        { height: 75, color: type === 'Long' ? 'green' : 'red', wickTop: 6, wickBottom: 95 }
      ],
      comments: []
    };

    onPublish(newIdea);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#131722] border border-[#2a2e39] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#0c0e14]">
          <h3 className="text-base font-bold text-white tracking-tight">Publish Trading Idea</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787b86] hover:text-white hover:bg-[#1e222d] rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#787b86] font-medium mb-1">Symbol Ticker</label>
              <input
                type="text"
                required
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="e.g. BTCUSD, AAPL, SPX"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#787b86] font-medium mb-1">Position Direction</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('Long')}
                  className={`py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                    type === 'Long'
                      ? 'bg-[#089981] text-white shadow-sm'
                      : 'bg-[#181b27] text-[#787b86] border border-[#2a2e39]'
                  }`}
                >
                  Long
                </button>
                <button
                  type="button"
                  onClick={() => setType('Short')}
                  className={`py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                    type === 'Short'
                      ? 'bg-[#f23645] text-white shadow-sm'
                      : 'bg-[#181b27] text-[#787b86] border border-[#2a2e39]'
                  }`}
                >
                  Short
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#787b86] font-medium mb-1">Idea Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Breakout confirmation above structural resistance"
              className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#787b86] font-medium mb-1">Entry Price</label>
              <input
                type="text"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="e.g. $84,200"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-emerald-400 font-medium mb-1">Target (TP)</label>
              <input
                type="text"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="e.g. $88,500"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-emerald-500 rounded-xl px-3 py-2 text-emerald-400 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-rose-400 font-medium mb-1">Stop Loss (SL)</label>
              <input
                type="text"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="e.g. $82,400"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-rose-500 rounded-xl px-3 py-2 text-rose-400 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#787b86] font-medium mb-1">Summary (1-2 sentences)</label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Concise overview of what is triggering this trade setup..."
              className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#787b86] font-medium mb-1">Full Technical Thesis</label>
            <textarea
              rows={3}
              value={fullAnalysis}
              onChange={(e) => setFullAnalysis(e.target.value)}
              placeholder="Outline support/resistance, indicators, volume profile, or macroeconomic catalysts..."
              className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3 py-2 text-white text-xs focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#787b86] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
