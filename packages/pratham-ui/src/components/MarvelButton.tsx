import React from 'react';

export interface MarvelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'crimson' | 'gold' | 'outline';
  children: React.ReactNode;
}

export const MarvelButton: React.FC<MarvelButtonProps> = ({
  variant = 'crimson',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "relative px-6 py-2.5 font-sans font-bold text-sm tracking-wider uppercase rounded-md transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none flex items-center justify-center gap-2";
  
  const variants = {
    crimson: "bg-[#E62429] text-[#F5F5F5] hover:bg-[#B01C20] border border-transparent shadow-[0_0_15px_rgba(230,36,41,0.4)] hover:shadow-[0_0_25px_rgba(230,36,41,0.65)]",
    gold: "bg-[#F0B90B] text-[#080808] hover:bg-[#C99C0A] border border-transparent shadow-[0_0_15px_rgba(240,185,11,0.4)] hover:shadow-[0_0_25px_rgba(240,185,11,0.65)]",
    outline: "bg-transparent text-[#A8A9AD] border border-white/20 hover:text-white hover:border-[#E62429] hover:shadow-[0_0_15px_rgba(230,36,41,0.2)]"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== 'outline' && (
        <span className="absolute inset-0 w-full h-full rounded-md bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </button>
  );
};
export default MarvelButton;
