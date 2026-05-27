import React from 'react';

export const ArcReactorLoader: React.FC = () => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Outer Core Frame */}
      <div className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-[#E62429] animate-spin [animation-duration:1.5s]" />
      
      {/* Inner Chamber Rings */}
      <div className="absolute w-[80%] h-[80%] rounded-full border border-[#F0B90B]/20 border-b-[#F0B90B] animate-spin [animation-duration:3s] [animation-direction:reverse]" />
      
      {/* Arc Glow center */}
      <div className="w-6 h-6 rounded-full bg-cyan-400 opacity-80 shadow-[0_0_15px_#22d3ee] animate-pulse" />
      
      {/* HUD indicators radiating */}
      <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-[#E62429]/10 animate-pulse" />
    </div>
  );
};
export default ArcReactorLoader;
