import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set when building for GitHub Pages (served from /<repo>/); local dev stays at /.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: { manualChunks: { three: ['three', '@react-three/fiber', '@react-three/drei'] } },
    },
  },
})
