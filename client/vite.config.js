import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      global: 'rollup-plugin-node-polyfills/polyfills/global',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      Buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
    }
  },
  optimizeDeps: {
    include: [
      'buffer',
      'stream',
      'events',
      'util',
      'process',
      "cally",
      "simple-peer",
      "socket.io-client",
      "react-router",
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  }
})
