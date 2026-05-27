import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useComponentStore } from '../store/componentStore';
import LivePreview from '../components/LivePreview';
import CodePreview from '../components/CodePreview';
import { GlowButton, MarvelButton } from 'pratham-ui';
import { Terminal, Copy, Check, Lock, Box, Cpu, CheckCircle2 } from 'lucide-react';

export const ComponentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentComponent, loading, error, fetchComponentDetail, incrementView, incrementCopy } = useComponentStore();
  
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props' | 'examples'>('preview');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchComponentDetail(slug);
      incrementView(slug);
    }
  }, [slug, fetchComponentDetail, incrementView]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <ArcReactorLoaderCircle />
        <span className="font-marvel text-xs tracking-widest text-[#A8A9AD] uppercase animate-pulse">Scanning Suit Spec...</span>
      </div>
    );
  }

  if (error || !currentComponent) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-[#A8A9AD]">
        <span className="text-4xl text-[#E62429] font-bold font-marvel tracking-widest uppercase mb-2">ERROR 404</span>
        <p className="text-sm">Component code reference not resolved in archives.</p>
        <Link to="/components" className="mt-6">
          <MarvelButton variant="outline">Back to Catalog</MarvelButton>
        </Link>
      </div>
    );
  }

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(currentComponent.installCode || `npm install pratham-ui`);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
      incrementCopy(currentComponent.slug);
    } catch (e) {}
  };

  const handleCopyUsage = async () => {
    try {
      await navigator.clipboard.writeText(currentComponent.usageCode);
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Breadcrumb path */}
      <div className="text-xs text-[#A8A9AD] font-mono uppercase mb-4 flex items-center gap-2">
        <Link to="/components" className="hover:text-white transition-colors">COMPONENTS</Link>
        <span>/</span>
        <span className="text-[#E62429]">{currentComponent.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Details and Tabbed Panels (8 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header Specs */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="font-marvel text-4xl font-extrabold text-white tracking-wide uppercase">
                {currentComponent.name}
              </h1>
              <span className={`text-[10px] px-2.5 py-0.5 rounded font-extrabold tracking-widest uppercase border ${
                currentComponent.tier === 'pro'
                  ? 'bg-[#F0B90B]/10 border-[#F0B90B]/30 text-[#F0B90B] shadow-[0_0_8px_rgba(240,185,11,0.15)]'
                  : 'bg-white/10 border-white/20 text-[#A8A9AD]'
              }`}>
                {currentComponent.tier}
              </span>
            </div>
            <p className="text-[#A8A9AD] text-sm max-w-2xl font-sans leading-relaxed">
              {currentComponent.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentComponent.tags?.map((t, i) => (
                <span key={i} className="text-[10px] font-mono bg-white/5 text-[#A8A9AD] px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal installation command row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch bg-[#141414] border border-white/5 rounded-xl p-3">
            <div className="flex-1 flex items-center gap-3 font-mono text-xs text-[#A8A9AD] bg-[#0A0A0A] px-4 py-2.5 rounded-lg select-all overflow-x-auto border border-black scrollbar">
              <Terminal className="w-4 h-4 text-[#E62429] shrink-0" />
              <span>{currentComponent.installCode || `npm install pratham-ui`}</span>
            </div>
            <button
              onClick={handleCopyInstall}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E62429] hover:bg-[#B01C20] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {copiedInstall ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedInstall ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Main Display Area (Tabs) */}
          <div className="border border-white/5 rounded-xl bg-[#141414] overflow-hidden shadow-lg relative">
            {/* Tabs top headers bar */}
            <div className="flex border-b border-white/5 bg-[#0D0D0D]">
              {(['preview', 'code', 'props', 'examples'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? 'border-[#E62429] text-white bg-[#141414]'
                      : 'border-transparent text-[#A8A9AD] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content box */}
            <div className="p-6 min-h-[300px] relative">
              {/* Lock Pro Gate overlay */}
              {currentComponent.isLocked && (
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/70 flex flex-col items-center justify-center text-center p-6 border border-white/10 rounded-xl">
                  <Lock className="w-12 h-12 text-[#F0B90B] mb-3 animate-pulse drop-shadow-[0_0_15px_rgba(240,185,11,0.4)]" />
                  <h3 className="font-marvel text-2xl font-bold text-white tracking-widest uppercase mb-1">
                    PRO ARCHIVE LOCKED
                  </h3>
                  <p className="text-xs text-[#A8A9AD] max-w-xs mb-6">
                    This is a premium M.C.U component. Upgrade to Arc Pro to access interactive code views, custom props tables, and CLI downloads.
                  </p>
                  <Link to="/pricing">
                    <GlowButton>Unlock Access</GlowButton>
                  </Link>
                </div>
              )}

              {/* Tab render details */}
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <LivePreview slug={currentComponent.slug} />
                </div>
              )}

              {activeTab === 'code' && !currentComponent.isLocked && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-mono text-[#A8A9AD] uppercase tracking-wider">Source Code (TypeScript Component)</h4>
                  <CodePreview code={currentComponent.componentCode} />
                </div>
              )}

              {activeTab === 'props' && !currentComponent.isLocked && (
                <div className="overflow-x-auto rounded-lg border border-white/5 scrollbar">
                  <table className="min-w-full divide-y divide-white/5 text-left text-xs font-sans">
                    <thead className="bg-[#0D0D0D] font-marvel font-bold text-[#F5F5F5] uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Prop Name</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Default</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3 text-center">Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#111] text-[#A8A9AD]">
                      {currentComponent.props?.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-6 text-center text-white/20">No component parameters documented.</td>
                        </tr>
                      ) : (
                        currentComponent.props?.map((p, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-white">{p.name}</td>
                            <td className="px-4 py-3 font-mono text-[#F0B90B]">{p.type}</td>
                            <td className="px-4 py-3 font-mono">{p.default || '-'}</td>
                            <td className="px-4 py-3">{p.description}</td>
                            <td className="px-4 py-3 text-center">
                              {p.required ? (
                                <span className="inline-block px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold font-mono text-[9px]">YES</span>
                              ) : (
                                <span className="text-white/20">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'examples' && !currentComponent.isLocked && (
                <div className="space-y-6">
                  {/* Basic usage example code snippet */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold font-mono text-[#A8A9AD] uppercase tracking-wider">Usage Blueprint</h4>
                      <button
                        onClick={handleCopyUsage}
                        className="flex items-center gap-1 text-xs text-[#E62429] hover:text-[#B01C20] font-bold cursor-pointer"
                      >
                        {copiedUsage ? <CheckCircle2 className="w-3.5 h-3.5 text-[#F0B90B]" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedUsage ? 'Copied' : 'Copy import'}
                      </button>
                    </div>
                    <CodePreview code={currentComponent.usageCode} />
                  </div>

                  {/* Render preview previewCode code view as a mockup example */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold font-mono text-[#A8A9AD] uppercase tracking-wider">Full Page Assembly Example</h4>
                    <CodePreview code={currentComponent.previewCode} />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Sidebar Info (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dependencies list panel */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-5 shadow-md">
            <h3 className="font-marvel text-sm font-bold text-white tracking-wider uppercase border-b border-white/5 pb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#E62429]" />
              Dependencies Required
            </h3>
            <div className="mt-4 space-y-2">
              {currentComponent.dependencies?.length === 0 ? (
                <p className="text-xs text-white/30 font-mono">Zero auxiliary packages required. Ready to plug and play.</p>
              ) : (
                currentComponent.dependencies?.map((dep, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#A8A9AD] bg-[#0D0D0D] border border-white/5 p-2 rounded-lg">
                    <Box className="w-3.5 h-3.5 text-[#F0B90B]" />
                    <span>{dep}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* S.H.I.E.L.D level authorization security briefing */}
          <div className="bg-gradient-to-br from-[#E62429]/10 to-transparent border border-[#E62429]/20 rounded-xl p-5 text-xs text-[#A8A9AD] space-y-2 font-mono relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 opacity-10 bg-[#E62429] rotate-45 translate-x-3 -translate-y-3" />
            <h4 className="text-white font-bold font-marvel tracking-widest uppercase">SECURITY TELEMETRY</h4>
            <p>Component is registered. Downloads compiled on verified S.H.I.E.L.D key. Access via terminal is protected.</p>
            <p className="text-[10px] text-[#A8A9AD]/70">SHA256: {Math.random().toString(36).substring(7).toUpperCase()}...</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Mini internal placeholder reactor loading spinner helper
const ArcReactorLoaderCircle = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-[#E62429] animate-spin" />
      <div className="absolute w-[80%] h-[80%] rounded-full border border-cyan-400/30 animate-pulse" />
    </div>
  );
};
export default ComponentDetail;
