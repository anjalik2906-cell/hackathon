/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B1020',
        surface: '#131A2E',
        elevated: '#1B2440',
        line: '#262F4D',
        ink: '#EDEFF7',
        muted: '#8B93B0',
        faint: '#5A6288',
        flame: '#FFB020',
        flameDim: '#7A5A1F',
        github: '#5EEAD4',
        linkedin: '#6C8CFF',
        danger: '#FF6B6B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,176,32,0.15), 0 8px 30px -8px rgba(255,176,32,0.25)',
        card: '0 4px 24px -8px rgba(0,0,0,0.4)',
      },
      maxWidth: {
        app: '480px',
      },
    },
  },
  plugins: [],
}
