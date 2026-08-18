import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Flame, Sparkles, LayoutGrid } from 'lucide-react';

export const CategoryBar = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const dealsActive = searchParams.get('deals') === 'true';

  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-16 md:top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {/* All Categories Button */}
          <Link
            to="/shop"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === 'all' && !dealsActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>

          {/* Today's Deals Button */}
          <Link
            to="/shop?deals=true"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              dealsActive
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Today's Deals</span>
          </Link>

          {/* Category List */}
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.slug;
            return (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.shortName || cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
