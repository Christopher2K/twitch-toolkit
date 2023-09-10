import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/resources/js/*.{ts,tsx}'],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: './resources/js/styled-system',
});
