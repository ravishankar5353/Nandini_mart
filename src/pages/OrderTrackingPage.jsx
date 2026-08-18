import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Package,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { getOrderById, simulateNextStatus, orders } = useOrders();
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const ord = getOrderById(orderId) || orders[0];
      setCurrentOrder(ord);
    } else if (orders.length > 0) {
      setCurrentOrder(orders[0]);
    }
  }, [orderId, orders, getOrderById]);

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Order Not Found</h2>
        <p className="text-sm text-slate-500">Could not find tracking data for Order #{orderId}.</p>
        <Link to="/orders" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs inline-block">
          View My Orders
        </Link>
      </div>
    );
  }

  const statusCode = currentOrder.statusCode || 1;

  const handleAdvanceSimulation = () => {
    simulateNextStatus(currentOrder.id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Tracking Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                Live Doorstep Tracking
              </span>
              <span className="text-xs text-slate-400 font-bold">&middot;</span>
              <span className="text-xs font-bold text-slate-700">Order #{currentOrder.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              {currentOrder.status}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Estimated Delivery: <strong className="text-emerald-700">{currentOrder.estimatedDelivery}</strong>
            </p>
          </div>

          {/* Interactive Simulation Button for Testing */}
          <button
            onClick={handleAdvanceSimulation}
            className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold transition-all flex items-center gap-2 self-start sm:self-auto shadow-xs active:scale-95"
            title="Click to simulate next stage of order tracking"
          >
            <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Simulate Next Stage</span>
          </button>
        </div>

        {/* Live Map Route Simulation Graphic */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-5 md:p-6 text-white relative overflow-hidden shadow-inner border border-emerald-800/40">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Hub Start */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Dispatched From
                </span>
                <span className="font-bold text-sm text-white">MNM MART Central Hub</span>
                <span className="text-[11px] text-slate-400 block">Temperature Controlled</span>
              </div>
            </div>

            {/* Route Progress Graphic */}
            <div className="flex-1 w-full max-w-xs relative py-2">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{
                    width:
                      statusCode === 1 ? '20%' :
                      statusCode === 2 ? '50%' :
                      statusCode === 3 ? '80%' : '100%'
                  }}
                />
              </div>

              {/* Moving Scooter Icon */}
              <div
                className="absolute -top-3 transition-all duration-700"
                style={{
                  left:
                    statusCode === 1 ? '15%' :
                    statusCode === 2 ? '45%' :
                    statusCode === 3 ? '75%' : '95%'
                }}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg transform -translate-x-1/2 animate-bounce">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Customer Doorstep Destination */}
            <div className="flex items-center gap-3 text-right md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Mandatory Doorstep
                </span>
                <span className="font-bold text-sm text-white truncate max-w-[150px] inline-block">
                  {currentOrder.address?.fullName || 'Customer Doorstep'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {currentOrder.address?.area || 'Indiranagar'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Timeline Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              {
                step: 1,
                title: 'Order Placed',
                desc: 'Received by MNM MART',
                time: '10:30 AM',
                isDone: statusCode >= 1
              },
              {
                step: 2,
                title: 'Packed & Quality Checked',
                desc: 'Sealed in hygienic pouches',
                time: '10:45 AM',
                isDone: statusCode >= 2
              },
              {
                step: 3,
                title: 'Out for Doorstep Delivery',
                desc: 'Executive is en route to door',
                time: '11:05 AM',
                isDone: statusCode >= 3
              },
              {
                step: 4,
                title: 'Delivered at Doorstep',
                desc: 'OTP verified handover',
                time: '11:30 AM',
                isDone: statusCode >= 4
              }
            ].map(stage => (
              <div
                key={stage.step}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  stage.isDone
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs'
                    : 'border-slate-100 bg-slate-50/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                    stage.isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {stage.isDone ? '✓' : stage.step}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{stage.time}</span>
                </div>
                <h4 className="font-bold text-xs md:text-sm">{stage.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Partner Info & Security OTP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Partner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Delivery Executive
                </span>
                <h4 className="font-bold text-slate-900 text-sm">
                  {currentOrder.deliveryPartner?.name || 'Ramesh Kumar'}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentOrder.deliveryPartner?.vehicle || 'Electric Scooter'} &middot; {currentOrder.deliveryPartner?.rating || '4.9 ⭐'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>Call Agent</span>
              </span>
            </div>
          </div>

          {/* Secure Handover OTP */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                Doorstep Delivery OTP
              </span>
              <h4 className="font-black text-2xl text-emerald-950 tracking-widest mt-0.5">
                {currentOrder.deliveryPartner?.otp || '4928'}
              </h4>
              <p className="text-[11px] text-emerald-800 font-medium">
                Share this OTP with the delivery executive only when received at your door.
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Items in this order */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Items in this Doorstep Package ({currentOrder.items?.length || 0})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentOrder.items?.map(item => (
              <div key={item.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 overflow-hidden">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-slate-900 truncate">{item.name}</h5>
                  <p className="text-[11px] text-slate-500">{item.quantity} x ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
