import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash, Edit, Lock, Unlock } from 'lucide-react';

interface ComponentItem {
  _id: string;
  name: string;
  slug: string;
  category: { name: string; slug: string };
  tier: string;
  isPublished: boolean;
  viewCount: number;
  copyCount: number;
}

export const Components: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait! Let's make sure we retrieve all components. We will add a `GET /components` route to the admin router.
  const fetchAllAdminComponents = async () => {
    try {
      const res = await fetch('/api/admin/components');
      const data = await res.json();
      if (res.ok) {
        setComponents(data);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminComponents();
  }, []);

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/components/${id}/publish`, {
        method: 'PATCH',
      });
      if (res.ok) {
        fetchAllAdminComponents(); // refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this component spec from S.H.I.E.L.D?')) return;
    try {
      const res = await fetch(`/api/admin/components/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchAllAdminComponents(); // refresh
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
              Components Registry
            </h1>
            <p className="text-xs text-[#A8A9AD] font-mono">Create, publish, and delete suit components.</p>
          </div>
          
          <Link to="/components/add">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#E62429] hover:bg-[#B01C20] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer shadow-[0_0_15px_rgba(230,36,41,0.3)]">
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Add Component</span>
            </button>
          </Link>
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
                  <th className="px-6 py-4">Component Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center font-mono">Views</th>
                  <th className="px-6 py-4 text-center font-mono">Copies</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#A8A9AD] bg-[#141414]">
                {components.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-white/20">No components assemble instructions registered.</td>
                  </tr>
                ) : (
                  components.map((comp) => (
                    <tr key={comp._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white uppercase">{comp.name}</td>
                      <td className="px-6 py-4 font-mono text-[10px]">{comp.slug}</td>
                      <td className="px-6 py-4">{comp.category?.name}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${
                          comp.tier === 'pro' ? 'bg-[#F0B90B] text-black' : 'bg-white/10 text-white'
                        }`}>
                          {comp.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(comp._id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                            comp.isPublished
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-white/40 border border-white/10'
                          }`}
                        >
                          {comp.isPublished ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                          <span>{comp.isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center font-mono">{comp.viewCount}</td>
                      <td className="px-6 py-4 text-center font-mono">{comp.copyCount}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link to={`/components/edit/${comp._id}`}>
                            <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors cursor-pointer">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(comp._id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-[#E62429] rounded transition-colors cursor-pointer"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
export default Components;
