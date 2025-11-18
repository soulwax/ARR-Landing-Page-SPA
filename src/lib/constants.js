/**
 * Navigation links configuration
 * @type {Array<{label: string, href: string}>}
 */
export const navLinks = [
  { label: 'Applications', href: '#apps' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Tutorial', href: '#tutorial' },
  { label: 'Doom', href: '#doom' }
]

/**
 * Hero section title lines configuration
 * @type {Array<{text: string, rotated: boolean}>}
 */
export const heroTitleLines = [
  { text: 'ARR Stack', rotated: false },
  { text: 'Just do it.', rotated: true }
]

/**
 * Hero section subtitle text
 * @type {string}
 */
export const heroSubtitle = "The point is you don't need nunflix etc."

/**
 * Application cards configuration
 * @type {Array<{key: string, icon: string, name: string, description: string, port: string, url: string}>}
 */
export const apps = [
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

/**
 * Ecosystem flow steps configuration
 * @type {Array<{icon: string, title: string, description: string}>}
 */
export const flowSteps = [
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

/**
 * Ecosystem detail cards configuration
 * @type {Array<{title: string, description: string}>}
 */
export const detailCards = [
  {
    title: 'Prowlarr → Media Managers',
    description:
      'Central hub. Add indexers once and sync them to every *ARR service automatically.'
  },
  {
    title: 'Media Managers → qBittorrent',
    description:
      'Request content, let the *ARR apps search trackers, and qBittorrent handles the downloads.'
  },
  {
    title: 'qBittorrent → Media Library',
    description:
      'Completed downloads are moved, renamed, and organized with zero manual work.'
  },
  {
    title: 'Media Library → Jellyfin',
    description: 'Jellyfin scans folders, enriches metadata, and streams it everywhere.'
  },
  {
    title: 'Homarr Dashboard',
    description:
      'Monitor every container, service, and integration from a single dashboard.'
  }
]

/**
 * Tutorial steps configuration
 * @type {Array<{number: string, title: string, paragraphs: string[], codeBlocks: string[], lists: Array<{title: string | null, items: string[]}>}>}
 */
export const tutorialSteps = [
  {
    number: '01',
    title: 'Initial Setup',
    paragraphs: ['Docker installed? Start the stack:', 'Fix permissions:'],
    codeBlocks: ['sudo docker-compose up -d', 'chown -R 1000:1000 /media/Arr'],
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
    codeBlocks: ['sudo docker logs qbittorrent'],
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
    title: 'You're Done',
    paragraphs: ['Your stack is ready. Use it intentionally:'],
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

/**
 * Footer resources links
 * @type {Array<{label: string, url: string}>}
 */
export const resources = [
  { label: 'Servarr Wiki', url: 'https://wiki.servarr.com/' },
  { label: 'Trash Guides', url: 'https://trash-guides.info/' }
]

/**
 * DOOM game iframe URL
 * @type {string}
 */
export const doomUrl = 'https://doom.bluesixtech.io'

