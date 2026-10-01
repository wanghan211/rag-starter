import React from 'react';
import { X, Rocket, Compass, Shield, Award } from 'lucide-react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#0b0e14] border border-[#2a2e39] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with starry cosmic gradient & spacecraft viewport styling */}
        <div className="relative h-56 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0369a1] p-6 flex flex-col justify-between overflow-hidden border-b border-[#1e222d]">
          {/* Subtle starry particles */}
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mission Tag */}
          <div className="flex items-center gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Rocket className="w-3.5 h-3.5" /> Polaris Dawn × TradingView
            </span>
          </div>

          {/* Banner Title & Pilot intro */}
          <div className="z-10 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-sky-400 bg-slate-900 flex items-center justify-center overflow-hidden shadow-lg relative">
                <svg className="w-8 h-8 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2a7 7 0 0 0-7 7v4a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7z" />
                  <path d="M8 11h8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" fill="#0284c7" fillOpacity="0.5" stroke="#38bdf8" />
                  <path d="M9 19v3M15 19v3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Scott "Kidd" Poteet</h3>
                <p className="text-xs text-sky-300 font-medium">Mission Pilot, Polaris Dawn • USAF Lt Col (Ret.)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="p-6 space-y-6 text-[#d1d4dc] text-sm">
          {/* Quote Block */}
          <blockquote className="border-l-2 border-sky-500 pl-4 py-1 italic text-slate-200 text-sm sm:text-base leading-relaxed bg-[#131722]/50 rounded-r-xl">
            "Traders and astronauts share the same fundamental ethos: disciplined risk management, total situational awareness under extreme pressure, and the courage to venture where others won't."
          </blockquote>

          {/* Story Narrative */}
          <div className="space-y-3 leading-relaxed text-xs sm:text-sm text-[#868993]">
            <p>
              In September 2024, the Polaris Dawn mission launched aboard a SpaceX Falcon 9 rocket, reaching an apogee of <strong className="text-white">1,400.7 kilometers</strong> — the highest Earth orbit reached by humans since the Apollo 17 lunar mission in 1972.
            </p>
            <p>
              Scott "Kidd" Poteet, pilot of Polaris Dawn and lifelong market student, carried TradingView's ethos of frontier exploration into space. While in orbit testing laser-based satellite communications, the crew embodied the spirit of taking the future into your own hands.
            </p>
          </div>

          {/* Key Mission Milestones */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#131722] border border-[#2a2e39] rounded-xl text-center">
              <Compass className="w-4 h-4 text-sky-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white font-mono">1,400 km</div>
              <div className="text-[10px] text-[#787b86]">Highest Orbit Since Apollo</div>
            </div>

            <div className="p-3 bg-[#131722] border border-[#2a2e39] rounded-xl text-center">
              <Shield className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white font-mono">1st Commercial</div>
              <div className="text-[10px] text-[#787b86]">Spacewalk (EVA)</div>
            </div>

            <div className="p-3 bg-[#131722] border border-[#2a2e39] rounded-xl text-center">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white font-mono">100M+</div>
              <div className="text-[10px] text-[#787b86]">Traders Exploring Frontiers</div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="bg-white text-black hover:bg-neutral-200 font-bold px-6 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
              type="button"
            >
              Back to Markets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
