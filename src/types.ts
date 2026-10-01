export type MarketCategory =
  | 'Major indices'
  | 'Crypto market cap'
  | 'Bitcoin dominance'
  | 'US Dollar index'
  | 'Futures'
  | 'US 10Y yield';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface TickerInfo {
  symbol: string;
  name: string;
  exchange: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  marketCap?: string;
  sparkline: number[];
  candles: CandleData[];
  description: string;
  unit?: string;
}

export interface IdeaComment {
  id: string;
  author: string;
  avatarColor: string;
  content: string;
  timeAgo: string;
}

export interface TradingIdea {
  id: string;
  symbol: string;
  symbolTag: string;
  type: 'Long' | 'Short' | 'Neutral';
  title: string;
  summary: string;
  fullAnalysis: string;
  author: string;
  authorAvatarColor: string;
  timeAgo: string;
  likes: number;
  liked?: boolean;
  category: 'Editors\' picks' | 'Popular' | 'More';
  candlestickPattern: {
    height: number;
    color: 'green' | 'red';
    wickTop: number;
    wickBottom: number;
  }[];
  entryPrice?: string;
  targetPrice?: string;
  stopLoss?: string;
  timeframe?: string;
  comments: IdeaComment[];
}
