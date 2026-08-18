import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Home,
  Truck,
  Package,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  FileText
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Launch celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#f59e0b', '#06b6d4', '#10b981']
      });
    } catch {
      // ignore
    }

    if (orderId) {
      const found = getOrderById(orderId);
      if (found) setOrder(found);
    }
  }, [orderId, getOrderById]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14 space-y-8">
      {/* Success Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner pulse-ring">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order #{orderId || 'NDN-2026-88941'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Thank you for shopping with <strong className="text-slate-900">NANDINI MART</strong>.
          </p>
        </div>

        {/* Doorstep Delivery Confirmation Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/80 text-left space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-black text-emerald-950 text-sm sm:text-base">
              <Home className="w-5 h-5 text-emerald-700" />
              <span>🚚 Doorstep Delivery Confirmed</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider">
              Guaranteed
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your grocery order will be packed with care and delivered directly to your doorstep.
          </p>

          {order?.address && (
            <div className="p-3 bg-white rounded-xl border border-emerald-200/80 text-xs space-y-0.5">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{order.address.fullName} ({order.address.type || 'Home'})</span>
              </div>
              <p className="text-slate-600">
                {order.address.houseNo}, {order.address.street}, {order.address.area}
              </p>
              <p className="text-slate-700 font-bold">
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 pt-1 border-t border-emerald-200/60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Estimated Delivery: Within 30-45 Minutes</span>
            </span>
            <span className="text-emerald-700 font-extrabold">OTP: {order?.deliveryPartner?.otp || '4928'}</span>
          </div>
        </div>

        {/* Milestone Tracker Visual */}
        <div className="pt-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Delivery Milestones
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-bold">
            <div className="p-2.5 rounded-xl bg-emerald-700 text-white shadow-xs">
              <div className="w-2 h-2 rounded-full bg-white mx-auto mb-1" />
              <span>Order Placed</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto mb-1 animate-ping" />
              <span>Packing</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mb-1" />
              <span>Out for Delivery</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mb-1" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Link
            to={`/track-order/${orderId || 'NDN-2026-88941'}`}
            className="py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Truck className="w-4 h-4" />
            <span>Track Doorstep Delivery</span>
          </Link>

          <Link
            to="/shop"
            className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
