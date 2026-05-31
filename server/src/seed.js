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
      },
      {
        name: 'ConicGlowButton',
        slug: 'conic-glow-button',
        description: 'A styled-components button with a conic gradient border rotating hue animation on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","conic","gradient","animation","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { ConicGlowButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <ConicGlowButton>Hover me!</ConicGlowButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface ConicGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ConicGlowButton: React.FC<ConicGlowButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button {...props}>{children || 'Hover me!'}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  button {
   --border-radius: 15px;
   --border-width: 4px;
   appearance: none;
   position: relative;
   padding: 1em 2em;
   border: 0;
   background-color: #212121;
   font-family: "Roboto", Arial, "Segoe UI", sans-serif;
   font-size: 18px;
   font-weight: 500;
   color: #fff;
   z-index: 2;
   cursor: pointer;
  }

  button::after {
   --m-i: linear-gradient(#000, #000);
   --m-o: content-box, padding-box;
   content: "";
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   padding: var(--border-width);
   border-radius: var(--border-radius);
   background-image: conic-gradient(
  		#488cfb,
  		#29dbbc,
  		#ddf505,
  		#ff9f0e,
  		#e440bb,
  		#655adc,
  		#488cfb
  	);
   -webkit-mask-image: var(--m-i), var(--m-i);
   mask-image: var(--m-i), var(--m-i);
   -webkit-mask-origin: var(--m-o);
   mask-origin: var(--m-o);
   -webkit-mask-clip: var(--m-o);
   mask-composite: exclude;
   -webkit-mask-composite: destination-out;
   filter: hue-rotate(0);
   animation: rotate-hue linear 500ms infinite;
   animation-play-state: paused;
  }

  button:hover::after {
   animation-play-state: running;
  }

  @keyframes rotate-hue {
   to {
    filter: hue-rotate(1turn);
   }
  }

  button,
  button::after {
   box-sizing: border-box;
  }

  button:active {
   --border-width: 5px;
  }\`;

export default ConicGlowButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { ConicGlowButton } from 'pratham-ui';

<ConicGlowButton>Hover me!</ConicGlowButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'SlideUpDownButton',
        slug: 'slide-up-down-button',
        description: 'A sliding animation button revealing secondary confirmation text on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","slide","transition","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { SlideUpDownButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <SlideUpDownButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface SlideUpDownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hoverText?: string;
  hoverEmoji?: string;
  thanksText?: string;
  thanksEmoji?: string;
}

export const SlideUpDownButton: React.FC<SlideUpDownButtonProps> = ({
  hoverText = 'Hover Me',
  hoverEmoji = ':)',
  thanksText = 'Thanks',
  thanksEmoji = ':D',
  ...props
}) => {
  return (
    <StyledWrapper>
      <button {...props}>
        <div>
          <span>
            <p>{hoverText}</p><p>{hoverEmoji}</p>
          </span>
        </div>
        <div>
          <span>
            <p>{thanksText}</p><p>{thanksEmoji}</p>
          </span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  button {
   outline: 0;
   border: 0;
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width: 140px;
   height: 50px;
   border-radius: 0.5em;
   box-shadow: 0 0.625em 1em 0 rgba(30, 143, 255, 0.35);
   overflow: hidden;
   cursor: pointer;
  }

  button div {
   transform: translateY(0px);
   width: 100%;
  }

  button,
  button div {
   transition: 0.6s cubic-bezier(.16,1,.3,1);
  }

  button div span {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 50px;
   padding: 0.75em 1.125em;
  }

  button div:nth-child(1) {
   background-color: #1e90ff;
  }

  button div:nth-child(2) {
   background-color: #21dc62;
  }

  button:hover {
   box-shadow: 0 0.625em 1em 0 rgba(33, 220, 98, 0.35);
  }

  button:hover div {
   transform: translateY(-50px);
  }

  button p {
   font-size: 17px;
   font-weight: bold;
   color: #ffffff;
   margin: 0;
  }

  button:active {
   transform: scale(0.95);
  }\`;

export default SlideUpDownButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { SlideUpDownButton } from 'pratham-ui';

<SlideUpDownButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'SkewFillButton',
        slug: 'skew-fill-button',
        description: 'An elegant button featuring a skewed shape mask that fills the background from left to right on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","skew","transition","hover","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { SkewFillButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <SkewFillButton>Hover me</SkewFillButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface SkewFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SkewFillButton: React.FC<SkewFillButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button className="button" {...props}>{children || 'Hover me'}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .button {
    padding: 1em 2em;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 5px;
    text-transform: uppercase;
    cursor: pointer;
    color: #2c9caf;
    transition: all 1000ms;
    font-size: 15px;
    position: relative;
    overflow: hidden;
    outline: 2px solid #2c9caf;
    background: transparent;
  }

  button:hover {
    color: #ffffff;
    transform: scale(1.1);
    outline: 2px solid #70bdca;
    box-shadow: 4px 5px 17px -4px #268391;
  }

  button::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #2c9caf;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }

  button:hover::before {
    width: 250%;
  }\`;

export default SkewFillButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { SkewFillButton } from 'pratham-ui';

<SkewFillButton>Hover me</SkewFillButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'RetroRoundButton',
        slug: 'retro-round-button',
        description: 'A circular 3D push button styled in vintage pink/red neon shades.',
        category: categoriesMap['buttons'],
        tags: ["button","circular","retro","push","styled-components"],
        tier: 'pro',
        previewCode: `import React from 'react';
import { RetroRoundButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center gap-4 p-8 bg-[#0D0D0D]">
      <RetroRoundButton>⚡</RetroRoundButton>
      <RetroRoundButton>★</RetroRoundButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface RetroRoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const RetroRoundButton: React.FC<RetroRoundButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button className="btn-class-name" {...props}>
        <span className="back" />
        <span className="front">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .btn-class-name {
    --primary: 255, 90, 120;
    --secondary: 150, 50, 60;
    width: 60px;
    height: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    outline: 10px solid rgb(var(--primary), .5);
    border-radius: 100%;
    position: relative;
    transition: .3s;
    background: transparent;
  }

  .btn-class-name .back {
    background: rgb(var(--secondary));
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .btn-class-name .front {
    background: linear-gradient(0deg, rgba(var(--primary), .6) 20%, rgba(var(--primary)) 50%);
    box-shadow: 0 .5em 1em -0.2em rgba(var(--secondary), .5);
    border-radius: 100%;
    position: absolute;
    border: 1px solid rgb(var(--secondary));
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: inherit;
    transform: translateY(-15%);
    transition: .15s;
    color: rgb(var(--secondary));
  }

  .btn-class-name:active .front {
    transform: translateY(0%);
    box-shadow: 0 0;
  }\`;

export default RetroRoundButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { RetroRoundButton } from 'pratham-ui';

<RetroRoundButton>⚡</RetroRoundButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'PixelPushButton',
        slug: 'pixel-push-button',
        description: 'Retro 8-bit style pixelated push button with active charge animations.',
        category: categoriesMap['buttons'],
        tags: ["button","pixel","retro","push","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { PixelPushButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <PixelPushButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface PixelPushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PixelPushButton: React.FC<PixelPushButtonProps> = (props) => {
  return (
    <StyledWrapper>
      <div className="button">
        <button name="checkbox" type="button" {...props} />
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .button {
    --stone-50: #fafaf9;
    --stone-800: #292524;
    --yellow-300: #fde047;
    --yellow-400: #facc15;
    --yellow-500: #eab308;
    --black-25: rgba(0, 0, 0, 0.25);

    position: relative;
    display: block;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    & > button {
      cursor: pointer;
      display: inline-block;
      height: 100%;
      width: 100%;
      appearance: none;
      border: 2px solid var(--stone-800);
      border-radius: 0.25rem;
      background-color: var(--yellow-400);
      outline: 2px solid transparent;
      outline-offset: 2px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--yellow-300);
      }

      &:checked {
        background-color: var(--stone-800);
        border-color: var(--stone-800);

        &:hover {
          background-color: #44403c;
        }
      }

      &:active {
        outline-color: var(--stone-800);
      }

      &:focus-visible {
        outline-color: var(--stone-800);
        outline-style: dashed;
      }
    }

    & > span:nth-child(2) {
      position: absolute;
      inset: 3px;
      pointer-events: none;
      background-color: var(--yellow-400);
      border-bottom: 2px solid var(--black-25);
      transition: transform 75ms;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
            rgb(255 255 255 / 80%) 20%,
            transparent 20%
          ),
          radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
        background-position:
          0 0,
          4px 4px;
        background-size: 8px 8px;
        mix-blend-mode: hard-light;
        opacity: 0.5;
        animation: dots 0.5s infinite linear;
      }
    }

    & > span:nth-child(3) {
      position: absolute;
      pointer-events: none;
      inset: 0;

      &::before {
        content: "";
        width: 0.375rem;
        height: 0.375rem;
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        background-color: var(--stone-800);
        border-radius: 0.125rem;
        box-shadow:
          3.125em 0 var(--stone-800),
          0 3.125em var(--stone-800),
          3.125em 3.125em var(--stone-800);
      }
    }

    & > span:nth-child(4) {
      position: absolute;
      pointer-events: none;
      inset: 0;
      filter: drop-shadow(0.25em 0.25em 0 rgba(0, 0, 0, 0.2));
      transition: all 75ms;

      &::after {
        content: "";
        width: 0.25rem;
        height: 0.25rem;
        position: absolute;
        top: 0.875rem;
        left: 1rem;
        border-radius: 0.0625px;
        background-color: var(--stone-800);
        box-shadow:
          0.75em 2em var(--stone-800),
          1em 2em var(--stone-800),
          0.75em 1.75em var(--stone-800),
          1em 1.75em var(--stone-800),
          0.75em 1.25em var(--stone-800),
          1em 1.25em var(--stone-800),
          0.75em 1em var(--stone-800),
          1em 1em var(--stone-800),
          1em 0.75em var(--stone-800),
          1.5em 0.75em var(--stone-800),
          1.25em 0.75em var(--stone-800),
          1.25em -0.25em var(--stone-800),
          1.5em 0em var(--stone-800),
          1.25em 0.5em var(--stone-800),
          1.5em 0.5em var(--stone-800),
          1.25em 0.25em var(--stone-800),
          1.5em 0.25em var(--stone-800),
          1.25em 0 var(--stone-800),
          1em -0.25em var(--stone-800),
          0.75em -0.25em var(--stone-800),
          0.5em -0.25em var(--stone-800),
          0.25em -0.25em var(--stone-800),
          0.25em 0 var(--stone-800),
          0 0.25em var(--stone-800),
          0 0.5em var(--stone-800),
          0.25em 0.25em var(--stone-800),
          0.25em 0.5em var(--stone-800);
      }
    }

    & > span:nth-child(5) {
      position: absolute;
      background-color: var(--yellow-400);
      border: 2px solid var(--stone-800);
      border-radius: 0.75rem;
      pointer-events: none;
      z-index: -1;
      inset: 0.5rem 1.5rem;
      box-shadow:
        7px 0 0 0 var(--stone-800),
        inset 0 2px 0 0 var(--yellow-300),
        inset 0 -2px 0 0 var(--yellow-500);
      transition: all 0ms cubic-bezier(0, 0.5, 0.4, 1);
    }

    & button:active ~ span:nth-child(5) {
      transform: translateY(-200%);
      transition-duration: 200ms;
      opacity: 0;
    }

    & button:hover ~ span:nth-child(4) {
      filter: drop-shadow(0.125em 0.125em 0 rgba(0, 0, 0, 0.2));
    }
  }

  @keyframes dots {
    0% {
      background-position:
        0 0,
        4px 4px;
    }
    100% {
      background-position:
        8px 0,
        12px 4px;
    }
  }

  @media (prefers-color-scheme: dark) {
    .button {
      & button:active,
      & button:focus-visible {
        outline-color: var(--yellow-400);
      }
    }
  }\`;

export default PixelPushButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { PixelPushButton } from 'pratham-ui';

<PixelPushButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'SocialTooltipButton',
        slug: 'social-tooltip-button',
        description: 'A set of social connection buttons with custom tooltips sliding upwards on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","social","tooltip","icons","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { SocialTooltipButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <SocialTooltipButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface SocialTooltipButtonProps {
  onClickFacebook?: () => void;
  onClickTwitter?: () => void;
  onClickInstagram?: () => void;
}

export const SocialTooltipButton: React.FC<SocialTooltipButtonProps> = ({
  onClickFacebook,
  onClickTwitter,
  onClickInstagram,
}) => {
  return (
    <StyledWrapper>
      <ul className="wrapper">
        <li className="icon facebook" onClick={onClickFacebook}>
          <span className="tooltip">Facebook</span>
          <svg viewBox="0 0 320 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
          </svg>
        </li>
        <li className="icon twitter" onClick={onClickTwitter}>
          <span className="tooltip">Twitter</span>
          <svg height="1.8em" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="twitter">
            <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" />
          </svg>
        </li>
        <li className="icon instagram" onClick={onClickInstagram}>
          <span className="tooltip">Instagram</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
          </svg>
        </li>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .wrapper {
    display: inline-flex;
    list-style: none;
    height: 120px;
    width: 100%;
    padding-top: 40px;
    font-family: "Poppins", sans-serif;
    justify-content: center;
  }

  .wrapper .icon {
    position: relative;
    background: #fff;
    border-radius: 50%;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }

  .wrapper .facebook:hover,
  .wrapper .facebook:hover .tooltip,
  .wrapper .facebook:hover .tooltip::before {
    background: #1877f2;
    color: #fff;
  }

  .wrapper .twitter:hover,
  .wrapper .twitter:hover .tooltip,
  .wrapper .twitter:hover .tooltip::before {
    background: #1da1f2;
    color: #fff;
  }

  .wrapper .instagram:hover,
  .wrapper .instagram:hover .tooltip,
  .wrapper .instagram:hover .tooltip::before {
    background: #e4405f;
    color: #fff;
  }\`;

export default SocialTooltipButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { SocialTooltipButton } from 'pratham-ui';

<SocialTooltipButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'WaveFillButton',
        slug: 'wave-fill-button',
        description: 'A sleek custom hover wave button filling background with smooth curves.',
        category: categoriesMap['buttons'],
        tags: ["button","wave","curves","hover","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { WaveFillButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <WaveFillButton>Get in touch</WaveFillButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface WaveFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const WaveFillButton: React.FC<WaveFillButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button className="button" {...props}>{children || 'Get in touch'}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .button {
    display: inline-block;
    padding: 12px 24px;
    border: 1px solid #4f4f4f;
    border-radius: 4px;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    font-size: 19px;
    cursor: pointer;
    color: white; /* Adapted to white since standard theme is dark, original black would be invisible */
    background: transparent;
    z-index: 1;
  }

  .button:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .button:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #39bda7;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .button:hover {
    color: #ffffff;
    border: 1px solid #39bda7;
  }

  .button:hover:before {
    top: -35%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  .button:hover:after {
    top: -45%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }\`;

export default WaveFillButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { WaveFillButton } from 'pratham-ui';

<WaveFillButton>Get in touch</WaveFillButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'IsometricCubeButton',
        slug: 'isometric-cube-button',
        description: 'A 3D retro-futuristic isometric cube block button styled in metallic gold.',
        category: categoriesMap['buttons'],
        tags: ["button","isometric","3d","gold","styled-components"],
        tier: 'pro',
        previewCode: `import React from 'react';
import { IsometricCubeButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <IsometricCubeButton>Hover Me</IsometricCubeButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface IsometricCubeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const IsometricCubeButton: React.FC<IsometricCubeButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button className="btn cube cube-hover" type="button" {...props}>
        <div className="bg-top">
          <div className="bg-inner" />
        </div>
        <div className="bg-right">
          <div className="bg-inner" />
        </div>
        <div className="bg">
          <div className="bg-inner" />
        </div>
        <div className="text">{children || 'Hover Me'}</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .btn {
    display: block;
    padding: 0.7em 1em;
    background: transparent;
    outline: none;
    border: 0;
    color: #d4af37;
    letter-spacing: 0.1em;
    font-family: monospace;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1;
  }

  .cube {
    position: relative;
    transition: all 0.5s;
  }

  .cube .bg-top {
    position: absolute;
    height: 10px;
    background: #d4af37;
    bottom: 100%;
    left: 5px;
    right: -5px;
    transform: skew(-45deg, 0);
    margin: 0;
    transition: all 0.4s;
  }

  .cube .bg-top .bg-inner {
    bottom: 0;
  }

  .cube .bg {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #d4af37;
    transition: all 0.4s;
  }

  .cube .bg-right {
    position: absolute;
    background: #d4af37;
    top: -5px;
    z-index: 0;
    bottom: 5px;
    width: 10px;
    left: 100%;
    transform: skew(0, -45deg);
    transition: all 0.4s;
  }

  .cube .bg-right .bg-inner {
    left: 0;
  }

  .cube .bg-inner {
    background: #28282d;
    position: absolute;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
  }

  .cube .text {
    position: relative;
    transition: all 0.4s;
  }

  .cube:hover .bg-inner {
    background: #d4af37;
    transition: all 0.4s;
  }

  .cube:hover .text {
    color: #28282d;
    transition: all 0.4s;
  }

  .cube:hover .bg-right,
  .cube:hover .bg,
  .cube:hover .bg-top {
    background: #28282d;
  }

  .cube:active {
    z-index: 9999;
    animation: bounce 0.1s linear;
  }

  @keyframes bounce {
    50% {
      transform: scale(0.9);
    }
  }\`;

export default IsometricCubeButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { IsometricCubeButton } from 'pratham-ui';

<IsometricCubeButton>Hover Me</IsometricCubeButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'TeenageEngineeringButtons',
        slug: 'teenage-engineering-buttons',
        description: 'Reproduction of Teenage Engineering EP-133 K.O. II retro keycaps and hardware button panels.',
        category: categoriesMap['buttons'],
        tags: ["button","retro","hardware","teenage-engineering","styled-components"],
        tier: 'pro',
        previewCode: `import React from 'react';
import { TeenageEngineeringButtons } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <TeenageEngineeringButtons />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface TeenageEngineeringButtonsProps {
  onMinusClick?: () => void;
  onPlusClick?: () => void;
  onRecordClick?: () => void;
  onPlayClick?: () => void;
}

export const TeenageEngineeringButtons: React.FC<TeenageEngineeringButtonsProps> = ({
  onMinusClick,
  onPlusClick,
  onRecordClick,
  onPlayClick,
}) => {
  return (
    <StyledWrapper>
      <div className="main">
        <div className="buttons">
          <div className="button_pair">
            <div className="btn">
              <button className="button1" onClick={onMinusClick}>
                <svg viewBox="0 -960 960 960" className="svg1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M200-440v-80h560v80H200Z" />
                </svg>
              </button>
            </div>
            <div className="btn">
              <button className="button2" onClick={onPlusClick}>
                <svg viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg" className="svg2">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="button_pair">
            <div className="btn">
              <button className="button3" onClick={onRecordClick}>
                <span className="button_text">RECORD</span>
              </button>
            </div>
            <div className="btn">
              <button className="button4" onClick={onPlayClick}>
                <span className="button_text">PLAY</span>
              </button>
            </div>
          </div>
        </div>
        <div className="text">Teenage Engineering [EP-133 K.O. II] - Buttons</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  /* Teenage Engineering [EP-133 K.O. II] - Buttons */

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1.25em;
    color: #c7c3c0;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    row-gap: 1.5em;
  }
  .button_pair {
    display: flex;
    column-gap: 1.5em;
  }
  .button_pair1 {
    display: flex;
    flex-direction: column;
    row-gap: 0.9em;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5em;
    height: 5em;
    background-color: #171717;
    border-radius: 5px;
  }

  .button1 {
    width: 5.7em;
    height: 5.7em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #c7c3c0;
    box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
      #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.1s ease-in-out;
  }
  .button2 {
    width: 5.7em;
    height: 5.7em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #c7c3c0;
    box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
      #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.1s ease-in-out;
  }
  .svg1 {
    fill: #5f5f5f;
    width: 25px;
    height: 25px;
    transition: 0.1s ease-in-out;
  }
  .svg2 {
    fill: #5f5f5f;
    width: 25px;
    height: 25px;
    transition: 0.1s ease-in-out;
  }

  .button3 {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 5.7em;
    height: 5.7em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #d42a02;
    box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px, #fb702c 2px 2px 10px 0px inset,
      #d42a02 -4px -4px 1px 0px inset;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.1s ease-in-out;
  }
  .button4 {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 5.7em;
    height: 5.7em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #545251;
    box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
      #a8a6a4 1.5px 1.5px 1px 0px inset, #545251 -3.2px -3.2px 8px 0px inset;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.1s ease-in-out;
  }

  .button_text {
    color: white;
    padding-top: 0.9em;
    letter-spacing: 0.075em;
    font-size: 0.85em;
    transition: 0.1s ease-in-out;
  }

  .text {
    font-family: Montserrat;
    text-align: center;
    font-size: 0.65em;
  }

  .button1:active,
  .button2:active {
    box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
      #c7c3c0 -3.2px -3.2px 8px 0px inset;
  }
  .button1:active .svg1,
  .button2:active .svg2 {
    scale: 0.95;
  }
  .button3:active {
    box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
      #d42a02 -3.2px -3.2px 8px 0px inset;
  }
  .button3:active .button_text {
    transform: translateY(0.5px);
  }
  .button4:active {
    box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
      #545251 -3.2px -3.2px 8px 0px inset;
  }
  .button4:active .button_text {
    transform: translateY(0.5px);
  }\`;

export default TeenageEngineeringButtons;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { TeenageEngineeringButtons } from 'pratham-ui';

<TeenageEngineeringButtons />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
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
