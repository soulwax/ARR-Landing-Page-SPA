<script>
  import { onMount } from 'svelte';
  import {
      apps,
      detailCards,
      doomUrl,
      flowSteps,
      heroSubtitle,
      heroTitleLines,
      navLinks,
      resources,
      tutorialSteps
  } from './lib/constants';
  import { initLandingPageInteractions } from './lib/landingInteractions';

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
