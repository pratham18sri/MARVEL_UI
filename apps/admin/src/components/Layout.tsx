import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Box, Tags, Users, LogOut } from 'lucide-react';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem('pui_admin_name') || 'TONY STARK';

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Components', path: '/components', icon: Box },
    { label: 'Categories', path: '/categories', icon: Tags },
    { label: 'Users', path: '/users', icon: Users },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.clear();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      {/* Sidebar Nav */}
      <aside className="w-64 bg-[#0D0D0D] border-r border-white/5 flex flex-col justify-between p-6 shrink-0 text-left">
        <div className="space-y-8">
          {/* Brand Logo header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E62429] flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(230,36,41,0.4)]">
              <span className="font-marvel text-white font-bold text-sm tracking-widest">PUI</span>
            </div>
            <span className="font-marvel text-lg font-bold tracking-widest text-[#F5F5F5] uppercase">
              Admin Suit
            </span>
          </div>

          {/* User profile */}
          <div className="bg-[#141414] border border-white/5 p-3 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E62429]/10 border border-[#E62429]/40 flex items-center justify-center text-xs text-white font-bold font-mono">
              TS
            </div>
            <div className="truncate">
              <p className="text-xs text-white font-bold truncate">{name}</p>
              <span className="text-[9px] uppercase tracking-wider text-[#F0B90B] font-bold">Clearance Lvl 7</span>
            </div>
          </div>

          {/* Navbar links lists */}
          <nav className="space-y-1.5">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'bg-[#E62429] text-white shadow-[0_0_10px_rgba(230,36,41,0.25)] border-transparent'
                      : 'text-[#A8A9AD] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Power Down button */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            <span>Power Down</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <main className="flex-grow p-10 overflow-y-auto max-h-screen text-left scrollbar">
        {children}
      </main>
    </div>
  );
};
export default Layout;
