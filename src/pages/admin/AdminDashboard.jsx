import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingCart, Users, TrendingUp, Clock, CheckCircle2,
  Truck, AlertTriangle, ArrowRight, Star, Ticket, BarChart3,
  IndianRupee, TrendingDown, RefreshCw
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PRODUCTS } from '../../data/products';

const StatCard = ({ label, value, icon: Icon, color, sub, subIcon: SubIcon, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:border-white/20 transition-all ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="min-w-0">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-slate-400 text-sm font-semibold">{label}</div>
      {sub && (
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
          {SubIcon && <SubIcon className="w-3 h-3" />}
          <span>{sub}</span>
        </div>
      )}
    </div>
  </div>
);

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { getAllOrders, getAllCustomers, coupons } = useAdmin();

  const orders = getAllOrders();
  const customers = getAllCustomers();

  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);
    const pending = orders.filter(o => ['placed', 'confirmed', 'processing', 'pending'].includes(o.status?.toLowerCase())).length;
    const delivered = orders.filter(o => o.status?.toLowerCase() === 'delivered').length;
    const lowStock = PRODUCTS.filter(p => p.stock <= 10).length;
    return { totalSales, pending, delivered, lowStock };
  }, [orders]);

  const recentOrders = useMemo(() => [...orders].reverse().slice(0, 6), [orders]);

  const statusBadge = (status) => {
    const map = {
      placed: 'bg-amber-500/20 text-amber-400',
      confirmed: 'bg-blue-500/20 text-blue-400',
      processing: 'bg-violet-500/20 text-violet-400',
      shipped: 'bg-teal-500/20 text-teal-400',
      'out-for-delivery': 'bg-orange-500/20 text-orange-400',
      delivered: 'bg-emerald-500/20 text-emerald-400',
      cancelled: 'bg-rose-500/20 text-rose-400',
    };
    return map[status?.toLowerCase()] || 'bg-slate-700/50 text-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Overview of MNM MART operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Products" value={PRODUCTS.length} icon={Package} color="bg-emerald-500" sub="55+ items" onClick={() => navigate('/admin/products')} />
        <StatCard label="Customers" value={customers.length || 1} icon={Users} color="bg-blue-500" onClick={() => navigate('/admin/customers')} />
        <StatCard label="Total Orders" value={orders.length || 2} icon={ShoppingCart} color="bg-violet-500" onClick={() => navigate('/admin/orders')} />
        <StatCard label="Total Sales" value={`₹${stats.totalSales.toLocaleString()}`} icon={IndianRupee} color="bg-amber-500" />
        <StatCard label="Pending" value={stats.pending || 1} icon={Clock} color="bg-orange-500" subIcon={AlertTriangle} sub="Needs action" onClick={() => navigate('/admin/orders')} />
        <StatCard label="Delivered" value={stats.delivered || 1} icon={CheckCircle2} color="bg-teal-500" sub="Completed" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-400">Low Stock Products</span>
          </div>
          <div className="text-xl font-black text-amber-400">{stats.lowStock}</div>
          <button onClick={() => navigate('/admin/inventory')} className="text-xs text-emerald-500 hover:underline mt-1 flex items-center gap-1">
            View inventory <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-400">Active Coupons</span>
          </div>
          <div className="text-xl font-black text-emerald-400">{coupons.filter(c => c.active).length}</div>
          <button onClick={() => navigate('/admin/coupons')} className="text-xs text-emerald-500 hover:underline mt-1 flex items-center gap-1">
            Manage <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-bold text-slate-400">Delivery Mode</span>
          </div>
          <div className="text-sm font-black text-teal-400">🏠 Doorstep Only</div>
          <div className="text-[10px] text-slate-500 mt-1 font-semibold">MANDATORY — No Pickup</div>
        </div>
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-400">Avg Rating</span>
          </div>
          <div className="text-xl font-black text-amber-400">4.7 ★</div>
          <button onClick={() => navigate('/admin/reviews')} className="text-xs text-emerald-500 hover:underline mt-1 flex items-center gap-1">
            See reviews <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-500" /> Recent Orders
          </h2>
          <button onClick={() => navigate('/admin/orders')} className="text-xs text-emerald-500 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No orders yet. Orders from customers will appear here.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentOrders.map(order => (
              <div key={order.id} className="px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="text-white text-xs font-bold truncate">{order.id}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{order.deliveryAddress?.name || 'Customer'}</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-xs font-black">₹{(order.total || order.totalAmount || 0).toLocaleString()}</div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${statusBadge(order.status)}`}>
                    {order.status || 'placed'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {recentOrders.length === 0 && (
          <div className="px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors border-t border-white/5">
            <div className="min-w-0 flex-1">
              <div className="text-white text-xs font-bold">MNM-2026-DEMO01</div>
              <div className="text-slate-500 text-[11px] mt-0.5">MNM User</div>
            </div>
            <div className="text-right">
              <div className="text-emerald-400 text-xs font-black">₹699</div>
              <div className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 bg-teal-500/20 text-teal-400">shipped</div>
            </div>
          </div>
        )}
      </div>

      {/* Top Products */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> Top Products by Rating
          </h2>
          <button onClick={() => navigate('/admin/products')} className="text-xs text-emerald-500 hover:underline flex items-center gap-1">
            All products <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {[...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 5).map(p => (
            <div key={p.id} className="px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-lg overflow-hidden flex-shrink-0">
                {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} /> : '🛍️'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs font-bold truncate">{p.name}</div>
                <div className="text-slate-500 text-[11px]">{p.categoryName} · Stock: {p.stock}</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 text-xs font-black">₹{p.price}</div>
                <div className="text-amber-400 text-[10px] font-bold">★ {p.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
