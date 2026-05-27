import React from 'react';

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: 'red' | 'gold' | 'cyan';
  children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  glowColor = 'red',
  children,
  className = '',
  ...props
}) => {
  const glowStyles = {
    red: 'border-[#E62429] text-[#E62429] hover:bg-[#E62429] hover:text-white shadow-[inset_0_0_8px_rgba(230,36,41,0.2),0_0_12px_rgba(230,36,41,0.2)] hover:shadow-[0_0_25px_rgba(230,36,41,0.6)]',
    gold: 'border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B] hover:text-[#080808] shadow-[inset_0_0_8px_rgba(240,185,11,0.2),0_0_12px_rgba(240,185,11,0.2)] hover:shadow-[0_0_25px_rgba(240,185,11,0.6)]',
    cyan: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#080808] shadow-[inset_0_0_8px_rgba(34,211,238,0.2),0_0_12px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]',
  };

  return (
    <button
      className={`px-5 py-2 font-bold text-xs tracking-widest uppercase bg-transparent border rounded-md transition-all duration-300 transform active:scale-95 cursor-pointer ${glowStyles[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default NeonButton;
