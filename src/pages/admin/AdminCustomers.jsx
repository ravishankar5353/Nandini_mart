import React, { useState } from 'react';
import { Users, Search, Eye, X, ShoppingCart, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const DEMO_CUSTOMERS = [
  {
    id: 'u1', name: 'Nandini Sharma', email: 'nandini@nandinimart.com', phone: '9876543210',
    address: 'Flat 402, Green Meadows Heights, Indiranagar, Bengaluru — 560038',
    joinedAt: '2026-08-01', orders: 5, totalSpent: 3420, lastOrder: 'NDN-2026-DEMO01'
  },
  {
    id: 'u2', name: 'Priya Mehta', email: 'priya@gmail.com', phone: '9123456780',
    address: 'Plot 12, Jayanagar, Bengaluru — 560041',
    joinedAt: '2026-08-10', orders: 2, totalSpent: 998, lastOrder: 'NDN-2026-DEMO02'
  },
  {
    id: 'u3', name: 'Rahul Verma', email: 'rahul@gmail.com', phone: '9988776655',
    address: 'HSR Layout, Sector 2, Bengaluru — 560102',
    joinedAt: '2026-08-15', orders: 1, totalSpent: 349, lastOrder: 'NDN-2026-DEMO03'
  },
];

export const AdminCustomers = () => {
  const { getAllCustomers } = useAdmin();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const rawCustomers = getAllCustomers();
  const customers = rawCustomers.length > 0
    ? rawCustomers.map(u => ({
        id: u.id, name: u.name, email: u.email, phone: u.phone,
        address: u.addresses?.[0] ? `${u.addresses[0].line1}, ${u.addresses[0].city}` : '—',
        joinedAt: u.createdAt || new Date().toISOString(),
        orders: 0, totalSpent: 0, lastOrder: '—'
      }))
    : DEMO_CUSTOMERS;

  const filtered = customers.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-500" /> Customers
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">{customers.length} registered customers</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search by name, email, or phone..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs font-bold uppercase">
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Contact</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Orders</th>
                <th className="text-right px-4 py-3 hidden lg:table-cell">Spent</th>
                <th className="text-left px-4 py-3 hidden xl:table-cell">Joined</th>
                <th className="text-right px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                        {c.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="text-white text-xs font-bold">{c.name}</div>
                        <div className="text-slate-500 text-[11px] hidden sm:block">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-slate-400 text-xs">{c.phone || '—'}</div>
                    <div className="text-slate-600 text-[11px] truncate max-w-[140px]">{c.address}</div>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <span className="text-white text-xs font-bold">{c.orders}</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell">
                    <span className="text-emerald-400 text-xs font-black">₹{(c.totalSpent || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <span className="text-slate-400 text-xs">{new Date(c.joinedAt).toLocaleDateString('en-IN')}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelected(c)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black">Customer Details</h2>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-slate-500 hover:text-white" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl font-black text-white">
                  {selected.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="text-white font-black text-lg">{selected.name}</div>
                  <div className="text-emerald-400 text-xs font-semibold">Customer ID: {selected.id}</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', val: selected.email },
                  { icon: Phone, label: 'Phone', val: selected.phone || '—' },
                  { icon: MapPin, label: 'Address', val: selected.address || '—' },
                  { icon: ShoppingCart, label: 'Total Orders', val: selected.orders },
                  { icon: Calendar, label: 'Joined', val: new Date(selected.joinedAt).toLocaleDateString('en-IN') },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-3 bg-slate-800 rounded-xl p-3">
                    <Icon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase">{label}</div>
                      <div className="text-white text-xs font-semibold mt-0.5">{val}</div>
                    </div>
                  </div>
                ))}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-slate-300 text-xs font-bold">Total Spent</span>
                  <span className="text-emerald-400 text-lg font-black">₹{(selected.totalSpent || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
