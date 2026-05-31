import React from 'react';
import { Link } from 'react-router-dom';
import { UIComponent } from '../store/componentStore';
import { Eye, Copy, Lock, ShieldAlert } from 'lucide-react';
import {
  MarvelButton,
  GlowButton,
  ArcReactorLoader,
  ConicGlowButton,
  SlideUpDownButton,
  SkewFillButton,
  RetroRoundButton,
  PixelPushButton,
  SocialTooltipButton,
  WaveFillButton,
  IsometricCubeButton,
  TeenageEngineeringButtons,
  MicrosoftBrutalistButton,
  RetroPlayNowButton,
  ShadowOffsetBoxButton,
  PurpleSlideFillButton,
  HoverScaleCircleButton,
  TooltipDownloadButton,
  SocialGridHoverButton,
  BookmarkSlideButton,
  SpaciousAIButton,
  ExploreGreenButton,
  LetsGoArrowButton,
} from 'pratham-ui';

export interface ComponentCardProps {
  component: UIComponent;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  // Render interactive representative preview
  const renderMiniPreview = () => {
    switch (component.slug) {
      case 'marvel-button':
        return (
          <div className="scale-75 flex gap-2">
            <MarvelButton variant="crimson">Assemble</MarvelButton>
          </div>
        );
      case 'glow-button':
        return (
          <div className="scale-75">
            <GlowButton>Charge Core</GlowButton>
          </div>
        );
      case 'conic-glow-button':
        return (
          <div className="scale-75">
            <ConicGlowButton>Hover me!</ConicGlowButton>
          </div>
        );
      case 'slide-up-down-button':
        return (
          <div className="scale-75">
            <SlideUpDownButton />
          </div>
        );
      case 'skew-fill-button':
        return (
          <div className="scale-75">
            <SkewFillButton>Hover me</SkewFillButton>
          </div>
        );
      case 'retro-round-button':
        return (
          <div className="scale-75 flex gap-2">
            <RetroRoundButton>⚡</RetroRoundButton>
            <RetroRoundButton>★</RetroRoundButton>
          </div>
        );
      case 'pixel-push-button':
        return (
          <div className="scale-75">
            <PixelPushButton />
          </div>
        );
      case 'social-tooltip-button':
        return (
          <div className="scale-75">
            <SocialTooltipButton />
          </div>
        );
      case 'wave-fill-button':
        return (
          <div className="scale-75">
            <WaveFillButton>Get in touch</WaveFillButton>
          </div>
        );
      case 'isometric-cube-button':
        return (
          <div className="scale-50 translate-y-[-10px]">
            <IsometricCubeButton>Hover Me</IsometricCubeButton>
          </div>
        );
      case 'teenage-engineering-buttons':
        return (
          <div className="scale-[0.45] origin-center">
            <TeenageEngineeringButtons />
          </div>
        );
      case 'microsoft-brutalist-button':
        return (
          <div className="scale-75">
            <MicrosoftBrutalistButton />
          </div>
        );
      case 'retro-play-now-button':
        return (
          <div className="scale-[0.65]">
            <RetroPlayNowButton />
          </div>
        );
      case 'shadow-offset-box-button':
        return (
          <div className="scale-75">
            <ShadowOffsetBoxButton />
          </div>
        );
      case 'purple-slide-fill-button':
        return (
          <div className="scale-75">
            <PurpleSlideFillButton>Hover me</PurpleSlideFillButton>
          </div>
        );
      case 'hover-scale-circle-button':
        return (
          <div className="scale-75">
            <HoverScaleCircleButton>Hello</HoverScaleCircleButton>
          </div>
        );
      case 'tooltip-download-button':
        return (
          <div className="scale-[0.65]">
            <TooltipDownloadButton />
          </div>
        );
      case 'social-grid-hover-button':
        return (
          <div className="scale-[0.45] origin-center">
            <SocialGridHoverButton />
          </div>
        );
      case 'bookmark-slide-button':
        return (
          <div className="scale-[0.65]">
            <BookmarkSlideButton />
          </div>
        );
      case 'spacious-ai-button':
        return (
          <div className="scale-75">
            <SpaciousAIButton />
          </div>
        );
      case 'explore-green-button':
        return (
          <div className="scale-75">
            <ExploreGreenButton />
          </div>
        );
      case 'lets-go-arrow-button':
        return (
          <div className="scale-75">
            <LetsGoArrowButton />
          </div>
        );
      case 'marvel-card':
        return (
          <div className="w-full max-w-[140px] border border-white/10 rounded p-2 text-left bg-white/5">
            <div className="h-1.5 w-8 bg-[#E62429] rounded mb-1" />
            <div className="h-1 w-12 bg-white/40 rounded mb-2" />
            <div className="h-1 w-full bg-white/10 rounded mb-1" />
            <div className="h-1 w-[80%] bg-white/10 rounded" />
          </div>
        );
      case 'arc-reactor-loader':
        return (
          <div className="scale-75">
            <ArcReactorLoader />
          </div>
        );
      case 'marvel-modal':
        return (
          <div className="relative w-28 h-20 bg-white/5 border border-white/10 rounded p-1.5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <div className="h-1.5 w-8 bg-white/30 rounded" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E62429]" />
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-white/10 rounded" />
              <div className="h-1 w-[60%] bg-white/10 rounded" />
            </div>
            <div className="flex justify-end gap-1 scale-75 origin-bottom-right">
              <div className="h-2 w-5 bg-white/20 rounded" />
            </div>
          </div>
        );
      default:
        // Render fallback thumbnail or card graphic
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {component.thumbnailUrl ? (
              <img
                src={component.thumbnailUrl}
                alt={component.name}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
              />
            ) : (
              <div className="flex flex-col items-center text-white/20">
                <ShieldAlert className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-mono tracking-widest uppercase">HUD PREVIEW</span>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Link
      to={`/components/${component.slug}`}
      className="group relative bg-[#141414] border border-white/5 hover:border-[#E62429]/40 rounded-xl p-5 flex flex-col justify-between h-72 shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,36,41,0.15)] overflow-hidden"
    >
      {/* HUD corner design cuts */}
      <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#E62429] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#E62429] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#F0B90B] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-[#F0B90B] opacity-0 group-hover:opacity-100 transition-all duration-300" />

      {/* Grid Header */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-marvel text-lg font-bold text-[#F5F5F5] group-hover:text-white uppercase tracking-wide transition-colors duration-300">
            {component.name}
          </h4>
          <span
            className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ backgroundColor: `${component.category?.color || '#E62429'}15`, color: component.category?.color || '#E62429' }}
          >
            {component.category?.name}
          </span>
        </div>

        {component.tier === 'pro' ? (
          <span className="flex items-center gap-1 bg-[#F0B90B]/10 border border-[#F0B90B]/30 text-[#F0B90B] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-[0_0_8px_rgba(240,185,11,0.15)]">
            <Lock className="w-2.5 h-2.5" />
            PRO
          </span>
        ) : (
          <span className="bg-white/10 text-[#A8A9AD] text-[9px] font-bold uppercase px-2 py-0.5 rounded">
            FREE
          </span>
        )}
      </div>

      {/* Mini Interactive Preview Area */}
      <div className="h-32 my-3 rounded-lg bg-[#0D0D0D] border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/10 transition-all duration-300">
        {renderMiniPreview()}
      </div>

      {/* Grid Footer telemetry counts */}
      <div className="flex justify-between items-center text-[10px] text-[#A8A9AD] font-mono border-t border-white/5 pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {component.viewCount}
          </span>
          <span className="flex items-center gap-1">
            <Copy className="w-3.5 h-3.5" />
            {component.copyCount}
          </span>
        </div>
        <span className="text-[#E62429] font-bold group-hover:translate-x-1 transition-transform duration-300">
          DEPLOY →
        </span>
      </div>
    </Link>
  );
};
export default ComponentCard;
