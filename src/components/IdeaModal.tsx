import React, { useState } from 'react';
import { TradingIdea } from '../types';
import { X, Flame, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface IdeaModalProps {
  idea: TradingIdea | null;
  onClose: () => void;
  onLikeIdea: (id: string) => void;
  onAddComment: (ideaId: string, text: string) => void;
  currentUser: { name: string } | null;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
  idea,
  onClose,
  onLikeIdea,
  onAddComment,
  currentUser
}) => {
  if (!idea) return null;

  const [commentText, setCommentText] = useState('');
  const isLong = idea.type === 'Long';

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(idea.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#131722] border border-[#2a2e39] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#0c0e14]">
          <div className="flex items-center gap-3">
            <span className="bg-black/75 text-white text-xs font-mono font-bold px-2.5 py-1 rounded border border-[#363a45]">
              {idea.symbolTag}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded ${
                isLong ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
              }`}
            >
              {idea.type} Position
            </span>
            {idea.timeframe && (
              <span className="text-xs text-[#868993] bg-[#1e222d] px-2 py-0.5 rounded font-mono">
                {idea.timeframe} Chart
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#787b86] hover:text-white hover:bg-[#1e222d] rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Author info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {idea.title}
            </h2>
            <div className="flex items-center justify-between mt-3 text-xs text-[#787b86] border-b border-[#2a2e39] pb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded-full ${idea.authorAvatarColor} text-white flex items-center justify-center font-bold text-xs`}
                >
                  {idea.author.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold">by {idea.author}</span>
                <span>•</span>
                <span>{idea.timeAgo}</span>
              </div>

              {/* Boost Button */}
              <button
                onClick={() => onLikeIdea(idea.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  idea.liked
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                    : 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] hover:text-amber-400 hover:border-amber-400/40'
                }`}
                type="button"
              >
                <Flame className="w-4 h-4" />
                <span>{idea.liked ? 'Boosted!' : 'Boost idea'}</span>
                <span className="font-mono text-xs ml-1">({idea.likes})</span>
              </button>
            </div>
          </div>

          {/* Trade Parameters Banner */}
          {(idea.entryPrice || idea.targetPrice || idea.stopLoss) && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#181b27] border border-[#2a2e39] rounded-xl text-center">
              <div>
                <div className="text-[11px] text-[#787b86] font-medium">Entry Price</div>
                <div className="text-sm font-mono font-bold text-white mt-0.5">{idea.entryPrice || 'Market'}</div>
              </div>
              <div>
                <div className="text-[11px] text-emerald-400 font-medium">Target (TP)</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">{idea.targetPrice || 'Open'}</div>
              </div>
              <div>
                <div className="text-[11px] text-rose-400 font-medium">Stop Loss (SL)</div>
                <div className="text-sm font-mono font-bold text-rose-400 mt-0.5">{idea.stopLoss || 'Discretionary'}</div>
              </div>
            </div>
          )}

          {/* Technical Setup Chart Mockup */}
          <div className="bg-[#181b27] border border-[#2a2e39] rounded-xl p-4 overflow-hidden relative">
            <div className="flex justify-between items-center mb-2 text-xs text-[#787b86]">
              <span className="font-mono">{idea.symbolTag} Technical Chart Setup</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Conviction
              </span>
            </div>

            <div className="h-44 flex items-end justify-between px-4 pb-2 relative">
              {/* Target & Stop lines */}
              <div className="absolute top-8 left-0 right-0 border-b border-dashed border-emerald-500/50 flex justify-between px-2 text-[10px] text-emerald-400 font-mono">
                <span>TP: {idea.targetPrice || '+4.5%'}</span>
                <span>Resistance</span>
              </div>
              <div className="absolute bottom-10 left-0 right-0 border-b border-dashed border-rose-500/50 flex justify-between px-2 text-[10px] text-rose-400 font-mono">
                <span>SL: {idea.stopLoss || '-1.8%'}</span>
                <span>Support</span>
              </div>

              {idea.candlestickPattern.map((c, i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className="w-[1.5px]"
                    style={{
                      height: `${c.wickBottom}px`,
                      backgroundColor: c.color === 'green' ? '#089981' : '#f23645'
                    }}
                  />
                  <div
                    className="w-4 rounded-[1px]"
                    style={{
                      height: `${c.height}px`,
                      marginTop: `-${c.wickTop}px`,
                      backgroundColor: c.color === 'green' ? '#089981' : '#f23645'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Analytical Thesis Narrative */}
          <div className="space-y-3 text-sm text-[#d1d4dc] leading-relaxed">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Trading Thesis & Rationale</h4>
            <div className="whitespace-pre-line text-[#868993]">{idea.fullAnalysis}</div>
          </div>

          {/* Working Comments Section */}
          <div className="border-t border-[#2a2e39] pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Community Discussion ({idea.comments.length})</h4>
            </div>

            {/* Comment List */}
            <div className="space-y-3">
              {idea.comments.length === 0 ? (
                <div className="text-xs text-[#787b86] italic py-2">
                  No comments yet. Be the first trader to share your thoughts on this setup!
                </div>
              ) : (
                idea.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-[#181b27] border border-[#2a2e39] rounded-xl text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-[10px]`}
                        >
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-white">{comment.author}</span>
                      </div>
                      <span className="text-[11px] text-[#787b86]">{comment.timeAgo}</span>
                    </div>
                    <p className="text-[#d1d4dc] leading-relaxed pl-7">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={currentUser ? `Comment as ${currentUser.name}...` : 'Share your perspective on this trade...'}
                className="flex-1 bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-4 py-2 text-xs text-white placeholder-[#787b86] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
