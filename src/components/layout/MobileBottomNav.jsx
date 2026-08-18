import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Flame, Heart, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/') && location.pathname === '/' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/shop') && !location.search.includes('deals') ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Categories</span>
        </Link>

        <Link
          to="/shop?deals=true"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.search.includes('deals') ? 'text-rose-600' : 'text-slate-500'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span>Deals</span>
        </Link>

        <Link
          to="/orders"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/orders') ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Orders</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/cart') ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-extrabold flex items-center justify-center">
              {totalItemCount}
            </span>
          )}
          <span>Cart</span>
        </Link>
      </div>
    </div>
  );
};
