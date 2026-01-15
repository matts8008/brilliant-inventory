'use client';

import { useState } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ExternalLink,
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
    className: 'bg-green-50 text-green-700 border-green-200',
  },
  high: {
    label: 'Price High',
    className: 'bg-red-50 text-red-700 border-red-200',
  },
  low: {
    label: 'Price Low',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreaker, setSelectedBreaker] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BI</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Brilliant Inventory</h1>
                <p className="text-xs text-slate-500">Price Intelligence</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search breakers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Sync
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500 mb-1">Total Products</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500 mb-1">Competitive</p>
            <p className="text-2xl font-semibold text-green-600">{stats.competitive}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500 mb-1">Price High</p>
            <p className="text-2xl font-semibold text-red-600">{stats.high}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500 mb-1">Price Low</p>
            <p className="text-2xl font-semibold text-amber-600">{stats.low}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => setPriceType('new')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  priceType === 'new'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setPriceType('used')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  priceType === 'used'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Used
              </button>
            </div>
            <span className="text-sm text-slate-500">
              {filteredBreakers.length} products
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-slate-500 uppercase tracking-wide">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Our Price</div>
              <div className="col-span-2 text-center">Market Range</div>
              <div className="col-span-3 text-center">eBay</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {filteredBreakers.map((breaker) => {
              const status = statusConfig[breaker.status as keyof typeof statusConfig];
              const brilliantPrice = breaker.brilliant[priceType];
              const minPrice = getMinCompetitorPrice(breaker.competitors, priceType);
              const maxPrice = getMaxCompetitorPrice(breaker.competitors, priceType);
              const isExpanded = selectedBreaker === breaker.id;

              return (
                <div key={breaker.id}>
                  <div
                    onClick={() => setSelectedBreaker(isExpanded ? null : breaker.id)}
                    className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="col-span-3">
                        <p className="font-medium text-slate-900">{breaker.name}</p>
                        <p className="text-sm text-slate-500">{breaker.description} · {breaker.manufacturer}</p>
                      </div>

                      {/* Status */}
                      <div className="col-span-1 flex justify-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${status.className}`}>
                          {status.label}
                        </span>
                      </div>

                      {/* Our Price */}
                      <div className="col-span-2 text-right">
                        <p className="text-lg font-semibold text-slate-900">${brilliantPrice.toFixed(2)}</p>
                      </div>

                      {/* Market Range */}
                      <div className="col-span-2 text-center">
                        <p className="text-sm text-slate-600">
                          ${minPrice.toFixed(2)} – ${maxPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* eBay */}
                      <div className="col-span-3">
                        <div className="flex items-center justify-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-slate-500">Avg Sold</p>
                            <p className="font-medium text-slate-900">${breaker.ebay.avgSold.toFixed(2)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-500">Listed</p>
                            <p className="font-medium text-slate-900">{breaker.ebay.currentListings}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-500">Trend</p>
                            <div className="flex justify-center">
                              {breaker.ebay.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-600" />}
                              {breaker.ebay.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-600" />}
                              {breaker.ebay.trend === 'stable' && <Minus className="w-4 h-4 text-slate-400" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expand */}
                      <div className="col-span-1 flex justify-end">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Competitor Prices */}
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-3">
                            Competitor Prices ({priceType === 'new' ? 'New' : 'Used'})
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(breaker.competitors).map(([name, prices]) => {
                              const price = prices[priceType];
                              const diff = price ? brilliantPrice - price : null;
                              return (
                                <div
                                  key={name}
                                  className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-3 py-2"
                                >
                                  <span className="text-sm text-slate-600">{name}</span>
                                  {price ? (
                                    <div className="text-right">
                                      <span className="text-sm font-medium text-slate-900">${price.toFixed(2)}</span>
                                      {diff !== null && (
                                        <span className={`ml-2 text-xs ${diff < 0 ? 'text-green-600' : diff > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                          {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-sm text-slate-400">N/A</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* eBay Details */}
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-3">eBay Market Data</h4>
                          <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Avg Sold Price</p>
                                <p className="text-lg font-semibold text-slate-900">${breaker.ebay.avgSold.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Recent Sales (30d)</p>
                                <p className="text-lg font-semibold text-slate-900">{breaker.ebay.recentSales}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Current Listings</p>
                                <p className="text-lg font-semibold text-slate-900">{breaker.ebay.currentListings}</p>
                              </div>
                            </div>
                            <a
                              href="#"
                              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                              View on eBay
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
