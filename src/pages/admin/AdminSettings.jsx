import React, { useState } from 'react';
import {
  Settings, User, Store, Truck, LogOut, Save, Check, Edit2,
  Shield, Phone, Mail, MapPin, Clock, IndianRupee, Sparkles, Heart
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Field = ({ label, value, onChange, type = 'text', icon: Icon }) => (
  <div>
    <label className="text-xs font-bold text-slate-300 block mb-1.5">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-slate-800 border border-white/10 text-white rounded-xl py-2.5 text-sm outline-none focus:border-emerald-500 transition-all ${Icon ? 'pl-9 pr-4' : 'px-4'}`}
      />
    </div>
  </div>
);

export const AdminSettings = () => {
  const navigate = useNavigate();
  const { adminUser, adminLogout, storeInfo, setStoreInfo, deliverySettings, setDeliverySettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Local editable copies
  const [profile, setProfile] = useState({ name: adminUser?.name || 'Nandini Admin', email: 'admin@cse.in', phone: '9876543210' });
  const [store, setStore] = useState(storeInfo);
  const [delivery, setDelivery] = useState(deliverySettings);

  const handleSave = () => {
    if (activeTab === 'store') setStoreInfo(store);
    if (activeTab === 'delivery') setDeliverySettings(delivery);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { adminLogout(); navigate('/'); };

  const TABS = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'store', label: 'Store Info', icon: Store },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
  ];

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-500" /> Admin Settings
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">Manage profile, store, and delivery configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-white/10 p-1 rounded-2xl">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === id ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-5">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-emerald-500/20">
                N
              </div>
              <div>
                <div className="text-white font-black text-lg">{profile.name}</div>
                <div className="text-emerald-400 text-xs font-bold flex items-center gap-1.5"><Shield className="w-3 h-3" /> Super Admin</div>
                <div className="text-slate-500 text-xs mt-0.5">{profile.email}</div>
              </div>
            </div>
            <Field label="Admin Name" value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} icon={User} />
            <Field label="Admin Email" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} icon={Mail} type="email" />
            <Field label="Phone" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} icon={Phone} />
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 font-semibold">
              ⚠️ Admin password changes require backend authentication. Current: admin@cse.in / nandini123
            </div>
          </>
        )}

        {/* Store Tab */}
        {activeTab === 'store' && (
          <>
            <Field label="Store Name" value={store.name} onChange={v => setStore(s => ({ ...s, name: v }))} icon={Store} />
            <Field label="Tagline" value={store.tagline} onChange={v => setStore(s => ({ ...s, tagline: v }))} />
            <Field label="Store Address" value={store.address} onChange={v => setStore(s => ({ ...s, address: v }))} icon={MapPin} />
            <Field label="Contact Phone" value={store.phone} onChange={v => setStore(s => ({ ...s, phone: v }))} icon={Phone} />
            <Field label="Support Email" value={store.email} onChange={v => setStore(s => ({ ...s, email: v }))} icon={Mail} type="email" />
            <Field label="GST Number" value={store.gst} onChange={v => setStore(s => ({ ...s, gst: v }))} />
          </>
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-black text-sm">🏠 Doorstep Delivery — MANDATORY</span>
              </div>
              <p className="text-slate-400 text-xs">All orders are delivered to customer's doorstep. No pickup option available.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Free Delivery Above (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="number" value={delivery.freeDeliveryAbove} onChange={e => setDelivery(d => ({ ...d, freeDeliveryAbove: +e.target.value }))}
                  className="w-full bg-slate-800 border border-white/10 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Standard Delivery Fee (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="number" value={delivery.deliveryFee} onChange={e => setDelivery(d => ({ ...d, deliveryFee: +e.target.value }))}
                  className="w-full bg-slate-800 border border-white/10 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
              </div>
            </div>
            <Field label="Estimated Delivery Time" value={delivery.estimatedTime} onChange={v => setDelivery(d => ({ ...d, estimatedTime: v }))} icon={Clock} />
            <Field label="Default Delivery Partner Name" value={delivery.partnerName} onChange={v => setDelivery(d => ({ ...d, partnerName: v }))} icon={User} />
            <Field label="Partner Phone" value={delivery.partnerPhone} onChange={v => setDelivery(d => ({ ...d, partnerPhone: v }))} icon={Phone} />
          </>
        )}

        {/* Save Button */}
        <div className="pt-2 flex gap-3">
          <button onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${saved ? 'bg-teal-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'}`}>
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Logout Card */}
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-white font-black text-sm">Logout from Admin</div>
          <div className="text-slate-400 text-xs mt-0.5">You'll be redirected to the home page.</div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm transition-all">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pt-2">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>NANDINI MART · Developed by</span>
          <span className="font-black text-slate-500">NANDINI</span>
          <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
        </div>
      </div>
    </div>
  );
};
