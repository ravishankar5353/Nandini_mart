import React, { useState } from 'react';
import { Star, Check, X, Trash2, Package, Filter, Plus, Edit2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PRODUCTS } from '../../data/products';

export const AdminReviews = () => {
  const { reviews, approveReview, deleteReview } = useAdmin();
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ product: '', productId: '', customer: '', rating: 5, comment: '' });
  const [addError, setAddError] = useState('');

  // We also allow admin to add review items to a product (add items/delete items option)
  const [productItems, setProductItems] = useState(PRODUCTS.slice(0, 10).map(p => ({ ...p })));

  const filtered = reviews.filter(r => filter === 'all' ? true : r.status === filter);
  const pending = reviews.filter(r => r.status === 'pending').length;

  const stars = (n) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 ${i < n ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
  ));

  const statusBadge = (s) => ({
    approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    rejected: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }[s] || 'bg-slate-700/50 text-slate-400 border-white/10');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!addForm.product || !addForm.customer || !addForm.comment) { setAddError('All fields are required.'); return; }
    // This would call addReview in context — for now we just close
    setShowAddForm(false);
    setAddForm({ product: '', productId: '', customer: '', rating: 5, comment: '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-500" /> Reviews
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            {reviews.length} total · {pending} pending approval
          </p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[['all', 'All'], ['pending', `Pending (${pending})`], ['approved', 'Approved'], ['rejected', 'Rejected']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === val ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/10 hover:border-white/25'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filtered.map(review => (
          <div key={review.id} className="bg-slate-900 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                    {review.customer?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-white text-sm font-bold">{review.customer}</span>
                  <div className="flex items-center gap-0.5">{stars(review.rating)}</div>
                  <span className="text-amber-400 text-xs font-black">{review.rating}/5</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                  <Package className="w-3 h-3 text-emerald-500" />
                  <span className="font-semibold text-emerald-400">{review.product}</span>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>

                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{review.comment}</p>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${statusBadge(review.status)}`}>
                  {review.status}
                </span>
                <div className="flex gap-1">
                  {review.status !== 'approved' && (
                    <button onClick={() => approveReview(review.id)} className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Approve">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => deleteReview(review.id)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No {filter !== 'all' ? filter : ''} reviews found.</p>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black">Add Review</h2>
              <button onClick={() => setShowAddForm(false)}><X className="w-5 h-5 text-slate-500 hover:text-white" /></button>
            </div>
            <form onSubmit={handleAddReview} className="p-5 space-y-4">
              {addError && <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">{addError}</div>}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Product</label>
                <select value={addForm.productId} onChange={e => { const p = PRODUCTS.find(x => x.id === e.target.value); setAddForm(f => ({ ...f, productId: e.target.value, product: p?.name || '' })); }}
                  className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500">
                  <option value="">Select a product...</option>
                  {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Customer Name</label>
                <input value={addForm.customer} onChange={e => setAddForm(f => ({ ...f, customer: e.target.value }))} placeholder="Customer Name" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setAddForm(f => ({ ...f, rating: n }))}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${addForm.rating >= n ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Review Comment</label>
                <textarea value={addForm.comment} onChange={e => setAddForm(f => ({ ...f, comment: e.target.value }))} rows={3} placeholder="Customer feedback..." className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all">Add Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
