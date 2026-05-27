import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MarvelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const MarvelModal: React.FC<MarvelModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Containment */}
          <motion.div
            className="relative bg-[#1A1A1A] border border-[#E62429]/30 rounded-lg max-w-lg w-full overflow-hidden shadow-[0_0_35px_rgba(230,36,41,0.25)] z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Top Glowing HUD Trim Line */}
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#E62429]" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#E62429]" />
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#F0B90B]" />
            <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#F0B90B]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-[#141414]">
              <h3 className="font-marvel text-lg font-bold tracking-widest text-white uppercase">{title}</h3>
              <button 
                onClick={onClose} 
                className="text-[#A8A9AD] hover:text-white cursor-pointer transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default MarvelModal;
