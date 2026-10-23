import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Projects from './components/Projects'
import PersonalProjects from './components/PersonalProjects'
import Contact from './components/Contact'

// ── Custom cursor ──────────────────────────────────────────────────────────────

const Cursor = () => {
  const canvasRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches){
      setIsTouch(true)
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // reads the current CSS variable value at runtime
    const getCSSVar = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()

    let mouseMoved = false
    const pointer = { x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight }
    const params = {
      pointsNumber: 40,
      widthFactor: 0.3,
      spring: 0.4,
      friction: 0.5,
    }

    const trail = Array.from({ length: params.pointsNumber }, () => ({
      x: pointer.x, y: pointer.y, dx: 0, dy: 0,
    }))

    const onMove = (e) => { mouseMoved = true; pointer.x = e.clientX; pointer.y = e.clientY }
    const onTouch = (e) => { mouseMoved = true; pointer.x = e.targetTouches[0].clientX; pointer.y = e.targetTouches[0].clientY }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch)

    const setupCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    let rafId
    const update = (t) => {
      if (!mouseMoved) {
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth
        pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trail.forEach((p, i) => {
        const prev = i === 0 ? pointer : trail[i - 1]
        const spring = i === 0 ? 0.4 * params.spring : params.spring
        p.dx += (prev.x - p.x) * spring
        p.dy += (prev.y - p.y) * spring
        p.dx *= params.friction
        p.dy *= params.friction
        p.x += p.dx
        p.y += p.dy
      })

      // pulls the live CSS var each frame — reacts to theme switches instantly
      const violet = getCSSVar('--violet')
      const cyan = getCSSVar('--cyan')

      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(trail[0].x, trail[0].y)

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x)
        const yc = 0.5 * (trail[i].y + trail[i + 1].y)
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc)
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i)

        // gradient along the tail: violet at head → cyan at tip
        const progress = i / trail.length
        ctx.strokeStyle = progress < 0.5 ? violet : cyan
        ctx.globalAlpha = 1 - progress * 0.6  // fades toward the tail
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', setupCanvas)
    }
  }, [])

  if (isTouch) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}
    />
  )
}

// Add this component inside App.jsx, above the App function
const ScrollProgress = () => {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '2px', 
      width: `${pct}%`, background: 'linear-gradient(90deg, #7B2FFF, #00E5FF)', zIndex: 9999 }} 
    />
  )
}

// ── App ────────────────────────────────────────────────────────────────────────
const App = () => {
  const { t } = useTranslation()

  return (
    <div
      className="overflow-x-hidden antialiased"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="noise" />
      <Cursor />
      <div
        className="bg-glow fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(123,47,255,0.18), transparent)' }}
      />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <PersonalProjects />
        <Contact />
      </main>

      <footer
        className="flex flex-wrap justify-between items-center gap-4 px-12 py-8 text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}
      >
        <span>{t('footer.copyright')}</span>
        <div className="flex gap-6">
          <a href="https://github.com/YassineElkefi" target="_blank" rel="noreferrer"
            className="transition-colors" style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >GitHub</a>
          <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" rel="noreferrer"
            className="transition-colors" style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >LinkedIn</a>
          <a href="mailto:yassine.elkefi6@gmail.com"
            className="transition-colors" style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >Email</a>
        </div>
      </footer>
    </div>
  )
}

export default App