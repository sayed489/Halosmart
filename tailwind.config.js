/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        halo: {
          black: '#0a0a0a',
          green: '#00ff00',
          blue: '#00b7eb',
          cyan: '#00e5ff',
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
            800: '#343A40',
            900: '#212529'
          }
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(0,255,0,0.1) 100%)',
        'gradient-text': 'linear-gradient(135deg, #00e5ff 0%, #00ff00 100%)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0,229,255,0.2)',
        'glow-strong': '0 0 30px rgba(0,229,255,0.3)',
        'premium': '0 8px 32px rgba(0,229,255,0.1)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        }
      }
    }
  },
  plugins: []
};