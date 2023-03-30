import yaml from '@modyfi/vite-plugin-yaml';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [tsconfigPaths(), react({ jsxRuntime: 'classic' }), yaml()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('./packages') }],
    },
  };
});
