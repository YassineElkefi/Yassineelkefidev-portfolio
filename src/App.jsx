import { useEffect, useRef } from 'react'
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

// ── App ────────────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <div
      className="overflow-x-hidden antialiased"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Film grain overlay */}
      <div className="noise" />

      {/* Custom cursor */}
      <Cursor />

      {/* Background radial glow (fixed) */}
      <div
        className="bg-glow fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(123,47,255,0.18), transparent)',
        }}
      />

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

      {/* Footer */}
      <footer
        className="flex flex-wrap justify-between items-center gap-4 px-12 py-8 text-xs"
        style={{
          borderTop: '1px solid var(--border)',
          color: 'var(--muted)',
          fontFamily: "'DM Mono', monospace",
        }}
      >
        <span>© 2026 Yassine ELKEFI</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/YassineElkefi"
            target="_blank"
            className="transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yassine-elkefi/"
            target="_blank"
            className="transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            LinkedIn
          </a>
          <a
            href="mailto:yassine.elkefi6@gmail.com"
            className="transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App