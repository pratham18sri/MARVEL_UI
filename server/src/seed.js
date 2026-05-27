import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Component from './models/Component.js';
import User from './models/User.js';

dotenv.config();

const categoriesData = [
  { name: 'Buttons', slug: 'buttons', description: 'Interactive trigger units with vibranium responses and reactor glows.', icon: 'MousePointerClick', color: '#E62429', order: 1, isActive: true },
  { name: 'Cards', slug: 'cards', description: 'Data structures housed inside premium metallic frames and glass screens.', icon: 'Layout', color: '#F0B90B', order: 2, isActive: true },
  { name: 'Forms', slug: 'forms', description: 'Advanced query input systems designed for maximum precision.', icon: 'TextCursorInput', color: '#A8A9AD', order: 3, isActive: true },
  { name: 'Navigation', slug: 'navigation', description: 'Dynamic dashboard routing layouts to control your dashboard suit.', icon: 'Navigation', color: '#208080', order: 4, isActive: true },
  { name: 'Modals & Overlays', slug: 'modals-overlays', description: 'Quantum-tunneling panels and overlay prompt windows.', icon: 'Layers', color: '#8A2BE2', order: 5, isActive: true },
  { name: 'Data Display', slug: 'data-display', description: 'Showcase timelines and tables loaded with Jarvis log files.', icon: 'Database', color: '#00FF7F', order: 6, isActive: true },
  { name: 'Loaders', slug: 'loaders', description: 'Suit charge-up spinners and arc reactor power bars.', icon: 'Loader2', color: '#1E90FF', order: 7, isActive: true },
  { name: 'Effects', slug: 'effects', description: 'Holographic matrix particles, glowing headings, and floating grids.', icon: 'Sparkles', color: '#FF1493', order: 8, isActive: true },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing
    await Category.deleteMany({});
    await Component.deleteMany({});
    console.log('Cleared existing collections...');

    // Seed Categories
    const categoriesMap = {};
    for (const catData of categoriesData) {
      const cat = await Category.create(catData);
      categoriesMap[cat.slug] = cat._id;
    }
    console.log('Seeded Categories successfully!');

    // Seed Initial Components
    const componentsData = [
      {
        name: 'MarvelButton',
        slug: 'marvel-button',
        description: 'A performance button with Iron Man arc-reactor neon crimson glows and responsive tactile feedback.',
        category: categoriesMap['buttons'],
        tags: ['button', 'mcu', 'crimson', 'glow'],
        tier: 'free',
        previewCode: `import React from 'react';
import { MarvelButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-8 bg-[#0D0D0D]">
      <MarvelButton variant="crimson">Assemble Suit</MarvelButton>
      <MarvelButton variant="gold">Unchain Stones</MarvelButton>
      <MarvelButton variant="outline">Stand Down</MarvelButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';

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
  const baseStyle = "relative px-6 py-2.5 font-marvel font-bold text-sm tracking-wider uppercase rounded-md transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none";
  
  const variants = {
    crimson: "bg-[#E62429] text-[#F5F5F5] hover:bg-[#B01C20] border border-transparent shadow-[0_0_15px_rgba(230,36,41,0.4)] hover:shadow-[0_0_25px_rgba(230,36,41,0.65)]",
    gold: "bg-[#F0B90B] text-[#080808] hover:bg-[#C99C0A] border border-transparent shadow-[0_0_15px_rgba(240,185,11,0.4)] hover:shadow-[0_0_25px_rgba(240,185,11,0.65)]",
    outline: "bg-transparent text-[#A8A9AD] border border-white/20 hover:text-white hover:border-[#E62429] hover:shadow-[0_0_15px_rgba(230,36,41,0.2)]"
  };

  return (
    <button
      className={\`\${baseStyle} \${variants[variant]} \${className}\`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== 'outline' && (
        <span className="absolute inset-0 w-full h-full rounded-md bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </button>
  );
};`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { MarvelButton } from 'pratham-ui';\n\n<MarvelButton variant="crimson">Assemble</MarvelButton>`,
        dependencies: [],
        props: [
          { name: 'variant', type: "'crimson' | 'gold' | 'outline'", default: "'crimson'", description: 'Styling appearance variant preset', required: false },
          { name: 'children', type: 'React.ReactNode', default: '', description: 'Content of the button', required: true }
        ],
        thumbnailUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'GlowButton',
        slug: 'glow-button',
        description: 'A dynamic component containing a continuous running background neon border animation.',
        category: categoriesMap['buttons'],
        tags: ['button', 'glow', 'interactive', 'animations'],
        tier: 'free',
        previewCode: `import React from 'react';
import { GlowButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center items-center p-8 bg-[#0D0D0D]">
      <GlowButton>Initiate Jarvis Protocol</GlowButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GlowButton: React.FC<GlowButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={\`relative px-8 py-3 bg-[#0D0D0D] font-marvel font-bold text-sm tracking-wider uppercase text-[#F5F5F5] rounded-lg cursor-pointer overflow-hidden group border border-white/10 transition-all duration-300 \${className}\`}
      {...props}
    >
      {/* Glow Backing */}
      <span className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#E62429_0%,#F0B90B_50%,#E62429_100%)] animate-spin [animation-duration:4s] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Surface Overlay */}
      <span className="absolute inset-[2px] bg-[#141414] rounded-[6px]" />
      
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white">
        {children}
      </span>
    </button>
  );
};`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { GlowButton } from 'pratham-ui';\n\n<GlowButton>Initiate Jarvis</GlowButton>`,
        dependencies: [],
        props: [
          { name: 'children', type: 'React.ReactNode', default: '', description: 'Label context node', required: true }
        ],
        thumbnailUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'MarvelCard',
        slug: 'marvel-card',
        description: 'Vibranium card housing panels with angular HUD borders and dark grid overlays.',
        category: categoriesMap['cards'],
        tags: ['card', 'panel', 'hud', 'grid'],
        tier: 'free',
        previewCode: `import React from 'react';
import { MarvelCard } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="max-w-md mx-auto p-4 bg-[#0D0D0D]">
      <MarvelCard title="MARK LXXXV SUIT" subtitle="Stark Industries">
        <p className="text-sm text-[#A8A9AD] font-sans">
          Nano-particle structure utilizing heavy gold-titanium alloys. Complete with full integration of remote Arc Reactors and auxiliary Jarvis networks.
        </p>
      </MarvelCard>
    </div>
  );
}`,
        componentCode: `import React from 'react';

export interface MarvelCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const MarvelCard: React.FC<MarvelCardProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={\`relative bg-[#141414] border border-white/5 rounded-lg overflow-hidden p-6 group transition-all duration-300 hover:border-[#E62429]/40 hover:shadow-[0_0_20px_rgba(230,36,41,0.1)] \${className}\`}>
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
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { MarvelCard } from 'pratham-ui';\n\n<MarvelCard title="SUIT">Core specs...</MarvelCard>`,
        dependencies: [],
        props: [
          { name: 'title', type: 'string', default: '', description: 'Primary header title text', required: true },
          { name: 'subtitle', type: 'string', default: '', description: 'Accent metadata subtitle text', required: false },
          { name: 'children', type: 'React.ReactNode', default: '', description: 'Body markdown/nodes of the card container', required: true }
        ],
        thumbnailUrl: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'ArcReactorLoader',
        slug: 'arc-reactor-loader',
        description: 'An advanced animated Arc Reactor charger spinner (Premium Pro Component).',
        category: categoriesMap['loaders'],
        tags: ['loader', 'spinner', 'ironman', 'glow'],
        tier: 'pro',
        previewCode: `import React from 'react';
import { ArcReactorLoader } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0D0D0D] gap-4">
      <ArcReactorLoader />
      <span className="font-marvel text-xs tracking-widest text-[#E62429] uppercase animate-pulse">Charging Core...</span>
    </div>
  );
}`,
        componentCode: `import React from 'react';

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
};`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { ArcReactorLoader } from 'pratham-ui';\n\n<ArcReactorLoader />`,
        dependencies: [],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'MarvelModal',
        slug: 'marvel-modal',
        description: 'Premium animated overlay dialog screen with dynamic entrance effects.',
        category: categoriesMap['modals-overlays'],
        tags: ['modal', 'dialog', 'overlay', 'framer-motion'],
        tier: 'pro',
        previewCode: `import React, { useState } from 'react';
import { MarvelModal, MarvelButton } from 'pratham-ui';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center p-8 bg-[#0D0D0D]">
      <MarvelButton variant="crimson" onClick={() => setOpen(true)}>Open Shield Dialog</MarvelButton>
      <MarvelModal isOpen={open} onClose={() => setOpen(false)} title="CLASSIFIED DOSSIER">
        <div className="space-y-4">
          <p className="text-sm text-[#A8A9AD]">This action is protected by Level 7 clearance protocols. Any unauthorised replication of contents will trigger instant shutdown.</p>
          <div className="flex justify-end gap-2">
            <MarvelButton variant="outline" onClick={() => setOpen(false)}>Acknowledge</MarvelButton>
          </div>
        </div>
      </MarvelModal>
    </div>
  );
}`,
        componentCode: `import React from 'react';
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

          {/* Modal Suit Container */}
          <motion.div
            className="relative bg-[#1A1A1A] border border-[#E62429]/30 rounded-lg max-w-lg w-full overflow-hidden shadow-[0_0_35px_rgba(230,36,41,0.2)]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#E62429]" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#E62429]" />
            
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
};`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { MarvelModal } from 'pratham-ui';\n\n<MarvelModal isOpen={open} onClose={() => setOpen(false)} title="Title">Data...</MarvelModal>`,
        dependencies: ['framer-motion'],
        props: [
          { name: 'isOpen', type: 'boolean', default: '', description: 'Triggers rendering visibility', required: true },
          { name: 'onClose', type: '() => void', default: '', description: 'Triggered upon closing background or cross', required: true },
          { name: 'title', type: 'string', default: '', description: 'Header text context title', required: true },
          { name: 'children', type: 'React.ReactNode', default: '', description: 'Inner components', required: true }
        ],
        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
        isPublished: true,
      }
    ];

    for (const compData of componentsData) {
      await Component.create(compData);
    }
    console.log('Seeded Components successfully!');

    // Create an Admin user to log in right away if needed
    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@prathamui.com' },
      {
        name: 'TONY STARK',
        email: 'admin@prathamui.com',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=tony-stark',
        provider: 'local',
        providerId: 'mock_stark_admin_1',
        role: 'admin',
        plan: 'pro',
        subscriptionStatus: 'active',
      },
      { upsert: true, new: true }
    );
    console.log(`Created admin user with credentials: admin@prathamui.com (API key: ${adminUser.apiKey})`);

    // Create a regular user
    const normalUser = await User.findOneAndUpdate(
      { email: 'user@prathamui.com' },
      {
        name: 'PETER PARKER',
        email: 'user@prathamui.com',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=peter-parker',
        provider: 'local',
        providerId: 'mock_parker_user_1',
        role: 'user',
        plan: 'free',
        subscriptionStatus: 'none',
      },
      { upsert: true, new: true }
    );
    console.log(`Created normal user with credentials: user@prathamui.com (API key: ${normalUser.apiKey})`);

    mongoose.disconnect();
    console.log('Seeding completed. Disconnected from DB.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
