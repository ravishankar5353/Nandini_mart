import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, ShoppingBag, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Enter admin email and password.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = adminLogin(email, password);
    setLoading(false);
    if (ok) navigate('/admin/dashboard');
    else setError('Invalid admin credentials. Please check and try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back */}
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-bold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-8 pb-6 text-center border-b border-white/10 bg-gradient-to-b from-emerald-900/30 to-transparent">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-emerald-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
            <p className="text-emerald-300/60 text-xs font-medium mt-1">
              NANDINI MART · Restricted Access
            </p>
          </div>

          <div className="p-8 space-y-5">
            {/* Hint */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <div className="font-black text-emerald-300 mb-1 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Admin Credentials</div>
              <div className="text-emerald-200/70">
                <span className="font-semibold">Email:</span> admin@cse.in<br />
                <span className="font-semibold">Password:</span> nandini123
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="admin@cse.in"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white/12 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white/12 transition-all font-medium"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-2"
              >
                {loading
                  ? <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  : <><Shield className="w-4 h-4" /> Access Admin Dashboard <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Developed by</span>
                <span className="font-black text-emerald-400">NANDINI</span>
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
