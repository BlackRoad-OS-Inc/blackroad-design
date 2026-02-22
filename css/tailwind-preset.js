/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          black:   '#000000',
          white:   '#FFFFFF',
          amber:   '#F5A623',
          pink:    '#FF1D6C',
          blue:    '#2979FF',
          violet:  '#9C27B0',
        },
        agent: {
          lucidia:  '#00BCD4',
          octavia:  '#9C27B0',
          alice:    '#4CAF50',
          aria:     '#2196F3',
          shellfish:'#F44336',
        },
        terminal: {
          green: '#00FF41',
          bg:    '#0A0A0A',
        },
      },
      spacing: {
        // Golden ratio spacing
        'phi-1': '8px',
        'phi-2': '13px',
        'phi-3': '21px',
        'phi-4': '34px',
        'phi-5': '55px',
        'phi-6': '89px',
        'phi-7': '144px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      lineHeight: {
        phi: '1.618',
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%)',
      },
    },
  },
  plugins: [],
}
