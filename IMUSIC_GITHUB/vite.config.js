import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        studio: resolve(__dirname, 'studio.html'),
        memberships: resolve(__dirname, 'memberships.html'),
        verification: resolve(__dirname, 'verification.html'),
        artist: resolve(__dirname, 'artist.html'),
        reels: resolve(__dirname, 'reels.html'),
        edit: resolve(__dirname, 'edit-profile.html'),
        upload: resolve(__dirname, 'upload.html'),
        signin: resolve(__dirname, 'signin.html'),
        register: resolve(__dirname, 'register.html')
      }
    }
  }
});
