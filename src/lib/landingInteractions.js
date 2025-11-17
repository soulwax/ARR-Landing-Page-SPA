const passiveOptions = { passive: true }

export function initLandingPageInteractions() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {}
  }

  const cleanup = []
  const menuToggle = document.querySelector('.menu-toggle')
  const navMenu = document.querySelector('.nav-menu')

  if (menuToggle && navMenu) {
    const handleMenuToggle = () => {
      navMenu.classList.toggle('active')
      menuToggle.classList.toggle('active')
    }
    menuToggle.addEventListener('click', handleMenuToggle)
    cleanup.push(() => menuToggle.removeEventListener('click', handleMenuToggle))
  }

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const handleNavClick = () => {
      navMenu?.classList.remove('active')
      menuToggle?.classList.remove('active')
    }
    link.addEventListener('click', handleNavClick)
    cleanup.push(() => link.removeEventListener('click', handleNavClick))
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const handler = (event) => {
      const href = anchor.getAttribute('href')
      if (!href || href.length < 2) {
        return
      }
      const target = document.querySelector(href)
      if (!target) {
        return
      }
      event.preventDefault()
      const offset = 80
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    anchor.addEventListener('click', handler)
    cleanup.push(() => anchor.removeEventListener('click', handler))
  })

  const animatedObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
              }
            })
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )
      : null

  if (animatedObserver) {
    document
      .querySelectorAll('.app-card, .detail-card, .tutorial-step, .flow-step')
      .forEach((el) => animatedObserver.observe(el))
    cleanup.push(() => animatedObserver.disconnect())
  }

  const heroVisual = document.querySelector('.hero-visual')
  const floatingShapes = document.querySelector('.floating-shapes')
  let mouseUpdateScheduled = false
  const handleMouseMove = (event) => {
    if (mouseUpdateScheduled) return
    mouseUpdateScheduled = true
    requestAnimationFrame(() => {
      if (!heroVisual || !floatingShapes) {
        mouseUpdateScheduled = false
        return
      }
      const rect = heroVisual.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        mouseUpdateScheduled = false
        return
      }
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      floatingShapes.style.setProperty('--mouse-x', x.toString())
      floatingShapes.style.setProperty('--mouse-y', y.toString())
      mouseUpdateScheduled = false
    })
  }
  document.addEventListener('mousemove', handleMouseMove, passiveOptions)
  cleanup.push(() => document.removeEventListener('mousemove', handleMouseMove, passiveOptions))

  let scrollUpdateScheduled = false
  const handleShapeScroll = () => {
    if (scrollUpdateScheduled) return
    scrollUpdateScheduled = true
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.3 + index * 0.1
        const yPos = -(scrolled * speed)
        shape.style.setProperty('--scroll-y', `${yPos}px`)
      })
      scrollUpdateScheduled = false
    })
  }
  window.addEventListener('scroll', handleShapeScroll, passiveOptions)
  cleanup.push(() => window.removeEventListener('scroll', handleShapeScroll, passiveOptions))

  const particleContainer = document.querySelector('.particle-container')
  let particleVisibilityObserver = null
  const motionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null

  const getParticleCount = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || 0
    if (width >= 1600) return 5
    if (width >= 1200) return 4
    if (width >= 900) return 3
    return 2
  }

  const createParticles = () => {
    if (!particleContainer) return
    particleContainer.innerHTML = ''

    if (motionQuery?.matches) {
      particleContainer.classList.add('particles-paused')
      return
    }

    particleContainer.classList.remove('particles-paused')
    const particleCount = getParticleCount()
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement('div')
      particle.className = 'particle'

      const size = (Math.random() * 3 + 3).toFixed(2)
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = (Math.random() * 6 + 14).toFixed(2)
      const delay = (Math.random() * 4).toFixed(2)
      const floatX = (Math.random() * 80 - 40).toFixed(2)
      const floatY = -(Math.random() * 140 + 60).toFixed(2)
      const startScale = (Math.random() * 0.3 + 0.7).toFixed(2)
      const endScale = (Math.random() * 0.4 + 0.9).toFixed(2)
      const midScale = ((parseFloat(startScale) + parseFloat(endScale)) / 2).toFixed(2)

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `${delay}s`
      particle.style.setProperty('--float-x', `${floatX}px`)
      particle.style.setProperty('--float-y', `${floatY}px`)
      particle.style.setProperty('--start-scale', startScale)
      particle.style.setProperty('--mid-scale', midScale)
      particle.style.setProperty('--end-scale', endScale)

      fragment.appendChild(particle)
    }

    particleContainer.appendChild(fragment)
  }

  if (particleContainer) {
    const setupParticleVisibilityObserver = () => {
      if (!('IntersectionObserver' in window) || particleVisibilityObserver) {
        return
      }
      const heroSection = particleContainer.closest('.hero') || particleContainer
      particleVisibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              particleContainer.classList.remove('particles-paused')
            } else {
              particleContainer.classList.add('particles-paused')
            }
          })
        },
        { threshold: 0.15 }
      )
      particleVisibilityObserver.observe(heroSection)
    }

    setupParticleVisibilityObserver()
    createParticles()
  }

  if (motionQuery) {
    const handleMotionPreferenceChange = () => createParticles()
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionPreferenceChange)
      cleanup.push(() => motionQuery.removeEventListener('change', handleMotionPreferenceChange))
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(handleMotionPreferenceChange)
      cleanup.push(() => motionQuery.removeListener(handleMotionPreferenceChange))
    }
  }

  const refreshParticlesOnResize = debounce(() => createParticles(), 250)
  window.addEventListener('resize', refreshParticlesOnResize)
  cleanup.push(() => window.removeEventListener('resize', refreshParticlesOnResize))

  let doomLoaded = false
  let doomLoadRequested = false
  const doomIframe = document.getElementById('doom-iframe')
  const loadingDiv = document.getElementById('doom-loading')
  const doomStartButton = document.getElementById('doom-start-button')
  const doomGameContainer = document.querySelector('.doom-game-container')
  let loadTimeout

  const loadDoomIframe = () => {
    if (doomLoadRequested || doomLoaded || !doomIframe || !loadingDiv) return
    doomLoadRequested = true
    loadingDiv.style.display = 'flex'

    const src = doomIframe.getAttribute('data-src')
    let hasLoaded = false

    if (doomStartButton) {
      doomStartButton.classList.add('hidden')
      doomStartButton.setAttribute('aria-hidden', 'true')
    }

    doomIframe.onload = () => {
      hasLoaded = true
      doomLoaded = true
      doomLoadRequested = false
      clearTimeout(loadTimeout)
      loadingDiv.style.display = 'none'
      doomGameContainer?.classList.remove('doom-loading-active')
    }

    doomIframe.onerror = () => {
      doomLoadRequested = false
      clearTimeout(loadTimeout)
      loadingDiv.innerHTML =
        '<p style="color: #f59e0b;">Failed to load DOOM portal.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">Ensure the iframe URL is reachable before retrying.</p>'
      doomGameContainer?.classList.remove('doom-loading-active')
    }

    loadTimeout = window.setTimeout(() => {
      if (!hasLoaded && loadingDiv.style.display !== 'none') {
        loadingDiv.innerHTML =
          '<p style="color: #f59e0b;">Connection timeout.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">Verify the DOOM service is online.</p>'
        doomGameContainer?.classList.remove('doom-loading-active')
        doomLoadRequested = false
      }
    }, 8000)

    doomIframe.src = src || ''
  }

  if (loadingDiv) {
    loadingDiv.style.display = 'none'
  }

  if (doomStartButton) {
    const handleDoomStart = (event) => {
      event.preventDefault()
      if (doomLoaded || doomLoadRequested) return
      doomGameContainer?.classList.add('doom-loading-active')
      loadDoomIframe()
    }
    doomStartButton.addEventListener('click', handleDoomStart)
    cleanup.push(() => doomStartButton.removeEventListener('click', handleDoomStart))
  }

  if (doomGameContainer) {
    const handleDoomContainerClick = (event) => {
      if (doomLoaded || doomLoadRequested) return
      if (event.target && event.target.closest && event.target.closest('#doom-start-button')) {
        return
      }
      doomGameContainer.classList.add('doom-loading-active')
      loadDoomIframe()
    }
    doomGameContainer.addEventListener('click', handleDoomContainerClick)
    cleanup.push(() => doomGameContainer.removeEventListener('click', handleDoomContainerClick))
  }

  const rippleTargets = document.querySelectorAll('.cta-button, .app-link')
  rippleTargets.forEach((target) => {
    const handleRipple = (event) => {
      const ripple = document.createElement('span')
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.classList.add('ripple')

      target.appendChild(ripple)
      window.setTimeout(() => ripple.remove(), 600)
    }
    target.addEventListener('click', handleRipple)
    cleanup.push(() => target.removeEventListener('click', handleRipple))
  })

  const sections = document.querySelectorAll('section[id]')
  const navAnchors = document.querySelectorAll('.nav-menu a[href^="#"]')
  let navUpdateScheduled = false
  const handleActiveNav = () => {
    if (navUpdateScheduled) return
    navUpdateScheduled = true
    requestAnimationFrame(() => {
      let current = ''
      const scrollPosition = window.pageYOffset
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (scrollPosition >= sectionTop - 120) {
          current = section.getAttribute('id') || ''
        }
      })

      navAnchors.forEach((link) => {
        const href = link.getAttribute('href')
        if (href === `#${current}`) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      })
      navUpdateScheduled = false
    })
  }
  window.addEventListener('scroll', handleActiveNav, passiveOptions)
  cleanup.push(() => window.removeEventListener('scroll', handleActiveNav, passiveOptions))
  handleActiveNav()

  document.body.classList.add('loaded')

  return () => {
    cleanup.forEach((fn) => fn())
    if (particleVisibilityObserver) {
      particleVisibilityObserver.disconnect()
    }
    if (loadTimeout) {
      clearTimeout(loadTimeout)
    }
  }
}

function debounce(func, wait = 250) {
  let timeout
  return (...args) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => func(...args), wait)
  }
}

