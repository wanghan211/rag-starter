import React from 'react';

interface FooterProps {
  onOpenSpaceMission: () => void;
  onFilterMarket: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSpaceMission, onFilterMarket }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-[#1e222d] mt-20 pt-16 pb-12 text-[#787b86] text-xs" data-purpose="global-footer">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Top Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="hover:text-white transition-colors" href="#products" onClick={scrollToTop}>
                  Supercharts
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#pine-script" onClick={scrollToTop}>
                  Pine Script®
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#stock-screener" onClick={scrollToTop}>
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#crypto-screener" onClick={scrollToTop}>
                  Crypto Screener
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#economic-calendar" onClick={scrollToTop}>
                  Economic Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Community</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="hover:text-white transition-colors" href="#community">
                  Ideas & Analysis
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#community">
                  Scripts & Indicators
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#community">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#community">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Markets</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left cursor-pointer"
                  onClick={() => onFilterMarket('Major indices')}
                >
                  Indices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left cursor-pointer"
                  onClick={() => onFilterMarket('Major indices')}
                >
                  Stocks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left cursor-pointer"
                  onClick={() => onFilterMarket('Crypto market cap')}
                >
                  Crypto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left cursor-pointer"
                  onClick={() => onFilterMarket('US Dollar index')}
                >
                  Forex
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left cursor-pointer"
                  onClick={() => onFilterMarket('Futures')}
                >
                  Futures
                </button>
              </li>
            </ul>
          </div>

          {/* Brokers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Brokers</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="hover:text-white transition-colors" href="#brokers">
                  FOREX.com
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#brokers">
                  OANDA
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#brokers">
                  NinjaTrader
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#brokers">
                  OKX
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="hover:text-white transition-colors" href="#about" onClick={scrollToTop}>
                  About Us
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white text-blue-400 transition-colors text-left cursor-pointer"
                  onClick={onOpenSpaceMission}
                >
                  Space Mission
                </button>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#careers" onClick={scrollToTop}>
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#blog" onClick={scrollToTop}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Social</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="hover:text-white transition-colors" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright Bar */}
        <div className="border-t border-[#1e222d] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Made by Humans note & Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-white font-medium flex items-center gap-1.5">
              <svg className="w-4 h-4 fill-white inline" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Made by humans
            </span>
            <span className="text-[#434651]">•</span>
            <span>© 2026 TradingView, Inc.</span>
          </div>

          {/* Data providers clause */}
          <p className="text-[11px] text-[#5d606b] max-w-xl text-center md:text-right">
            Select market data provided by ICE Data Services. Select reference data provided by FactSet. CUSIP Database provided by FactSet Research Systems Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
