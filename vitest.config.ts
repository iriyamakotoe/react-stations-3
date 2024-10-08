import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.jsx']
  },
});