import React from 'react';

export interface MarvelCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const MarvelCard: React.FC<MarvelCardProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`relative bg-[#141414] border border-white/5 rounded-lg overflow-hidden p-6 group transition-all duration-300 hover:border-[#E62429]/40 hover:shadow-[0_0_20px_rgba(230,36,41,0.1)] ${className}`}>
      {/* Corner HUD Angular Borders */}
      <div className="absolute top-0 left-0 w-4 h-[1px] bg-[#E62429] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-[1px] h-4 bg-[#E62429] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-[#F0B90B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-[#F0B90B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="mb-4">
        <h4 className="font-marvel text-lg font-bold text-[#F5F5F5] tracking-wide uppercase group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        {subtitle && (
          <span className="font-marvel text-xs text-[#F0B90B]/80 font-semibold tracking-widest uppercase">
            {subtitle}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative z-10 text-sm text-[#A8A9AD] leading-relaxed">
        {children}
      </div>
    </div>
  );
};
export default MarvelCard;
