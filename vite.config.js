import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

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
    plugins: [svelte()],
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
