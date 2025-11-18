// File: vite.config.js

import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.entries(env).forEach(([key, value]) => {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  })
  const fallbackPort = mode === 'production' ? 4173 : 5173
  const port = Number(env.PORT) || fallbackPort
  const host = env.HOST || '0.0.0.0'

  return {
    plugins: [
      UnoCSS(),
      svelte()
    ],
    server: {
      host,
      port,
      strictPort: true,
    },
    preview: {
      host,
      port,
      strictPort: true,
      allowedHosts: ['bluesixtech.io'],
    },
  }
})
