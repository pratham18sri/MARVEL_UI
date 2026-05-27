import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'crimson' | 'gold' | 'outline';
  children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'crimson',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "flex items-center gap-2 justify-center px-4 py-2 font-bold text-xs tracking-wider uppercase rounded-md transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none";
  
  const variants = {
    crimson: "bg-[#E62429] text-[#F5F5F5] hover:bg-[#B01C20] border border-transparent shadow-[0_0_10px_rgba(230,36,41,0.3)] hover:shadow-[0_0_20px_rgba(230,36,41,0.5)]",
    gold: "bg-[#F0B90B] text-[#080808] hover:bg-[#C99C0A] border border-transparent shadow-[0_0_10px_rgba(240,185,11,0.3)] hover:shadow-[0_0_20px_rgba(240,185,11,0.5)]",
    outline: "bg-transparent text-[#A8A9AD] border border-white/20 hover:text-white hover:border-[#E62429] hover:shadow-[0_0_10px_rgba(230,36,41,0.15)]"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center shrink-0">{icon}</span>
      {children && <span className="relative z-10">{children}</span>}
    </button>
  );
};
export default IconButton;
