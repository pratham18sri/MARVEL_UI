import React from 'react';

export interface HeroCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  description,
  image,
  badge,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative h-80 w-full rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[#E62429]/50 transition-all duration-500 shadow-lg ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Shadows Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent opacity-90 transition-opacity duration-300" />
      
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-[#E62429]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 bg-[#E62429] text-white text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-sm shadow-[0_0_10px_rgba(230,36,41,0.5)] z-20">
          {badge}
        </span>
      )}

      {/* Details content */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end z-10">
        <h4 className="font-marvel text-2xl font-bold tracking-wide uppercase text-white group-hover:text-[#F0B90B] transition-colors duration-300">
          {title}
        </h4>
        <p className="mt-2 text-sm text-[#A8A9AD] line-clamp-2 group-hover:text-white transition-colors duration-300">
          {description}
        </p>
        
        {/* Action arrow line */}
        <div className="mt-4 flex items-center gap-1 text-[#E62429] text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Inspect Interface <span>→</span>
        </div>
      </div>
    </div>
  );
};
export default HeroCard;
