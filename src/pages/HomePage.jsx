import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Home,
  Truck,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Heart,
  ChevronRight,
  Flame,
  Star,
  Percent
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { productApi } from '../services/productApi';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { ProductSkeleton } from '../components/common/ProductSkeleton';
import { DoorstepDeliveryBadge } from '../components/common/DoorstepDeliveryBadge';

export const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [freshPicks, setFreshPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [dealsData, bestSellersData, freshPicksData] = await Promise.all([
          productApi.getFeaturedDeals(),
          productApi.getBestSellers(),
          productApi.getFreshPicks()
        ]);
        setDeals(dealsData);
        setBestSellers(bestSellersData);
        setFreshPicks(freshPicksData);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Prominent Developed by MNM Team 🚀 badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold shadow-sm animate-pulse-subtle">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Developed by MNM Team 🚀</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white font-medium">100% Doorstep Delivery Guarantee</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                MNM MART
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Fresh Groceries. Easy Shopping. Delivered to Your Doorstep.
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Your everyday groceries, household essentials and fresh products — all in one place with convenient doorstep delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm md:text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <span>Explore Categories</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Doorstep Only</div>
                  <div className="text-[11px] text-slate-400">Zero store visits</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">30-45 Mins</div>
                  <div className="text-[11px] text-slate-400">Express delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">100% Fresh</div>
                  <div className="text-[11px] text-slate-400">Quality assured</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Banner Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-800/80 to-slate-900/90 border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Live Grocery Hub
                </span>
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Online & Delivering
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh Groceries"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                      Direct Farm-To-Door
                    </p>
                    <p className="text-sm font-black leading-tight">
                      Crisp fruits, organic veggies & household staples
                    </p>
                  </div>
                </div>

                {/* Micro Doorstep Delivery Banner Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Mandatory Doorstep Delivery</p>
                      <p className="text-[11px] text-emerald-300/80">Delivered right to your room/flat</p>
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-emerald-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                Explore Grocery Categories
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Fresh produce, daily dairy, pantry grains, and household essentials.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs md:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {CATEGORIES.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. TODAY'S BEST DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-emerald-500/10 rounded-3xl p-5 md:p-8 border border-rose-200/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Today's Best Deals</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                Mega Grocery Discounts — Up to 40% OFF
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                Grab high quality everyday groceries at unbeatable prices with doorstep delivery.
              </p>
            </div>

            <Link
              to="/shop?deals=true"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {deals.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-amber-500" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                Best Sellers
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Most Loved
                </span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              The everyday grocery items most frequently ordered by customers.
            </p>
          </div>
          <Link
            to="/shop?sort=popularity"
            className="text-xs md:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bestSellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. MANDATORY DOORSTEP DELIVERY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-8 md:p-12 shadow-2xl border border-emerald-700/60">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Home className="w-4 h-4" />
              <span>Core Service Guarantee</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Everything you need. Delivered straight to your doorstep.
            </h3>
            <p className="text-xs md:text-sm text-emerald-200/90 leading-relaxed">
              No parking hassles, no long supermarket queues, and no heavy carrying. All MNM MART orders are safely delivered to your doorstep with guaranteed freshness.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2 active:scale-95"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRESH PICKS FOR YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-teal-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                Fresh Picks for You
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Hand-selected morning arrivals of fruits, vegetables, and milk products.
            </p>
          </div>
          <Link
            to="/shop?category=fruits-vegetables"
            className="text-xs md:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {freshPicks.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 7. WHY MNM MART? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Why Choose Us
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
            Why Shop at MNM MART?
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Built from the ground up to make your daily grocery buying seamless, affordable, and 100% doorstep delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Fast Doorstep Delivery</h4>
            <p className="text-xs text-slate-500 mt-1">
              Guaranteed delivery right to your door in 30-45 minutes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Wide Grocery Selection</h4>
            <p className="text-xs text-slate-500 mt-1">
              50+ curated products across 10 essential grocery categories.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Secure Shopping</h4>
            <p className="text-xs text-slate-500 mt-1">
              Multiple convenient mock payment options with instant confirmation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Percent className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Great Prices & Deals</h4>
            <p className="text-xs text-slate-500 mt-1">
              Daily discounts, coupon codes, and maximum savings on staples.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all text-center flex flex-col items-center sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Easy Order Tracking</h4>
            <p className="text-xs text-slate-500 mt-1">
              Live status tracking from packing to your doorstep with delivery OTP.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
