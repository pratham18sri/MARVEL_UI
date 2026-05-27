import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Cpu } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBypassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Stark Security Email required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'admin', plan: 'pro' }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Save flag in localStorage
        localStorage.setItem('pui_admin_email', data.user.email);
        localStorage.setItem('pui_admin_name', data.user.name);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Authorization rejected');
      }
    } catch (err) {
      setError('Connection with Arc core server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080808]">
      <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl w-full max-w-md shadow-2xl relative space-y-6">
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#E62429]" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#E62429]" />
        <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#F0B90B]" />
        <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#F0B90B]" />

        {/* Shield brand */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#E62429]/10 border border-[#E62429]/30 flex items-center justify-center text-[#E62429] shadow-[0_0_15px_rgba(230,36,41,0.2)]">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="font-marvel text-2xl font-bold uppercase tracking-wider text-white">
              S.H.I.E.L.D COMMAND CONSOLE
            </h2>
            <p className="text-[10px] text-[#A8A9AD] font-mono tracking-widest uppercase">
              Secure Administration Access
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-[#E62429] font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleBypassLogin} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="block text-[9px] font-mono uppercase text-[#A8A9AD] tracking-wider">
              Stark Clearance Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. tony@starkindustries.com"
              className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E62429] hover:bg-[#B01C20] text-white rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(230,36,41,0.3)] hover:shadow-[0_0_25px_rgba(230,36,41,0.6)]"
          >
            <Cpu className="w-4 h-4" />
            <span>{loading ? 'Decrypting Suit...' : 'Authorize Admin Console'}</span>
          </button>
        </form>

        <div className="text-[10px] text-[#A8A9AD] font-mono text-center pt-2">
          Note: This console is strictly limited to role="admin" users.
        </div>
      </div>
    </div>
  );
};
export default Login;
