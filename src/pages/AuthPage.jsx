import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, Phone, User, Eye, EyeOff, ArrowRight,
  ShoppingBag, Sparkles, Heart, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '', phone: '', email: '', password: '', confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!loginForm.email || !loginForm.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const ok = await login(loginForm.email, loginForm.password);
    setLoading(false);
    if (ok) navigate('/');
    else setError('Login failed. Please check your credentials.');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    const { name, phone, email, password, confirmPassword } = signupForm;
    if (!name || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const ok = await signup({ name, phone, email, password });
    setLoading(false);
    if (ok) {
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/'), 1000);
    } else {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Splash */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Logo Header */}
          <div className="p-8 pb-6 text-center border-b border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              NANDINI<span className="text-emerald-400">MART</span>
            </h1>
            <p className="text-emerald-300/60 text-xs font-medium mt-1">
              Fresh Groceries · Doorstep Delivery
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-black transition-all ${mode === 'login' ? 'text-white bg-emerald-600/30 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-black transition-all ${mode === 'signup' ? 'text-white bg-emerald-600/30 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          <div className="p-8 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {success}
              </div>
            )}

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white/12 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white/12 transition-all font-medium"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Demo credentials hint */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <span className="font-bold">Demo:</span> nandini@nandinimart.com / any password
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {loading ? <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nandini Sharma"
                      value={signupForm.name}
                      onChange={e => setSignupForm({ ...signupForm, name: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={signupForm.phone}
                      onChange={e => setSignupForm({ ...signupForm, phone: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={signupForm.email}
                      onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="Min. 6 characters"
                      value={signupForm.password}
                      onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-11 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={signupForm.confirmPassword}
                      onChange={e => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-11 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                    <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-1"
                >
                  {loading ? <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 text-center">
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
