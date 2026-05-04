import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#020611',
          900: '#050a1a',
          800: '#081428',
          700: '#0a1f3d',
          600: '#0d2a4d',
          500: '#13406b',
        },
        glow: {
          cyan: '#00d4ff',
          ice: '#7df9ff',
          coral: '#ff7a8a',
          atlantis: '#b14eff',
          gold: '#f5c46b',
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 212, 255, 0.35), inset 0 0 20px rgba(0, 212, 255, 0.05)',
        'glow-magenta': '0 0 28px rgba(177, 78, 255, 0.45)',
      },
      backgroundImage: {
        'glass-grad':
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(40px,-30px,0)' },
        },
        driftSlow: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-3%)' },
        },
        jellyfish: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-12px) scaleY(0.92)' },
        },
        rays: {
          '0%, 100%': { opacity: '0.18', transform: 'translateX(-2%) skewX(-8deg)' },
          '50%': { opacity: '0.28', transform: 'translateX(2%) skewX(-8deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'driftSlow 60s ease-in-out infinite alternate',
        jellyfish: 'jellyfish 5s ease-in-out infinite',
        rays: 'rays 12s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
