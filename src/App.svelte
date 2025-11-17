<script>
  import { onMount } from 'svelte';
  import { initLandingPageInteractions } from './lib/landingInteractions';

  const navLinks = [
    { label: 'Applications', href: '#apps' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Tutorial', href: '#tutorial' },
    { label: 'Doom', href: '#doom' }
  ]

  const heroTitleLines = [
    { text: 'Build your ARR stack.', rotated: false },
    { text: 'Control it your way.', rotated: true }
  ]

  const heroSubtitle = 'Keep every download, metadata tag, and dashboard in your own infrastructure.'

  const apps = [
    {
      key: 'prowlarr',
      icon: '🔍',
      name: 'Prowlarr',
      description: 'Indexer Manager',
      port: '9696',
      url: 'https://prowlarr.bluesixtech.io'
    },
    {
      key: 'sonarr',
      icon: '📺',
      name: 'Sonarr',
      description: 'TV Show Manager',
      port: '8989',
      url: 'https://sonarr.bluesixtech.io'
    },
    {
      key: 'radarr',
      icon: '🎬',
      name: 'Radarr',
      description: 'Movie Manager',
      port: '7878',
      url: 'https://radarr.bluesixtech.io'
    },
    {
      key: 'lidarr',
      icon: '🎵',
      name: 'Lidarr',
      description: 'Music Manager',
      port: '8686',
      url: 'https://lidarr.bluesixtech.io'
    },
    {
      key: 'homarr',
      icon: '🏠',
      name: 'Homarr',
      description: 'Dashboard',
      port: '7575',
      url: 'https://homarr.bluesixtech.io'
    },
    {
      key: 'jellyfin',
      icon: '🎭',
      name: 'Jellyfin',
      description: 'Media Server',
      port: '8096',
      url: 'https://jellyfin.bluesixtech.io'
    },
    {
      key: 'qbittorrent',
      icon: '⚡',
      name: 'qBittorrent',
      description: 'Download Client',
      port: '8080',
      url: 'https://qbittorrent.bluesixtech.io'
    }
  ]

  const flowSteps = [
    {
      icon: '🔍',
      title: 'Prowlarr',
      description: 'A central indexer manager that syncs trackers to all *ARR apps.'
    },
    {
      icon: '📺🎬🎵',
      title: 'Sonarr / Radarr / Lidarr',
      description: 'Media managers that monitor and search for new content.'
    },
    {
      icon: '⚡',
      title: 'qBittorrent',
      description: 'Handles downloads from trusted trackers and Usenet feeds.'
    },
    {
      icon: '🎭',
      title: 'Jellyfin',
      description: 'Streams the organized library to every device you own.'
    }
  ]

  const detailCards = [
    {
      title: 'Prowlarr → Media Managers',
      description: 'Central hub. Add indexers once and sync them to every *ARR service automatically.'
    },
    {
      title: 'Media Managers → qBittorrent',
      description: 'Request content, let the *ARR apps search trackers, and qBittorrent handles the downloads.'
    },
    {
      title: 'qBittorrent → Media Library',
      description: 'Completed downloads are moved, renamed, and organized with zero manual work.'
    },
    {
      title: 'Media Library → Jellyfin',
      description: 'Jellyfin scans folders, enriches metadata, and streams it everywhere.'
    },
    {
      title: 'Homarr Dashboard',
      description: 'Monitor every container, service, and integration from a single dashboard.'
    }
  ]

  const tutorialSteps = [
    {
      number: '01',
      title: 'Initial Setup',
      paragraphs: [
        'Docker installed? Start the stack:',
        'Fix permissions:'
      ],
      codeBlocks: [
        'sudo docker-compose up -d',
        'chown -R 1000:1000 /media/Arr'
      ],
      lists: []
    },
    {
      number: '02',
      title: 'Configure qBittorrent',
      paragraphs: [
        'Access at <strong>https://qbittorrent.bluesixtech.io</strong>',
        'Get the temporary password from logs:',
        'Update the WebUI settings:'
      ],
      codeBlocks: [
        'sudo docker logs qbittorrent'
      ],
      lists: [
        {
          title: 'WebUI checklist',
          items: [
            'Change username and password',
            'Enable <strong>"Bypass authentication for clients on localhost"</strong>',
            'Save your settings'
          ]
        }
      ]
    },
    {
      number: '03',
      title: 'Configure Prowlarr',
      paragraphs: [
        'Access at <strong>https://prowlarr.bluesixtech.io</strong>',
        'Add qBittorrent as a download client:'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            '<strong>Settings → Download Clients</strong> → <strong>+</strong> → <strong>qBittorrent</strong>',
            'Host: <code>qbittorrent</code> (or host IP)',
            'Port: <code>8080</code>',
            'Enter matching credentials, test, then save'
          ]
        }
      ]
    },
    {
      number: '04',
      title: 'Configure Sonarr',
      paragraphs: [
        'Access at <strong>https://sonarr.bluesixtech.io</strong>',
        '<strong>Root Folder</strong>:',
        '<strong>Download Client</strong>:',
        '<strong>Connect to Prowlarr</strong>:',
        '<strong>Backups</strong>:'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            '<strong>Settings → Media Management</strong> → <strong>Add Root Folder</strong>',
            'Path: <code>/data/tvshows</code>'
          ]
        },
        {
          title: null,
          items: [
            '<strong>Settings → Download Clients</strong> → Add qBittorrent (same credentials as before)'
          ]
        },
        {
          title: null,
          items: [
            '<strong>Settings → General</strong> → copy the API key',
            'Prowlarr → <strong>Settings → Apps</strong> → <strong>+</strong> → <strong>Sonarr</strong>',
            'Paste the API key, set host (<code>sonarr</code> or host IP), test and save'
          ]
        },
        {
          title: null,
          items: [
            '<strong>Settings → General</strong> (advanced) → Backup folder: <code>/data/Backup</code>'
          ]
        }
      ]
    },
    {
      number: '05',
      title: 'Configure Radarr',
      paragraphs: [
        'Access at <strong>https://radarr.bluesixtech.io</strong>',
        'Mirror the Sonarr setup with movie-specific paths.'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            'Root folder: <code>/data/movies</code>',
            'Add qBittorrent, connect to Prowlarr, backup to <code>/data/Backup</code>'
          ]
        }
      ]
    },
    {
      number: '06',
      title: 'Configure Lidarr',
      paragraphs: [
        'Access at <strong>https://lidarr.bluesixtech.io</strong>',
        'Same flow as Sonarr/Radarr with music folders.'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            'Root folder: <code>/data/musicfolder</code>',
            'Add qBittorrent and connect to Prowlarr'
          ]
        }
      ]
    },
    {
      number: '07',
      title: 'Add Indexers',
      paragraphs: [
        'Back to Prowlarr. Add the trackers you trust:',
        '<strong>Sync</strong>:'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            '<strong>Indexers</strong> → <strong>Add Indexer</strong>',
            'Search, configure, test, and save each provider'
          ]
        },
        {
          title: null,
          items: [
            'Click <strong>Sync App Indexers</strong>',
            'Verify <strong>Settings → Apps</strong> shows "Full sync"'
          ]
        }
      ]
    },
    {
      number: '08',
      title: 'Configure Jellyfin',
      paragraphs: [
        'Access at <strong>https://jellyfin.bluesixtech.io</strong>',
        'Complete the setup wizard, then add libraries:'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            '<strong>Dashboard → Libraries</strong>',
            'Movies: <code>/data/Movies</code>',
            'TV Shows: <code>/data/TVShows</code>',
            'Music: <code>/data/Music</code>'
          ]
        }
      ]
    },
    {
      number: '09',
      title: 'You’re Done',
      paragraphs: [
        'Your stack is ready. Use it intentionally:'
      ],
      codeBlocks: [],
      lists: [
        {
          title: null,
          items: [
            '<strong>Add Content:</strong> Sonarr/Radarr/Lidarr → "Add Series/Movie/Album"',
            '<strong>Search:</strong> "Search All" or "Search Monitored" to download',
            '<strong>Monitor:</strong> Tune quality profiles and notifications',
            '<strong>Stream:</strong> Jellyfin on any device',
            '<strong>Dashboard:</strong> Homarr to watch everything at a glance'
          ]
        }
      ]
    }
  ]

  const resources = [
    { label: 'Servarr Wiki', url: 'https://wiki.servarr.com/' },
    { label: 'Trash Guides', url: 'https://trash-guides.info/' }
  ]

  const doomUrl = 'https://doom.bluesixtech.io'

  onMount(() => {
    const cleanup = initLandingPageInteractions()
    return () => cleanup?.()
  })
</script>

<div class="animated-bg"></div>

<nav class="main-nav">
  <div class="nav-logo">
    <span class="logo-text">*ARR Autonomous Stack</span>
  </div>
  <button class="menu-toggle" aria-label="Toggle menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="nav-menu">
    {#each navLinks as link}
      <li>
        <a href={link.href}>{link.label}</a>
      </li>
    {/each}
    <li class="nav-download">
      <a href="/arr.zip" class="nav-download-btn" download>
        <span>Download Bundle</span>
      </a>
    </li>
    <li class="nav-github">
      <a
        href="https://github.com/soulwax/ARR-Landing-Page-SPA"
        target="_blank"
        rel="noopener"
        aria-label="GitHub Repository"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
          <path
            d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.563 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
    </li>
  </ul>
</nav>

<section id="home" class="hero">
  <div class="hero-content">
    <h1 class="hero-title">
      {#each heroTitleLines as line}
        <span class="title-line {line.rotated ? 'rotated' : ''}">{line.text}</span>
      {/each}
    </h1>
    <p class="hero-subtitle">{heroSubtitle}</p>
    <div class="hero-cta">
      <a href="#apps" class="cta-button">Applications</a>
    </div>
  </div>
  <div class="hero-visual">
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
      <div class="shape shape-7"></div>
      <div class="shape shape-8"></div>
    </div>
    <div class="particle-container"></div>
  </div>
</section>

<section id="apps" class="apps-section">
  <div class="section-header">
    <h2 class="section-title">Applications</h2>
    <p class="section-description">Every tool you need to automate your media workflow.</p>
  </div>
  <div class="apps-grid">
    {#each apps as app}
      <div class="app-card" data-app={app.key}>
        <div class="app-icon">{app.icon}</div>
        <h3 class="app-name">{app.name}</h3>
        <p class="app-description">{app.description}</p>
        <div class="app-port">Port: {app.port}</div>
        <a href={app.url} target="_blank" rel="noopener noreferrer" class="app-link">Access →</a>
      </div>
    {/each}
  </div>
</section>

<section id="ecosystem" class="ecosystem-section">
  <div class="section-header">
    <h2 class="section-title">How everything connects</h2>
    <p class="section-description">Understand the workflow from search to playback.</p>
  </div>
  <div class="ecosystem-diagram">
    <div class="ecosystem-flow">
      {#each flowSteps as step, index}
        <div class="flow-step">
          <div class="step-icon">{step.icon}</div>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
        </div>
        {#if index < flowSteps.length - 1}
          <div class="flow-arrow">→</div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="interconnection-details">
    {#each detailCards as detail}
      <div class="detail-card">
        <h4>{detail.title}</h4>
        <p>{detail.description}</p>
      </div>
    {/each}
  </div>
</section>

<section id="tutorial" class="tutorial-section">
  <div class="section-header">
    <h2 class="section-title">Setup Tutorial</h2>
    <p class="section-description">Configure your stack. Step by step.</p>
  </div>
  <div class="tutorial-container">
    {#each tutorialSteps as step}
      <div class="tutorial-step">
        <div class="step-number">{step.number}</div>
        <div class="step-content">
          <h3>{step.title}</h3>
          {#each step.paragraphs as paragraph}
            <p>{@html paragraph}</p>
          {/each}
          {#each step.codeBlocks as block}
            <pre><code>{block}</code></pre>
          {/each}
          {#each step.lists as list}
            {#if list.title}
              <p><strong>{list.title}</strong></p>
            {/if}
            <ul>
              {#each list.items as item}
                <li>{@html item}</li>
              {/each}
            </ul>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<section id="doom" class="doom-section">
  <div class="section-header">
    <h2 class="section-title">Doom</h2>
    <p class="section-description">Launch the on-demand DOOM experience without overloading the page.</p>
  </div>
  <div class="doom-container">
    <div class="doom-glow"></div>
    <div class="doom-wrapper">
      <div class="doom-game-container">
        <button type="button" class="doom-start-button" id="doom-start-button">
          Click to launch DOOM
          <span class="doom-start-subtitle">Loads on demand to save resources</span>
        </button>
        <div class="doom-loading-state" id="doom-loading">
          <p>Loading DOOM...</p>
          <div class="loading-spinner"></div>
        </div>
        <iframe
          id="doom-iframe"
          class="doom-canvas"
          title="DOOM Game"
          frameborder="0"
          scrolling="no"
          allowfullscreen
          allow="gamepad"
          data-src={doomUrl}
        ></iframe>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-content">
    <p>ARR Stack</p>
    <p class="footer-links">
      {#each resources as resource, index}
        <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.label}</a>
        {#if index < resources.length - 1}
          <span>•</span>
        {/if}
      {/each}
    </p>
  </div>
</footer>
