/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        halo: {
          black: '#111111',
          green: '#1DB954',
          blue: '#0070F3',
          dark: '#050505',
          light: '#F5F5F7',
          gray: {
            100: '#F5F5F7',
            200: '#E5E5E7',
            300: '#D5D5D7',
            400: '#B5B5B7',
            500: '#959597',
            600: '#757577',
            700: '#555557',
            800: '#353537',
            900: '#151517',
          },
        },
        accent: {
          success: '#34D399',
          warning: '#FBBF24',
          error: '#EF4444',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};