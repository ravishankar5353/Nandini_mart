import React, { useState, useMemo } from 'react';
import {
  Plus, Search, Edit2, Trash2, Package, Check, X, Tag,
  IndianRupee, Star, AlertTriangle, Filter, ChevronDown
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';

const INITIAL_PRODUCTS = PRODUCTS.map(p => ({ ...p }));

export const AdminProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const EMPTY_FORM = {
    name: '', category: 'fruits-vegetables', categoryName: 'Fruits & Vegetables',
    brand: '', unit: '', price: '', originalPrice: '', discountPercent: '', stock: '',
    description: '', inStock: true, isBestSeller: false, isDeal: false
  };
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    let p = products;
    if (filterCat !== 'all') p = p.filter(x => x.category === filterCat);
    if (search) p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.brand?.toLowerCase().includes(search.toLowerCase()));
    return p;
  }, [products, filterCat, search]);

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setFormError(''); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditingId(p.id); setFormError(''); setShowForm(true); };
  const handleDelete = (id) => { setProducts(prev => prev.filter(p => p.id !== id)); setDeleteId(null); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) { setFormError('Name, price, and stock are required.'); return; }
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...form, price: +form.price, originalPrice: +form.originalPrice || +form.price, stock: +form.stock, discountPercent: +form.discountPercent || 0 } : p));
    } else {
      const newProd = {
        ...form, id: `prod-${Date.now()}`, price: +form.price,
        originalPrice: +form.originalPrice || +form.price, stock: +form.stock,
        discountPercent: +form.discountPercent || 0, rating: 4.5, reviewCount: 0
      };
      setProducts(prev => [newProd, ...prev]);
    }
    setShowForm(false);
  };

  const catName = (catId) => CATEGORIES.find(c => c.id === catId)?.name || catId;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2"><Package className="w-5 h-5 text-emerald-500" /> Products</h1>
          <p className="text-slate-500 text-xs mt-0.5">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="bg-slate-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs font-bold uppercase">
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-right px-4 py-3">Price</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Stock</th>
                <th className="text-center px-4 py-3 hidden lg:table-cell">Discount</th>
                <th className="text-center px-4 py-3 hidden xl:table-cell">Rating</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} /> : <Package className="w-4 h-4 text-slate-600 m-2.5" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-xs font-bold truncate max-w-[150px]">{p.name}</div>
                        <div className="text-slate-500 text-[11px]">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">{p.categoryName}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-emerald-400 font-black text-xs">₹{p.price}</div>
                    {p.originalPrice > p.price && <div className="text-slate-600 text-[10px] line-through">₹{p.originalPrice}</div>}
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <span className={`text-xs font-bold ${p.stock <= 0 ? 'text-rose-400' : p.stock <= 10 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    {p.discountPercent > 0 ? <span className="bg-rose-500/20 text-rose-400 text-[10px] font-black px-2 py-0.5 rounded-full">{p.discountPercent}% OFF</span> : <span className="text-slate-600 text-[10px]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center hidden xl:table-cell">
                    <span className="text-amber-400 text-xs font-bold">★ {p.rating}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${p.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {p.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {formError && <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">{formError}</div>}
              
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Product Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Fresh Red Apples" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => {
                      const cat = CATEGORIES.find(c => c.id === e.target.value);
                      setForm(f => ({ ...f, category: e.target.value, categoryName: cat?.name || e.target.value }));
                    }}
                    className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Brand</label>
                  <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="e.g. MNM Farm" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="99" min="1" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Original Price (₹)</label>
                  <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} placeholder="120" min="1" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Discount %</label>
                  <input type="number" value={form.discountPercent} onChange={e => setForm(f => ({ ...f, discountPercent: e.target.value }))} placeholder="0" min="0" max="100" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Stock *</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="50" min="0" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Unit</label>
                  <input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="e.g. 1 kg" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Short product description..." className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" />
                </div>
                <div className="col-span-2 flex flex-wrap gap-3">
                  {[['inStock', 'In Stock'], ['isBestSeller', 'Best Seller'], ['isDeal', 'Deal'], ['isFreshPick', 'Fresh Pick']].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className="text-slate-300 text-xs font-semibold">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-white/20 text-slate-300 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all">
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <Trash2 className="w-10 h-10 text-rose-400 mx-auto mb-3" />
              <h3 className="text-white font-black mb-1">Delete Product?</h3>
              <p className="text-slate-400 text-sm mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-400 rounded-xl text-white font-black text-sm transition-all">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
