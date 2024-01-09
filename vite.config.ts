import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteCommonjs from 'vite-plugin-commonjs';
// import hljs from 'highlight.js';

export default defineConfig({
  plugins: [
    vue(), // vue 3
    ViteCommonjs(), // coommonjs
  ],
})
