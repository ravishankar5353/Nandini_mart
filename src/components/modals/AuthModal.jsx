import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLoginMode) {
      await login(formData.email || formData.phone || 'mnm@mnmmart.com', formData.password || 'password123');
    } else {
      await signup(formData);
    }
    setLoading(false);
  };

  const fillDemoAccount = (type = 'mnm') => {
    if (type === 'mnm') {
      setFormData({
        name: 'MNM User',
        email: 'mnm@mnmmart.com',
        phone: '9876543210',
        password: 'password123'
      });
    } else {
      setFormData({
        name: 'Rahul Verma',
        email: 'rahul.verma@example.com',
        phone: '9123456789',
        password: 'password123'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-950/40 hover:bg-emerald-950/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold tracking-wider uppercase border border-emerald-400/30">
              MNM MART Account
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {isLoginMode ? 'Welcome Back!' : 'Join MNM MART'}
          </h2>
          <p className="text-xs text-emerald-200 mt-1">
            {isLoginMode
              ? 'Log in to track your doorstep deliveries and manage addresses'
              : 'Create an account for faster checkout & doorstep delivery'}
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="p-4 pb-0 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Quick Demo Fill:
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => fillDemoAccount('mnm')}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 shadow-xs transition-colors"
            >
              MNM
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('rahul')}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 shadow-xs transition-colors"
            >
              Rahul
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. MNM User"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="mnm@mnmmart.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (for Doorstep Delivery OTP)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLoginMode ? 'Log In to MNM Mart' : 'Create My Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
            >
              {isLoginMode ? (
                <>Don't have an account? <span className="text-emerald-700 font-bold underline">Sign Up Free</span></>
              ) : (
                <>Already have an account? <span className="text-emerald-700 font-bold underline">Log In</span></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
