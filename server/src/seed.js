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
      },
      {
        name: 'MicrosoftBrutalistButton',
        slug: 'microsoft-brutalist-button',
        description: 'A brutalist style button styled with Microsoft corporate colors and a skewed text/rotate icon grid.',
        category: categoriesMap['buttons'],
        tags: ["button","brutalist","microsoft","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { MicrosoftBrutalistButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <MicrosoftBrutalistButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface MicrosoftBrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const MicrosoftBrutalistButton: React.FC<MicrosoftBrutalistButtonProps> = ({ className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={\`brutalist-button \${className}\`} {...props}>
        <div className="ms-logo">
          <div className="ms-logo-square" />
          <div className="ms-logo-square" />
          <div className="ms-logo-square" />
          <div className="ms-logo-square" />
        </div>
        <div className="button-text">
          <span>Get it from</span>
          <span>Microsoft</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .brutalist-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 169px;
    height: 60px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: Arial, sans-serif;
    font-weight: bold;
    border: 3px solid #fff;
    outline: 3px solid #000;
    box-shadow: 6px 6px 0 #00a4ef;
    transition: all 0.1s ease-out;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .brutalist-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    z-index: 1;
    transition: none;
    /* Initially hide the pseudo-element */
    opacity: 0;
  }

  @keyframes slide {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  .brutalist-button:hover::before {
    /* Show the pseudo-element on hover */
    opacity: 1;
    animation: slide 2s infinite;
  }

  .brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 #000;
    background-color: #000;
    color: #fff;
  }

  .brutalist-button:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0 #00a4ef;
    background-color: #fff;
    color: #000;
    border-color: #000;
  }

  .ms-logo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    width: 26px;
    height: 26px;
    margin-right: 8px;
    flex-shrink: 0;
    transition: transform 0.2s ease-out;
    position: relative;
    z-index: 1;
  }

  .brutalist-button:hover .ms-logo {
    transform: rotate(-10deg) scale(1.1);
  }

  .brutalist-button:active .ms-logo {
    transform: rotate(10deg) scale(0.9);
  }

  .ms-logo-square {
    width: 100%;
    height: 100%;
  }

  .ms-logo-square:nth-child(1) {
    background-color: #f25022;
  }
  .ms-logo-square:nth-child(2) {
    background-color: #7fba00;
  }
  .ms-logo-square:nth-child(3) {
    background-color: #00a4ef;
  }
  .ms-logo-square:nth-child(4) {
    background-color: #ffb900;
  }

  .button-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    transition: transform 0.2s ease-out;
    position: relative;
    z-index: 1;
  }

  .brutalist-button:hover .button-text {
    transform: skew(-5deg);
  }

  .brutalist-button:active .button-text {
    transform: skew(5deg);
  }

  .button-text span:first-child {
    font-size: 11px;
    text-transform: uppercase;
  }

  .button-text span:last-child {
    font-size: 16px;
    text-transform: uppercase;
  }
\`;

export default MicrosoftBrutalistButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { MicrosoftBrutalistButton } from 'pratham-ui';

<MicrosoftBrutalistButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1625014020973-1129b15a1990?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'RetroPlayNowButton',
        slug: 'retro-play-now-button',
        description: 'A round retro yellow game button displaying the play logo with hover translations.',
        category: categoriesMap['buttons'],
        tags: ["button","retro","play","yellow","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { RetroPlayNowButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <RetroPlayNowButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface RetroPlayNowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const RetroPlayNowButton: React.FC<RetroPlayNowButtonProps> = ({ className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={className} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
          <rect width={36} height={36} x={0} y={0} fill="#fdd835" />
          <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z" />
          <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z" />
          <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z" />
          <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z" />
          <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z" />
          <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z" />
          <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z" />
          <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z" />
        </svg>
        <span className="now">now!</span>
        <span className="play">play</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 15px;
    color: white;
    text-shadow: 2px 2px rgb(116, 116, 116);
    text-transform: uppercase;
    cursor: pointer;
    border: solid 2px black;
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 17px;
    background-color: hsl(49deg 98% 60%);
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
    height: 50px;
    min-width: 140px;
  }

  button:active {
    transform: scale(0.9);
    transition: all 100ms ease;
  }

  button svg {
    transition: all 0.5s ease;
    z-index: 2;
  }

  .play {
    transition: all 0.5s ease;
    transition-delay: 300ms;
  }

  button:hover svg {
    transform: scale(3) translate(50%);
  }

  .now {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    transition: all 0.5s ease;
    z-index: 2;
  }

  button:hover .now {
    transform: translateX(10px);
    transition-delay: 300ms;
  }

  button:hover .play {
    transform: translateX(200%);
    transition-delay: 300ms;
  }
\`;

export default RetroPlayNowButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { RetroPlayNowButton } from 'pratham-ui';

<RetroPlayNowButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'ShadowOffsetBoxButton',
        slug: 'shadow-offset-box-button',
        description: 'A retro box push down button with black borders and offset shadow translations.',
        category: categoriesMap['buttons'],
        tags: ["button","retro","shadow","active","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { ShadowOffsetBoxButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <ShadowOffsetBoxButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface ShadowOffsetBoxButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ShadowOffsetBoxButton: React.FC<ShadowOffsetBoxButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <div className={\`box-button \${className}\`} {...props}>
        <div className="button"><span>{children || 'Button'}</span></div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .box-button {
    cursor: pointer;
    border: 4px solid black;
    background-color: gray;
    padding-bottom: 10px;
    transition: 0.1s ease-in-out;
    user-select: none;
    display: inline-block;
  }

  .button {
    background-color: #dddddd;
    border: 4px solid #fff;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button span {
    font-size: 1.2em;
    letter-spacing: 1px;
    color: black;
    font-weight: bold;
  }

  .box-button:active {
    padding: 0;
    margin-bottom: 10px;
    transform: translateY(10px);
  }
\`;

export default ShadowOffsetBoxButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { ShadowOffsetBoxButton } from 'pratham-ui';

<ShadowOffsetBoxButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'PurpleSlideFillButton',
        slug: 'purple-slide-fill-button',
        description: 'A smooth sliding purple-filled rounded button with circular background transitions.',
        category: categoriesMap['buttons'],
        tags: ["button","purple","slide","transition","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { PurpleSlideFillButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <PurpleSlideFillButton>Hover me</PurpleSlideFillButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface PurpleSlideFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const PurpleSlideFillButton: React.FC<PurpleSlideFillButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={className} {...props}>{children || 'Hover me'}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  button {
    --color: #560bad;
    font-family: inherit;
    display: inline-block;
    width: 8em;
    height: 2.6em;
    line-height: 2.5em;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: var(--color);
    background-color: transparent;
    padding: 0;
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover {
    color: #fff;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: #3a0ca3;
    transition: background 0s;
  }
\`;

export default PurpleSlideFillButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { PurpleSlideFillButton } from 'pratham-ui';

<PurpleSlideFillButton>Hover me</PurpleSlideFillButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'HoverScaleCircleButton',
        slug: 'hover-scale-circle-button',
        description: 'A minimalistic button expanding a background circle on hover with active shadow glows.',
        category: categoriesMap['buttons'],
        tags: ["button","scale","circle","hover","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { HoverScaleCircleButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <HoverScaleCircleButton>Hello</HoverScaleCircleButton>
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface HoverScaleCircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const HoverScaleCircleButton: React.FC<HoverScaleCircleButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={\`button type1 \${className}\`} {...props}>
        <span className="btn-txt">{children || 'Hello'}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .button {
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #252525;
    overflow: hidden;
    border-radius: 30px;
    color: #333;
    transition: all 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-txt {
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
    color: #333;
    transition: color 0.5s ease-in-out;
  }

  .button:hover .btn-txt {
    color: #fff;
  }

  .type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s ease-in-out;
    background-color: #333;
    border-radius: 30px;
    visibility: hidden;
    height: 10px;
    width: 10px;
    z-index: -1;
  }

  .button:hover {
    box-shadow: 1px 1px 200px #252525;
    border: none;
  }

  .type1:hover::after {
    visibility: visible;
    transform: scale(100) translateX(2px);
  }
\`;

export default HoverScaleCircleButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { HoverScaleCircleButton } from 'pratham-ui';

<HoverScaleCircleButton>Hello</HoverScaleCircleButton>`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'TooltipDownloadButton',
        slug: 'tooltip-download-button',
        description: 'A modern blue download button showing size tooltips and icon slide animations on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","download","tooltip","blue","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { TooltipDownloadButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <TooltipDownloadButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface TooltipDownloadButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  tooltipText?: string;
  buttonText?: string;
}

export const TooltipDownloadButton: React.FC<TooltipDownloadButtonProps> = ({
  tooltipText = 'Size: 20Mb',
  buttonText = 'Download',
  className = '',
  ...props
}) => {
  return (
    <StyledWrapper>
      <div className={\`button \${className}\`} data-tooltip={tooltipText} {...props}>
        <div className="button-wrapper">
          <div className="text">{buttonText}</div>
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" /></svg>
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .button {
    --width: 100px;
    --height: 35px;
    --tooltip-height: 35px;
    --tooltip-width: 90px;
    --gap-between-tooltip-to-button: 18px;
    --button-color: #1163ff;
    --tooltip-color: #fff;
    width: var(--width);
    height: var(--height);
    background: var(--button-color);
    position: relative;
    text-align: center;
    border-radius: 0.45em;
    font-family: "Arial";
    transition: background 0.3s;
    cursor: pointer;
  }

  .button::before {
    position: absolute;
    content: attr(data-tooltip);
    width: var(--tooltip-width);
    height: var(--tooltip-height);
    background-color: var(--tooltip-color);
    font-size: 0.9rem;
    color: #111;
    border-radius: .25em;
    line-height: var(--tooltip-height);
    bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
    left: calc(50% - var(--tooltip-width) / 2);
  }

  .button::after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: var(--tooltip-color);
    left: calc(50% - 10px);
    bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
  }

  .button::after,.button::before {
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
    pointer-events: none;
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-wrapper,.text,.icon {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    color: #fff;
  }

  .text {
    top: 0
  }

  .text,.icon {
    transition: top 0.5s;
  }

  .icon {
    color: #fff;
    top: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon svg {
    width: 24px;
    height: 24px;
  }

  .button:hover {
    background: #6c18ff;
  }

  .button:hover .text {
    top: -100%;
  }

  .button:hover .icon {
    top: 0;
  }

  .button:hover:before,.button:hover:after {
    opacity: 1;
    visibility: visible;
  }

  .button:hover:after {
    bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
  }

  .button:hover:before {
    bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
  }
\`;

export default TooltipDownloadButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { TooltipDownloadButton } from 'pratham-ui';

<TooltipDownloadButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'SocialGridHoverButton',
        slug: 'social-grid-hover-button',
        description: 'A social connection layout grid revealing 9 platforms on hover with beautiful gradients.',
        category: categoriesMap['buttons'],
        tags: ["button","social","grid","hover","styled-components"],
        tier: 'pro',
        previewCode: `import React from 'react';
import { SocialGridHoverButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <SocialGridHoverButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface SocialGridHoverButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SocialGridHoverButton: React.FC<SocialGridHoverButtonProps> = ({ className = '', ...props }) => {
  return (
    <StyledWrapper>
      <div className={\`main \${className}\`} {...props}>
        <div className="card">
          <svg fillRule="nonzero" height="30px" width="30px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="instagram">
            <g strokeDashoffset={0} strokeMiterlimit={10} strokeLinejoin="miter" strokeLinecap="butt" strokeWidth={1} stroke="none" fillRule="nonzero">
              <g transform="scale(8,8)">
                <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" />
              </g>
            </g>
          </svg>
        </div>
        <div className="card">
          <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="twitter">
            <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" />
          </svg>
        </div>
        <div className="card">
          <svg height="30px" width="30px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="dribble">
            <path d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z" />
            <path d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z" fill="#ea4c89" />
            <path d="M28.352 36.914c0 0-3.032-21.087-15.63-34.292M1.269 17.848c0 0 24.2 2.117 32.075-11.102M7.804 34.152c0 0 8.624-19.807 31.058-12.194" strokeMiterlimit={10} stroke="#ea4c89" fill="none" />
          </svg>
        </div>
        <div className="card">
          <svg height="30px" width="30px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="codepen">
            <path d="M 25 4 L 4 17.34375 L 4 32.652344 L 25 46 L 46 32.65625 L 46 17.34375 Z M 25 29.183594 L 19.066406 25.070313 L 25 21.023438 L 30.933594 25.070313 Z M 27 17.605469 L 27 9.949219 L 40.429688 18.484375 L 34.410156 22.65625 Z M 23 17.605469 L 15.589844 22.65625 L 9.570313 18.484375 L 23 9.949219 Z M 12.09375 25.042969 L 8 27.832031 L 8 22.203125 Z M 15.570313 27.453125 L 23 32.605469 L 23 40.050781 L 9.589844 31.527344 Z M 27 32.605469 L 34.429688 27.453125 L 40.410156 31.527344 L 27 40.050781 Z M 37.90625 25.042969 L 42 22.203125 L 42 27.832031 Z" />
          </svg>
        </div>
        <div className="card">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="23px" width="23px" className="uiverse">
            <path fill="url(#paint0_linear_501_142)" d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 37.241 47.2863 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z" />
            <path fill="url(#paint1_linear_501_142)" d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z" />
            <path fill="url(#paint2_linear_501_142)" d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1={0} x1={0} id="paint0_linear_501_142">
                <stop stopColor="#BF66FF" />
                <stop stopColor="#6248FF" offset="0.510417" />
                <stop stopColor="#00DDEB" offset={1} />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1={0} x1={0} id="paint1_linear_501_142">
                <stop stopColor="#BF66FF" />
                <stop stopColor="#6248FF" offset="0.510417" />
                <stop stopColor="#00DDEB" offset={1} />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1={0} x1={0} id="paint2_linear_501_142">
                <stop stopColor="#BF66FF" />
                <stop stopColor="#6248FF" offset="0.510417" />
                <stop stopColor="#00DDEB" offset={1} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="card">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px" className="discord">
            <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z" />
          </svg>
        </div>
        <div className="card">
          <svg height="30px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="github">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
          </svg>
        </div>
        <div className="card">
          <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="telegram">
            <path d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
            <path d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" fill="#fff" />
            <path d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" fill="#b0bec5" />
            <path d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" fill="#cfd8dc" />
          </svg>
        </div>
        <div className="card">
          <svg xmlSpace="preserve" viewBox="0 0 256 256" height={30} width={30} version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="reddit">
            <defs />
            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" style={{stroke: 'none', borderRadius: '50%', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1}}>
              <circle transform="matrix(1 0 0 1 0 0)" style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} r={45} cy={45} cx={45} />
              <path strokeLinecap="round" transform="matrix(1 0 0 1 0 0)" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1}} d="M 75.011 45 c -0.134 -3.624 -3.177 -6.454 -6.812 -6.331 c -1.611 0.056 -3.143 0.716 -4.306 1.823 c -5.123 -3.49 -11.141 -5.403 -17.327 -5.537 l 2.919 -14.038 l 9.631 2.025 c 0.268 2.472 2.483 4.262 4.955 3.993 c 2.472 -0.268 4.262 -2.483 3.993 -4.955 s -2.483 -4.262 -4.955 -3.993 c -1.421 0.145 -2.696 0.973 -3.4 2.204 L 48.68 17.987 c -0.749 -0.168 -1.499 0.302 -1.667 1.063 c 0 0.011 0 0.011 0 0.022 l -3.322 15.615 c -6.264 0.101 -12.36 2.025 -17.55 5.537 c -2.64 -2.483 -6.801 -2.36 -9.284 0.291 c -2.483 2.64 -2.36 6.801 0.291 9.284 c 0.515 0.481 1.107 0.895 1.767 1.186 c -0.045 0.66 -0.045 1.32 0 1.98 c 0 10.078 11.745 18.277 26.23 18.277 c 14.485 0 26.23 -8.188 26.23 -18.277 c 0.045 -0.66 0.045 -1.32 0 -1.98 C 73.635 49.855 75.056 47.528 75.011 45 z M 30.011 49.508 c 0 -2.483 2.025 -4.508 4.508 -4.508 c 2.483 0 4.508 2.025 4.508 4.508 s -2.025 4.508 -4.508 4.508 C 32.025 53.993 30.011 51.991 30.011 49.508 z M 56.152 62.058 v -0.179 c -3.199 2.405 -7.114 3.635 -11.119 3.468 c -4.005 0.168 -7.919 -1.063 -11.119 -3.468 c -0.425 -0.515 -0.347 -1.286 0.168 -1.711 c 0.447 -0.369 1.085 -0.369 1.544 0 c 2.707 1.98 6.007 2.987 9.362 2.83 c 3.356 0.179 6.667 -0.783 9.407 -2.74 c 0.492 -0.481 1.297 -0.47 1.779 0.022 C 56.655 60.772 56.644 61.577 56.152 62.058 z M 55.537 54.34 c -0.078 0 -0.145 0 -0.224 0 l 0.034 -0.168 c -2.483 0 -4.508 -2.025 -4.508 -4.508 s 2.025 -4.508 4.508 -4.508 s 4.508 2.025 4.508 4.508 C 59.955 52.148 58.02 54.239 55.537 54.34 z" />
            </g>
          </svg>
        </div>
        <p className="text">HOVER<br /><br />FOR<br /><br />SOCIAL</p>
        <div className="main_back" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .main_back {
    position: absolute;
    border-radius: 10px;
    transform: rotate(90deg);
    width: 11em;
    height: 11em;
    background: linear-gradient(270deg, #03a9f4, #cc39a4, #ffb5d2);
    z-index: -2;
    box-shadow: inset 0px 0px 180px 5px #ffffff;
  }

  .main {
    display: flex;
    flex-wrap: wrap;
    width: 14em;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-top-left-radius: 10px;
    background: lightgrey;
    transition: 0.4s ease-in-out, 0.2s background-color ease-in-out,
      0.2s background-image ease-in-out;
    background: rgba(255, 255, 255, 0.596);
    backdrop-filter: blur(5px);
    border: 1px solid transparent;
    -webkit-backdrop-filter: blur(5px);
  }

  .card .instagram {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: #cc39a4;
  }

  .card:nth-child(2) {
    border-radius: 0px;
  }

  .card:nth-child(2) .twitter {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: #03a9f4;
  }

  .card:nth-child(3) {
    border-top-right-radius: 10px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(3) .dribble {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: #ffb5d2;
  }

  .card:nth-child(4) {
    border-radius: 0px;
  }

  .card:nth-child(4) .codepen {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: black;
  }

  .card:nth-child(5) {
    border-radius: 0px;
  }

  .card:nth-child(5) .uiverse {
    position: absolute;
    margin-left: 0.2em;
    margin-top: 0.2em;
    opacity: 0;
    transition: 0.2s ease-in-out;
  }

  .card:nth-child(6) {
    border-radius: 0px;
  }

  .card:nth-child(6) .discord {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: #8c9eff;
  }

  .card:nth-child(7) {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(7) .github {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: black;
  }

  .card:nth-child(8) {
    border-radius: 0px;
  }

  .card:nth-child(8) .telegram {
    opacity: 0;
    transition: 0.2s ease-in-out;
    fill: #29b6f6;
  }

  .card:nth-child(9) {
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(9) .reddit {
    opacity: 0;
    transition: 0.2s ease-in-out;
  }

  .main:hover {
    width: 14em;
    cursor: pointer;
  }

  .main:hover .main_back {
    opacity: 0;
  }

  .main:hover .card {
    margin: 0.2em;
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }

  .main:hover .card:nth-child(5) {
    border: transparent;
  }

  .main:hover .text {
    opacity: 0;
    z-index: -3;
  }

  .main:hover .instagram {
    opacity: 1;
  }

  .main:hover .twitter {
    opacity: 1;
  }

  .main:hover .dribble {
    opacity: 1;
  }

  .main:hover .codepen {
    opacity: 1;
  }

  .main:hover .uiverse {
    opacity: 1;
  }

  .main:hover .discord {
    opacity: 1;
  }

  .main:hover .github {
    opacity: 1;
  }

  .main:hover .telegram {
    opacity: 1;
  }

  .main:hover .reddit {
    opacity: 1;
  }

  .card:nth-child(1):hover {
    background-color: #cc39a4;
  }

  .card:nth-child(1):hover .instagram {
    fill: white;
  }

  .card:nth-child(2):hover {
    background-color: #03a9f4;
  }

  .card:nth-child(2):hover .twitter {
    fill: white;
  }

  .card:nth-child(3):hover {
    background-color: #ffb5d2;
  }

  .card:nth-child(3):hover .dribble {
    fill: white;
  }

  .card:nth-child(4):hover {
    background-color: #1e1f26;
  }

  .card:nth-child(4):hover .codepen {
    fill: white;
  }

  .card:nth-child(5):hover {
    animation: backgroundIMG 0.1s;
    animation-fill-mode: forwards;
  }

  .card:nth-child(5):hover .uiverse #paint0_linear_501_142 stop {
    stop-color: white;
  }

  .card:nth-child(5):hover .uiverse #paint1_linear_501_142 stop {
    stop-color: white;
  }

  .card:nth-child(5):hover .uiverse #paint2_linear_501_142 stop {
    stop-color: white;
  }

  @keyframes backgroundIMG {
    100% {
      background-image: linear-gradient(#bf66ff, #6248ff, #00ddeb);
    }
  }

  .card:nth-child(6):hover {
    background-color: #8c9eff;
  }

  .card:nth-child(6):hover .discord {
    fill: white;
  }

  .card:nth-child(7):hover {
    background-color: black;
  }

  .card:nth-child(7):hover .github {
    fill: white;
  }

  .card:nth-child(8):hover {
    background-color: #29b6f6;
  }

  .card:nth-child(8):hover .telegram > path:nth-of-type(1) {
    fill: white;
  }

  .card:nth-child(8):hover .telegram > path:nth-of-type(2) {
    fill: #29b6f6;
  }

  .card:nth-child(8):hover .telegram > path:nth-of-type(3) {
    fill: #29b6f6;
  }

  .card:nth-child(9):hover {
    background-color: rgb(255, 69, 0);
  }

  .card:nth-child(9) .reddit > g circle {
    fill: rgb(255, 69, 0);
  }

  .card:nth-child(9) .reddit > g path {
    fill: white;
  }

  .text {
    position: absolute;
    font-size: 0.7em;
    transition: 0.4s ease-in-out;
    color: black;
    text-align: center;
    font-weight: bold;
    letter-spacing: 0.33em;
    z-index: 3;
  }
\`;

export default SocialGridHoverButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { SocialGridHoverButton } from 'pratham-ui';

<SocialGridHoverButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'BookmarkSlideButton',
        slug: 'bookmark-slide-button',
        description: 'A bookmarking card button with sliding container expansion on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","bookmark","slide","save","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { BookmarkSlideButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <BookmarkSlideButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface BookmarkSlideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BookmarkSlideButton: React.FC<BookmarkSlideButtonProps> = ({ className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={\`bookmarkBtn \${className}\`} {...props}>
        <span className="IconContainer">
          <svg viewBox="0 0 384 512" height="0.9em" className="icon">
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" fill="currentColor" />
          </svg>
        </span>
        <p className="text">Save</p>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .bookmarkBtn {
    width: 100px;
    height: 40px;
    border-radius: 40px;
    border: 1px solid rgba(255, 255, 255, 0.349);
    background-color: rgb(12, 12, 12);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    padding: 0;
  }

  .IconContainer {
    width: 30px;
    height: 30px;
    background: linear-gradient(to bottom, rgb(255, 136, 255), rgb(172, 70, 255));
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
    transition-duration: 0.3s;
    color: white;
  }

  .icon {
    border-radius: 1px;
  }

  .text {
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;
    transition-duration: 0.3s;
    font-size: 1.04em;
    margin: 0;
  }

  .bookmarkBtn:hover .IconContainer {
    width: 90px;
    transition-duration: 0.3s;
  }

  .bookmarkBtn:hover .text {
    transform: translate(10px);
    width: 0;
    font-size: 0;
    transition-duration: 0.3s;
  }

  .bookmarkBtn:active {
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
\`;

export default BookmarkSlideButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { BookmarkSlideButton } from 'pratham-ui';

<BookmarkSlideButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'SpaciousAIButton',
        slug: 'spacious-ai-button',
        description: 'A premium gradient outer glow button with spark icons and active translation offset.',
        category: categoriesMap['buttons'],
        tags: ["button","gradient","spark","ai","styled-components"],
        tier: 'pro',
        previewCode: `import React from 'react';
import { SpaciousAIButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <SpaciousAIButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface SpaciousAIButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const SpaciousAIButton: React.FC<SpaciousAIButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <div className={\`outer-cont flex \${className}\`} {...props}>
        <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2" fill="currentColor" />
          </g>
        </svg>
        {children || 'Ask Spacious AI'}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .flex {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .outer-cont {
    padding: 12px 20px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
    border-radius: 12px;
    color: #fff;
    transition: all 0.3s ease;
    box-shadow:
      inset 0px 0px 5px #ffffffa9,
      inset 0px 35px 30px #000,
      0px 5px 10px #000000cc;
    text-shadow: 1px 1px 1px #000;
    display: inline-flex;
    user-select: none;
  }
  .outer-cont::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    border-radius: 12px;
    filter: blur(0);
    z-index: -1;
    box-shadow: none;
    background: conic-gradient(
      #00000000 80deg,
      #40baf7,
      #f34ad7,
      #5bfcc4,
      #00000000 280deg
    );
    transition: all 0.3s ease;
  }
  .outer-cont:hover::before {
    filter: blur(15px);
  }
  .outer-cont:active::before {
    filter: blur(5px);
    transform: translateY(1px);
  }
  .outer-cont:active {
    box-shadow:
      inset 0px 0px 5px #ffffffa9,
      inset 0px 35px 30px #000;
    margin-top: 3px;
  }
\`;

export default SpaciousAIButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { SpaciousAIButton } from 'pratham-ui';

<SpaciousAIButton />`,
        dependencies: ["styled-components"],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'ExploreGreenButton',
        slug: 'explore-green-button',
        description: 'A circular green slide button with cursor group rotation icons built using Tailwind CSS classes.',
        category: categoriesMap['buttons'],
        tags: ["button","explore","green","tailwind"],
        tier: 'free',
        previewCode: `import React from 'react';
import { ExploreGreenButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <ExploreGreenButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';

export interface ExploreGreenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ExploreGreenButton: React.FC<ExploreGreenButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      type="submit"
      className={\`flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 text-gray-800 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group cursor-pointer \${className}\`}
      {...props}
    >
      {children || 'Explore'}
      <svg
        className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          className="fill-gray-800 group-hover:fill-gray-800"
        />
      </svg>
    </button>
  );
};

export default ExploreGreenButton;
`,
        installCode: 'npm install pratham-ui',
        usageCode: `import { ExploreGreenButton } from 'pratham-ui';

<ExploreGreenButton />`,
        dependencies: [],
        props: [],
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        isPublished: true,
      },
      {
        name: 'LetsGoArrowButton',
        slug: 'lets-go-arrow-button',
        description: 'A sliding arrow button with a dotted background indicator on hover.',
        category: categoriesMap['buttons'],
        tags: ["button","arrow","transition","pink","styled-components"],
        tier: 'free',
        previewCode: `import React from 'react';
import { LetsGoArrowButton } from 'pratham-ui';

export default function Demo() {
  return (
    <div className="flex justify-center p-8 bg-[#0D0D0D]">
      <LetsGoArrowButton />
    </div>
  );
}`,
        componentCode: `import React from 'react';
import styled from 'styled-components';

export interface LetsGoArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const LetsGoArrowButton: React.FC<LetsGoArrowButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={\`Btn-Container \${className}\`} {...props}>
        <span className="text">{children || "let's go!"}</span>
        <span className="icon-Container">
          <svg width={16} height={19} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="black" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="black" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div\`
  .Btn-Container {
    display: flex;
    width: 170px;
    height: 48px;
    background-color: #1d2129;
    border-radius: 40px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
    align-items: center;
    border: none;
    cursor: pointer;
    padding: 0 0 0 15px;
  }
  .icon-Container {
    width: 40px;
    height: 40px;
    background-color: #f59aff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid #1d2129;
    flex-shrink: 0;
  }
  .text {
    width: calc(170px - 55px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1em;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .icon-Container svg {
    transition-duration: 1.5s;
  }
  .Btn-Container:hover .icon-Container svg {
    transition-duration: 1.5s;
    animation: arrow 1s linear infinite;
  }
  @keyframes arrow {
    0% {
      opacity: 0;
      margin-left: 0px;
    }
    100% {
      opacity: 1;
      margin-left: 10px;
    }
  }
\`;

export default LetsGoArrowButton;
`,
        installCode: 'npm install pratham-ui styled-components',
        usageCode: `import { LetsGoArrowButton } from 'pratham-ui';

<LetsGoArrowButton />`,
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
