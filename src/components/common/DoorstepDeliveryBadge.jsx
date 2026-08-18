import React from 'react';
import { Home, ShieldCheck, Truck } from 'lucide-react';

export const DoorstepDeliveryBadge = ({
  variant = 'standard', // 'compact', 'standard', 'banner', 'checkout'
  className = ''
}) => {
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300/80 ${className}`}>
        <Home className="w-3 h-3 text-emerald-700 shrink-0" />
        <span>Doorstep Delivery</span>
      </span>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white shadow-xl shadow-emerald-950/20 border border-emerald-700/50 ${className}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <Home className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base md:text-lg text-emerald-100">
                100% Mandatory Doorstep Delivery
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
                Guaranteed
              </span>
            </div>
            <p className="text-xs md:text-sm text-emerald-200/80 mt-0.5">
              All NANDINI MART orders are carefully packaged & delivered directly to your doorstep. No store visits required!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/80 shrink-0">
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>Delivered in 30-45 Mins</span>
        </div>
      </div>
    );
  }

  if (variant === 'checkout') {
    return (
      <div className={`p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500/80 shadow-sm ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Home className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-1.5">
                🏠 Doorstep Delivery — Mandatory
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm">
                LOCKED & ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Doorstep delivery is mandatory for all orders.</strong> Our verified delivery partner will bring your fresh groceries directly to your flat/door with sanitized contact and OTP verification.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-150/70 px-2.5 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Direct delivery to selected address &middot; No pickup option available</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold ${className}`}>
      <Home className="w-4 h-4 text-emerald-700 shrink-0" />
      <span>🏠 Doorstep Delivery Guaranteed</span>
    </div>
  );
};
