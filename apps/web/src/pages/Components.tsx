import React, { useEffect, useState } from 'react';
import { useComponentStore } from '../store/componentStore';
import ComponentCard from '../components/ComponentCard';
import SearchBar from '../components/SearchBar';
import * as Icons from 'lucide-react';

export const Components: React.FC = () => {
  const {
    components,
    categories,
    loading,
    page,
    pages,
    fetchComponents,
    fetchCategories,
  } = useComponentStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchComponents({
        page: 1,
        search,
        category: selectedCategory,
        tier: selectedTier,
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedCategory, selectedTier, fetchComponents]);

  const handlePageChange = (newPage: number) => {
    fetchComponents({
      page: newPage,
      search,
      category: selectedCategory,
      tier: selectedTier,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderIcon = (iconName?: string, color: string = '#A8A9AD') => {
    const IconComp = (Icons as any)[iconName || 'Box'] || Icons.Box;
    return <IconComp className="w-4 h-4 shrink-0" style={{ color }} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Category Filter */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="font-marvel text-lg font-bold text-white tracking-wider uppercase border-b border-white/5 pb-3">
              Suits Categories
            </h3>
            
            <div className="flex flex-col gap-1.5">
              {/* Reset Category Button */}
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === ''
                    ? 'bg-[#E62429] text-white shadow-[0_0_12px_rgba(230,36,41,0.25)]'
                    : 'text-[#A8A9AD] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icons.FolderOpen className="w-4 h-4 shrink-0" />
                  <span>All Subsystems</span>
                </div>
              </button>

              {/* Individual Category items */}
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                    selectedCategory === cat._id
                      ? 'bg-[#E62429] text-white shadow-[0_0_12px_rgba(230,36,41,0.25)] border-transparent'
                      : 'text-[#A8A9AD] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {renderIcon(cat.icon, selectedCategory === cat._id ? '#FFF' : cat.color)}
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${selectedCategory === cat._id ? 'bg-white/25 text-white' : 'bg-white/5 text-[#A8A9AD]'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top filtering controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#141414] border border-white/5 rounded-xl p-4 shadow-md">
            <div className="w-full md:max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* Free/Pro Filter tabs */}
            <div className="flex bg-[#0D0D0D] border border-white/5 p-1 rounded-lg">
              {['all', 'free', 'pro'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    selectedTier === t
                      ? 'bg-[#E62429] text-white shadow-[0_0_10px_rgba(230,36,41,0.3)]'
                      : 'text-[#A8A9AD] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Loading or Empty State */}
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <Icons.Loader2 className="w-8 h-8 text-[#E62429] animate-spin" />
              <span className="font-marvel text-xs tracking-widest text-[#A8A9AD] uppercase animate-pulse">Syncing Database...</span>
            </div>
          ) : components.length === 0 ? (
            <div className="h-64 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-[#A8A9AD]">
              <Icons.ShieldAlert className="w-10 h-10 text-[#E62429] mb-2" />
              <p className="text-sm font-semibold uppercase font-marvel text-white tracking-widest">No Component Records Found</p>
              <p className="text-xs text-center mt-1 max-w-xs">Adjust your search parameters or select an alternative armor subsystem category.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Components grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {components.map((comp) => (
                  <ComponentCard key={comp._id} component={comp} />
                ))}
              </div>

              {/* Pagination controls */}
              {pages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-[#A8A9AD] hover:text-white disabled:opacity-40 disabled:hover:bg-[#141414] disabled:hover:text-[#A8A9AD] transition-all duration-200 cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs font-mono text-[#A8A9AD]">
                    SUIT STAGE {page} / {pages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                    className="px-4 py-2 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-[#A8A9AD] hover:text-white disabled:opacity-40 disabled:hover:bg-[#141414] disabled:hover:text-[#A8A9AD] transition-all duration-200 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default Components;
