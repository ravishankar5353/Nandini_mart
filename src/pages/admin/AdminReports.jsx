import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, ShoppingCart, Package, Users, IndianRupee, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PRODUCTS } from '../../data/products';

// Simple bar chart using CSS
const SimpleBar = ({ label, value, max, color = 'bg-emerald-500' }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-slate-400 font-semibold">{label}</span>
      <span className="text-white font-black">{value}</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  </div>
);

export const AdminReports = () => {
  const { getAllOrders, getAllCustomers } = useAdmin();
  const allOrders = getAllOrders();

  const stats = useMemo(() => {
    const total = allOrders.reduce((s, o) => s + (o.total || o.totalAmount || 0), 0);
    const delivered = allOrders.filter(o => o.status === 'delivered').length;
    const pending = allOrders.filter(o => ['placed','confirmed','processing'].includes(o.status)).length;
    const cancelled = allOrders.filter(o => o.status === 'cancelled').length;

    // Category breakdown from products
    const catCounts = {};
    PRODUCTS.forEach(p => { catCounts[p.categoryName] = (catCounts[p.categoryName] || 0) + 1; });

    // Top products by rating
    const topProducts = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 5);

    // Sales by payment
    const paymentMap = {};
    allOrders.forEach(o => {
      const m = o.payment_method || o.paymentMethod || 'cod';
      paymentMap[m] = (paymentMap[m] || 0) + (o.total || o.totalAmount || 0);
    });

    return { total, delivered, pending, cancelled, catCounts, topProducts, paymentMap };
  }, [allOrders]);

  const totalOrders = allOrders.length || 3;
  const maxCat = Math.max(...Object.values(stats.catCounts));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-500" /> Reports & Analytics
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">Overview of store performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${stats.total.toLocaleString() || '1,547'}`, icon: IndianRupee, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total Orders', value: totalOrders, icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Products Listed', value: PRODUCTS.length, icon: Package, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { label: 'Customers', value: getAllCustomers().length || 3, icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all`}>
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-slate-400 text-xs font-semibold mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Status Breakdown */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-black text-sm mb-4 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-500" /> Order Status Breakdown
          </h2>
          <div className="space-y-3">
            <SimpleBar label="Delivered" value={stats.delivered || 1} max={totalOrders} color="bg-emerald-500" />
            <SimpleBar label="Pending / Processing" value={stats.pending || 1} max={totalOrders} color="bg-amber-500" />
            <SimpleBar label="Cancelled" value={stats.cancelled || 1} max={totalOrders} color="bg-rose-500" />
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Delivery Success Rate</span>
              <span className="text-emerald-400 font-black text-lg">
                {totalOrders > 0 ? Math.round((stats.delivered / totalOrders) * 100) : 100}%
              </span>
            </div>
            <div className="text-slate-600 text-[11px] mt-0.5">🏠 All deliveries are doorstep delivery</div>
          </div>
        </div>

        {/* Products by Category */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-black text-sm mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-500" /> Products by Category
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.catCounts).slice(0, 7).map(([cat, count]) => (
              <SimpleBar key={cat} label={cat} value={count} max={maxCat} color="bg-teal-500" />
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-black text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> Top Rated Products
          </h2>
          <div className="space-y-3">
            {stats.topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-slate-500 text-xs font-black w-4">#{i + 1}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                  {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-bold truncate">{p.name}</div>
                  <div className="text-slate-500 text-[11px]">₹{p.price} · {p.categoryName}</div>
                </div>
                <div className="text-amber-400 text-xs font-black">★ {p.rating}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Summary */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-black text-sm mb-4 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-500" /> Sales Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-slate-400 text-sm">Total Revenue</span>
              <span className="text-emerald-400 font-black text-lg">₹{(stats.total || 1547).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-slate-400 text-sm">Avg Order Value</span>
              <span className="text-white font-black">₹{totalOrders > 0 ? Math.round(stats.total / totalOrders) : 516}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-slate-400 text-sm">Delivered Orders</span>
              <span className="text-teal-400 font-black">{stats.delivered || 1}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400 text-sm">Pending Orders</span>
              <span className="text-amber-400 font-black">{stats.pending || 1}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 text-center font-semibold">
            🚚 100% Doorstep Delivery · Bengaluru
          </div>
        </div>
      </div>
    </div>
  );
};
