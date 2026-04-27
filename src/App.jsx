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
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top  = `${pos.current.y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor cursor-dot" />
      <div ref={ringRef} className="cursor cursor-ring" />
    </>
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