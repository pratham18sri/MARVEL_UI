import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Search, Sparkles } from 'lucide-react';

interface UserItem {
  _id: string;
  name: string;
  email: string;
  provider: string;
  plan: 'free' | 'pro';
  role: string;
  subscriptionStatus: string;
  createdAt: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');

  const fetchUsers = () => {
    setLoading(true);
    const url = new URL('/api/admin/users', window.location.origin);
    url.searchParams.append('search', search);
    url.searchParams.append('plan', planFilter);

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin users:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, planFilter]);

  const handleTogglePlan = async (id: string, currentPlan: 'free' | 'pro') => {
    const nextPlan = currentPlan === 'pro' ? 'free' : 'pro';
    if (!window.confirm(`Manually switch pilot plan level to ${nextPlan}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}/plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: nextPlan }),
      });
      if (res.ok) {
        fetchUsers(); // refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-marvel text-3xl font-extrabold text-white tracking-wider uppercase">
              Registered Pilots (Users)
            </h1>
            <p className="text-xs text-[#A8A9AD] font-mono">Monitor developer logins, provider origins, and plan overrides.</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#141414] border border-white/5 rounded-xl p-4 shadow-md">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8A9AD]">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Pilots by Name or Email..."
              className="block w-full pl-11 pr-4 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded-lg text-xs text-white"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex bg-[#0D0D0D] border border-white/5 p-1 rounded-lg">
            {['all', 'free', 'pro'].map((f) => (
              <button
                key={f}
                onClick={() => setPlanFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  planFilter === f
                    ? 'bg-[#E62429] text-white shadow-[0_0_10px_rgba(230,36,41,0.3)]'
                    : 'text-[#A8A9AD] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#E62429]" />
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/5 rounded-xl bg-[#141414] scrollbar">
            <table className="min-w-full divide-y divide-white/5 text-xs text-left">
              <thead className="bg-[#0D0D0D] font-marvel font-bold text-white uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Pilot Identity</th>
                  <th className="px-6 py-4">Email Specs</th>
                  <th className="px-6 py-4 text-center">Auth Provider</th>
                  <th className="px-6 py-4 text-center">Plan License</th>
                  <th className="px-6 py-4 text-center">Sub Status</th>
                  <th className="px-6 py-4">Registered Date</th>
                  <th className="px-6 py-4 text-center">Plan Switch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#A8A9AD] bg-[#141414]">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-white/20">No matching pilot records resolved.</td>
                  </tr>
                ) : (
                  users.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white uppercase">{item.name}</td>
                      <td className="px-6 py-4 font-mono text-[10px]">{item.email}</td>
                      <td className="px-6 py-4 text-center font-mono uppercase">{item.provider}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.plan === 'pro'
                            ? 'bg-[#F0B90B] text-black shadow-[0_0_8px_rgba(240,185,11,0.25)]'
                            : 'bg-white/10 text-white'
                        }`}>
                          {item.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.subscriptionStatus === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-white/5 text-white/40'
                        }`}>
                          {item.subscriptionStatus || 'none'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[10px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePlan(item._id, item.plan)}
                          className={`px-3 py-1 bg-white/5 hover:bg-white/10 text-xs rounded border border-white/10 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            item.plan === 'free' ? 'text-amber-400 hover:border-amber-400/40' : 'text-blue-400 hover:border-blue-400/40'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{item.plan === 'free' ? 'Upgrade Pro' : 'Downgrade Free'}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Users;
