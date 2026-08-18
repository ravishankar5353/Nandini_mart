import React, { useState, useMemo } from 'react';
import { Warehouse, Search, Edit2, Check, X, AlertTriangle, TrendingDown, Package } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const AdminInventory = () => {
  const [products, setProducts] = useState(PRODUCTS.map(p => ({ ...p })));
  const [search, setSearch] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editStock, setEditStock] = useState('');

  const filtered = useMemo(() => {
    let p = products;
    if (filterStock === 'low') p = p.filter(x => x.stock > 0 && x.stock <= 10);
    else if (filterStock === 'out') p = p.filter(x => x.stock === 0 || !x.inStock);
    else if (filterStock === 'available') p = p.filter(x => x.stock > 10);
    if (search) p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    return p;
  }, [products, filterStock, search]);

  const stats = useMemo(() => ({
    available: products.filter(p => p.stock > 10).length,
    low: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    out: products.filter(p => p.stock === 0 || !p.inStock).length,
  }), [products]);

  const startEdit = (p) => { setEditingId(p.id); setEditStock(String(p.stock)); };
  const saveEdit = (id) => {
    const newStock = parseInt(editStock, 10);
    if (isNaN(newStock) || newStock < 0) return;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock, inStock: newStock > 0 } : p));
    setEditingId(null);
  };

  const stockBadge = (stock) => {
    if (stock === 0) return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    if (stock <= 10) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  };
  const stockLabel = (stock) => stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'Available';

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2"><Warehouse className="w-5 h-5 text-emerald-500" /> Inventory</h1>
        <p className="text-slate-500 text-xs mt-0.5">Manage product stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Available', count: stats.available, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: Package, filter: 'available' },
          { label: 'Low Stock', count: stats.low, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: TrendingDown, filter: 'low' },
          { label: 'Out of Stock', count: stats.out, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', icon: AlertTriangle, filter: 'out' },
        ].map(({ label, count, color, bg, icon: Icon, filter }) => (
          <button
            key={label}
            onClick={() => setFilterStock(filterStock === filter ? 'all' : filter)}
            className={`p-4 rounded-2xl border text-left transition-all ${bg} ${filterStock === filter ? 'ring-2 ring-white/20' : ''}`}
          >
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <div className={`text-2xl font-black ${color}`}>{count}</div>
            <div className="text-slate-400 text-xs font-semibold mt-0.5">{label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
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
                <th className="text-center px-4 py-3">Stock</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} /> : <Package className="w-4 h-4 text-slate-600 m-2" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-xs font-bold truncate max-w-[160px]">{p.name}</div>
                        <div className="text-slate-500 text-[11px]">{p.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">{p.categoryName}</td>
                  <td className="px-4 py-3 text-right text-emerald-400 text-xs font-black">₹{p.price}</td>
                  <td className="px-4 py-3 text-center">
                    {editingId === p.id ? (
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          value={editStock}
                          onChange={e => setEditStock(e.target.value)}
                          className="w-16 bg-slate-800 border border-emerald-500 text-white text-center rounded-lg px-2 py-1 text-xs outline-none"
                          min="0" autoFocus
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(p.id); if (e.key === 'Escape') setEditingId(null); }}
                        />
                        <button onClick={() => saveEdit(p.id)} className="p-1 text-emerald-400 hover:text-emerald-300"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditingId(null)} className="p-1 text-rose-400 hover:text-rose-300"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <span className={`text-sm font-black ${p.stock === 0 ? 'text-rose-400' : p.stock <= 10 ? 'text-amber-400' : 'text-white'}`}>
                        {p.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${stockBadge(p.stock)}`}>
                      {stockLabel(p.stock)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => startEdit(p)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
