import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Zap, Star, ArrowRight, Sparkles, Heart, Store } from 'lucide-react';

export const SplashPage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />

        {/* Floating grocery icons */}
        {['🥦', '🥛', '🍎', '🌽', '🥕', '🍚', '🧂', '🛒'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float select-none"
            style={{
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto space-y-8 py-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-2">
            <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              MNM<span className="text-emerald-400">MART</span>
            </h1>
            <p className="text-emerald-300/80 font-semibold text-sm md:text-base mt-2 tracking-wide">
              Fresh Groceries. Easy Shopping. Delivered to Your Doorstep.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { icon: Truck, text: 'Doorstep Delivery', color: 'from-emerald-500/20 to-emerald-600/10' },
            { icon: Shield, text: '100% Fresh Quality', color: 'from-teal-500/20 to-teal-600/10' },
            { icon: Zap, text: '30-45 Mins Fast', color: 'from-amber-500/20 to-amber-600/10' },
            { icon: Star, text: '55+ Grocery Items', color: 'from-rose-500/20 to-rose-600/10' },
          ].map(({ icon: Icon, text, color }, i) => (
            <div key={i} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${color} border border-white/10 text-white text-xs font-semibold backdrop-blur-sm`}>
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            onClick={() => navigate('/auth')}
            className="group relative px-9 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg shadow-2xl shadow-emerald-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>Start Now 🚀</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/home')}
            className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Browse Store</span>
          </button>

          <button
            onClick={() => navigate('/admin/login')}
            className="px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 font-bold text-sm border border-white/10 backdrop-blur-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Prominent Developed by MNM Team 🚀 Badge */}
        <div className="pt-6 border-t border-white/10">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/40 shadow-xl">
            <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-emerald-200 font-medium text-sm">Developed with</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="text-white font-black text-base tracking-wide">by MNM Team 🚀</span>
          </div>

          <p className="text-slate-500 text-xs mt-3 font-medium">
            A complete grocery delivery system — built for convenience, quality & speed.
          </p>
        </div>
      </div>
    </div>
  );
};
