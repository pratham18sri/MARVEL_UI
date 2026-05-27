import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { MarvelButton } from 'pratham-ui';
import { ShieldCheck, Plus, Trash2, ArrowLeft } from 'lucide-react';

interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
  required: boolean;
}

export const AddComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Categories list
  const [categories, setCategories] = useState<any[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [dependenciesInput, setDependenciesInput] = useState('');
  const [tier, setTier] = useState<'free' | 'pro'>('free');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Monaco Code states
  const [componentCode, setComponentCode] = useState('');
  const [previewCode, setPreviewCode] = useState('');
  const [usageCode, setUsageCode] = useState('');
  const [installCode, setInstallCode] = useState('');

  // Props rows states
  const [propsList, setPropsList] = useState<PropDoc[]>([]);

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !category) {
          setCategory(data[0]._id);
        }
      })
      .catch((err) => console.error(err));

    // If edit mode, fetch existing specs
    if (isEdit) {
      fetch(`/api/admin/components/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setSlug(data.slug);
          setDescription(data.description);
          setCategory(data.category);
          setTagsInput(data.tags?.join(', ') || '');
          setDependenciesInput(data.dependencies?.join(', ') || '');
          setTier(data.tier);
          setThumbnailUrl(data.thumbnailUrl || '');
          setIsPublished(data.isPublished);
          setComponentCode(data.componentCode || '');
          setPreviewCode(data.previewCode || '');
          setUsageCode(data.usageCode || '');
          setInstallCode(data.installCode || '');
          setPropsList(data.props || []);
        })
        .catch((err) => console.error('Error fetching edit spec:', err));
    }
  }, [id, isEdit]);

  // Autogenerate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      );
    }
  };

  const handleAddPropRow = () => {
    setPropsList([...propsList, { name: '', type: 'string', default: '', description: '', required: false }]);
  };

  const handleRemovePropRow = (idx: number) => {
    setPropsList(propsList.filter((_, i) => i !== idx));
  };

  const handlePropChange = (idx: number, field: keyof PropDoc, value: any) => {
    const updated = [...propsList];
    updated[idx] = { ...updated[idx], [field]: value };
    setPropsList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !description || !category) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      name,
      slug,
      description,
      category,
      tags: tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
      dependencies: dependenciesInput.split(',').map((d) => d.trim()).filter((d) => d.length > 0),
      tier,
      thumbnailUrl,
      isPublished,
      componentCode,
      previewCode,
      usageCode,
      installCode: installCode || `npm install pratham-ui`,
      props: propsList.filter((p) => p.name.trim().length > 0),
    };

    try {
      const endpoint = isEdit ? `/api/admin/components/${id}` : '/api/admin/components';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        alert(isEdit ? 'Component updated successfully!' : 'Component assembled successfully!');
        navigate('/components');
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating component spec');
    }
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-5xl">
        {/* Header link back */}
        <div className="flex items-center gap-3">
          <Link to="/components" className="text-[#A8A9AD] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-marvel text-3xl font-extrabold text-white tracking-wider uppercase">
              {isEdit ? 'Upgrade Component Armor' : 'Assemble Component Suit'}
            </h1>
            <p className="text-xs text-[#A8A9AD] font-mono">Configure code repositories and props doc specs.</p>
          </div>
        </div>

        {/* Edit / Create Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Component Name */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Component Name (required)
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. MarvelButton"
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Slug (URL identifier)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. marvel-button"
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Subsystem Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                required
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tier Select */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Tier (License plan)
              </label>
              <div className="flex gap-4 items-center h-10">
                <label className="inline-flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="radio"
                    name="tier"
                    value="free"
                    checked={tier === 'free'}
                    onChange={() => setTier('free')}
                    className="accent-[#E62429]"
                  />
                  <span>Free Shield</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="radio"
                    name="tier"
                    value="pro"
                    checked={tier === 'pro'}
                    onChange={() => setTier('pro')}
                    className="accent-[#E62429]"
                  />
                  <span className="text-[#F0B90B] font-bold">Arc Pro</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Description (summary of component)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A description explaining the layout variants and animation states..."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white scrollbar"
                required
              />
            </div>

            {/* Tags (comma separated) */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="button, glow, framer-motion"
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              />
            </div>

            {/* Dependencies (comma separated) */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                External Dependencies (comma separated)
              </label>
              <input
                type="text"
                value={dependenciesInput}
                onChange={(e) => setDependenciesInput(e.target.value)}
                placeholder="framer-motion, lucide-react"
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              />
            </div>

            {/* Thumbnail URL */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Thumbnail Showcase Image URL
              </label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
              />
            </div>

            {/* Is Published Toggle */}
            <div className="md:col-span-2 flex items-center justify-between border-t border-white/5 pt-4">
              <div>
                <p className="text-xs font-bold text-white uppercase">Publish Component Status</p>
                <p className="text-[10px] text-[#A8A9AD] mt-0.5">Toggle whether this spec is visible in client component browsers.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`px-4 py-2 rounded font-mono text-xs font-bold uppercase cursor-pointer border transition-all duration-300 ${
                  isPublished
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : 'bg-white/5 text-[#A8A9AD] border-white/10'
                }`}
              >
                {isPublished ? 'PUBLISHED' : 'DRAFT MODE'}
              </button>
            </div>
          </div>

          {/* CODE SECTIONS (Monaco Editors) */}
          <div className="space-y-6 border-t border-white/5 pt-6 text-left">
            <h3 className="font-marvel text-lg font-bold text-white tracking-widest uppercase">
              Core Source Codes
            </h3>

            {/* Component Code Monaco */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Component React Source Code (TypeScript)
              </label>
              <div className="border border-white/10 rounded-lg overflow-hidden h-72">
                <Editor
                  height="100%"
                  language="typescript"
                  theme="vs-dark"
                  value={componentCode}
                  onChange={(val) => setComponentCode(val || '')}
                  options={{ minimap: { enabled: false }, fontSize: 11 }}
                />
              </div>
            </div>

            {/* Preview Code Monaco */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                Sandbox Demo Preview Code (runs inside live view panel)
              </label>
              <div className="border border-white/10 rounded-lg overflow-hidden h-56">
                <Editor
                  height="100%"
                  language="typescript"
                  theme="vs-dark"
                  value={previewCode}
                  onChange={(val) => setPreviewCode(val || '')}
                  options={{ minimap: { enabled: false }, fontSize: 11 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Usage Code Monaco */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                  Import + Basic Usage Example Snippet
                </label>
                <div className="border border-white/10 rounded-lg overflow-hidden h-40">
                  <Editor
                    height="100%"
                    language="typescript"
                    theme="vs-dark"
                    value={usageCode}
                    onChange={(val) => setUsageCode(val || '')}
                    options={{ minimap: { enabled: false }, fontSize: 11 }}
                  />
                </div>
              </div>

              {/* Install Code Monaco */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-[#A8A9AD] tracking-wider">
                  Install Command CLI instruction (defaults to 'npm install pratham-ui')
                </label>
                <div className="border border-white/10 rounded-lg overflow-hidden h-40">
                  <Editor
                    height="100%"
                    language="shell"
                    theme="vs-dark"
                    value={installCode}
                    onChange={(val) => setInstallCode(val || '')}
                    options={{ minimap: { enabled: false }, fontSize: 11 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC PROPS BUILDER */}
          <div className="space-y-4 border-t border-white/5 pt-6 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-marvel text-lg font-bold text-white tracking-widest uppercase">
                Props documentation builder
              </h3>
              <button
                type="button"
                onClick={handleAddPropRow}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E62429]/15 hover:bg-[#E62429]/25 border border-[#E62429]/30 text-[#E62429] hover:text-white rounded text-xs font-bold uppercase transition-all duration-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add parameter row
              </button>
            </div>

            {/* Table layout rows */}
            <div className="overflow-x-auto rounded-lg border border-white/5 scrollbar">
              <table className="min-w-full divide-y divide-white/5 text-xs text-left">
                <thead className="bg-[#0D0D0D] text-[#A8A9AD] uppercase font-bold tracking-wider font-mono">
                  <tr>
                    <th className="px-4 py-3">Prop Name</th>
                    <th className="px-4 py-3">Type syntax</th>
                    <th className="px-4 py-3">Default value</th>
                    <th className="px-4 py-3">Description doc</th>
                    <th className="px-4 py-3 text-center">Req.</th>
                    <th className="px-4 py-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0A0A0A]">
                  {propsList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-white/20">No parameter properties declared. Click add row to document properties.</td>
                    </tr>
                  ) : (
                    propsList.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => handlePropChange(idx, 'name', e.target.value)}
                            placeholder="e.g. variant"
                            className="w-full px-2 py-1.5 bg-[#141414] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={row.type}
                            onChange={(e) => handlePropChange(idx, 'type', e.target.value)}
                            placeholder="e.g. 'crimson' | 'gold'"
                            className="w-full px-2 py-1.5 bg-[#141414] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={row.default}
                            onChange={(e) => handlePropChange(idx, 'default', e.target.value)}
                            placeholder="e.g. 'crimson'"
                            className="w-full px-2 py-1.5 bg-[#141414] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) => handlePropChange(idx, 'description', e.target.value)}
                            placeholder="Controls reactor colors"
                            className="w-full px-2 py-1.5 bg-[#141414] border border-white/5 focus:border-[#E62429] focus:outline-none rounded text-xs text-white"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={row.required}
                            onChange={(e) => handlePropChange(idx, 'required', e.target.checked)}
                            className="w-4 h-4 accent-[#E62429] cursor-pointer"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemovePropRow(idx)}
                            className="p-1.5 bg-red-500/10 text-[#E62429] hover:bg-red-500/20 rounded cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Row */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Link to="/components">
              <MarvelButton variant="outline" type="button">
                Abort Changes
              </MarvelButton>
            </Link>
            <MarvelButton variant="crimson" type="submit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isEdit ? 'Verify Upgrade' : 'Authorize Blueprint'}</span>
            </MarvelButton>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default AddComponent;
