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
    // TryHackMe's actual card/button radius is small (~5-8px), not the
    // heavy rounded-2xl/3xl look — override the scale globally so every
    // existing rounded-xl/2xl/3xl usage shrinks without touching each file.
    borderRadius: {
      none: '0px',
      sm: '4px',
      DEFAULT: '6px',
      md: '6px',
      lg: '8px',
      xl: '8px',
      '2xl': '10px',
      '3xl': '12px',
      full: '9999px',
    },
    extend: {
      colors: {
        // TryHackMe's actual brand colors (sampled from tryhackme.com):
        // navy #151c2b header/background, lime #a3ea2a accent.
        cyber: {
          950: '#0d1119',
          900: '#151c2b',
          850: '#1a2233',
          800: '#202940',
          700: '#2c3752',
          600: '#3c4a6e',
          cyan: '#a3ea2a',
          'cyan-dim': 'rgba(163, 234, 42, 0.15)',
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
        cyber: ['Ubuntu', 'sans-serif'],
        hud: ['Ubuntu', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Flat and restrained, not the heavy neon-glow look.
        'glow-cyan': '0 0 10px rgba(163, 234, 42, 0.25)',
        'glow-cyan-sm': '0 0 5px rgba(163, 234, 42, 0.18)',
        'glow-purple': '0 0 12px rgba(168, 85, 247, 0.3)',
        'glow-red': '0 0 12px rgba(255, 51, 102, 0.35)',
        'glow-green': '0 0 12px rgba(62, 207, 142, 0.3)',
        'cyber-card': '0 4px 16px 0 rgba(0, 0, 0, 0.4)',
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
