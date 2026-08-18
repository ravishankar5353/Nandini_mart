import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, Search, Filter, Truck, MapPin, User, IndianRupee,
  ChevronDown, Eye, Edit2, X, Check, Clock, Package, AlertTriangle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const STATUS_OPTIONS = ['placed','confirmed','processing','shipped','out-for-delivery','delivered','cancelled'];

const STATUS_COLORS = {
  placed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  processing: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  shipped: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'out-for-delivery': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

// Fake demo orders if no real orders exist
const DEMO_ORDERS = [
  {
    id: 'NDN-2026-DEMO01', status: 'delivered',
    customer_name: 'Nandini Sharma', customer_email: 'nandini@nandinimart.com', customer_phone: '9876543210',
    total: 699, payment_method: 'upi', created_at: new Date(Date.now() - 86400000).toISOString(),
    delivery_address: { name: 'Nandini Sharma', line1: 'Flat 402, Green Meadows Heights', city: 'Bengaluru', pincode: '560038' },
    delivery_partner: 'Raju Kumar', estimated_time: '30-45 mins',
    items: [{ name: 'Fresh Kashmiri Red Apples', qty: 2, price: 169 }, { name: 'Tata Tea Gold', qty: 1, price: 361 }]
  },
  {
    id: 'NDN-2026-DEMO02', status: 'out-for-delivery',
    customer_name: 'Priya Mehta', customer_email: 'priya@gmail.com', customer_phone: '9123456780',
    total: 499, payment_method: 'cod', created_at: new Date(Date.now() - 3600000).toISOString(),
    delivery_address: { name: 'Priya Mehta', line1: 'Plot 12, Jayanagar', city: 'Bengaluru', pincode: '560041' },
    delivery_partner: 'Suresh P.', estimated_time: '30-45 mins',
    items: [{ name: 'Organic Bananas', qty: 2, price: 49 }, { name: 'Basmati Rice', qty: 1, price: 401 }]
  },
  {
    id: 'NDN-2026-DEMO03', status: 'confirmed',
    customer_name: 'Rahul Verma', customer_email: 'rahul@gmail.com', customer_phone: '9988776655',
    total: 349, payment_method: 'card', created_at: new Date(Date.now() - 1800000).toISOString(),
    delivery_address: { name: 'Rahul Verma', line1: 'HSR Layout, Sector 2', city: 'Bengaluru', pincode: '560102' },
    delivery_partner: 'Amit D.', estimated_time: '30-45 mins',
    items: [{ name: 'Amul Butter', qty: 3, price: 116 }]
  }
];

export const AdminOrders = () => {
  const { getAllOrders, updateOrderStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  const rawOrders = getAllOrders();
  const allOrders = rawOrders.length > 0 ? rawOrders : DEMO_ORDERS;

  const orders = useMemo(() => {
    let o = allOrders;
    if (filterStatus !== 'all') o = o.filter(x => x.status === filterStatus || x.status?.toLowerCase() === filterStatus);
    if (search) o = o.filter(x =>
      x.id?.toLowerCase().includes(search.toLowerCase()) ||
      (x.customer_name || x.deliveryAddress?.name || '').toLowerCase().includes(search.toLowerCase())
    );
    return [...o].reverse();
  }, [allOrders, filterStatus, search]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const getStatus = (order) => statusUpdates[order.id] || order.status || 'placed';

  const formatDate = (d) => {
    if (!d) return '—';
    try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch { return d; }
  };

  const getAddress = (o) => o.delivery_address || o.deliveryAddress;
  const getName = (o) => o.customer_name || getAddress(o)?.name || 'Customer';
  const getPhone = (o) => o.customer_phone || getAddress(o)?.phone || '—';
  const getTotal = (o) => o.total || o.totalAmount || 0;
  const getItems = (o) => o.items || o.cart || [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-emerald-500" /> Orders
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">{allOrders.length} total orders · 🏠 Mandatory Doorstep Delivery</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search by Order ID or customer..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="bg-slate-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 appearance-none cursor-pointer">
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Stats Pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map(s => {
          const count = allOrders.filter(o => (statusUpdates[o.id] || o.status) === s).length;
          return count > 0 ? (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${filterStatus === s ? STATUS_COLORS[s] : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/25'}`}>
              {s} ({count})
            </button>
          ) : null;
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs font-bold uppercase">
                <th className="text-left px-4 py-3">Order ID</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Address</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Amount</th>
                <th className="text-center px-4 py-3 hidden lg:table-cell">Payment</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-emerald-400 text-xs font-black">{order.id}</div>
                    <div className="text-slate-600 text-[10px] mt-0.5">{formatDate(order.created_at || order.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white text-xs font-bold">{getName(order)}</div>
                    <div className="text-slate-500 text-[11px]">{getPhone(order)}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-slate-400 text-[11px] max-w-[160px] truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-500 flex-shrink-0" />
                      <span>{getAddress(order)?.line1 || getAddress(order)?.address || '—'}</span>
                    </div>
                    <div className="text-emerald-500 text-[10px] font-bold flex items-center gap-0.5 mt-0.5">
                      <Truck className="w-2.5 h-2.5" /> 🏠 Doorstep Delivery
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <div className="text-emerald-400 text-xs font-black">₹{getTotal(order).toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className="text-slate-400 text-[11px] uppercase font-bold">{order.payment_method || order.paymentMethod || 'cod'}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={getStatus(order)}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className={`text-[10px] font-black px-2 py-1 rounded-full border outline-none cursor-pointer bg-transparent ${STATUS_COLORS[getStatus(order)] || 'bg-slate-700/50 text-slate-400 border-white/20'}`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900">
              <div>
                <h2 className="text-white font-black text-sm">{selectedOrder.id}</h2>
                <div className="text-slate-500 text-[11px] mt-0.5">{formatDate(selectedOrder.created_at || selectedOrder.createdAt)}</div>
              </div>
              <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5 text-slate-500 hover:text-white" /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Customer */}
              <div className="bg-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wide flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Customer</div>
                <div className="text-white font-bold text-sm">{getName(selectedOrder)}</div>
                <div className="text-slate-400 text-xs">{selectedOrder.customer_email || '—'}</div>
                <div className="text-slate-400 text-xs">{getPhone(selectedOrder)}</div>
              </div>

              {/* Doorstep Delivery Box */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                <div className="text-xs font-black text-emerald-400 uppercase tracking-wide flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> 🏠 Doorstep Delivery — MANDATORY</div>
                <div className="text-white text-xs font-semibold">
                  {getAddress(selectedOrder)?.name}<br />
                  {getAddress(selectedOrder)?.line1}<br />
                  {getAddress(selectedOrder)?.city} — {getAddress(selectedOrder)?.pincode}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span className="font-bold text-teal-400">Partner:</span>
                  <span>{selectedOrder.delivery_partner || selectedOrder.deliveryPartner || 'Raju Kumar'}</span>
                  <span className="text-slate-600">·</span>
                  <span className="font-bold text-teal-400">ETA:</span>
                  <span>{selectedOrder.estimated_time || '30-45 mins'}</span>
                </div>
                <div className="mt-1">
                  <div className="text-xs font-bold text-slate-400 mb-1">Update Delivery Status:</div>
                  <select
                    value={getStatus(selectedOrder)}
                    onChange={e => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')}</option>)}
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Products Ordered</div>
                <div className="space-y-2">
                  {getItems(selectedOrder).map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-white font-semibold">{item.name || item.productName}</span>
                      <span className="text-slate-400">×{item.qty || item.quantity || 1}</span>
                      <span className="text-emerald-400 font-black">₹{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                  <span className="text-slate-400 text-xs font-bold">Total</span>
                  <span className="text-emerald-400 font-black">₹{getTotal(selectedOrder).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 bg-slate-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-slate-500 font-bold">Payment</div>
                  <div className="text-white text-sm font-black mt-1 uppercase">{selectedOrder.payment_method || selectedOrder.paymentMethod || 'cod'}</div>
                </div>
                <div className={`flex-1 rounded-xl p-3 text-center ${STATUS_COLORS[getStatus(selectedOrder)]}`}>
                  <div className="text-[10px] font-bold opacity-80">Status</div>
                  <div className="text-sm font-black mt-1">{getStatus(selectedOrder)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
