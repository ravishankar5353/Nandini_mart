import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Package,
  Sparkles,
  Menu,
  X,
  LogIn,
  LogOut,
  PlusCircle,
  Home,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { DeliveryAddressSelectorModal } from '../modals/DeliveryAddressSelectorModal';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemCount, finalTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, activeDeliveryAddress, openAuthModal, logout } = useAuth();
  const { activeOrdersCount } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner - Branding & Dev Credit */}
      <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
              <Home className="w-3 h-3" />
              100% Doorstep Delivery
            </span>
            <span className="hidden md:inline text-slate-300">
              Fresh Groceries Delivered in 30-45 Mins
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[11px] tracking-wide shadow-sm">
              <Sparkles className="w-3 h-3 text-slate-950" />
              Developed by MNM Team 🚀
            </span>
            <Link to="/orders" className="text-slate-300 hover:text-emerald-400 font-semibold transition-colors hidden sm:inline">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-slate-700 hover:text-emerald-700 rounded-lg md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl md:text-2xl tracking-tight text-slate-900 leading-none">
                      MNM<span className="text-emerald-600">MART</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    Doorstep Groceries
                  </span>
                </div>
              </Link>
            </div>

            {/* Address Selector Trigger */}
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 hover:border-emerald-500/60 bg-slate-50/70 hover:bg-emerald-50/50 transition-all text-left max-w-[210px]"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <span>Deliver to</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </div>
                <div className="text-xs font-bold text-slate-800 truncate">
                  {activeDeliveryAddress
                    ? `${activeDeliveryAddress.area || activeDeliveryAddress.city} ${activeDeliveryAddress.pincode}`
                    : 'Select Address'}
                </div>
              </div>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-2 hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search groceries, milk, vegetables, atta, dal, snacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-24 py-2.5 md:py-3 bg-slate-100/90 focus:bg-white border border-transparent focus:border-emerald-600 rounded-2xl text-xs md:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all"
                />
                <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 md:py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Nav Icons & Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left hidden xl:block">
                    <span className="text-[10px] text-slate-400 font-semibold block leading-tight">
                      Hello, {user?.name ? user.name.split(' ')[0] : 'Customer'}
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5 leading-tight">
                      Account <ChevronDown className="w-3 h-3" />
                    </span>
                  </div>
                </button>

                {/* User Menu Modal / Dropdown */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user?.name || 'MNM User'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email || 'mnm@mnmmart.com'}</p>
                    </div>

                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <Package className="w-4 h-4" />
                      <span>My Orders</span>
                      {activeOrdersCount > 0 && (
                        <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                          {activeOrdersCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <Heart className="w-4 h-4" />
                      <span>My Wishlist ({wishlistCount})</span>
                    </Link>

                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 text-left"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Manage Addresses</span>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={openAuthModal}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 text-left"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Switch / Demo Login</span>
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Orders Link */}
              <Link
                to="/orders"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors font-bold text-xs"
              >
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Orders</span>
                {activeOrdersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeOrdersCount}
                  </span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-sm">
                      {totalItemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                    Cart
                  </span>
                  <span className="text-xs font-black text-white mt-0.5">
                    ₹{finalTotal}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3 sm:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search groceries & essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-2 bg-slate-100 rounded-xl text-xs font-medium text-slate-900 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                setIsAddressModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">
                  Deliver to: {activeDeliveryAddress?.area || 'Select Address'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-slate-100 rounded-xl text-slate-800 text-center hover:bg-emerald-100"
              >
                All Groceries
              </Link>
              <Link
                to="/shop?deals=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-rose-50 rounded-xl text-rose-700 text-center hover:bg-rose-100"
              >
                🔥 Best Deals
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-slate-100 rounded-xl text-slate-800 text-center hover:bg-emerald-100"
              >
                📦 My Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-slate-100 rounded-xl text-slate-800 text-center hover:bg-emerald-100"
              >
                ❤️ Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Address Selector Modal */}
      <DeliveryAddressSelectorModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </>
  );
};
