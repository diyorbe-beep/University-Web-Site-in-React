import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Production optimizations
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          socket: ['socket.io-client'],
          ui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  },
  server: {
    // Development server settings
    port: 3000,
    open: false, // Disable auto-open to prevent xdg-open errors
    host: true // Allow external connections
  },
  preview: {
    // Preview server settings
    port: 3000,
    open: false, // Disable auto-open to prevent xdg-open errors
    host: true // Allow external connections
  }
})
