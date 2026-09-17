/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#04060d',
          900: '#070b16',
          850: '#0b1122',
          800: '#101a33',
          700: '#1b294d',
          600: '#2a3b68',
          cyan: '#00f0ff',
          'cyan-dim': 'rgba(0, 240, 255, 0.15)',
          purple: '#a855f7',
          'purple-dim': 'rgba(168, 85, 247, 0.15)',
          red: '#ff3366',
          'red-dim': 'rgba(255, 51, 102, 0.15)',
          green: '#00ffaa',
          'green-dim': 'rgba(0, 255, 170, 0.15)',
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
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'glow-cyan-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.45)',
        'glow-red': '0 0 20px rgba(255, 51, 102, 0.5)',
        'glow-green': '0 0 20px rgba(0, 255, 170, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(0, 240, 255, 0.15)',
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
