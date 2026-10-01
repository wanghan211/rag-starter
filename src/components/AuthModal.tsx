import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const finalName = name.trim() || email.split('@')[0];
    onLogin({ name: finalName, email });
    onClose();
  };

  const handleSocialAuth = (provider: string) => {
    onLogin({
      name: provider === 'Google' ? 'Alex Trader' : 'Apple User',
      email: provider === 'Google' ? 'alex.trader@gmail.com' : 'trader@icloud.com'
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#131722] border border-[#2a2e39] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2e39] bg-[#0c0e14]">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 fill-current text-white"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V6h7v16zm8-22h-7v22h7V0zm8 11h-7v11h7V11z" fill="currentColor" />
            </svg>
            <span className="text-base font-bold text-white tracking-tight">TradingView</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#787b86] hover:text-white hover:bg-[#1e222d] rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">
              {mode === 'signup' ? 'Create your free account' : 'Welcome back'}
            </h3>
            <p className="text-xs text-[#787b86] mt-1.5">
              {mode === 'signup'
                ? 'Join 100 million traders and investors today. $0 forever.'
                : 'Sign in to access your watchlists and saved charts.'}
            </p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="space-y-2.5 mb-5">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#181b27] hover:bg-[#202534] border border-[#2a2e39] rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 border-t border-[#2a2e39]" />
            <span className="text-[11px] text-[#787b86] uppercase">Or with email</span>
            <div className="flex-1 border-t border-[#2a2e39]" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-[#787b86] mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Satoshi Trader"
                  className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#787b86] focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-[#787b86] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@example.com"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#787b86] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#787b86] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#181b27] border border-[#2a2e39] focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#787b86] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer mt-2"
            >
              {mode === 'signup' ? 'Create Free Account' : 'Sign In'}
            </button>
          </form>

          {/* Features checkmarks */}
          <div className="mt-5 pt-4 border-t border-[#2a2e39] space-y-1.5 text-[11px] text-[#868993]">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full access to Supercharts with real-time quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required. Free tier active forever</span>
            </div>
          </div>

          {/* Toggle between Sign Up and Sign In */}
          <div className="text-center mt-5 text-xs text-[#787b86]">
            {mode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-blue-400 hover:underline font-semibold cursor-pointer"
                  type="button"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-blue-400 hover:underline font-semibold cursor-pointer"
                  type="button"
                >
                  Sign Up for Free
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
