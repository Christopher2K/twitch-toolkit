import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  '*': {
    fontFamily: 'var(--font-euclid)',
    color: 'white',
  },
});

export default defineConfig({
  preflight: true,
  globalCss,
  jsxFramework: 'react',
  include: ['./resources/js/**/*.{ts,tsx}'],
  exclude: [],

  theme: {
    extend: {
      tokens: {
        colors: {
          background: { value: '#2D2D2D' },
          placeholder: { value: '#40ff00' },
          'placeholder-2': { value: '#ff0000' },
          desktop: { value: '#1E1E2E' },
          'desktop-light': { value: '#CDD6F4' },
          accent: { value: '#FAB387' },
        },
        fonts: {
          main: { value: 'var(--font-euclid)' },
        },
        fontSizes: {
          one: { value: '4.8rem' },
          two: { value: '4.5rem' },
          three: { value: '4rem' },
          four: { value: '3rem' },
          five: { value: '2rem' },
          six: { value: '1.8rem' },
          seven: { value: '1.3rem' },
        },
      },
    },
  },

  utilities: {
    extend: {
      aspectRatio: {
        values: { landscape: '16 / 9', portrait: '9 / 16' },
      },
    },
  },

  outdir: './resources/js/styled-system',
});
