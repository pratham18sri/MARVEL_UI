import React, { useState } from 'react';
import {
  MarvelButton,
  GlowButton,
  NeonButton,
  IconButton,
  MarvelCard,
  HeroCard,
  MarvelModal,
  ArcReactorLoader,
} from 'pratham-ui';
import { Sparkles, Terminal, Activity } from 'lucide-react';

export interface LivePreviewProps {
  slug: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ slug }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Interactive UI Render Registry
  const renderPreviewElement = () => {
    switch (slug) {
      case 'marvel-button':
        return (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <MarvelButton variant="crimson">Assemble Suit</MarvelButton>
            <MarvelButton variant="gold">Unchain Stones</MarvelButton>
            <MarvelButton variant="outline">Stand Down</MarvelButton>
          </div>
        );
      case 'glow-button':
        return (
          <div className="flex justify-center">
            <GlowButton>Initiate Jarvis Protocol</GlowButton>
          </div>
        );
      case 'neon-button':
        return (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <NeonButton glowColor="red">Crimson Laser</NeonButton>
            <NeonButton glowColor="gold">Gold Laser</NeonButton>
            <NeonButton glowColor="cyan">Tesseract Glow</NeonButton>
          </div>
        );
      case 'icon-button':
        return (
          <div className="flex gap-4 items-center justify-center">
            <IconButton icon={<Sparkles className="w-4 h-4" />} variant="gold">
              Assemble Suit
            </IconButton>
            <IconButton icon={<Terminal className="w-4 h-4" />} variant="outline">
              Suit Diagnostic
            </IconButton>
          </div>
        );
      case 'hero-card':
        return (
          <div className="w-full max-w-xs">
            <HeroCard
              title="Iron Legion"
              description="Automated protection suit configuration deployed by Stark Core."
              image="https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=400&q=80"
              badge="STARK SECURITY"
            />
          </div>
        );
      case 'marvel-card':
        return (
          <div className="w-full max-w-sm">
            <MarvelCard title="MARK LXXXV SUIT" subtitle="Stark Industries">
              <p className="text-xs text-[#A8A9AD] font-sans">
                Nano-particle structure utilizing heavy gold-titanium alloys. Complete with full integration of remote Arc Reactors and auxiliary Jarvis networks.
              </p>
              <div className="mt-4 flex gap-2">
                <MarvelButton variant="crimson" className="!px-3 !py-1 !text-[10px]">Deploy</MarvelButton>
                <MarvelButton variant="outline" className="!px-3 !py-1 !text-[10px]">Diagnostics</MarvelButton>
              </div>
            </MarvelCard>
          </div>
        );
      case 'arc-reactor-loader':
        return (
          <div className="flex flex-col items-center gap-4 justify-center py-6">
            <ArcReactorLoader />
            <span className="font-marvel text-xs tracking-widest text-[#E62429] uppercase animate-pulse">
              Reactor Charging...
            </span>
          </div>
        );
      case 'marvel-modal':
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <MarvelButton variant="crimson" onClick={() => setModalOpen(true)}>
              Test Modal Overlay
            </MarvelButton>
            <MarvelModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="LEVEL 7 DECRPYTION">
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-[#E62429] rounded text-xs font-mono">
                  🚨 SYSTEM DIRECTIVE: S.H.I.E.L.D security override active.
                </div>
                <p className="text-sm text-[#A8A9AD]">
                  This dialog represents a modal element styled using custom framer-motion transition springs.
                </p>
                <div className="flex justify-end gap-2">
                  <MarvelButton variant="outline" className="!py-1" onClick={() => setModalOpen(false)}>
                    Close
                  </MarvelButton>
                </div>
              </div>
            </MarvelModal>
          </div>
        );
      default:
        // Generic fallback previews
        return (
          <div className="flex flex-col items-center text-center p-6 text-[#A8A9AD] max-w-sm space-y-4">
            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase font-marvel tracking-widest text-white">Interactive Sandbox</p>
              <p className="text-xs mt-1 text-[#A8A9AD]">Component code is compiled. Download this module using the PrathamUI CLI to deploy locally.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-[250px] bg-[#0A0A0A] border border-white/5 rounded-lg flex items-center justify-center p-8 relative overflow-hidden bg-grid-pattern">
      {/* Background Matrix Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(230,36,41,0.08),rgba(255,255,255,0))]" />
      
      {/* Render Component */}
      <div className="relative z-10 w-full flex justify-center">
        {renderPreviewElement()}
      </div>
    </div>
  );
};
export default LivePreview;
