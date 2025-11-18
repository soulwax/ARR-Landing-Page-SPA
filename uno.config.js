// File: uno.config.js

import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(), // Tailwind-compatible utilities (replaces deprecated presetUno)
    presetAttributify(), // Enable attributify mode (optional)
    presetIcons() // Icon preset (optional, for icon support)
  ],
  theme: {
    colors: {
      primary: '#10b981',
      secondary: '#f59e0b',
      accent: '#6366f1',
      'dark-bg': '#0a0a0f',
      'darker-bg': '#050508',
      'card-bg': 'rgba(255, 255, 255, 0.03)',
      'text-primary': '#ffffff',
      'text-secondary': 'rgba(255, 255, 255, 0.7)',
      'border-color': 'rgba(255, 255, 255, 0.1)',
      'glow-color': 'rgba(16, 185, 129, 0.3)'
    },
    fontFamily: {
      sans: ['Space Grotesk', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    }
  },
  shortcuts: {
    // Custom shortcuts for common patterns
    'btn-primary': 'px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-80 transition',
    'card': 'bg-card-bg border border-border-color rounded-lg p-4',
    'section-header': 'text-center mb-8'
  }
})
