import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(__dirname, 'seed.js');
const componentsDir = path.join(__dirname, '../../packages/pratham-ui/src/components');

// Function to escape string for inclusion in javascript template literal
function escapeCode(code) {
  return code
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// We will construct the objects to append
const newComponents = [
  {
    name: 'ConicGlowButton',
    slug: 'conic-glow-button',
    description: 'A styled-components button with a conic gradient border rotating hue animation on hover.',
    categorySlug: 'buttons',
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
    fileName: 'ConicGlowButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { ConicGlowButton } from 'pratham-ui';\n\n<ConicGlowButton>Hover me!</ConicGlowButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
  },
  {
    name: 'SlideUpDownButton',
    slug: 'slide-up-down-button',
    description: 'A sliding animation button revealing secondary confirmation text on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'slide', 'transition', 'styled-components'],
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
    fileName: 'SlideUpDownButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { SlideUpDownButton } from 'pratham-ui';\n\n<SlideUpDownButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
  },
  {
    name: 'SkewFillButton',
    slug: 'skew-fill-button',
    description: 'An elegant button featuring a skewed shape mask that fills the background from left to right on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'skew', 'transition', 'hover', 'styled-components'],
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
    fileName: 'SkewFillButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { SkewFillButton } from 'pratham-ui';\n\n<SkewFillButton>Hover me</SkewFillButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80',
  },
  {
    name: 'RetroRoundButton',
    slug: 'retro-round-button',
    description: 'A circular 3D push button styled in vintage pink/red neon shades.',
    categorySlug: 'buttons',
    tags: ['button', 'circular', 'retro', 'push', 'styled-components'],
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
    fileName: 'RetroRoundButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { RetroRoundButton } from 'pratham-ui';\n\n<RetroRoundButton>⚡</RetroRoundButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
  },
  {
    name: 'PixelPushButton',
    slug: 'pixel-push-button',
    description: 'Retro 8-bit style pixelated push button with active charge animations.',
    categorySlug: 'buttons',
    tags: ['button', 'pixel', 'retro', 'push', 'styled-components'],
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
    fileName: 'PixelPushButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { PixelPushButton } from 'pratham-ui';\n\n<PixelPushButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80',
  },
  {
    name: 'SocialTooltipButton',
    slug: 'social-tooltip-button',
    description: 'A set of social connection buttons with custom tooltips sliding upwards on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'social', 'tooltip', 'icons', 'styled-components'],
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
    fileName: 'SocialTooltipButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { SocialTooltipButton } from 'pratham-ui';\n\n<SocialTooltipButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  },
  {
    name: 'WaveFillButton',
    slug: 'wave-fill-button',
    description: 'A sleek custom hover wave button filling background with smooth curves.',
    categorySlug: 'buttons',
    tags: ['button', 'wave', 'curves', 'hover', 'styled-components'],
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
    fileName: 'WaveFillButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { WaveFillButton } from 'pratham-ui';\n\n<WaveFillButton>Get in touch</WaveFillButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
  },
  {
    name: 'IsometricCubeButton',
    slug: 'isometric-cube-button',
    description: 'A 3D retro-futuristic isometric cube block button styled in metallic gold.',
    categorySlug: 'buttons',
    tags: ['button', 'isometric', '3d', 'gold', 'styled-components'],
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
    fileName: 'IsometricCubeButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { IsometricCubeButton } from 'pratham-ui';\n\n<IsometricCubeButton>Hover Me</IsometricCubeButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80',
  },
  {
    name: 'TeenageEngineeringButtons',
    slug: 'teenage-engineering-buttons',
    description: 'Reproduction of Teenage Engineering EP-133 K.O. II retro keycaps and hardware button panels.',
    categorySlug: 'buttons',
    tags: ['button', 'retro', 'hardware', 'teenage-engineering', 'styled-components'],
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
    fileName: 'TeenageEngineeringButtons.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { TeenageEngineeringButtons } from 'pratham-ui';\n\n<TeenageEngineeringButtons />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  }
];

let appendStr = '';
for (const comp of newComponents) {
  const filePath = path.join(componentsDir, comp.fileName);
  const rawCode = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
  const escapedCodeString = escapeCode(rawCode);

  appendStr += `,\n      {
        name: '${comp.name}',
        slug: '${comp.slug}',
        description: '${comp.description}',
        category: categoriesMap['${comp.categorySlug}'],
        tags: ${JSON.stringify(comp.tags)},
        tier: '${comp.tier}',
        previewCode: \`${escapeCode(comp.previewCode.replace(/\r\n/g, '\n'))}\`,
        componentCode: \`${escapedCodeString}\`,
        installCode: '${comp.installCode}',
        usageCode: \`${escapeCode(comp.usageCode.replace(/\r\n/g, '\n'))}\`,
        dependencies: ${JSON.stringify(comp.dependencies)},
        props: ${JSON.stringify(comp.props)},
        thumbnailUrl: '${comp.thumbnailUrl}',
        isPublished: true,
      }`;
}

const seedContent = fs.readFileSync(seedPath, 'utf-8').replace(/\r\n/g, '\n');
const searchString = `        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',\n        isPublished: true,\n      }\n    ];`;

const replacement = `        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',\n        isPublished: true,\n      }${appendStr}\n    ];`;

if (!seedContent.includes(searchString)) {
  console.error("Error: Could not locate componentsData end marker in seed.js");
  process.exit(1);
}

const updatedSeedContent = seedContent.replace(searchString, replacement);
fs.writeFileSync(seedPath, updatedSeedContent, 'utf-8');
console.log("Successfully updated seed.js with new styled-components buttons!");
