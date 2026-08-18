import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Warehouse,
  Ticket, Star, BarChart3, Settings, LogOut, Menu, X, ShoppingBag,
  Sparkles, Heart, ChevronRight, Bell, Shield, Truck
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Products', icon: Package, to: '/admin/products' },
  { label: 'Categories', icon: Tag, to: '/admin/categories' },
  { label: 'Orders', icon: ShoppingCart, to: '/admin/orders' },
  { label: 'Customers', icon: Users, to: '/admin/customers' },
  { label: 'Inventory', icon: Warehouse, to: '/admin/inventory' },
  { label: 'Coupons', icon: Ticket, to: '/admin/coupons' },
  { label: 'Reviews', icon: Star, to: '/admin/reviews' },
  { label: 'Reports', icon: BarChart3, to: '/admin/reports' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
];

export const AdminLayout = () => {
  const { adminUser, adminLogout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminUser) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-black text-sm tracking-tight">NANDINI<span className="text-emerald-400">MART</span></div>
              <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" /> Admin Panel
              </div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile in sidebar */}
        <div className="px-4 py-3 border-b border-white/10 bg-emerald-500/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-sm font-black text-white">
              N
            </div>
            <div>
              <div className="text-white text-xs font-bold">{adminUser.name}</div>
              <div className="text-emerald-400 text-[10px] font-medium">{adminUser.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group
                ${isActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-600">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
              <span>Developed by</span>
              <span className="font-black text-slate-500">NANDINI</span>
              <Heart className="w-2.5 h-2.5 fill-rose-600 text-rose-600" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-slate-900/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-400 text-xs font-semibold hidden sm:block">NANDINI MART — Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-black text-white">N</div>
              <span className="text-white text-xs font-bold hidden sm:block">{adminUser.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
