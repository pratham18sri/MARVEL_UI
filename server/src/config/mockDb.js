import { v4 as uuidv4 } from 'uuid';

// In-Memory Arrays representing Collections
export const mockCategories = [
  { _id: 'cat_buttons', name: 'Buttons', slug: 'buttons', description: 'Interactive trigger units with vibranium responses and reactor glows.', icon: 'MousePointerClick', color: '#E62429' },
  { _id: 'cat_cards', name: 'Cards', slug: 'cards', description: 'Data structures housed inside premium metallic frames and glass screens.', icon: 'Layout', color: '#F0B90B' },
  { _id: 'cat_forms', name: 'Forms', slug: 'forms', description: 'Advanced query input systems designed for maximum precision.', icon: 'TextCursorInput', color: '#A8A9AD' },
  { _id: 'cat_navigation', name: 'Navigation', slug: 'navigation', description: 'Dynamic dashboard routing layouts to control your dashboard suit.', icon: 'Navigation', color: '#208080' },
  { _id: 'cat_modals', name: 'Modals & Overlays', slug: 'modals-overlays', description: 'Quantum-tunneling panels and overlay prompt windows.', icon: 'Layers', color: '#8A2BE2' },
  { _id: 'cat_loaders', name: 'Loaders', slug: 'loaders', description: 'Suit charge-up spinners and arc reactor power bars.', icon: 'Loader2', color: '#1E90FF' }
];

export const mockUsers = [
  {
    _id: 'usr_admin',
    name: 'TONY STARK',
    email: 'admin@prathamui.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=tony-stark',
    provider: 'local',
    providerId: 'mock_stark_admin_1',
    role: 'admin',
    plan: 'pro',
    subscriptionStatus: 'active',
    apiKey: 'a463fcee-649b-4de1-bcae-f41bd56db17e',
  },
  {
    _id: 'usr_user',
    name: 'PETER PARKER',
    email: 'user@prathamui.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=peter-parker',
    provider: 'local',
    providerId: 'mock_parker_user_1',
    role: 'user',
    plan: 'free',
    subscriptionStatus: 'none',
    apiKey: '35611deb-43d5-4ff0-a07b-2d8702207e0e',
  }
];

export const mockComponents = [
  {
    _id: 'comp_marvel_button',
    name: 'MarvelButton',
    slug: 'marvel-button',
    description: 'A performance button with Iron Man arc-reactor neon crimson glows and responsive tactile feedback.',
    category: mockCategories[0],
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
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80',
    isPublished: true,
    viewCount: 42,
    copyCount: 15,
  },
  {
    _id: 'comp_glow_button',
    name: 'GlowButton',
    slug: 'glow-button',
    description: 'A dynamic component containing a continuous running background neon border animation.',
    category: mockCategories[0],
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
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80',
    isPublished: true,
    viewCount: 110,
    copyCount: 45,
  },
  {
    _id: 'comp_conic_glow_button',
    name: 'ConicGlowButton',
    slug: 'conic-glow-button',
    description: 'A styled-components button with a conic gradient border rotating hue animation on hover.',
    category: mockCategories[0],
    tags: ['button', 'conic', 'gradient', 'animation', 'styled-components'],
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
  }\`;`,
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { ConicGlowButton } from 'pratham-ui';\n\n<ConicGlowButton>Hover me!</ConicGlowButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
    isPublished: true,
    viewCount: 15,
    copyCount: 2,
  },
  {
    _id: 'comp_arc_reactor_loader',
    name: 'ArcReactorLoader',
    slug: 'arc-reactor-loader',
    description: 'An advanced animated Arc Reactor charger spinner (Premium Pro Component).',
    category: mockCategories[5],
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
    viewCount: 300,
    copyCount: 120,
  }
];

// Memory state operations
export const mockDbQueryUser = async ({ email, apiKey, userId }) => {
  if (email) return mockUsers.find(u => u.email === email.toLowerCase());
  if (apiKey) return mockUsers.find(u => u.apiKey === apiKey);
  if (userId) return mockUsers.find(u => u._id === userId);
  return null;
};

export const mockDbCreateUser = async (userData) => {
  const newUser = {
    _id: 'usr_' + Math.random().toString(36).substring(2, 9),
    name: userData.name,
    email: userData.email.toLowerCase(),
    avatar: userData.avatar,
    provider: userData.provider || 'local',
    providerId: userData.providerId || 'mock_local',
    role: userData.role || 'user',
    plan: userData.plan || 'free',
    subscriptionStatus: userData.plan === 'pro' ? 'active' : 'none',
    apiKey: uuidv4(),
  };
  mockUsers.push(newUser);
  return newUser;
};

export const mockDbUpdateUserPlan = async (userId, plan) => {
  const user = mockUsers.find(u => u._id === userId);
  if (user) {
    user.plan = plan;
    user.subscriptionStatus = plan === 'pro' ? 'active' : 'none';
    if (plan === 'pro') {
      const exp = new Date();
      exp.setDate(exp.getDate() + 30);
      user.subscriptionExpiry = exp;
    } else {
      user.subscriptionExpiry = undefined;
    }
  }
  return user;
};

export const mockSubscriptions = [];
