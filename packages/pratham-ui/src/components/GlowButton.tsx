import React from 'react';

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GlowButton: React.FC<GlowButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`relative px-8 py-3 bg-[#0D0D0D] font-bold text-sm tracking-wider uppercase text-[#F5F5F5] rounded-lg cursor-pointer overflow-hidden group border border-white/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Glow Conic Spinner */}
      <span className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#E62429_0%,#F0B90B_50%,#E62429_100%)] animate-spin [animation-duration:4s] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Surface Overlay */}
      <span className="absolute inset-[2px] bg-[#141414] rounded-[6px]" />
      
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white">
        {children}
      </span>
    </button>
  );
};
export default GlowButton;
