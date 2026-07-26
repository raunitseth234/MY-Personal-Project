import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7B1E3B',
          light: '#9A3B59',
          dark: '#5E1029',
          deep: '#3F0A1C',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E4C87E',
          dark: '#A17F33',
        },
        ivory: '#FAF6EF',
        bluegrey: '#E7EDF3',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(201,162,75,0.45), 0 10px 34px rgba(201,162,75,0.28)',
        soft: '0 10px 40px rgba(20,10,15,0.08)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
