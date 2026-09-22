/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // TryHackMe-inspired palette: deep navy base with the signature
        // lime-green accent, plus a mint-teal for success/secured states.
        cyber: {
          950: '#0a0e1f',
          900: '#0e1424',
          850: '#121a30',
          800: '#17203d',
          700: '#212c52',
          600: '#2f3d6e',
          cyan: '#c6ff4d',
          'cyan-dim': 'rgba(198, 255, 77, 0.15)',
          purple: '#a855f7',
          'purple-dim': 'rgba(168, 85, 247, 0.15)',
          red: '#ff3366',
          'red-dim': 'rgba(255, 51, 102, 0.15)',
          green: '#3ecf8e',
          'green-dim': 'rgba(62, 207, 142, 0.15)',
          amber: '#ffb020',
          'amber-dim': 'rgba(255, 176, 32, 0.15)',
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'Rajdhani', 'sans-serif'],
        hud: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(198, 255, 77, 0.4)',
        'glow-cyan-sm': '0 0 10px rgba(198, 255, 77, 0.28)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.45)',
        'glow-red': '0 0 20px rgba(255, 51, 102, 0.5)',
        'glow-green': '0 0 20px rgba(62, 207, 142, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(198, 255, 77, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
