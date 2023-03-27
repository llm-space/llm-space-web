import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      tsconfigPaths(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      // cssInjectedByJsPlugin,
      react({ jsxRuntime: 'classic' }),
    ],
    // build: {
    //  lib: {
    //    entry: resolve(__dirname, 'src/index.tsx'),
    //	  name: 'MyLib',
    //	  fileName: 'index',
    //  },
    // },
  };
});
