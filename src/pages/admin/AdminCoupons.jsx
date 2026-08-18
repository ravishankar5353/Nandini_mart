import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Trash2, X, Check, Calendar, IndianRupee, ShoppingBag } from 'lucide-react';

import { useAdmin } from '../../context/AdminContext';

export const AdminCoupons = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCoupon } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const EMPTY = { code: '', discount: '', type: 'flat', minOrder: '', expiry: '', active: true };
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setForm(EMPTY); setEditingId(null); setError(''); setShowForm(true); };
  const openEdit = (c) => { setForm({ ...c, discount: String(c.discount), minOrder: String(c.minOrder), expiry: c.expiry || '' }); setEditingId(c.id); setError(''); setShowForm(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.code || !form.discount) { setError('Coupon code and discount are required.'); return; }
    const data = { ...form, code: form.code.toUpperCase(), discount: +form.discount, minOrder: +form.minOrder || 0 };
    if (editingId) updateCoupon(editingId, data);
    else addCoupon(data);
    setShowForm(false);
  };

  const typeLabel = (t) => ({ flat: 'Flat ₹', percent: '% Off', delivery: 'Free Delivery' }[t] || t);
  const typeColor = (t) => ({ flat: 'text-emerald-400', percent: 'text-amber-400', delivery: 'text-teal-400' }[t] || 'text-slate-400');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2"><Ticket className="w-5 h-5 text-emerald-500" /> Offers & Coupons</h1>
          <p className="text-slate-500 text-xs mt-0.5">{coupons.filter(c => c.active).length} active coupons</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {coupons.map(coupon => (
          <div key={coupon.id} className={`bg-slate-900 border rounded-2xl p-5 transition-all hover:border-white/20 ${coupon.active ? 'border-emerald-500/30' : 'border-white/10 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-black text-lg tracking-widest">{coupon.code}</div>
                <div className={`text-xs font-bold mt-0.5 ${typeColor(coupon.type)}`}>{typeLabel(coupon.type)}{coupon.type !== 'delivery' ? coupon.discount : ''}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleCoupon(coupon.id)} className={`p-1.5 rounded-lg text-xs font-bold transition-all ${coupon.active ? 'bg-emerald-500/20 text-emerald-400 hover:bg-rose-500/20 hover:text-rose-400' : 'bg-slate-800 text-slate-500 hover:bg-emerald-500/20 hover:text-emerald-400'}`}>
                  {coupon.active ? 'ON' : 'OFF'}
                </button>
                <button onClick={() => openEdit(coupon)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteId(coupon.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <IndianRupee className="w-3 h-3 text-slate-500" />
                <span className="text-slate-400">Min Order:</span>
                <span className="text-white font-bold">₹{coupon.minOrder || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span className="text-slate-400">Expiry:</span>
                <span className="text-white font-bold">{coupon.expiry || 'No expiry'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShoppingBag className="w-3 h-3 text-slate-500" />
                <span className="text-slate-400">Used:</span>
                <span className="text-white font-bold">{coupon.uses || 0} times</span>
              </div>
            </div>

            <div className={`mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5`}>
              <span className={`w-2 h-2 rounded-full ${coupon.active ? 'bg-emerald-500' : 'bg-slate-600'}`} />
              <span className={`text-xs font-bold ${coupon.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                {coupon.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black">{editingId ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-500 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {error && <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">{error}</div>}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Coupon Code *</label>
                <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="e.g. SAVE50" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 font-black tracking-wider uppercase" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Discount Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500">
                    <option value="flat">Flat ₹ Off</option>
                    <option value="percent">Percent % Off</option>
                    <option value="delivery">Free Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Discount Amount *</label>
                  <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} placeholder="50" min="1" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Min Order (₹)</label>
                  <input type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} placeholder="0" min="0" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Expiry Date</label>
                  <input type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="accent-emerald-500 w-3.5 h-3.5" />
                <span className="text-slate-300 text-xs font-semibold">Active (visible to customers)</span>
              </label>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all">
                  {editingId ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-sm w-full text-center">
            <Trash2 className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h3 className="text-white font-black mb-1">Delete Coupon?</h3>
            <p className="text-slate-400 text-sm mb-5">Customers won't be able to use this code anymore.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={() => { deleteCoupon(deleteId); setDeleteId(null); }} className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-400 rounded-xl text-white font-black text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
