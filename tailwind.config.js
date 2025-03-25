/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff9d',
        secondary: '#ff3366',
        accent: '#ffcc00',
        'card': {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Noto Sans SC', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 