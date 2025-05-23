/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'halo': {
          black: '#0A0A0A',
          light: '#F5F5F5',
          cyan: '#00E5FF',
          green: '#4CAF50'
        }
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #00E5FF, #4CAF50)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 229, 255, 0.3)',
        'glow-strong': '0 0 30px rgba(0, 229, 255, 0.5)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}