import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { MarvelButton } from 'pratham-ui';
import { Copy, Check, Terminal, Eye, EyeOff, ShieldAlert, Cpu, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleCopyKey = async () => {
    if (!user) return;
    try {
      await navigator.clipboard.writeText(user.apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch (e) {}
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-[#A8A9AD]">
        <ShieldAlert className="w-10 h-10 text-[#E62429] mb-2" />
        <p className="font-marvel text-lg uppercase font-bold text-white tracking-widest">Unauthorized Access</p>
        <p className="text-xs mt-1">Please sign in to access your suit dashboard.</p>
        <Link to="/login" className="mt-4">
          <MarvelButton variant="crimson">Authorize Login</MarvelButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8">
      {/* Profile Overview Card */}
      <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl relative">
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#E62429]" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#E62429]" />

        <img
          src={user.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`}
          alt={user.name}
          className="w-20 h-20 rounded-full border border-white/10 p-1"
        />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
            <h2 className="font-marvel text-3xl font-extrabold text-white tracking-wide uppercase">
              {user.name}
            </h2>
            <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
              user.plan === 'pro'
                ? 'bg-[#F0B90B] text-black shadow-[0_0_8px_rgba(240,185,11,0.3)]'
                : 'bg-white/15 text-[#A8A9AD]'
            }`}>
              {user.plan} user
            </span>
          </div>
          <p className="text-xs text-[#A8A9AD] font-mono">{user.email}</p>
          <p className="text-xs text-[#A8A9AD]">Joined the archives on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Action Button */}
        {user.plan !== 'pro' && (
          <Link to="/pricing" className="shrink-0 w-full sm:w-auto">
            <MarvelButton variant="gold" className="w-full">
              Power up Core
            </MarvelButton>
          </Link>
        )}
      </div>

      {/* CLI Tokens & Integrations Panel */}
      <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl space-y-5 relative">
        <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#F0B90B]" />
        <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#F0B90B]" />
        
        <div className="space-y-1">
          <h3 className="font-marvel text-lg font-bold text-white tracking-wider uppercase flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#E62429]" />
            CLI Armor Key
          </h3>
          <p className="text-xs text-[#A8A9AD] leading-relaxed font-sans">
            Use this secure token in your CLI tools command to fetch Pro widgets and components directly from the terminal. Keep this key secret.
          </p>
        </div>

        {/* Input box showing / hiding keys */}
        <div className="flex gap-3 items-stretch">
          <div className="flex-grow flex items-center justify-between gap-3 font-mono text-xs text-[#A8A9AD] bg-[#0A0A0A] px-4 py-2.5 rounded-lg border border-black overflow-x-auto scrollbar">
            <span>
              {showKey ? user.apiKey : '••••••••••••••••••••••••••••••••••••'}
            </span>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-[#A8A9AD] hover:text-white transition-colors cursor-pointer"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleCopyKey}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E62429] hover:bg-[#B01C20] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            {copiedKey ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
            <span>{copiedKey ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* CLI Example Usage snippet */}
        <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 text-[11px] font-mono text-[#A8A9AD] space-y-2">
          <span className="text-white block font-bold">Terminal instructions:</span>
          <p className="text-white/60"># Set env variable and pull your first pro component:</p>
          <p className="text-emerald-400">$env:PRATHAM_UI_KEY="{user.apiKey.substring(0, 8)}..." (Windows PowerShell)</p>
          <p className="text-emerald-400">npx pratham-ui add arc-reactor-loader</p>
        </div>
      </div>

      {/* Subscription harmonizer status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl space-y-3 text-left">
          <h4 className="font-marvel text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#F0B90B]" />
            Reactor Core Status
          </h4>
          <div className="space-y-1">
            <p className="text-xs text-[#A8A9AD]">Subscribed Tier: <span className="font-bold text-white uppercase font-mono">{user.plan}</span></p>
            <p className="text-xs text-[#A8A9AD]">Gateway token status: <span className="font-bold text-emerald-400 uppercase font-mono">{user.subscriptionStatus === 'none' ? 'INACTIVE' : user.subscriptionStatus}</span></p>
            {user.subscriptionExpiry && (
              <p className="text-xs text-[#A8A9AD]">Core depletion date: <span className="font-bold text-white font-mono">{new Date(user.subscriptionExpiry).toLocaleDateString()}</span></p>
            )}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl space-y-3 text-left">
          <h4 className="font-marvel text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#E62429]" />
            Access level authorization
          </h4>
          <ul className="text-[11px] text-[#A8A9AD] space-y-1.5 font-sans">
            <li className="flex gap-1.5 items-center">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Full basic button and form catalogs (Authorized)</span>
            </li>
            <li className="flex gap-1.5 items-center">
              {user.plan === 'pro' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <span className="text-red-500 font-bold shrink-0">✕</span>
              )}
              <span>Reactor loaders and effects overlays ({user.plan === 'pro' ? 'Authorized' : 'Locked'})</span>
            </li>
            <li className="flex gap-1.5 items-center">
              {user.plan === 'pro' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <span className="text-red-500 font-bold shrink-0">✕</span>
              )}
              <span>CLI downloading token integration ({user.plan === 'pro' ? 'Authorized' : 'Locked'})</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
