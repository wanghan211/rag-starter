/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MarketCategory, TickerInfo, TradingIdea } from './types';
import { INITIAL_TICKERS, INITIAL_IDEAS } from './data/marketData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketSummary } from './components/MarketSummary';
import { CommunityIdeas } from './components/CommunityIdeas';
import { TickerModal } from './components/TickerModal';
import { IdeaModal } from './components/IdeaModal';
import { SearchModal } from './components/SearchModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { AuthModal } from './components/AuthModal';
import { PublishIdeaModal } from './components/PublishIdeaModal';
import { Footer } from './components/Footer';

export default function App() {
  // App state
  const [tickers, setTickers] = useState<TickerInfo[]>(INITIAL_TICKERS);
  const [ideas, setIdeas] = useState<TradingIdea[]>(INITIAL_IDEAS);
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('Major indices');
  const [selectedTicker, setSelectedTicker] = useState<TickerInfo | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<TradingIdea | null>(null);
  const [flashTickerSymbol, setFlashTickerSymbol] = useState<string | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  // Community tab & toggle
  const [activeIdeasTab, setActiveIdeasTab] = useState<"Editors' picks" | 'Popular' | 'More'>("Editors' picks");
  const [showAllIdeas, setShowAllIdeas] = useState(false);

  // User state
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Watchlist persisted state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['SPX', 'BTCUSD'];
    } catch {
      return ['SPX', 'BTCUSD'];
    }
  });

  // Localization state
  const [currentLang, setCurrentLang] = useState('EN');

  const translationsMap: Record<string, {
    headline: string;
    subtitle: string;
    cta: string;
    subCta: string;
    spaceStoryTitle: string;
    spaceStorySub: string;
  }> = {
    EN: {
      headline: 'Where the world does\nmarkets',
      subtitle: 'Join 100 million traders and investors taking the future into their own hands.',
      cta: 'Get started for free',
      subCta: '$0 forever, no credit card needed',
      spaceStoryTitle: 'See our space story',
      spaceStorySub: 'With astronaut Scott "Kidd" Poteet'
    },
    '中文': {
      headline: '全球交易者\n汇聚于此',
      subtitle: '加入 1 亿交易者与投资者行列，掌控自己的未来财富。',
      cta: '免费开始体验',
      subCta: '永久 $0 成本，无需信用卡',
      spaceStoryTitle: '探索我们的太空传奇',
      spaceStorySub: '携手宇航员 Scott "Kidd" Poteet'
    },
    ES: {
      headline: 'Donde el mundo hace\nmercados',
      subtitle: 'Únete a 100 millones de operadores e inversores que toman el futuro en sus manos.',
      cta: 'Comienza gratis',
      subCta: '$0 para siempre, sin tarjeta de crédito',
      spaceStoryTitle: 'Mira nuestra historia espacial',
      spaceStorySub: 'Con el astronauta Scott "Kidd" Poteet'
    },
    JA: {
      headline: '世界中のマーケットが\nここに集う',
      subtitle: '自らの手で未来を掴む 1 億人のトレーダーと投資家のコミュニティへ。',
      cta: '無料で始める',
      subCta: '永久に $0、クレジットカード不要',
      spaceStoryTitle: '宇宙ストーリーを見る',
      spaceStorySub: '宇宙飛行士 Scott "Kidd" Poteet と共に'
    },
    DE: {
      headline: 'Wo die Welt Märkte\nhandelt',
      subtitle: 'Schließe dich 100 Millionen Tradern an, die ihre Zukunft selbst in die Hand nehmen.',
      cta: 'Kostenlos starten',
      subCta: '$0 für immer, keine Kreditkarte erforderlich',
      spaceStoryTitle: 'Unsere Space Story ansehen',
      spaceStorySub: 'Mit Astronaut Scott "Kidd" Poteet'
    },
    FR: {
      headline: 'Où le monde vit les\nmarchés',
      subtitle: 'Rejoignez 100 millions de traders et d\'investisseurs qui prennent leur avenir en main.',
      cta: 'Commencer gratuitement',
      subCta: '0 $ pour toujours, sans carte de crédit',
      spaceStoryTitle: 'Découvrir notre histoire spatiale',
      spaceStorySub: 'Avec l\'astronaute Scott "Kidd" Poteet'
    }
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle live market price tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => {
        // Pick a random ticker to subtly tick
        const randomIndex = Math.floor(Math.random() * prev.length);
        const target = prev[randomIndex];

        // Random jitter -0.15% to +0.15%
        const deltaFactor = 1 + (Math.random() * 0.003 - 0.0014);
        const newPrice = Math.max(0.01, +(target.price * deltaFactor).toFixed(target.price < 10 ? 4 : 2));
        const priceDiff = +(newPrice - target.price).toFixed(2);
        const newChange = +(target.change + priceDiff).toFixed(2);
        const newPct = +((newChange / (target.price || 1)) * 100).toFixed(2);

        // Append to sparkline
        const newSparkline = [...target.sparkline.slice(1), newPrice];

        const updated = [...prev];
        updated[randomIndex] = {
          ...target,
          price: newPrice,
          change: newChange,
          changePercent: newPct,
          sparkline: newSparkline
        };

        setFlashTickerSymbol(target.symbol);
        setTimeout(() => setFlashTickerSymbol(null), 1200);

        return updated;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  // Watchlist handlers
  const handleToggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol];
      try {
        localStorage.setItem('tv_watchlist', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Idea Like handler
  const handleLikeIdea = (ideaId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIdeas((prev) =>
      prev.map((item) => {
        if (item.id === ideaId) {
          const isLiked = !item.liked;
          return {
            ...item,
            liked: isLiked,
            likes: isLiked ? item.likes + 1 : item.likes - 1
          };
        }
        return item;
      })
    );

    // Also update selectedIdea if open
    setSelectedIdea((prev) => {
      if (prev && prev.id === ideaId) {
        const isLiked = !prev.liked;
        return {
          ...prev,
          liked: isLiked,
          likes: isLiked ? prev.likes + 1 : prev.likes - 1
        };
      }
      return prev;
    });
  };

  // Add Comment handler
  const handleAddComment = (ideaId: string, content: string) => {
    const authorName = user?.name || 'Guest Trader';
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      avatarColor: 'bg-emerald-600',
      content,
      timeAgo: 'Just now'
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            comments: [newComment, ...idea.comments]
          };
        }
        return idea;
      })
    );

    setSelectedIdea((prev) => {
      if (prev && prev.id === ideaId) {
        return {
          ...prev,
          comments: [newComment, ...prev.comments]
        };
      }
      return prev;
    });
  };

  // Publish new idea handler
  const handlePublishIdea = (newIdea: TradingIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    setSelectedIdea(newIdea);
  };

  // Paper Trade execution handler
  const handleExecuteTrade = (trade: { symbol: string; type: 'BUY' | 'SELL'; quantity: number; price: number }) => {
    // Add symbol to watchlist if not present
    if (!watchlist.includes(trade.symbol)) {
      handleToggleWatchlist(trade.symbol);
    }
  };

  return (
    <div className="bg-black text-[#d1d4dc] min-h-screen font-sans selection:bg-[#2962ff] selection:text-white antialiased flex flex-col">
      {/* Main Navigation Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        user={user}
        onLogout={() => setUser(null)}
        onPublishClick={() => setIsPublishOpen(true)}
        watchlistCount={watchlist.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartFree={() => setIsAuthOpen(true)}
          onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
          translations={translationsMap[currentLang]}
        />

        {/* Market Summary Section */}
        <MarketSummary
          tickers={tickers}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectTicker={(ticker) => setSelectedTicker(ticker)}
          flashTickerSymbol={flashTickerSymbol}
        />

        {/* Community Ideas Section */}
        <CommunityIdeas
          ideas={ideas}
          activeTab={activeIdeasTab}
          onSelectTab={setActiveIdeasTab}
          onSelectIdea={(idea) => setSelectedIdea(idea)}
          onLikeIdea={handleLikeIdea}
          onShowAllToggle={() => setShowAllIdeas(!showAllIdeas)}
          showAll={showAllIdeas}
          onPublishClick={() => setIsPublishOpen(true)}
        />
      </main>

      {/* Main Footer */}
      <Footer
        onOpenSpaceMission={() => setIsSpaceStoryOpen(true)}
        onFilterMarket={(cat) => {
          setSelectedCategory(cat as MarketCategory);
          const el = document.getElementById('markets');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Ticker Modal (Chart, Orderbook, Paper Trading) */}
      <TickerModal
        ticker={selectedTicker}
        onClose={() => setSelectedTicker(null)}
        isWatchlisted={selectedTicker ? watchlist.includes(selectedTicker.symbol) : false}
        onToggleWatchlist={handleToggleWatchlist}
        onExecuteTrade={handleExecuteTrade}
      />

      {/* Community Idea Modal (Analysis, Targets, Comments) */}
      <IdeaModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onLikeIdea={(id) => handleLikeIdea(id)}
        onAddComment={handleAddComment}
        currentUser={user}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tickers={tickers}
        ideas={ideas}
        onSelectTicker={(ticker) => setSelectedTicker(ticker)}
        onSelectIdea={(idea) => setSelectedIdea(idea)}
      />

      {/* Polaris Dawn Astronaut Scott Poteet Space Mission Story Modal */}
      <SpaceStoryModal
        isOpen={isSpaceStoryOpen}
        onClose={() => setIsSpaceStoryOpen(false)}
      />

      {/* Account / Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(loggedUser) => setUser(loggedUser)}
      />

      {/* Publish Idea Modal */}
      <PublishIdeaModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onPublish={handlePublishIdea}
        authorName={user?.name || 'CommunityTrader'}
      />
    </div>
  );
}
