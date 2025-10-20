import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'fonts',
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  
  css: {
    preprocessorOptions: {
      less: {
        math: 'strict',
        ieCompat: true,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'ie > 7',
            'firefox > 3',
            'chrome > 5',
            'safari > 3',
            'Opera > 10',
            'bb > 10',
            'iOS > 10'
          ],
        }),
      ],
    },
  },
  
  server: {
    port: 9000,
    open: '/index.html',
    host: 'localhost',
  },
});
