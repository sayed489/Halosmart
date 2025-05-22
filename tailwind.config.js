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
          green: '#00E676',
          blue: '#2196F3',
          dark: '#000000',
          light: '#FFFFFF',
          gray: {
            100: '#F8F9FA',
            200: '#E9ECEF',
            300: '#DEE2E6',
            400: '#CED4DA',
            500: '#ADB5BD',
            600: '#6C757D',
            700: '#495057',
            800: '#212529',
            900: '#101214',
          },
        },
        accent: {
          success: '#4CAF50',
          warning: '#FFC107',
          error: '#F44336',
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'gradient-cta': 'linear-gradient(135deg, #2196F3 0%, #00E676 100%)',
      },
      boxShadow: {
        'premium': '0 8px 32px -4px rgba(0,0,0,0.1)',
        'premium-hover': '0 16px 48px -8px rgba(0,0,0,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};