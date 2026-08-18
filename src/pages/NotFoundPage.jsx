import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-700 font-black text-4xl flex items-center justify-center mx-auto shadow-inner">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          The page or grocery category you are looking for might have been moved or does not exist.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Groceries</span>
        </Link>
      </div>
    </div>
  );
};
