'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  List,
  Filter,
  RefreshCw,
  DollarSign,
  Package,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Clock,
  ShoppingCart,
  BarChart3,
} from 'lucide-react';

// Mock data for circuit breakers
const breakerData = [
  {
    id: 'BR120',
    name: 'BR120',
    description: '20A Single Pole',
    manufacturer: 'Eaton',
    brilliant: { new: 8.99, used: 5.49 },
    competitors: {
      'Eaton Direct': { new: 12.49, used: null },
      'Schneider': { new: 11.99, used: 6.99 },
      'ABB': { new: 13.25, used: 7.50 },
      'Siemens': { new: 10.99, used: 5.99 },
      'Square D': { new: 11.49, used: 6.25 },
      'GE': { new: 10.75, used: 5.75 },
    },
    ebay: {
      avgSold: 7.82,
      recentSales: 47,
      currentListings: 156,
      trend: 'up',
    },
    status: 'competitive',
  },
  {
    id: 'BR230',
    name: 'BR230',
    description: '30A Double Pole',
    manufacturer: 'Eaton',
    brilliant: { new: 14.99, used: 9.99 },
    competitors: {
      'Eaton Direct': { new: 18.99, used: null },
      'Schneider': { new: 17.49, used: 11.99 },
      'ABB': { new: 19.25, used: 12.50 },
      'Siemens': { new: 16.99, used: 10.99 },
      'Square D': { new: 17.25, used: 11.25 },
      'GE': { new: 15.99, used: 10.50 },
    },
    ebay: {
      avgSold: 12.45,
      recentSales: 32,
      currentListings: 89,
      trend: 'stable',
    },
    status: 'competitive',
  },
  {
    id: 'QO120',
    name: 'QO120',
    description: '20A Single Pole',
    manufacturer: 'Square D',
    brilliant: { new: 18.99, used: 12.99 },
    competitors: {
      'Eaton Direct': { new: 11.99, used: 7.99 },
      'Schneider': { new: 12.49, used: 8.49 },
      'ABB': { new: 13.75, used: 9.25 },
      'Siemens': { new: 11.49, used: 7.49 },
      'Square D': { new: 14.99, used: 9.99 },
      'GE': { new: 11.25, used: 7.25 },
    },
    ebay: {
      avgSold: 10.15,
      recentSales: 89,
      currentListings: 234,
      trend: 'up',
    },
    status: 'high',
  },
  {
    id: 'CHOM115',
    name: 'CH/OM115',
    description: '15A Single Pole',
    manufacturer: 'Eaton',
    brilliant: { new: 6.99, used: 3.99 },
    competitors: {
      'Eaton Direct': { new: 10.99, used: null },
      'Schneider': { new: 9.99, used: 5.99 },
      'ABB': { new: 11.50, used: 6.50 },
      'Siemens': { new: 9.49, used: 5.49 },
      'Square D': { new: 9.99, used: 5.75 },
      'GE': { new: 9.25, used: 5.25 },
    },
    ebay: {
      avgSold: 5.67,
      recentSales: 156,
      currentListings: 412,
      trend: 'down',
    },
    status: 'low',
  },
  {
    id: 'GE-THQL1120',
    name: 'THQL1120',
    description: '20A Single Pole',
    manufacturer: 'GE',
    brilliant: { new: 9.49, used: 5.99 },
    competitors: {
      'Eaton Direct': { new: 11.49, used: 7.49 },
      'Schneider': { new: 10.99, used: 6.99 },
      'ABB': { new: 12.25, used: 7.75 },
      'Siemens': { new: 10.49, used: 6.49 },
      'Square D': { new: 10.99, used: 6.75 },
      'GE': { new: 11.99, used: 7.25 },
    },
    ebay: {
      avgSold: 7.25,
      recentSales: 62,
      currentListings: 178,
      trend: 'stable',
    },
    status: 'competitive',
  },
  {
    id: 'SIE-Q120',
    name: 'Q120',
    description: '20A Single Pole',
    manufacturer: 'Siemens',
    brilliant: { new: 8.49, used: 4.99 },
    competitors: {
      'Eaton Direct': { new: 10.99, used: 6.99 },
      'Schneider': { new: 10.49, used: 6.49 },
      'ABB': { new: 11.75, used: 7.25 },
      'Siemens': { new: 9.99, used: 5.99 },
      'Square D': { new: 10.49, used: 6.25 },
      'GE': { new: 9.99, used: 5.75 },
    },
    ebay: {
      avgSold: 6.45,
      recentSales: 78,
      currentListings: 201,
      trend: 'up',
    },
    status: 'competitive',
  },
];

const statusConfig = {
  competitive: {
    label: 'Competitive',
    color: 'text-profit',
    bg: 'bg-profit/10',
    border: 'border-profit/30',
    glow: 'glow-profit',
    icon: CheckCircle,
  },
  high: {
    label: 'Price High',
    color: 'text-danger',
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    glow: 'glow-danger',
    icon: TrendingUp,
  },
  low: {
    label: 'Price Low',
    color: 'text-caution',
    bg: 'bg-caution/10',
    border: 'border-caution/30',
    glow: 'glow-caution',
    icon: TrendingDown,
  },
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreaker, setSelectedBreaker] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [priceType, setPriceType] = useState<'new' | 'used'>('new');

  const filteredBreakers = breakerData.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: breakerData.length,
    competitive: breakerData.filter((b) => b.status === 'competitive').length,
    high: breakerData.filter((b) => b.status === 'high').length,
    low: breakerData.filter((b) => b.status === 'low').length,
  };

  const getMinCompetitorPrice = (competitors: Record<string, { new: number | null; used: number | null }>, type: 'new' | 'used') => {
    const prices = Object.values(competitors)
      .map((c) => c[type])
      .filter((p): p is number => p !== null);
    return Math.min(...prices);
  };

  const getMaxCompetitorPrice = (competitors: Record<string, { new: number | null; used: number | null }>, type: 'new' | 'used') => {
    const prices = Object.values(competitors)
      .map((c) => c[type])
      .filter((p): p is number => p !== null);
    return Math.max(...prices);
  };

  const getPricePosition = (brilliant: number, min: number, max: number) => {
    if (brilliant < min) return 'below';
    if (brilliant > max) return 'above';
    return 'within';
  };

  return (
    <div className="min-h-screen bg-void circuit-bg noise-overlay relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-carbon/90 backdrop-blur-xl border-b border-steel/50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric to-electric-dim flex items-center justify-center glow-electric">
                  <Zap className="w-6 h-6 text-void" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-['Archivo_Black'] tracking-tight text-white">
                  BRILLIANT
                </h1>
                <p className="text-xs text-zinc font-mono tracking-widest">
                  PRICE INTELLIGENCE
                </p>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 max-w-xl mx-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc" />
                <input
                  type="text"
                  placeholder="Search breakers by name, type, or manufacturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-graphite border border-steel/50 rounded-xl py-3 pl-12 pr-4 text-chrome placeholder:text-zinc focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/30 transition-all font-mono text-sm"
                />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <button className="flex items-center gap-2 px-4 py-2.5 bg-graphite border border-steel/50 rounded-lg text-silver hover:text-white hover:border-electric/30 transition-all text-sm font-medium">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-electric/10 border border-electric/30 rounded-lg text-electric hover:bg-electric/20 transition-all text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Sync Prices
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {/* Total Products */}
          <div className="bg-graphite/50 border border-steel/30 rounded-2xl p-5 hover:border-electric/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                <Package className="w-6 h-6 text-electric" />
              </div>
              <span className="text-xs font-mono text-zinc bg-steel/30 px-2 py-1 rounded">TOTAL</span>
            </div>
            <p className="text-3xl font-['JetBrains_Mono'] font-semibold text-white mb-1">{stats.total}</p>
            <p className="text-sm text-zinc">Products Tracked</p>
          </div>

          {/* Competitive */}
          <div className="bg-graphite/50 border border-steel/30 rounded-2xl p-5 hover:border-profit/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-profit/10 flex items-center justify-center group-hover:bg-profit/20 transition-colors">
                <CheckCircle className="w-6 h-6 text-profit" />
              </div>
              <span className="text-xs font-mono text-profit bg-profit/10 px-2 py-1 rounded">GOOD</span>
            </div>
            <p className="text-3xl font-['JetBrains_Mono'] font-semibold text-profit mb-1">{stats.competitive}</p>
            <p className="text-sm text-zinc">Competitive Prices</p>
          </div>

          {/* Price High */}
          <div className="bg-graphite/50 border border-steel/30 rounded-2xl p-5 hover:border-danger/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center group-hover:bg-danger/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-danger" />
              </div>
              <span className="text-xs font-mono text-danger bg-danger/10 px-2 py-1 rounded">HIGH</span>
            </div>
            <p className="text-3xl font-['JetBrains_Mono'] font-semibold text-danger mb-1">{stats.high}</p>
            <p className="text-sm text-zinc">Above Market</p>
          </div>

          {/* Price Low */}
          <div className="bg-graphite/50 border border-steel/30 rounded-2xl p-5 hover:border-caution/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-caution/10 flex items-center justify-center group-hover:bg-caution/20 transition-colors">
                <TrendingDown className="w-6 h-6 text-caution" />
              </div>
              <span className="text-xs font-mono text-caution bg-caution/10 px-2 py-1 rounded">LOW</span>
            </div>
            <p className="text-3xl font-['JetBrains_Mono'] font-semibold text-caution mb-1">{stats.low}</p>
            <p className="text-sm text-zinc">Below Market</p>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            {/* Price Type Toggle */}
            <div className="flex items-center bg-graphite border border-steel/50 rounded-lg p-1">
              <button
                onClick={() => setPriceType('new')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  priceType === 'new'
                    ? 'bg-electric text-void'
                    : 'text-zinc hover:text-white'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setPriceType('used')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  priceType === 'used'
                    ? 'bg-electric text-void'
                    : 'text-zinc hover:text-white'
                }`}
              >
                Used
              </button>
            </div>

            <span className="text-sm text-zinc">
              Showing <span className="text-white font-mono">{filteredBreakers.length}</span> breakers
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-graphite border border-steel/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-steel text-white' : 'text-zinc hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-steel text-white' : 'text-zinc hover:text-white'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-graphite/30 border border-steel/30 rounded-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-carbon/50 border-b border-steel/30 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-xs font-mono text-zinc uppercase tracking-wider">
              <div className="col-span-2">Product</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-right">Brilliant</div>
              <div className="col-span-1 text-right">Market Low</div>
              <div className="col-span-1 text-right">Market High</div>
              <div className="col-span-3 text-center">Price Position</div>
              <div className="col-span-2 text-center">eBay Data</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-steel/20">
            <AnimatePresence>
              {filteredBreakers.map((breaker, index) => {
                const status = statusConfig[breaker.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                const brilliantPrice = breaker.brilliant[priceType];
                const minPrice = getMinCompetitorPrice(breaker.competitors, priceType);
                const maxPrice = getMaxCompetitorPrice(breaker.competitors, priceType);
                const position = getPricePosition(brilliantPrice, minPrice, maxPrice);
                const positionPercent = ((brilliantPrice - minPrice) / (maxPrice - minPrice)) * 100;

                return (
                  <motion.div
                    key={breaker.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedBreaker(selectedBreaker === breaker.id ? null : breaker.id)}
                    className={`px-6 py-4 hover:bg-steel/10 cursor-pointer transition-all ${
                      selectedBreaker === breaker.id ? 'bg-electric/5' : ''
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-steel/30 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-electric" />
                          </div>
                          <div>
                            <p className="font-mono font-semibold text-white">{breaker.name}</p>
                            <p className="text-xs text-zinc">{breaker.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1 flex justify-center">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${status.bg} ${status.border} border`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                          <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                        </div>
                      </div>

                      {/* Brilliant Price */}
                      <div className="col-span-1 text-right">
                        <p className="font-mono font-semibold text-electric text-lg">${brilliantPrice.toFixed(2)}</p>
                      </div>

                      {/* Market Low */}
                      <div className="col-span-1 text-right">
                        <p className="font-mono text-profit">${minPrice.toFixed(2)}</p>
                      </div>

                      {/* Market High */}
                      <div className="col-span-1 text-right">
                        <p className="font-mono text-danger">${maxPrice.toFixed(2)}</p>
                      </div>

                      {/* Price Position Visualization */}
                      <div className="col-span-3">
                        <div className="relative">
                          <div className="h-2 bg-steel/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-profit via-caution to-danger"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-electric border-2 border-white shadow-lg"
                            style={{
                              left: `calc(${Math.min(Math.max(positionPercent, 0), 100)}% - 8px)`,
                            }}
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-zinc font-mono">${minPrice.toFixed(2)}</span>
                            <span className="text-xs text-zinc font-mono">${maxPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* eBay Data */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <p className="text-xs text-zinc mb-0.5">Avg Sold</p>
                            <p className="font-mono text-sm text-white">${breaker.ebay.avgSold.toFixed(2)}</p>
                          </div>
                          <div className="w-px h-8 bg-steel/30" />
                          <div className="text-center">
                            <p className="text-xs text-zinc mb-0.5">Listed</p>
                            <p className="font-mono text-sm text-white">{breaker.ebay.currentListings}</p>
                          </div>
                          <div className="w-px h-8 bg-steel/30" />
                          <div className="text-center">
                            <p className="text-xs text-zinc mb-0.5">Trend</p>
                            <div className="flex items-center justify-center">
                              {breaker.ebay.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-profit" />}
                              {breaker.ebay.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-danger" />}
                              {breaker.ebay.trend === 'stable' && <Minus className="w-4 h-4 text-zinc" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex justify-end">
                        <button className="p-2 text-zinc hover:text-electric transition-colors">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              selectedBreaker === breaker.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedBreaker === breaker.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-steel/30"
                        >
                          <div className="grid grid-cols-3 gap-6">
                            {/* Competitor Prices */}
                            <div className="col-span-2">
                              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-electric" />
                                Competitor Prices ({priceType === 'new' ? 'New' : 'Used'})
                              </h4>
                              <div className="grid grid-cols-3 gap-3">
                                {Object.entries(breaker.competitors).map(([name, prices]) => {
                                  const price = prices[priceType];
                                  const diff = price ? ((brilliantPrice - price) / price * 100) : null;
                                  return (
                                    <div
                                      key={name}
                                      className="bg-carbon/50 border border-steel/30 rounded-xl p-4 hover:border-electric/30 transition-colors"
                                    >
                                      <p className="text-xs text-zinc mb-2 truncate">{name}</p>
                                      {price ? (
                                        <>
                                          <p className="font-mono font-semibold text-white text-lg">
                                            ${price.toFixed(2)}
                                          </p>
                                          <p className={`text-xs font-mono mt-1 ${
                                            diff && diff > 0 ? 'text-danger' : diff && diff < 0 ? 'text-profit' : 'text-zinc'
                                          }`}>
                                            {diff && diff > 0 ? '+' : ''}{diff?.toFixed(1)}% vs Brilliant
                                          </p>
                                        </>
                                      ) : (
                                        <p className="text-zinc text-sm">N/A</p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* eBay Details */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-electric" />
                                eBay Market Data
                              </h4>
                              <div className="bg-carbon/50 border border-steel/30 rounded-xl p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-zinc text-sm">Average Sold Price</span>
                                  <span className="font-mono font-semibold text-profit">${breaker.ebay.avgSold.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-zinc text-sm">Recent Sales (30d)</span>
                                  <span className="font-mono font-semibold text-white">{breaker.ebay.recentSales}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-zinc text-sm">Current Listings</span>
                                  <span className="font-mono font-semibold text-white">{breaker.ebay.currentListings}</span>
                                </div>
                                <div className="pt-4 border-t border-steel/30">
                                  <a
                                    href="#"
                                    className="flex items-center justify-center gap-2 text-electric hover:text-electric-dim transition-colors text-sm font-medium"
                                  >
                                    View on eBay
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div className="mt-4 flex gap-2">
                                <button className="flex-1 py-2.5 px-4 bg-electric/10 border border-electric/30 rounded-lg text-electric text-sm font-medium hover:bg-electric/20 transition-colors">
                                  Update Price
                                </button>
                                <button className="flex-1 py-2.5 px-4 bg-steel/30 border border-steel/50 rounded-lg text-chrome text-sm font-medium hover:bg-steel/50 transition-colors">
                                  View History
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center justify-between text-sm text-zinc"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Last updated: 5 minutes ago</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-profit pulse-glow" />
              Competitive
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-danger pulse-glow" />
              Above Market
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-caution pulse-glow" />
              Below Market
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
