/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/pratham-ui/src/**/*.{js,ts,jsx,tsx}" // include component packages content
  ],
  theme: {
    extend: {
      colors: {
        marvel: {
          deep: 'var(--marvel-bg-deep, #080808)',
          primary: 'var(--marvel-bg-primary, #0D0D0D)',
          surface: 'var(--marvel-bg-surface, #141414)',
          elevated: 'var(--marvel-bg-elevated, #1A1A1A)',
          crimson: 'var(--marvel-crimson, #E62429)',
          'crimson-dark': 'var(--marvel-crimson-dark, #B01C20)',
          gold: 'var(--marvel-gold, #F0B90B)',
          silver: 'var(--marvel-silver, #A8A9AD)',
          white: 'var(--marvel-white, #F5F5F5)',
          border: 'var(--marvel-border, rgba(255,255,255,0.08))',
        }
      },
      fontFamily: {
        marvel: ['Rajdhani', 'Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(230,36,41,0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(230,36,41,0.6)' },
        }
      }
    },
  },
  plugins: [],
}
