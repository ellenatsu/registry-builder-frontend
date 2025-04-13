import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    sentryVitePlugin({
    org: "fundmywish",
    project: "fundmywish-website"
  })],



  server: {
    hmr: false,
  },

  build: {
    sourcemap: true
  }
})
