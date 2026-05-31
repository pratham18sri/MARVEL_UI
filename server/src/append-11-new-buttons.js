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

const newComponents = [
  {
    name: 'MicrosoftBrutalistButton',
    slug: 'microsoft-brutalist-button',
    description: 'A brutalist style button styled with Microsoft corporate colors and a skewed text/rotate icon grid.',
    categorySlug: 'buttons',
    tags: ['button', 'brutalist', 'microsoft', 'styled-components'],
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
    fileName: 'MicrosoftBrutalistButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { MicrosoftBrutalistButton } from 'pratham-ui';\n\n<MicrosoftBrutalistButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1625014020973-1129b15a1990?w=400&q=80',
  },
  {
    name: 'RetroPlayNowButton',
    slug: 'retro-play-now-button',
    description: 'A round retro yellow game button displaying the play logo with hover translations.',
    categorySlug: 'buttons',
    tags: ['button', 'retro', 'play', 'yellow', 'styled-components'],
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
    fileName: 'RetroPlayNowButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { RetroPlayNowButton } from 'pratham-ui';\n\n<RetroPlayNowButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80',
  },
  {
    name: 'ShadowOffsetBoxButton',
    slug: 'shadow-offset-box-button',
    description: 'A retro box push down button with black borders and offset shadow translations.',
    categorySlug: 'buttons',
    tags: ['button', 'retro', 'shadow', 'active', 'styled-components'],
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
    fileName: 'ShadowOffsetBoxButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { ShadowOffsetBoxButton } from 'pratham-ui';\n\n<ShadowOffsetBoxButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'PurpleSlideFillButton',
    slug: 'purple-slide-fill-button',
    description: 'A smooth sliding purple-filled rounded button with circular background transitions.',
    categorySlug: 'buttons',
    tags: ['button', 'purple', 'slide', 'transition', 'styled-components'],
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
    fileName: 'PurpleSlideFillButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { PurpleSlideFillButton } from 'pratham-ui';\n\n<PurpleSlideFillButton>Hover me</PurpleSlideFillButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
  },
  {
    name: 'HoverScaleCircleButton',
    slug: 'hover-scale-circle-button',
    description: 'A minimalistic button expanding a background circle on hover with active shadow glows.',
    categorySlug: 'buttons',
    tags: ['button', 'scale', 'circle', 'hover', 'styled-components'],
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
    fileName: 'HoverScaleCircleButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { HoverScaleCircleButton } from 'pratham-ui';\n\n<HoverScaleCircleButton>Hello</HoverScaleCircleButton>`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'TooltipDownloadButton',
    slug: 'tooltip-download-button',
    description: 'A modern blue download button showing size tooltips and icon slide animations on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'download', 'tooltip', 'blue', 'styled-components'],
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
    fileName: 'TooltipDownloadButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { TooltipDownloadButton } from 'pratham-ui';\n\n<TooltipDownloadButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'SocialGridHoverButton',
    slug: 'social-grid-hover-button',
    description: 'A social connection layout grid revealing 9 platforms on hover with beautiful gradients.',
    categorySlug: 'buttons',
    tags: ['button', 'social', 'grid', 'hover', 'styled-components'],
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
    fileName: 'SocialGridHoverButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { SocialGridHoverButton } from 'pratham-ui';\n\n<SocialGridHoverButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  },
  {
    name: 'BookmarkSlideButton',
    slug: 'bookmark-slide-button',
    description: 'A bookmarking card button with sliding container expansion on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'bookmark', 'slide', 'save', 'styled-components'],
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
    fileName: 'BookmarkSlideButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { BookmarkSlideButton } from 'pratham-ui';\n\n<BookmarkSlideButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'SpaciousAIButton',
    slug: 'spacious-ai-button',
    description: 'A premium gradient outer glow button with spark icons and active translation offset.',
    categorySlug: 'buttons',
    tags: ['button', 'gradient', 'spark', 'ai', 'styled-components'],
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
    fileName: 'SpaciousAIButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { SpaciousAIButton } from 'pratham-ui';\n\n<SpaciousAIButton />`,
    dependencies: ['styled-components'],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'ExploreGreenButton',
    slug: 'explore-green-button',
    description: 'A circular green slide button with cursor group rotation icons built using Tailwind CSS classes.',
    categorySlug: 'buttons',
    tags: ['button', 'explore', 'green', 'tailwind'],
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
    fileName: 'ExploreGreenButton.tsx',
    installCode: 'npm install pratham-ui',
    usageCode: `import { ExploreGreenButton } from 'pratham-ui';\n\n<ExploreGreenButton />`,
    dependencies: [],
    props: [],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  },
  {
    name: 'LetsGoArrowButton',
    slug: 'lets-go-arrow-button',
    description: 'A sliding arrow button with a dotted background indicator on hover.',
    categorySlug: 'buttons',
    tags: ['button', 'arrow', 'transition', 'pink', 'styled-components'],
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
    fileName: 'LetsGoArrowButton.tsx',
    installCode: 'npm install pratham-ui styled-components',
    usageCode: `import { LetsGoArrowButton } from 'pratham-ui';\n\n<LetsGoArrowButton />`,
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
const searchString = `        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',\n        isPublished: true,\n      }\n    ];`;

const replacement = `        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',\n        isPublished: true,\n      }${appendStr}\n    ];`;

if (!seedContent.includes(searchString)) {
  console.error("Error: Could not locate componentsData end marker in seed.js");
  process.exit(1);
}

const updatedSeedContent = seedContent.replace(searchString, replacement);
fs.writeFileSync(seedPath, updatedSeedContent, 'utf-8');
console.log("Successfully updated seed.js with 11 new buttons!");
