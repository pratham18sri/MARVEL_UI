import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { MarvelButton, MarvelModal } from 'pratham-ui';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal control states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Box');
  const [color, setColor] = useState('#E62429');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const fetchCats = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setIcon('Box');
    setColor('#E62429');
    setOrder(categories.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingId(cat._id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Box');
    setColor(cat.color || '#E62429');
    setOrder(cat.order || 0);
    setIsActive(cat.isActive);
    setModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      alert('Name and slug are required');
      return;
    }

    const payload = { name, slug, description, icon, color, order, isActive };

    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/admin/categories/${editingId}` : '/api/admin/categories';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setModalOpen(false);
        fetchCats(); // refresh
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete category? Components inside this category must be cleared first.')) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchCats();
      } else {
        alert(data.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderIconComp = (iconName: string, catColor: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Box;
    return <IconComponent className="w-5 h-5" style={{ color: catColor }} />;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-marvel text-3xl font-extrabold text-white tracking-wider uppercase">
              Categories Matrix
            </h1>
            <p className="text-xs text-[#A8A9AD] font-mono">Structure core catalog grouping classifications.</p>
          </div>
          
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#E62429] hover:bg-[#B01C20] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer shadow-[0_0_15px_rgba(230,36,41,0.3)]"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            <span>Assemble Category</span>
          </button>
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
                  <th className="px-6 py-4 font-mono text-center">Order</th>
                  <th className="px-6 py-4">Category Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4 text-center">Visual Icon</th>
                  <th className="px-6 py-4 text-center">Hex Color</th>
                  <th className="px-6 py-4 text-center">Is Active</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#A8A9AD]">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-white/20">No categories documented in database archives.</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-center">{cat.order}</td>
                      <td className="px-6 py-4 font-bold text-white uppercase">{cat.name}</td>
                      <td className="px-6 py-4 font-mono text-[10px]">{cat.slug}</td>
                      <td className="px-6 py-4 text-center flex justify-center py-5">
                        {renderIconComp(cat.icon, cat.color)}
                      </td>
                      <td className="px-6 py-4 text-center font-mono">{cat.color}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cat.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {cat.isActive ? 'ACTIVE' : 'DISABLED'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-[#E62429] rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

        {/* Create/Edit Category Modal */}
        <MarvelModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Modify Category' : 'Assemble Category'}>
          <form onSubmit={handleSave} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Buttons"
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. buttons"
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief grouping context summary..."
                rows={2}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Lucide Icon</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="e.g. Layout"
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Color Code</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. #E62429"
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">Order Value</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                />
              </div>
            </div>

            {/* IsActive status */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-[#A8A9AD]">Subsystem Category Active Status</span>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase border cursor-pointer ${
                  isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-[#A8A9AD] border-white/10'
                }`}
              >
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-white/5">
              <MarvelButton variant="outline" type="button" className="!py-1.5" onClick={() => setModalOpen(false)}>
                Abort
              </MarvelButton>
              <MarvelButton variant="crimson" type="submit" className="!py-1.5">
                Save Category
              </MarvelButton>
            </div>
          </form>
        </MarvelModal>
      </div>
    </Layout>
  );
};
export default Categories;
