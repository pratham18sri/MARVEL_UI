import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

import { Github, Chrome, ShieldAlert, Cpu } from 'lucide-react';

export const Login: React.FC = () => {
  const { mockLogin, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  // Developer Bypass fields
  const [mockEmail, setMockEmail] = useState('');
  const [mockRole, setMockRole] = useState<'user' | 'admin'>('user');
  const [mockPlan, setMockPlan] = useState<'free' | 'pro'>('free');

  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleOAuthLogin = (provider: 'github' | 'google') => {
    // Redirect parameters encoded
    const callbackRedirect = window.location.origin + redirect;
    window.location.href = `${API_URL}/api/auth/${provider}?redirect=${encodeURIComponent(callbackRedirect)}`;
  };

  const handleMockLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockEmail) {
      alert('Email required for mock session');
      return;
    }
    await mockLogin(mockEmail, mockRole, mockPlan);
    // Reload profile
    await useAuthStore.getState().checkAuth();
    navigate(redirect);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      {/* Container card */}
      <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl w-full max-w-md shadow-2xl relative space-y-6">
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#E62429]" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#E62429]" />

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="font-marvel text-3xl font-bold uppercase tracking-wider text-white">
            Core Authentication
          </h2>
          <p className="text-xs text-[#A8A9AD] font-sans">
            Log in to manage components, copy CLI keys, and authorize Pro suit downloads.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-[#E62429] font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard OAuth Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#050505] border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40"
          >
            <Github className="w-4 h-4" />
            <span>Assemble with GitHub</span>
          </button>

          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#050505] border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40"
          >
            <Chrome className="w-4 h-4 text-cyan-400" />
            <span>Authorize with Google</span>
          </button>
        </div>

        {/* Divider separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] font-mono text-[#A8A9AD] uppercase tracking-widest">
            OR DEV TESTING BYPASS
          </span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Local Mock Login Dev form */}
        <form onSubmit={handleMockLoginSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
              Developer Email
            </label>
            <input
              type="email"
              value={mockEmail}
              onChange={(e) => setMockEmail(e.target.value)}
              placeholder="e.g. tony@stark.com"
              className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Suit Role
              </label>
              <select
                value={mockRole}
                onChange={(e) => setMockRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              >
                <option value="user">User (Peter Parker)</option>
                <option value="admin">Admin (Tony Stark)</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Plan Level
              </label>
              <select
                value={mockPlan}
                onChange={(e) => setMockPlan(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              >
                <option value="free">Free Shield</option>
                <option value="pro">Arc Pro</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E62429]/15 hover:bg-[#E62429]/25 border border-[#E62429]/30 text-[#E62429] hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300"
          >
            <Cpu className="w-4 h-4" />
            <span>{loading ? 'Powering up...' : 'Direct Bypass Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
