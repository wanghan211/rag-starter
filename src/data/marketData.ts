import { TickerInfo, TradingIdea } from '../types';

export const INITIAL_TICKERS: TickerInfo[] = [
  // Major indices
  {
    symbol: 'SPX',
    name: 'S&P 500',
    exchange: 'S&P',
    category: 'Major indices',
    price: 5815.26,
    change: 42.74,
    changePercent: 0.74,
    high24h: 5824.10,
    low24h: 5776.50,
    volume: '3.42B',
    marketCap: '$45.8T',
    description: 'The Standard and Poor\'s 500 is a stock market index tracking the performance of 500 of the largest companies listed on stock exchanges in the United States.',
    sparkline: [5775, 5782, 5780, 5795, 5790, 5810, 5805, 5815.26],
    candles: [
      { time: '09:30', open: 5776, high: 5788, low: 5772, close: 5785, volume: 450000 },
      { time: '10:30', open: 5785, high: 5794, low: 5781, close: 5792, volume: 380000 },
      { time: '11:30', open: 5792, high: 5802, low: 5789, close: 5798, volume: 310000 },
      { time: '12:30', open: 5798, high: 5806, low: 5794, close: 5804, volume: 290000 },
      { time: '13:30', open: 5804, high: 5814, low: 5800, close: 5808, volume: 340000 },
      { time: '14:30', open: 5808, high: 5820, low: 5805, close: 5818, volume: 490000 },
      { time: '15:30', open: 5818, high: 5824, low: 5812, close: 5815.26, volume: 620000 }
    ]
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    exchange: 'NASDAQ',
    category: 'Major indices',
    price: 20248.90,
    change: 224.50,
    changePercent: 1.12,
    high24h: 20295.40,
    low24h: 20040.10,
    volume: '4.88B',
    marketCap: '$24.2T',
    description: 'The Nasdaq-100 includes 100 of the largest domestic and international non-financial companies listed on the Nasdaq Stock Market based on market capitalization.',
    sparkline: [20040, 20090, 20120, 20110, 20180, 20210, 20235, 20248.9],
    candles: [
      { time: '09:30', open: 20045, high: 20110, low: 20030, close: 20095, volume: 620000 },
      { time: '10:30', open: 20095, high: 20150, low: 20085, close: 20135, volume: 540000 },
      { time: '11:30', open: 20135, high: 20180, low: 20120, close: 20165, volume: 430000 },
      { time: '12:30', open: 20165, high: 20205, low: 20150, close: 20195, volume: 390000 },
      { time: '13:30', open: 20195, high: 20240, low: 20180, close: 20220, volume: 480000 },
      { time: '14:30', open: 20220, high: 20280, low: 20210, close: 20265, volume: 690000 },
      { time: '15:30', open: 20265, high: 20295, low: 20235, close: 20248.90, volume: 810000 }
    ]
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    exchange: 'CRYPTO',
    category: 'Major indices',
    price: 84120.50,
    change: -1210.80,
    changePercent: -1.42,
    high24h: 86450.00,
    low24h: 83620.00,
    volume: '$42.1B',
    marketCap: '$1.66T',
    description: 'Bitcoin is the first decentralized digital cryptocurrency, conceived in 2008 by an anonymous person or group of people using the pseudonym Satoshi Nakamoto.',
    sparkline: [86450, 86100, 85800, 85200, 85400, 84600, 84300, 84120.5],
    candles: [
      { time: '00:00', open: 86200, high: 86450, low: 85900, close: 86100, volume: 12500 },
      { time: '04:00', open: 86100, high: 86250, low: 85400, close: 85600, volume: 15400 },
      { time: '08:00', open: 85600, high: 85800, low: 84900, close: 85150, volume: 18900 },
      { time: '12:00', open: 85150, high: 85500, low: 84400, close: 84700, volume: 22100 },
      { time: '16:00', open: 84700, high: 84950, low: 83800, close: 83950, volume: 24500 },
      { time: '20:00', open: 83950, high: 84300, low: 83620, close: 84120.50, volume: 19800 }
    ]
  },
  {
    symbol: 'GC1!',
    name: 'Gold',
    exchange: 'COMEX',
    category: 'Major indices',
    price: 4148.20,
    change: 14.45,
    changePercent: 0.35,
    high24h: 4162.00,
    low24h: 4130.50,
    volume: '240K contracts',
    marketCap: '$17.2T (Physical)',
    description: 'Gold Futures contract tracks the benchmark price of gold bullion traded on COMEX. Recognized globally as the definitive store of value and inflationary hedge.',
    sparkline: [4130, 4135, 4132, 4142, 4140, 4152, 4145, 4148.2],
    candles: [
      { time: '08:00', open: 4132, high: 4139, low: 4128, close: 4136, volume: 32000 },
      { time: '10:00', open: 4136, high: 4144, low: 4133, close: 4141, volume: 41000 },
      { time: '12:00', open: 4141, high: 4148, low: 4138, close: 4145, volume: 38000 },
      { time: '14:00', open: 4145, high: 4158, low: 4142, close: 4154, volume: 55000 },
      { time: '16:00', open: 4154, high: 4162, low: 4145, close: 4148.20, volume: 46000 }
    ]
  },

  // Crypto market cap
  {
    symbol: 'TOTAL',
    name: 'Crypto Market Cap',
    exchange: 'GLOBAL',
    category: 'Crypto market cap',
    price: 3.12,
    unit: 'T USD',
    change: 0.075,
    changePercent: 2.45,
    high24h: 3.16,
    low24h: 3.04,
    volume: '$118.4B',
    description: 'Total cryptocurrency market capitalization represents the aggregate dollar value of all traded digital assets.',
    sparkline: [3.04, 3.06, 3.08, 3.07, 3.10, 3.11, 3.14, 3.12],
    candles: [
      { time: '00:00', open: 3.04, high: 3.07, low: 3.03, close: 3.06, volume: 15000 },
      { time: '06:00', open: 3.06, high: 3.09, low: 3.05, close: 3.08, volume: 18000 },
      { time: '12:00', open: 3.08, high: 3.13, low: 3.07, close: 3.11, volume: 22000 },
      { time: '18:00', open: 3.11, high: 3.16, low: 3.10, close: 3.12, volume: 26000 }
    ]
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum',
    exchange: 'CRYPTO',
    category: 'Crypto market cap',
    price: 3420.80,
    change: 73.10,
    changePercent: 2.18,
    high24h: 3465.00,
    low24h: 3320.00,
    volume: '$21.6B',
    marketCap: '$412.5B',
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
    sparkline: [3320, 3340, 3360, 3385, 3370, 3410, 3435, 3420.8],
    candles: [
      { time: '02:00', open: 3325, high: 3355, low: 3315, close: 3345, volume: 45000 },
      { time: '06:00', open: 3345, high: 3380, low: 3338, close: 3370, volume: 52000 },
      { time: '10:00', open: 3370, high: 3415, low: 3362, close: 3395, volume: 68000 },
      { time: '14:00', open: 3395, high: 3465, low: 3390, close: 3440, volume: 81000 },
      { time: '18:00', open: 3440, high: 3450, low: 3410, close: 3420.80, volume: 64000 }
    ]
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana',
    exchange: 'CRYPTO',
    category: 'Crypto market cap',
    price: 194.50,
    change: 8.95,
    changePercent: 4.82,
    high24h: 198.20,
    low24h: 184.10,
    volume: '$7.8B',
    marketCap: '$91.4B',
    description: 'Solana is a high-performance public blockchain platform that uses a proof-of-history consensus combined with proof-of-stake.',
    sparkline: [184, 186, 189, 188, 192, 195, 197, 194.5],
    candles: [
      { time: '02:00', open: 184.2, high: 187.0, low: 183.5, close: 186.5, volume: 110000 },
      { time: '06:00', open: 186.5, high: 190.2, low: 185.8, close: 189.4, volume: 145000 },
      { time: '10:00', open: 189.4, high: 194.5, low: 188.6, close: 193.1, volume: 190000 },
      { time: '14:00', open: 193.1, high: 198.2, low: 192.0, close: 196.4, volume: 240000 },
      { time: '18:00', open: 196.4, high: 197.5, low: 193.2, close: 194.50, volume: 165000 }
    ]
  },
  {
    symbol: 'BNBUSD',
    name: 'BNB',
    exchange: 'CRYPTO',
    category: 'Crypto market cap',
    price: 624.10,
    change: 5.80,
    changePercent: 0.94,
    high24h: 631.50,
    low24h: 616.20,
    volume: '$1.4B',
    marketCap: '$89.2B',
    description: 'BNB powers the BNB Chain ecosystem and offers utility fee discounts and decentralized application interaction.',
    sparkline: [616, 618, 621, 620, 625, 628, 626, 624.1],
    candles: [
      { time: '04:00', open: 617, high: 622, low: 616, close: 620, volume: 18000 },
      { time: '08:00', open: 620, high: 626, low: 619, close: 624, volume: 22000 },
      { time: '12:00', open: 624, high: 631, low: 623, close: 628, volume: 31000 },
      { time: '16:00', open: 628, high: 630, low: 622, close: 624.10, volume: 25000 }
    ]
  },

  // Bitcoin dominance
  {
    symbol: 'BTC.D',
    name: 'Bitcoin Dominance',
    exchange: 'INDEX',
    category: 'Bitcoin dominance',
    price: 58.42,
    unit: '%',
    change: 0.19,
    changePercent: 0.32,
    high24h: 58.65,
    low24h: 58.15,
    volume: 'N/A',
    description: 'Bitcoin dominance ratio indicates the percentage share of Bitcoin compared to the total aggregate market cap of all cryptocurrencies.',
    sparkline: [58.15, 58.22, 58.28, 58.35, 58.32, 58.45, 58.50, 58.42],
    candles: [
      { time: '00:00', open: 58.18, high: 58.30, low: 58.15, close: 58.25, volume: 0 },
      { time: '06:00', open: 58.25, high: 58.42, low: 58.22, close: 58.36, volume: 0 },
      { time: '12:00', open: 58.36, high: 58.55, low: 58.31, close: 58.48, volume: 0 },
      { time: '18:00', open: 58.48, high: 58.65, low: 58.39, close: 58.42, volume: 0 }
    ]
  },
  {
    symbol: 'ETH.D',
    name: 'Ethereum Dominance',
    exchange: 'INDEX',
    category: 'Bitcoin dominance',
    price: 14.20,
    unit: '%',
    change: -0.02,
    changePercent: -0.15,
    high24h: 14.35,
    low24h: 14.10,
    volume: 'N/A',
    description: 'Ethereum market capitalization relative to the total global cryptocurrency market.',
    sparkline: [14.35, 14.30, 14.28, 14.25, 14.22, 14.18, 14.21, 14.20],
    candles: [
      { time: '00:00', open: 14.32, high: 14.35, low: 14.28, close: 14.30, volume: 0 },
      { time: '06:00', open: 14.30, high: 14.31, low: 14.22, close: 14.25, volume: 0 },
      { time: '12:00', open: 14.25, high: 14.28, low: 14.16, close: 14.19, volume: 0 },
      { time: '18:00', open: 14.19, high: 14.24, low: 14.10, close: 14.20, volume: 0 }
    ]
  },
  {
    symbol: 'OTHERS.D',
    name: 'Altcoins Dominance',
    exchange: 'INDEX',
    category: 'Bitcoin dominance',
    price: 20.58,
    unit: '%',
    change: -0.018,
    changePercent: -0.09,
    high24h: 20.80,
    low24h: 20.45,
    volume: 'N/A',
    description: 'Combined dominance of all cryptocurrencies excluding Bitcoin and top layer 1 stalwarts.',
    sparkline: [20.75, 20.70, 20.65, 20.62, 20.60, 20.55, 20.57, 20.58],
    candles: [
      { time: '00:00', open: 20.72, high: 20.78, low: 20.68, close: 20.70, volume: 0 },
      { time: '06:00', open: 20.70, high: 20.72, low: 20.61, close: 20.64, volume: 0 },
      { time: '12:00', open: 20.64, high: 20.68, low: 20.52, close: 20.56, volume: 0 },
      { time: '18:00', open: 20.56, high: 20.62, low: 20.45, close: 20.58, volume: 0 }
    ]
  },
  {
    symbol: 'STABLE.D',
    name: 'Stablecoins Dominance',
    exchange: 'INDEX',
    category: 'Bitcoin dominance',
    price: 6.80,
    unit: '%',
    change: -0.005,
    changePercent: -0.08,
    high24h: 6.95,
    low24h: 6.75,
    volume: 'N/A',
    description: 'Share of fiat-pegged stablecoins (USDT, USDC, etc.) relative to overall crypto market cap.',
    sparkline: [6.92, 6.90, 6.88, 6.86, 6.84, 6.82, 6.81, 6.80],
    candles: [
      { time: '00:00', open: 6.91, high: 6.95, low: 6.88, close: 6.89, volume: 0 },
      { time: '06:00', open: 6.89, high: 6.90, low: 6.84, close: 6.86, volume: 0 },
      { time: '12:00', open: 6.86, high: 6.88, low: 6.80, close: 6.82, volume: 0 },
      { time: '18:00', open: 6.82, high: 6.84, low: 6.75, close: 6.80, volume: 0 }
    ]
  },

  // US Dollar index
  {
    symbol: 'DXY',
    name: 'U.S. Dollar Index',
    exchange: 'TVC',
    category: 'US Dollar index',
    price: 104.28,
    change: -0.34,
    changePercent: -0.32,
    high24h: 104.75,
    low24h: 104.15,
    volume: 'N/A',
    description: 'The US Dollar Index measures the value of the United States dollar relative to a basket of foreign currencies including Euro, Yen, Pound, and Canadian Dollar.',
    sparkline: [104.72, 104.65, 104.58, 104.45, 104.50, 104.35, 104.22, 104.28],
    candles: [
      { time: '08:00', open: 104.68, high: 104.75, low: 104.60, close: 104.62, volume: 0 },
      { time: '10:00', open: 104.62, high: 104.65, low: 104.48, close: 104.52, volume: 0 },
      { time: '12:00', open: 104.52, high: 104.58, low: 104.38, close: 104.40, volume: 0 },
      { time: '14:00', open: 104.40, high: 104.45, low: 104.25, close: 104.30, volume: 0 },
      { time: '16:00', open: 104.30, high: 104.35, low: 104.15, close: 104.28, volume: 0 }
    ]
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    exchange: 'FX_IDC',
    category: 'US Dollar index',
    price: 1.0825,
    change: 0.0026,
    changePercent: 0.24,
    high24h: 1.0842,
    low24h: 1.0788,
    volume: 'N/A',
    description: 'EUR/USD is the world\'s most heavily traded currency pair, reflecting the economic relationship between the Eurozone and the United States.',
    sparkline: [1.079, 1.080, 1.081, 1.0805, 1.082, 1.083, 1.0822, 1.0825],
    candles: [
      { time: '08:00', open: 1.0792, high: 1.0805, low: 1.0788, close: 1.0801, volume: 0 },
      { time: '10:00', open: 1.0801, high: 1.0818, low: 1.0798, close: 1.0812, volume: 0 },
      { time: '12:00', open: 1.0812, high: 1.0828, low: 1.0808, close: 1.0822, volume: 0 },
      { time: '14:00', open: 1.0822, high: 1.0842, low: 1.0818, close: 1.0835, volume: 0 },
      { time: '16:00', open: 1.0835, high: 1.0838, low: 1.0820, close: 1.0825, volume: 0 }
    ]
  },
  {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    exchange: 'FX_IDC',
    category: 'US Dollar index',
    price: 152.40,
    change: -0.69,
    changePercent: -0.45,
    high24h: 153.25,
    low24h: 152.10,
    volume: 'N/A',
    description: 'USD/JPY measures the conversion rate between the greenback and the Japanese yen, sensitive to interest rate differentials and BoJ policy.',
    sparkline: [153.2, 153.05, 152.9, 152.75, 152.8, 152.55, 152.3, 152.4],
    candles: [
      { time: '08:00', open: 153.15, high: 153.25, low: 152.95, close: 153.02, volume: 0 },
      { time: '10:00', open: 153.02, high: 153.10, low: 152.78, close: 152.85, volume: 0 },
      { time: '12:00', open: 152.85, high: 152.92, low: 152.50, close: 152.62, volume: 0 },
      { time: '14:00', open: 152.62, high: 152.70, low: 152.20, close: 152.35, volume: 0 },
      { time: '16:00', open: 152.35, high: 152.52, low: 152.10, close: 152.40, volume: 0 }
    ]
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    exchange: 'FX_IDC',
    category: 'US Dollar index',
    price: 1.2980,
    change: 0.0023,
    changePercent: 0.18,
    high24h: 1.3005,
    low24h: 1.2940,
    volume: 'N/A',
    description: 'GBP/USD, traditionally known as "Cable", represents the exchange rate between the British pound sterling and the US dollar.',
    sparkline: [1.2945, 1.2955, 1.2962, 1.297, 1.2965, 1.2985, 1.2995, 1.298],
    candles: [
      { time: '08:00', open: 1.2948, high: 1.2962, low: 1.2940, close: 1.2958, volume: 0 },
      { time: '10:00', open: 1.2958, high: 1.2975, low: 1.2952, close: 1.2968, volume: 0 },
      { time: '12:00', open: 1.2968, high: 1.2988, low: 1.2962, close: 1.2979, volume: 0 },
      { time: '14:00', open: 1.2979, high: 1.3005, low: 1.2974, close: 1.2990, volume: 0 },
      { time: '16:00', open: 1.2990, high: 1.2995, low: 1.2972, close: 1.2980, volume: 0 }
    ]
  },

  // Futures
  {
    symbol: 'CL1!',
    name: 'Crude Oil',
    exchange: 'NYMEX',
    category: 'Futures',
    price: 71.45,
    unit: 'USD/bbl',
    change: -0.83,
    changePercent: -1.15,
    high24h: 72.60,
    low24h: 70.90,
    volume: '412K contracts',
    description: 'Light Sweet Crude Oil (WTI) is the world\'s most actively traded energy product and the leading benchmark for global crude prices.',
    sparkline: [72.5, 72.3, 72.1, 71.8, 72.0, 71.5, 71.2, 71.45],
    candles: [
      { time: '09:00', open: 72.4, high: 72.6, low: 72.1, close: 72.2, volume: 38000 },
      { time: '11:00', open: 72.2, high: 72.35, low: 71.75, close: 71.9, volume: 46000 },
      { time: '13:00', open: 71.9, high: 72.1, low: 71.3, close: 71.5, volume: 51000 },
      { time: '15:00', open: 71.5, high: 71.7, low: 70.9, close: 71.25, volume: 62000 },
      { time: '17:00', open: 71.25, high: 71.55, low: 71.1, close: 71.45, volume: 39000 }
    ]
  },
  {
    symbol: 'SI1!',
    name: 'Silver',
    exchange: 'COMEX',
    category: 'Futures',
    price: 34.12,
    unit: 'USD/oz',
    change: 0.36,
    changePercent: 1.08,
    high24h: 34.40,
    low24h: 33.65,
    volume: '115K contracts',
    description: 'Silver futures contract provides key exposure to precious metal trends and industrial demand across electronics and photovoltaics.',
    sparkline: [33.7, 33.8, 33.75, 33.95, 34.0, 34.25, 34.2, 34.12],
    candles: [
      { time: '09:00', open: 33.72, high: 33.88, low: 33.65, close: 33.82, volume: 15000 },
      { time: '11:00', open: 33.82, high: 34.02, low: 33.76, close: 33.96, volume: 18000 },
      { time: '13:00', open: 33.96, high: 34.25, low: 33.90, close: 34.15, volume: 24000 },
      { time: '15:00', open: 34.15, high: 34.40, low: 34.05, close: 34.22, volume: 29000 },
      { time: '17:00', open: 34.22, high: 34.28, low: 34.06, close: 34.12, volume: 19000 }
    ]
  },
  {
    symbol: 'ES1!',
    name: 'E-mini S&P 500',
    exchange: 'CME',
    category: 'Futures',
    price: 5832.00,
    change: 39.25,
    changePercent: 0.68,
    high24h: 5840.50,
    low24h: 5790.00,
    volume: '1.25M contracts',
    description: 'The E-mini S&P 500 is one of the most liquid financial contracts globally, delivering electronically traded exposure to US equity markets.',
    sparkline: [5792, 5800, 5808, 5815, 5822, 5835, 5828, 5832],
    candles: [
      { time: '09:00', open: 5795, high: 5808, low: 5790, close: 5804, volume: 110000 },
      { time: '11:00', open: 5804, high: 5818, low: 5800, close: 5812, volume: 140000 },
      { time: '13:00', open: 5812, high: 5828, low: 5810, close: 5824, volume: 175000 },
      { time: '15:00', open: 5824, high: 5840, low: 5820, close: 5836, volume: 220000 },
      { time: '17:00', open: 5836, high: 5838, low: 5826, close: 5832, volume: 160000 }
    ]
  },
  {
    symbol: 'NG1!',
    name: 'Natural Gas',
    exchange: 'NYMEX',
    category: 'Futures',
    price: 2.68,
    unit: 'USD/MMBtu',
    change: 0.083,
    changePercent: 3.20,
    high24h: 2.72,
    low24h: 2.58,
    volume: '185K contracts',
    description: 'Henry Hub Natural Gas futures contract on the New York Mercantile Exchange reflects spot and future pipeline gas valuation.',
    sparkline: [2.59, 2.61, 2.60, 2.64, 2.63, 2.69, 2.71, 2.68],
    candles: [
      { time: '09:00', open: 2.59, high: 2.63, low: 2.58, close: 2.62, volume: 22000 },
      { time: '11:00', open: 2.62, high: 2.66, low: 2.61, close: 2.64, volume: 27000 },
      { time: '13:00', open: 2.64, high: 2.70, low: 2.63, close: 2.68, volume: 34000 },
      { time: '15:00', open: 2.68, high: 2.72, low: 2.66, close: 2.70, volume: 38000 },
      { time: '17:00', open: 2.70, high: 2.71, low: 2.67, close: 2.68, volume: 29000 }
    ]
  },

  // US 10Y yield
  {
    symbol: 'US10Y',
    name: 'US 10-Year Bond Yield',
    exchange: 'TVC',
    category: 'US 10Y yield',
    price: 4.24,
    unit: '%',
    change: -0.03,
    changePercent: -0.70,
    high24h: 4.29,
    low24h: 4.22,
    volume: 'N/A',
    description: 'The yield on the 10-year Treasury bond serves as the global benchmark interest rate and risk-free hurdle rate for modern asset pricing.',
    sparkline: [4.28, 4.27, 4.26, 4.27, 4.25, 4.23, 4.25, 4.24],
    candles: [
      { time: '08:00', open: 4.28, high: 4.29, low: 4.26, close: 4.27, volume: 0 },
      { time: '10:00', open: 4.27, high: 4.28, low: 4.25, close: 4.26, volume: 0 },
      { time: '12:00', open: 4.26, high: 4.27, low: 4.23, close: 4.24, volume: 0 },
      { time: '14:00', open: 4.24, high: 4.26, low: 4.22, close: 4.23, volume: 0 },
      { time: '16:00', open: 4.23, high: 4.25, low: 4.22, close: 4.24, volume: 0 }
    ]
  },
  {
    symbol: 'US02Y',
    name: 'US 2-Year Bond Yield',
    exchange: 'TVC',
    category: 'US 10Y yield',
    price: 4.12,
    unit: '%',
    change: -0.02,
    changePercent: -0.48,
    high24h: 4.16,
    low24h: 4.10,
    volume: 'N/A',
    description: 'Reflects monetary policy trajectory expectations from the Federal Reserve over the near-term two-year horizon.',
    sparkline: [4.15, 4.14, 4.13, 4.14, 4.13, 4.11, 4.12, 4.12],
    candles: [
      { time: '08:00', open: 4.15, high: 4.16, low: 4.13, close: 4.14, volume: 0 },
      { time: '12:00', open: 4.14, high: 4.15, low: 4.12, close: 4.13, volume: 0 },
      { time: '16:00', open: 4.13, high: 4.14, low: 4.10, close: 4.12, volume: 0 }
    ]
  },
  {
    symbol: 'US30Y',
    name: 'US 30-Year Bond Yield',
    exchange: 'TVC',
    category: 'US 10Y yield',
    price: 4.48,
    unit: '%',
    change: -0.04,
    changePercent: -0.88,
    high24h: 4.53,
    low24h: 4.46,
    volume: 'N/A',
    description: 'Long-bond yield indicative of structural long-run inflation expectations and sovereign treasury financing conditions.',
    sparkline: [4.52, 4.51, 4.50, 4.49, 4.50, 4.47, 4.49, 4.48],
    candles: [
      { time: '08:00', open: 4.52, high: 4.53, low: 4.50, close: 4.51, volume: 0 },
      { time: '12:00', open: 4.51, high: 4.52, low: 4.48, close: 4.49, volume: 0 },
      { time: '16:00', open: 4.49, high: 4.50, low: 4.46, close: 4.48, volume: 0 }
    ]
  }
];

export const INITIAL_IDEAS: TradingIdea[] = [
  {
    id: 'idea-1',
    symbol: 'AUDUSD',
    symbolTag: 'AUDUSD',
    type: 'Short',
    title: 'AUD/USD Slips as RBA Hike Meets 5% U.S. Yields',
    summary: 'AUD/USD traded lower on Tuesday even as the RBA unanimously raised the overnight cash rate by 25-bps to 4.60%. The move was largely priced-in, leaving the currency vulnerable to a sell-the-fact reaction.',
    fullAnalysis: `The Reserve Bank of Australia raised interest rates to 4.60% as anticipated, but Governor Bullock's cautious forward guidance failed to provide fresh bullish impetus. Meanwhile, resilience in US economic prints has pushed the 10-year US Treasury yield towards 4.25%, strengthening the greenback against high-beta commodity currencies.

Technical Breakdown:
- Resistance at 0.6620 has decisively held for three consecutive sessions.
- Clean break below the 20-day EMA (0.6580) signals continuation toward 0.6510 support.
- Bearish MACD crossover confirmed on the 4-hour chart with expanding negative histogram volume.`,
    author: 'tastyfx',
    authorAvatarColor: 'bg-blue-600',
    timeAgo: '4h ago',
    likes: 184,
    category: "Editors' picks",
    candlestickPattern: [
      { height: 64, color: 'green', wickTop: 8, wickBottom: 80 },
      { height: 48, color: 'red', wickTop: 12, wickBottom: 72 },
      { height: 80, color: 'green', wickTop: 4, wickBottom: 96 },
      { height: 56, color: 'red', wickTop: 8, wickBottom: 80 },
      { height: 40, color: 'red', wickTop: 16, wickBottom: 72 }
    ],
    entryPrice: '0.6580',
    targetPrice: '0.6495',
    stopLoss: '0.6635',
    timeframe: '4h',
    comments: [
      {
        id: 'c1',
        author: 'MacroTrader99',
        avatarColor: 'bg-emerald-600',
        content: 'Spot on with the sell-the-fact thesis. RBA hawkishness was 100% baked into AUD swaps.',
        timeAgo: '2h ago'
      },
      {
        id: 'c2',
        author: 'SydForex',
        avatarColor: 'bg-purple-600',
        content: 'Watching 0.6510 carefully—significant monthly confluence sitting right there.',
        timeAgo: '1h ago'
      }
    ]
  },
  {
    id: 'idea-2',
    symbol: 'AAPL',
    symbolTag: 'AAPL',
    type: 'Long',
    title: 'AAPL Calls or Puts? This Box Decides the Trade',
    summary: 'AAPL is maintaining a broader bullish structure, with price testing key demand along the rising trendline. Waiting for premarket confirmation at the top retest level before aggressive execution.',
    fullAnalysis: `Apple is consolidating inside a well-defined compression range between $228 and $235. Institutional order flow exhibits persistent passive absorption whenever price dips toward the $229 demand shelf. 

Strategic Catalyst:
- Services revenue expansion and upcoming generative AI rollouts continue to attract high-conviction buy-and-hold accumulation.
- RSI reset to 52 provides ample expansion headroom without overbought fatigue.
- Volume Profile shows high node volume (Point of Control) firmly beneath current pricing.`,
    author: 'tmac1914',
    authorAvatarColor: 'bg-emerald-600',
    timeAgo: '6h ago',
    likes: 312,
    category: "Editors' picks",
    candlestickPattern: [
      { height: 40, color: 'green', wickTop: 8, wickBottom: 64 },
      { height: 56, color: 'green', wickTop: 12, wickBottom: 80 },
      { height: 72, color: 'green', wickTop: 8, wickBottom: 88 },
      { height: 32, color: 'red', wickTop: 4, wickBottom: 56 },
      { height: 88, color: 'green', wickTop: 8, wickBottom: 104 }
    ],
    entryPrice: '$231.50',
    targetPrice: '$244.00',
    stopLoss: '$226.80',
    timeframe: 'Daily',
    comments: [
      {
        id: 'c3',
        author: 'OptionGuru',
        avatarColor: 'bg-sky-600',
        content: 'Holding the Nov 240C calls. The volume compression is coiled like a spring.',
        timeAgo: '4h ago'
      }
    ]
  },
  {
    id: 'idea-3',
    symbol: 'BTCUSDT',
    symbolTag: 'BTCUSDT',
    type: 'Long',
    title: 'BTC: Bullish accumulation suggests further upward expansion',
    summary: 'Bitcoin is finishing an ascending triangle base pattern on the hourly time frame. Structural strength holds above the pivotal 83,200 support boundary with target targets above 88k.',
    fullAnalysis: `Bitcoin is exhibiting characteristic Wyckoff re-accumulation traits following the parabolic run above 80k. On-chain exchange reserves continue to slide to multi-year lows while spot ETF inflows print positive net additions.

Key Parameters:
- Invalidation level rests securely under $82,400.
- Resistance at $85,200 is testing for the 4th time; repeated touches weaken structural ceiling.
- Target 1: $88,500; Target 2: $92,000 Fibonacci extension.`,
    author: 'EXCAVO',
    authorAvatarColor: 'bg-amber-600',
    timeAgo: '10h ago',
    likes: 549,
    category: "Editors' picks",
    candlestickPattern: [
      { height: 56, color: 'green', wickTop: 8, wickBottom: 80 },
      { height: 64, color: 'green', wickTop: 12, wickBottom: 88 },
      { height: 32, color: 'red', wickTop: 4, wickBottom: 48 },
      { height: 40, color: 'green', wickTop: 8, wickBottom: 60 },
      { height: 76, color: 'green', wickTop: 4, wickBottom: 96 }
    ],
    entryPrice: '$83,800',
    targetPrice: '$88,500',
    stopLoss: '$82,200',
    timeframe: '1h',
    comments: [
      {
        id: 'c4',
        author: 'SatoshiFan',
        avatarColor: 'bg-amber-500',
        content: 'Ascending triangle breakout looks textbook. Ready for the next leg up!',
        timeAgo: '8h ago'
      },
      {
        id: 'c5',
        author: 'BitQuant',
        avatarColor: 'bg-indigo-600',
        content: 'Funding rates remain remarkably cool for these price levels. Bullish continuation favored.',
        timeAgo: '5h ago'
      }
    ]
  },
  {
    id: 'idea-4',
    symbol: 'NVDA',
    symbolTag: 'NVDA',
    type: 'Long',
    title: 'NVDA: Ascending channel breakout targeting $152 zone',
    summary: 'Blackwell chip architecture deliveries and cloud hyperscaler capex increases provide strong fundamental backing for continued price discovery.',
    fullAnalysis: `Nvidia has broken out of its 6-week consolidation channel with above-average volume. The 50-day moving average is pointing decisively upward, confirming the medium-term trend.

Technical Indicators:
- Price has cleared former resistance at $138, turning it into firm support.
- Chaikin Money Flow (CMF) prints +0.22 indicating institutional accumulation.
- Upside target: $152 projected resistance channel ceiling.`,
    author: 'chart_wizard',
    authorAvatarColor: 'bg-violet-600',
    timeAgo: '12h ago',
    likes: 428,
    category: 'Popular',
    candlestickPattern: [
      { height: 44, color: 'green', wickTop: 6, wickBottom: 68 },
      { height: 62, color: 'green', wickTop: 10, wickBottom: 82 },
      { height: 28, color: 'red', wickTop: 8, wickBottom: 45 },
      { height: 50, color: 'green', wickTop: 4, wickBottom: 70 },
      { height: 82, color: 'green', wickTop: 8, wickBottom: 100 }
    ],
    entryPrice: '$140.20',
    targetPrice: '$152.00',
    stopLoss: '$134.50',
    timeframe: 'Daily',
    comments: []
  },
  {
    id: 'idea-5',
    symbol: 'GOLD',
    symbolTag: 'GC1!',
    type: 'Long',
    title: 'Gold: Central bank purchases anchor historic secular bull run',
    summary: 'Sovereign balance sheets continue to substitute US Treasuries with physical bullion, establishing an unprecedented price floor above $4,000.',
    fullAnalysis: `Gold is exhibiting extraordinary relative strength across all sovereign fiat currencies. The weekly chart shows a pristine staircase pattern of consolidation followed by energetic upward breakouts.

Risk / Reward Analysis:
- Strong base formed between $4,080 and $4,120.
- Target $4,300 represents next major psychological and structural level.`,
    author: 'CommodityPro',
    authorAvatarColor: 'bg-yellow-600',
    timeAgo: '1d ago',
    likes: 671,
    category: 'Popular',
    candlestickPattern: [
      { height: 50, color: 'green', wickTop: 6, wickBottom: 72 },
      { height: 54, color: 'green', wickTop: 8, wickBottom: 78 },
      { height: 48, color: 'green', wickTop: 4, wickBottom: 65 },
      { height: 35, color: 'red', wickTop: 12, wickBottom: 58 },
      { height: 70, color: 'green', wickTop: 8, wickBottom: 90 }
    ],
    entryPrice: '$4,135',
    targetPrice: '$4,300',
    stopLoss: '$4,050',
    timeframe: 'Weekly',
    comments: []
  },
  {
    id: 'idea-6',
    symbol: 'TSLA',
    symbolTag: 'TSLA',
    type: 'Short',
    title: 'TSLA: Supply zone rejection with bearish divergence on Daily RSI',
    summary: 'Tesla met strong institutional distribution near the $260 psychological resistance level, with daily momentum indicators failing to confirm recent highs.',
    fullAnalysis: `Price tested the upper descending trendline resistance and formed a prominent shooting star candlestick pattern on elevated volume.

Strategy:
- Short entry near $256 with tight risk management.
- Downside target aligns with the unfilled gap at $232.`,
    author: 'AlphaSeeker',
    authorAvatarColor: 'bg-rose-600',
    timeAgo: '1d ago',
    likes: 290,
    category: 'More',
    candlestickPattern: [
      { height: 60, color: 'green', wickTop: 12, wickBottom: 85 },
      { height: 70, color: 'green', wickTop: 14, wickBottom: 95 },
      { height: 80, color: 'red', wickTop: 24, wickBottom: 110 },
      { height: 50, color: 'red', wickTop: 10, wickBottom: 75 },
      { height: 42, color: 'red', wickTop: 16, wickBottom: 70 }
    ],
    entryPrice: '$256.00',
    targetPrice: '$232.00',
    stopLoss: '$264.50',
    timeframe: 'Daily',
    comments: []
  }
];
