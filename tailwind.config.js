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
          black: '#0a0a0a',
          green: '#00ff00',
          blue: '#00b7eb',
          dark: '#000000',
          light: '#ffffff',
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
          success: '#00e5ff',
          warning: '#FFC107',
          error: '#F44336',
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
        'gradient-cta': 'linear-gradient(135deg, #00b7eb 0%, #00ff00 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      },
      boxShadow: {
        'premium': '0 8px 32px -4px rgba(0,229,255,0.1)',
        'premium-hover': '0 16px 48px -8px rgba(0,229,255,0.2)',
        'glow': '0 0 20px rgba(0,229,255,0.2)',
        'glow-hover': '0 0 30px rgba(0,229,255,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};