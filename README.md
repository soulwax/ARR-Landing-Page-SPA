# ARR Stack Landing Page

Landing page for the *ARR Autonomous Stack. Built with Svelte + Vite.

## Tech Stack

- **Svelte 5** - Component framework
- **Vite (Rolldown)** - Build tool and dev server
- **UnoCSS** - Atomic CSS engine (utility-first)
- **PM2** - Process manager for production
- **Custom CSS** - Legacy styles (works alongside UnoCSS)

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/lib/constants.js` - All content data
- `src/lib/codeFormatter.js` - CLI command comment highlighting
- `src/lib/landingInteractions.js` - Page interactions and animations
- `src/App.svelte` - Main component

## License

AGPL-3.0
