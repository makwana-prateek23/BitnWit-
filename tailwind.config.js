/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#061B49',
        rabbit: '#7025B9',
        signal: '#FF790E',
        cloud: '#F7F5FB',
        line: '#E8E2F0',
        // Neumorphism Palette Tokens
        neu: {
          bg: 'var(--neu-bg)',
          surface: 'var(--neu-surface)',
          surfaceSec: 'var(--neu-surface-sec)',
          text: 'var(--neu-text)',
          textSec: 'var(--neu-text-sec)',
          yellow: '#F5C84C',
          purple: 'var(--neu-accent-purple)',
          maroon: 'var(--neu-accent-maroon)',
        }
      },
      boxShadow: {
        'neu-raised': 'var(--neu-shadow-raised)',
        'neu-raised-sm': 'var(--neu-shadow-raised-sm)',
        'neu-raised-lg': 'var(--neu-shadow-raised-lg)',
        'neu-pressed': 'var(--neu-shadow-pressed)',
        'neu-recessed': 'var(--neu-shadow-recessed)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
