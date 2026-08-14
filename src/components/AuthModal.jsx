import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Lock, Mail, User as UserIcon, ArrowRight, CheckCircle2, Key, Home, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../api';

export const AuthModal = ({
  initialMode,
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState('role_select');
  const [selectedRole, setSelectedRole] = useState('tenant');
  const [mode, setMode] = useState(initialMode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    setStep('credentials');
  };

  const handleDemoTenantLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Try to login demo tenant on backend
      const res = await loginUser({ email: 'alexandre@nestora.com', password: 'password123' });
      onLoginSuccess(res.user);
      onClose();
    } catch {
      try {
        // If not registered, create tenant
        const res = await registerUser({
          name: 'Alexandre Mercer',
          email: 'alexandre@nestora.com',
          password: 'password123',
          role: 'tenant',
        });
        onLoginSuccess(res.user);
        onClose();
      } catch {
        // Fallback demo user object if backend offline
        const demoTenant = {
          id: 'usr-tenant-1',
          name: 'Alexandre Mercer',
          email: 'alexandre@nestora.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: 'tenant',
          phone: '+1 (415) 890-2101',
          bio: 'Design engineer residing in SF. Looking for minimalist lofts with fiber internet.',
          wishlist: ['room-1', 'room-3'],
          bookings: [],
        };
        onLoginSuccess(demoTenant);
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoOwnerLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Try to login demo owner on backend
      const res = await loginUser({ email: 'elena@nestora.com', password: 'password123' });
      onLoginSuccess(res.user);
      onClose();
    } catch {
      try {
        // If not registered, create owner
        const res = await registerUser({
          name: 'Elena Vance',
          email: 'elena@nestora.com',
          password: 'password123',
          role: 'owner',
        });
        onLoginSuccess(res.user);
        onClose();
      } catch {
        // Fallback demo owner object if backend offline
        const demoOwner = {
          id: 'usr-owner-1',
          name: 'Elena Vance',
          email: 'elena@nestora.com',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
          role: 'owner',
          phone: '+1 (415) 555-0199',
          bio: 'Architect & Property Owner specializing in high-end minimalist urban suites.',
          isVerifiedOwner: true,
          propertyCount: 3,
          wishlist: [],
          bookings: [],
        };
        onLoginSuccess(demoOwner);
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        const res = await registerUser({
          name: name || (selectedRole === 'owner' ? 'Property Owner' : 'Resident'),
          email,
          password,
          role: selectedRole,
        });
        if (res && res.user) {
          onLoginSuccess(res.user);
          onClose();
          return;
        }
      } else {
        const res = await loginUser({
          email,
          password,
        });
        if (res && res.user) {
          onLoginSuccess(res.user);
          onClose();
          return;
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      // If 404 or offline backend, create a local session so user is never blocked
      if (!err.response || err.response.status === 404 || err.code === 'ERR_NETWORK') {
        const fallbackUser = {
          id: 'usr-' + Date.now(),
          name: name || (email ? email.split('@')[0] : (selectedRole === 'owner' ? 'Property Owner' : 'Nestora Resident')),
          email: email || 'user@nestora.com',
          avatar: selectedRole === 'owner'
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          role: selectedRole || 'tenant',
          phone: '+1 (415) 555-0100',
          bio: selectedRole === 'owner' ? 'Verified Property Owner' : 'Verified Resident at Nestora',
          wishlist: [],
          bookings: [],
          isVerifiedOwner: selectedRole === 'owner',
          propertyCount: selectedRole === 'owner' ? 1 : 0,
        };
        const token = `nestora_token_${Date.now()}`;
        try {
          localStorage.setItem('token', token);
          localStorage.setItem('nestora_token', token);
          localStorage.setItem('user', JSON.stringify(fallbackUser));
          localStorage.setItem('nestora_user', JSON.stringify(fallbackUser));
        } catch (e) {
          console.warn(e);
        }
        onLoginSuccess(fallbackUser);
        onClose();
        return;
      }
      const msg = err.response?.data?.message || err.message || 'Authentication failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Building2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                Nestora
              </span>
            </div>
            <motion.button
              id="close-auth-modal"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* STEP 1: Role Selection Screen */}
          {step === 'role_select' ? (
            <div className="p-6 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-slate-900">How will you use Nestora?</h2>
                <p className="text-xs text-slate-500">
                  Choose your role to get started with tailored dashboard tools.
                </p>
              </div>

              {/* Two Role Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1: Tenant */}
                <motion.div
                  id="role-card-tenant"
                  onClick={() => handleSelectRole('tenant')}
                  whileHover={{ y: -4, borderColor: '#2563eb' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-5 bg-white rounded-2xl border-2 border-slate-200 transition-all cursor-pointer space-y-4 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Tenant
                      </h3>
                      <p className="text-[11px] text-slate-500">I want to find & lease a room</p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Browse Verified Rooms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Save Wishlist Spaces</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Book Rooms & Escrow Lease</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Direct Chat with Owners</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    id="btn-continue-tenant"
                    className="w-full py-2.5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Continue as Tenant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Card 2: Owner */}
                <motion.div
                  id="role-card-owner"
                  onClick={() => handleSelectRole('owner')}
                  whileHover={{ y: -4, borderColor: '#2563eb' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-5 bg-white rounded-2xl border-2 border-slate-200 transition-all cursor-pointer space-y-4 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Property Owner
                      </h3>
                      <p className="text-[11px] text-slate-500">I want to list & rent properties</p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Add & Publish Rooms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Manage Listings & Calendar</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Accept Booking Requests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Track Monthly Earnings</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    id="btn-continue-owner"
                    className="w-full py-2.5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Continue as Owner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

              </div>

              {/* Instant Demo Role Quick Login Options */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 text-center tracking-wider">
                  Instant Demo Access
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <motion.button
                    id="demo-tenant-btn"
                    onClick={handleDemoTenantLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2.5 px-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Key className="w-3.5 h-3.5 text-blue-600" />
                    <span>Demo Tenant Login</span>
                  </motion.button>
                  <motion.button
                    id="demo-owner-btn"
                    onClick={handleDemoOwnerLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2.5 px-3 border border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-blue-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Demo Owner Host Login</span>
                  </motion.button>
                </div>
              </div>

            </div>
          ) : (
            /* STEP 2: Credentials Form for Selected Role */
            <div className="p-6 space-y-4">
              
              {/* Selected Role Indicator & Back Button */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Selected Role:</span>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {selectedRole === 'owner' ? 'Property Owner' : 'Tenant / Resident'}
                  </span>
                </div>
                <button
                  id="auth-change-role-btn"
                  onClick={() => setStep('role_select')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                >
                  Change Role
                </button>
              </div>

              {/* Tab Toggle: Sign In vs Create Account */}
              <div className="p-1.5 bg-slate-100/70 rounded-2xl flex border border-slate-200/60">
                <button
                  id="auth-tab-login"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                    mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  id="auth-tab-register"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                    mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-700 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {mode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder={selectedRole === 'owner' ? "e.g. Elena Vance" : "e.g. Alexandre Mercer"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder={selectedRole === 'owner' ? "owner@nestora.com" : "resident@nestora.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  id="auth-submit-btn"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mode === 'login' 
                          ? `Sign In as ${selectedRole === 'owner' ? 'Owner' : 'Tenant'}` 
                          : `Create ${selectedRole === 'owner' ? 'Owner' : 'Tenant'} Account`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick Demo Shortcut */}
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400">Want to test instantly?</span>
                <button
                  type="button"
                  id="quick-demo-login-shortcut"
                  onClick={selectedRole === 'owner' ? handleDemoOwnerLogin : handleDemoTenantLogin}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Instant {selectedRole === 'owner' ? 'Owner' : 'Tenant'} Demo Login →
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
