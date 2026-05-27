import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Eye, CreditCard, Users, Box, PlusCircle, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalComponents: number;
  totalUsers: number;
  proUsers: number;
  totalRevenue: number;
  recentSignups: Array<{
    _id: string;
    name: string;
    email: string;
    provider: string;
    plan: string;
    createdAt: string;
  }>;
  recentPayments: Array<{
    _id: string;
    userId: { name: string; email: string };
    amount: number;
    plan: string;
    createdAt: string;
  }>;
  mostViewedComponents: Array<{
    _id: string;
    name: string;
    viewCount: number;
    copyCount: number;
    category: { name: string };
  }>;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#E62429]" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Title and top-bar Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-marvel text-3xl font-extrabold text-white tracking-wider uppercase">
              Armor Telemetry Dashboard
            </h1>
            <p className="text-xs text-[#A8A9AD] font-mono">Real-time status updates of active UI suit systems.</p>
          </div>
          <Link to="/components/add">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#E62429] hover:bg-[#B01C20] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer shadow-[0_0_15px_rgba(230,36,41,0.3)]">
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Assemble Component</span>
            </button>
          </Link>
        </div>

        {/* Telemetry Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden">
            <div className="p-3 bg-[#E62429]/10 text-[#E62429] rounded-lg">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#A8A9AD] uppercase tracking-wider">Total widgets</p>
              <p className="text-2xl font-bold text-white font-mono mt-0.5">{stats?.totalComponents}</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden">
            <div className="p-3 bg-[#F0B90B]/10 text-[#F0B90B] rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#A8A9AD] uppercase tracking-wider">Total developers</p>
              <p className="text-2xl font-bold text-white font-mono mt-0.5">{stats?.totalUsers}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden">
            <div className="p-3 bg-cyan-400/10 text-cyan-400 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#A8A9AD] uppercase tracking-wider">Arc Pro pilots</p>
              <p className="text-2xl font-bold text-white font-mono mt-0.5">{stats?.proUsers}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden">
            <div className="p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#A8A9AD] uppercase tracking-wider">Arc Revenue (INR)</p>
              <p className="text-2xl font-bold text-white font-mono mt-0.5">₹{stats?.totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Analytics split blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Table List 1: Most viewed components */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-xl space-y-4">
            <h3 className="font-marvel text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2 border-b border-white/5 pb-3">
              <TrendingUp className="w-4.5 h-4.5 text-[#E62429]" />
              MOST DEPLOYED WIDGETS
            </h3>
            
            <div className="space-y-3.5">
              {stats?.mostViewedComponents.map((comp) => (
                <div key={comp._id} className="flex justify-between items-center bg-[#0D0D0D] border border-white/5 p-3 rounded-lg hover:border-[#E62429]/20 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{comp.name}</h4>
                    <span className="text-[9px] uppercase text-[#A8A9AD] font-mono">{comp.category?.name}</span>
                  </div>
                  <div className="flex gap-4 font-mono text-[10px] text-[#A8A9AD]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {comp.viewCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table List 2: Recent log logs */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-xl space-y-4">
            <h3 className="font-marvel text-sm font-bold text-white tracking-widest uppercase border-b border-white/5 pb-3 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-[#F0B90B]" />
              RECENT REGISTERED PILOTS
            </h3>

            <div className="divide-y divide-white/5 text-xs text-[#A8A9AD]">
              {stats?.recentSignups.map((su) => (
                <div key={su._id} className="flex justify-between items-center py-3">
                  <div className="truncate">
                    <p className="text-white font-semibold truncate">{su.name}</p>
                    <p className="text-[10px] text-[#A8A9AD] font-mono truncate">{su.email}</p>
                  </div>
                  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded uppercase ${
                    su.plan === 'pro' ? 'bg-[#F0B90B] text-black' : 'bg-white/10 text-white'
                  }`}>
                    {su.plan}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
