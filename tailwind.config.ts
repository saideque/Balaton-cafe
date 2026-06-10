import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        sage: 'var(--sage)',
        'sage-deep': 'var(--sage-deep)',
        terracotta: 'var(--terracotta)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        shell: '1320px',
      },
      transitionTimingFunction: {
        lake: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
