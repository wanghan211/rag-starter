import React, { useState } from 'react';
import { Search, Globe, User, Check, ChevronDown, Sparkles, TrendingUp, BarChart2, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentLang: string;
  onSelectLang: (lang: string) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onPublishClick: () => void;
  watchlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAuth,
  currentLang,
  onSelectLang,
  user,
  onLogout,
  onPublishClick,
  watchlistCount
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: '中文', name: '简体中文' },
    { code: 'ES', name: 'Español' },
    { code: 'JA', name: '日本語' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
  ];

  const navMenus: Record<string, { title: string; desc: string; icon: React.ReactNode }[]> = {
    Products: [
      { title: 'Supercharts', desc: 'Powerful financial charts with 100+ indicators', icon: <BarChart2 className="w-4 h-4 text-blue-400" /> },
      { title: 'Pine Script®', desc: 'Custom scripting for automated algorithms', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
      { title: 'Stock Screener', desc: 'Filter 50,000+ global stocks on fundamental data', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
      { title: 'Economic Calendar', desc: 'Never miss high-impact central bank announcements', icon: <Layers className="w-4 h-4 text-purple-400" /> }
    ],
    Community: [
      { title: 'Ideas & Analysis', desc: 'Explore crowd-sourced trade setups and strategies', icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
      { title: 'Scripts & Indicators', desc: 'Over 100,000 community-built technical indicators', icon: <Sparkles className="w-4 h-4 text-yellow-400" /> },
      { title: 'Live Streams', desc: 'Watch professional market analysts trade live', icon: <TrendingUp className="w-4 h-4 text-rose-400" /> }
    ],
    Markets: [
      { title: 'Indices', desc: 'S&P 500, Nasdaq, Dow Jones, DAX, Nikkei', icon: <BarChart2 className="w-4 h-4 text-emerald-400" /> },
      { title: 'Crypto', desc: 'Real-time Bitcoin, Ethereum, Solana, and Altcoins', icon: <TrendingUp className="w-4 h-4 text-amber-400" /> },
      { title: 'Forex', desc: 'Major and minor currency exchange pairs', icon: <Layers className="w-4 h-4 text-sky-400" /> },
      { title: 'Futures & Commodities', desc: 'Gold, Crude Oil, Natural Gas, Silver', icon: <BarChart2 className="w-4 h-4 text-orange-400" /> }
    ],
    Brokers: [
      { title: 'FOREX.com', desc: 'Trade directly from TradingView charts', icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
      { title: 'OANDA', desc: 'Regulated multi-asset global forex broker', icon: <BarChart2 className="w-4 h-4 text-indigo-400" /> },
      { title: 'NinjaTrader', desc: 'Premier futures and options trading broker', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
      { title: 'OKX', desc: 'Deep liquidity crypto derivatives and spot', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> }
    ]
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#1e222d]" data-purpose="global-nav">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[64px] flex items-center justify-between">
        {/* Left side: Logo, Search Bar & Navigation links */}
        <div className="flex items-center gap-6">
          {/* TradingView Monogram Logo */}
          <a
            aria-label="TradingView Homepage"
            className="flex items-center gap-2 group text-white focus:outline-none"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              className="w-8 h-8 fill-current text-white group-hover:text-blue-500 transition-colors"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V6h7v16zm8-22h-7v22h7V0zm8 11h-7v11h7V11z" fill="currentColor" />
            </svg>
          </a>

          {/* Search bar button with Ctrl+K shortcut */}
          <div className="relative hidden md:block">
            <button
              onClick={onOpenSearch}
              className="w-56 lg:w-64 h-9 bg-[#1e222d] hover:bg-[#2a2e39] text-[#787b86] hover:text-white rounded-full flex items-center justify-between px-3.5 text-xs transition-colors duration-150 border border-transparent hover:border-[#363a45] cursor-pointer"
              type="button"
              title="Search tickers, ideas, markets (Ctrl+K)"
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-2 text-[#787b86]" />
                <span className="font-medium text-[#d1d4dc]">Search</span>
              </div>
              <span className="text-[10px] bg-[#2a2e39] text-[#868993] px-1.5 py-0.5 rounded font-mono border border-[#363a45]">
                Ctrl+K
              </span>
            </button>
          </div>

          {/* Navigation Menus with Interactive Dropdowns */}
          <nav className="hidden xl:flex items-center space-x-6 text-[14px] font-semibold text-[#d1d4dc]">
            {Object.keys(navMenus).map((navKey) => (
              <div
                key={navKey}
                className="relative"
                onMouseEnter={() => setActiveNavDropdown(navKey)}
                onMouseLeave={() => setActiveNavDropdown(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 py-4 hover:text-white transition-colors cursor-pointer ${
                    activeNavDropdown === navKey ? 'text-white' : ''
                  }`}
                  onClick={() => setActiveNavDropdown(activeNavDropdown === navKey ? null : navKey)}
                >
                  <span>{navKey}</span>
                  <ChevronDown className="w-3 h-3 text-[#787b86]" />
                </button>

                {/* Dropdown Card */}
                {activeNavDropdown === navKey && (
                  <div className="absolute top-[52px] left-0 w-80 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="space-y-1">
                      {navMenus[navKey].map((item, idx) => (
                        <a
                          key={idx}
                          href={`#${navKey.toLowerCase()}`}
                          onClick={() => setActiveNavDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1e222d] transition-colors group"
                        >
                          <div className="p-1.5 rounded bg-[#1e222d] group-hover:bg-[#2a2e39] transition-colors mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-white text-xs font-semibold group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[#787b86] text-[11px] leading-tight mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={onPublishClick}
              className="text-[#d1d4dc] hover:text-white transition-colors cursor-pointer"
            >
              Publish Idea
            </button>
          </nav>
        </div>

        {/* Right side: Mobile Search, Localization, Profile, CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="md:hidden text-[#d1d4dc] hover:text-white p-2 rounded-full hover:bg-[#1e222d] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              aria-label="Select Language"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-[#d1d4dc] hover:text-white px-2 py-1.5 rounded-lg hover:bg-[#1e222d] transition-colors cursor-pointer"
              type="button"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold">{currentLang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-[#d1d4dc] hover:text-white hover:bg-[#1e222d] transition-colors"
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Button / Menu */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] transition-colors cursor-pointer"
                  title="Your account"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-white font-medium hidden sm:inline">{user.name.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-[#2a2e39] mb-1">
                      <div className="text-white text-xs font-semibold">{user.name}</div>
                      <div className="text-[#787b86] text-[11px] truncate">{user.email}</div>
                      <div className="mt-1 text-[10px] text-emerald-400 font-medium">Free Pro Plan ($0 forever)</div>
                    </div>

                    <div className="px-3 py-1 text-[11px] text-[#787b86] flex justify-between">
                      <span>Saved Watchlist</span>
                      <span className="text-white font-mono">{watchlistCount}</span>
                    </div>

                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-[#1e222d] rounded-lg transition-colors mt-1"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                aria-label="Account Menu"
                onClick={onOpenAuth}
                className="text-[#d1d4dc] hover:text-white p-2 rounded-full hover:bg-[#1e222d] transition-colors cursor-pointer"
                type="button"
                title="Sign in / Sign up"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Gradient 'Get started' Button */}
          <button
            onClick={onOpenAuth}
            className="glow-cyan-violet text-white text-[13px] font-semibold px-4 py-2 rounded-full tracking-wide transition-all transform active:scale-95 duration-150 cursor-pointer whitespace-nowrap"
            type="button"
          >
            {user ? 'My Workspace' : 'Get started'}
          </button>
        </div>
      </div>
    </header>
  );
};
