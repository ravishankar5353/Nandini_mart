import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const CATEGORY_ICONS = ['🥦', '🥛', '🍚', '🫘', '🍪', '🧃', '🧂', '🧴', '🧹', '🍞', '🥩', '🌶️', '🍳', '🛒'];

export const AdminCategories = () => {
  const [categories, setCategories] = useState(CATEGORIES.map(c => ({ ...c })));
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ id: '', name: '', icon: '🛒', description: '' });
  const [error, setError] = useState('');

  const openAdd = () => {
    setForm({ id: '', name: '', icon: '🛒', description: '' });
    setEditingId(null); setError(''); setShowForm(true);
  };
  const openEdit = (cat) => {
    setForm({ ...cat }); setEditingId(cat.id); setError(''); setShowForm(true);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name) { setError('Category name is required.'); return; }
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
    } else {
      const newCat = { ...form, id: form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), productCount: 0 };
      setCategories(prev => [...prev, newCat]);
    }
    setShowForm(false);
  };
  const handleDelete = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2"><Tag className="w-5 h-5 text-emerald-500" /> Categories</h1>
          <p className="text-slate-500 text-xs mt-0.5">{categories.length} categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-slate-900 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteId(cat.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="text-white font-bold text-sm">{cat.name}</div>
            <div className="text-slate-500 text-[11px] mt-0.5">{cat.productCount || 0} products</div>
            {cat.description && <div className="text-slate-500 text-[11px] mt-1 truncate">{cat.description}</div>}
            <div className="mt-2 text-[10px] font-bold text-emerald-500/80 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
              /{cat.id}
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-500 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {error && <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">{error}</div>}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Category Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Fruits & Vegetables" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Category Icon</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {CATEGORY_ICONS.map(icon => (
                    <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                      className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all ${form.icon === icon ? 'bg-emerald-500/30 border-2 border-emerald-500' : 'bg-slate-800 border border-white/10 hover:border-white/30'}`}>
                      {icon}
                    </button>
                  ))}
                </div>
                <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Or type emoji" className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Short description..." className="w-full bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all">
                  {editingId ? 'Save Changes' : 'Add Category'}
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
            <h3 className="text-white font-black mb-1">Delete Category?</h3>
            <p className="text-slate-400 text-sm mb-5">Products in this category won't be deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-400 rounded-xl text-white font-black text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
