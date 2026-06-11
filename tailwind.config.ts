import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-2': 'var(--cream-2)',
        forest: 'var(--forest)',
        'forest-deep': 'var(--forest-deep)',
        gold: 'var(--gold)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        terracotta: 'var(--terracotta)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
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
