import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  X,
  Star,
  ChevronDown,
  LayoutGrid,
  List,
  Flame,
  Check,
  RefreshCw,
  Home
} from 'lucide-react';
import { productApi } from '../services/productApi';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSkeleton } from '../components/common/ProductSkeleton';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const dealsOnly = searchParams.get('deals') === 'true';
  const sortBy = searchParams.get('sort') || 'relevance';

  // Local filter states
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts({
          category: selectedCategory,
          search: searchQuery,
          minPrice,
          maxPrice,
          minRating,
          inStockOnly,
          dealsOnly,
          sortBy
        });
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, dealsOnly, sortBy, minPrice, maxPrice, minRating, inStockOnly]);

  const currentCategoryObj = useMemo(() => {
    return CATEGORIES.find(c => c.slug === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    selectedCategory !== 'all' ||
    searchQuery ||
    dealsOnly ||
    minRating > 0 ||
    inStockOnly ||
    minPrice > 0 ||
    maxPrice < 1000
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Category Banner if selected */}
      {currentCategoryObj && (
        <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden shadow-card">
          <div className="relative z-10 max-w-xl">
            <span className="text-3xl mb-2 block">{currentCategoryObj.icon}</span>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {currentCategoryObj.name}
            </h1>
            <p className="text-xs md:text-sm text-emerald-200 mt-1">
              {currentCategoryObj.description}
            </p>
          </div>
        </div>
      )}

      {/* Header bar: Query, count, sorting & view toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              {searchQuery ? (
                <>Search results for <span className="text-emerald-700">"{searchQuery}"</span></>
              ) : dealsOnly ? (
                <span className="flex items-center gap-1.5 text-rose-600">
                  <Flame className="w-5 h-5 fill-rose-600" />
                  Today's Best Deals
                </span>
              ) : currentCategoryObj ? (
                currentCategoryObj.name
              ) : (
                'All Grocery Products'
              )}
            </h2>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {loading ? '...' : `${products.length} items`}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-emerald-600" />
            <span>All items are eligible for mandatory doorstep delivery.</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Discount (% Off)</option>
              <option value="popularity">Popularity / Best Sellers</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Layout: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-6 sticky top-36">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Filter Groceries</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5">
              Categories
            </h4>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>All Categories</span>
                {selectedCategory === 'all' && <Check className="w-3.5 h-3.5" />}
              </button>

              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Max Price
              </h4>
              <span className="text-xs font-extrabold text-emerald-700">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>₹30</span>
              <span>₹1000+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
              Customer Rating
            </h4>
            <div className="space-y-1.5">
              {[4.5, 4.0, 0].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    minRating === rating
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-500'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {rating > 0 ? (
                      <>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rating}★ & above</span>
                      </>
                    ) : (
                      <span>All Ratings</span>
                    )}
                  </div>
                  {minRating === rating && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                No matching grocery items found
              </h3>
              <p className="text-xs md:text-sm text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try searching for milk, rice, apples, dal, or resetting filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="w-80 max-w-full bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                  <span>Filter Options</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-900 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => {
                      handleCategoryChange('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold ${
                      selectedCategory === 'all' ? 'bg-emerald-700 text-white' : 'text-slate-700 bg-slate-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryChange(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold ${
                        selectedCategory === cat.slug ? 'bg-emerald-700 text-white' : 'text-slate-700 bg-slate-50'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Max Price</span>
                  <span className="text-emerald-700 font-black">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Mobile In Stock */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
