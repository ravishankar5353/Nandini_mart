import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldCheck, Truck, Clock, Sparkles, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Core Value Props Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Mandatory Doorstep Delivery</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Delivered straight to your door</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">30-45 Mins Superfast</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Morning & evening delivery slots</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Quality Guarantee</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Fresh farm-picked groceries</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Live Order Tracking</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Real-time status updates</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-600/30">
                N
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                NANDINI<span className="text-emerald-500">MART</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your everyday groceries, household essentials and fresh farm products — all in one place with convenient, mandatory doorstep delivery.
            </p>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-800/50 inline-block">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Special Project Showcase</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Engineered with React, modern mock APIs & zero external backend dependencies.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wide mb-3">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">All Groceries</Link></li>
              <li><Link to="/shop?deals=true" className="hover:text-emerald-400 transition-colors">Today's Deals</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-400 transition-colors">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-emerald-400 transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-emerald-400 transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wide mb-3">Top Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop?category=fruits-vegetables" className="hover:text-emerald-400 transition-colors">Fruits & Vegetables</Link></li>
              <li><Link to="/shop?category=dairy-eggs" className="hover:text-emerald-400 transition-colors">Dairy & Farm Eggs</Link></li>
              <li><Link to="/shop?category=rice-grains" className="hover:text-emerald-400 transition-colors">Rice, Atta & Grains</Link></li>
              <li><Link to="/shop?category=pulses-dal" className="hover:text-emerald-400 transition-colors">Unpolished Dal & Pulses</Link></li>
              <li><Link to="/shop?category=snacks" className="hover:text-emerald-400 transition-colors">Snacks & Munchies</Link></li>
              <li><Link to="/shop?category=cooking-essentials" className="hover:text-emerald-400 transition-colors">Oils, Ghee & Spices</Link></li>
            </ul>
          </div>

          {/* Customer Service & Contact */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wide mb-3">Customer Service</h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-400">
                <Home className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Doorstep Delivery Only</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1800-NANDINI-MART</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@nandinimart.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Prominent Attribution & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400 text-center md:text-left">
            © 2026 <strong className="text-white">NANDINI MART</strong>. All Rights Reserved. Fresh Groceries Delivered to Your Doorstep.
          </div>

          {/* Prominent Developed by NANDINI badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 border border-emerald-700/80 shadow-lg shadow-emerald-950/40">
            <span className="text-slate-300 font-medium">Project Crafted &</span>
            <span className="font-black text-emerald-300 text-sm tracking-wide flex items-center gap-1.5">
              Developed by NANDINI <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
