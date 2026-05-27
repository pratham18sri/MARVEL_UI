import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MarvelNavbar, MarvelButton } from 'pratham-ui';
import { LogOut, ShieldAlert, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Components', href: '/components' },
    { label: 'Pricing', href: '/pricing' }
  ];

  // Shield brand icon
  const Logo = (
    <div className="w-8 h-8 rounded bg-[#E62429] flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(230,36,41,0.5)]">
      <span className="font-marvel text-white font-bold text-base tracking-tighter">PUI</span>
    </div>
  );

  const rightActions = (
    <div className="flex items-center gap-4">
      {/* GitHub Badge */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#A8A9AD] hover:text-white transition-colors duration-200"
      >
        <span>★ Star on GitHub</span>
      </a>

      {isAuthenticated && user ? (
        <div className="flex items-center gap-3 relative group">
          {/* Avatar & trigger */}
          <button className="flex items-center gap-2 bg-[#141414] hover:bg-[#1A1A1A] p-1.5 pr-3 rounded-full border border-white/5 group-hover:border-[#E62429]/40 transition-all duration-300 cursor-pointer">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`}
              alt={user.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs font-semibold max-w-[100px] truncate text-[#A8A9AD] group-hover:text-white">
              {user.name}
            </span>
          </button>

          {/* User Dropdown */}
          <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
            <div className="bg-[#1A1A1A] border border-white/10 rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.5)] p-2 w-48 space-y-1">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-xs text-white font-semibold truncate">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${user.plan === 'pro' ? 'bg-[#F0B90B] text-black shadow-[0_0_8px_rgba(240,185,11,0.3)]' : 'bg-white/15 text-[#A8A9AD]'}`}>
                    {user.plan}
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold bg-[#E62429] text-white">
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#A8A9AD] hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Suit Dashboard
              </Link>

              {user.role === 'admin' && (
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#E62429] hover:text-white hover:bg-[#E62429]/10 rounded-md transition-colors duration-200"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin Console
                </a>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors duration-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Power Down
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <MarvelButton variant="crimson" className="!px-4 !py-1.5 !text-xs">
            Assemble
          </MarvelButton>
        </Link>
      )}
    </div>
  );

  return (
    <MarvelNavbar
      brandName="PrathamUI"
      logo={Logo}
      links={navLinks}
      rightElement={rightActions}
    />
  );
};
export default Navbar;
