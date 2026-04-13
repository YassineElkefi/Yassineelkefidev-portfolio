import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../constants'
import Swal from 'sweetalert2'

const filterTags = ['All', 'Web', 'Mobile']

/* ─────────────────────────────────────────────────────────────
   SLIDESHOW MODAL
   ───────────────────────────────────────────────────────────── */
const SlideshowModal = ({ project, onClose }) => {
  const [current, setCurrent] = useState(0)
  const images = project.screenshots || []
  const total = images.length
  const isWeb = project.tag === 'Web'

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className={`relative w-full ${isWeb ? 'max-w-6xl' : 'max-w-3xl'} mx-4 rounded-2xl overflow-hidden flex flex-col`}
        style={{ background: 'var(--surface)', border: `1px solid ${project.accent}33`, maxHeight: '92vh' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: `1px solid ${project.accent}22` }}
        >
          <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
            {project.emoji} {project.title} — Screenshots
          </span>
          <div className="flex items-center gap-3">
            {project.githubRepo && project.status !== 'private' && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  color: project.accent,
                  border: `1px solid ${project.accent}44`,
                  background: `${project.accent}11`,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}22` }}
                onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}11` }}
              >
                GitHub →
              </a>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 modal-close-btn"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: 'transparent',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="relative flex items-center justify-center overflow-hidden flex-1" style={{ minHeight: isWeb ? '60vh' : '400px' }}>
          {images.map((src, i) => i !== current && (
            <img key={`preload-${i}`} src={src} alt="" aria-hidden className="absolute opacity-0 pointer-events-none w-0 h-0" />
          ))}
          <AnimatePresence initial={false}>
            <motion.img
              key={current}
              src={images[current]}
              alt={`${project.title} screenshot ${current + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: 'absolute' }}
              transition={{ duration: 0.15 }}
              className="absolute w-full h-full object-contain"
              style={{ maxHeight: isWeb ? '75vh' : '60vh' }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 modal-nav-btn"
                style={{
                  border: `1px solid ${project.accent}33`,
                  color: 'var(--text)',
                  '--nav-hover-bg': `${project.accent}33`,
                }}
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 modal-nav-btn"
                style={{
                  border: `1px solid ${project.accent}33`,
                  color: 'var(--text)',
                  '--nav-hover-bg': `${project.accent}33`,
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots + counter */}
        {total > 1 && (
          <div
            className="flex items-center justify-center gap-2 py-3 flex-shrink-0"
            style={{ borderTop: `1px solid ${project.accent}22` }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-200"
                style={{
                  width: i === current ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? project.accent : `${project.accent}44`,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
            <span className="ml-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {current + 1} / {total}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LIVE PREVIEW MODAL
   ───────────────────────────────────────────────────────────── */
const LivePreviewModal = ({ project, onClose }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden flex flex-col"
        style={{ background: 'var(--surface)', border: `1px solid ${project.accent}33`, height: '85vh' }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0 modal-browser-chrome"
          style={{ borderBottom: `1px solid ${project.accent}22` }}
        >
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full transition-opacity"
              style={{ background: '#FF5F57' }}
              title="Close"
            />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#FEBC2E' }} />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#28C840' }} />
          </div>

          <div
            className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs truncate modal-url-bar"
            style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            <span style={{ color: project.accent }}>🔒</span>
            <span className="truncate">{project.demoUrl}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200"
              style={{
                color: project.accent,
                border: `1px solid ${project.accent}44`,
                background: `${project.accent}11`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}22` }}
              onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}11` }}
              title="Open in new tab"
            >
              ↗ Open
            </a>
            {project.githubRepo && project.status !== 'private' && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 modal-ghost-btn"
                style={{
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                }}
              >
                GitHub →
              </a>
            )}
          </div>
        </div>

        {/* iframe */}
        <div className="relative flex-1 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'var(--surface)', zIndex: 1 }}>
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${project.accent}44`, borderTopColor: project.accent }}
              />
              <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Loading preview…</span>
            </div>
          )}
          <iframe
            src={project.demoUrl}
            title={`${project.title} live preview`}
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DEMO CHOICE MODAL
   ───────────────────────────────────────────────────────────── */
const DemoChoiceModal = ({ project, onClose, onGithub, onDemo }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const demoLabel = project.demo === 'live' ? '🌐 Live Preview' : '🖼️ Screenshots'
  const demoSub   = project.demo === 'live' ? 'Open inside portfolio' : 'Browse app screenshots'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm mx-4 rounded-2xl overflow-hidden p-6"
        style={{
          background: 'var(--surface)',
          border: `1px solid ${project.accent}33`,
          boxShadow: `0 0 60px ${project.accent}18`,
        }}
      >
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">{project.emoji}</div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>What would you like to open?</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Demo button */}
          <button
            onClick={onDemo}
            className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left w-full"
            style={{
              background: `${project.accent}0D`,
              border: `1px solid ${project.accent}33`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}1A` }}
            onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}0D` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${project.accent}22` }}
            >
              {project.demo === 'live' ? '🌐' : '🖼️'}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: project.accent }}>{demoLabel}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{demoSub}</div>
            </div>
            <span className="ml-auto text-lg" style={{ color: project.accent }}>›</span>
          </button>

          {/* GitHub button */}
          <button
            onClick={onGithub}
            className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left w-full modal-ghost-btn"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 modal-icon-bg">
              ⌥
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>GitHub Repository</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>View source code</div>
            </div>
            <span className="ml-auto text-lg" style={{ color: 'var(--muted)' }}>›</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 modal-ghost-btn"
          style={{ color: 'var(--muted)', border: '1px solid var(--border)', background: 'transparent' }}
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
const Projects = () => {
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tag === active)

  const handleClick = (project) => {
    if (project.status === 'private') {
      Swal.fire({
        title: '🔒 Private Repository',
        html: `
          <div class="text-gray-300 mb-4">
            <p class="mb-2">This repository is <span class="text-red-400 font-semibold">private</span>.</p>
            <p>Contact me for more details about <span class="text-cyan-400 font-medium">${project.title}</span></p>
          </div>`,
        icon: 'warning',
        iconColor: '#EF4444',
        confirmButtonText: '📧 Contact Me',
        confirmButtonColor: '#06B6D4',
        background: 'linear-gradient(145deg, #1a1a1a, #262626)',
        color: '#FFFFFF',
        customClass: {
          popup: 'border-2 border-red-500/30 shadow-2xl rounded-xl',
          title: 'text-xl font-bold text-red-400 mb-4',
          confirmButton: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
          cancelButton: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
          actions: 'gap-4 mt-6',
        },
        showCancelButton: true,
        cancelButtonText: '✕ Close',
        cancelButtonColor: '#6B7280',
        buttonsStyling: false,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `mailto:yassine.elkefi6@gmail.com?subject=Inquiry about Private Project: ${project.title}&body=Hi Yassine,%0D%0A%0D%0AI would like to know more about "${project.title}".%0D%0A%0D%0AThank you!`
        }
      })
      return
    }

    // If the project has a demo, show the choice modal; otherwise go straight to GitHub
    if (project.demo) {
      setModal({ type: 'choice', project })
    } else {
      window.open(project.githubRepo, '_blank')
    }
  }

  const closeModal = () => setModal(null)

  return (
    <section
      id="projects"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ background: 'var(--bg2)' }}
    >
      <style>{`
        .modal-backdrop {
          background: var(--modal-backdrop, rgba(0, 0, 0, 0.75));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        :root[data-theme="light"] .modal-backdrop,
        .light .modal-backdrop,
        [class*="light"] .modal-backdrop {
          background: rgba(0, 0, 0, 0.45);
        }
        .modal-browser-chrome {
          background: var(--surface-raised, rgba(0, 0, 0, 0.18));
        }
        .modal-url-bar {
          background: var(--input-bg, rgba(0, 0, 0, 0.06));
        }
        .modal-nav-btn {
          background: var(--modal-nav-bg, rgba(0, 0, 0, 0.45));
          backdrop-filter: blur(6px);
        }
        .modal-nav-btn:hover {
          background: var(--nav-hover-bg, rgba(255,255,255,0.15)) !important;
        }
        .modal-ghost-btn:hover {
          background: var(--ghost-hover, rgba(0, 0, 0, 0.06)) !important;
        }
        .modal-close-btn:hover {
          background: var(--ghost-hover, rgba(0, 0, 0, 0.08)) !important;
        }
        .modal-icon-bg {
          background: var(--icon-bg, rgba(0, 0, 0, 0.07));
        }
        :root[data-theme="dark"] .modal-nav-btn,
        .dark .modal-nav-btn,
        [class*="dark"] .modal-nav-btn {
          background: rgba(0, 0, 0, 0.55);
        }
        :root[data-theme="dark"] .modal-browser-chrome,
        .dark .modal-browser-chrome,
        [class*="dark"] .modal-browser-chrome {
          background: rgba(0, 0, 0, 0.3);
        }
        :root[data-theme="dark"] .modal-url-bar,
        .dark .modal-url-bar,
        [class*="dark"] .modal-url-bar {
          background: rgba(255, 255, 255, 0.05);
        }
        :root[data-theme="dark"] .modal-ghost-btn:hover,
        .dark .modal-ghost-btn:hover,
        [class*="dark"] .modal-ghost-btn:hover {
          background: rgba(255, 255, 255, 0.06) !important;
        }
        :root[data-theme="dark"] .modal-close-btn:hover,
        .dark .modal-close-btn:hover,
        [class*="dark"] .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }
        :root[data-theme="dark"] .modal-icon-bg,
        .dark .modal-icon-bg,
        [class*="dark"] .modal-icon-bg {
          background: rgba(255, 255, 255, 0.06);
        }
        :root[data-theme="dark"] .modal-backdrop,
        .dark .modal-backdrop,
        [class*="dark"] .modal-backdrop {
          background: rgba(0, 0, 0, 0.88);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="section-label">Work</div>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
            >
              Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className="font-mono text-xs tracking-widest uppercase px-4 md:px-5 py-2 rounded transition-all duration-200"
                style={{
                  border: `1px solid ${active === tag ? 'var(--violet)' : 'var(--border-bright)'}`,
                  background: active === tag ? 'rgba(123,47,255,0.15)' : 'transparent',
                  color: active === tag ? 'var(--text)' : 'var(--muted)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleClick(project)}
                className="group relative flex flex-col rounded-xl overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                }}
                whileHover={{ y: -6 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.accent + '55')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                />

                {/* Thumbnail */}
                <div className="relative overflow-hidden h-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0.2) 100%)' }}
                  />
                  {/* Tags over image */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        background: 'rgba(6,6,8,0.7)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(240,238,246,0.7)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {project.tag}
                    </span>
                    {project.status === 'private' && (
                      <span
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: 'rgba(255,50,50,0.15)',
                          border: '1px solid rgba(255,50,50,0.35)',
                          color: '#FF5555',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        Private
                      </span>
                    )}
                    {project.demo === 'live' && (
                      <span
                        className="font-mono text-xs px-2 py-1 rounded flex items-center gap-1"
                        style={{
                          background: 'rgba(40,200,80,0.12)',
                          border: '1px solid rgba(40,200,80,0.35)',
                          color: '#4ade80',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                        Live
                      </span>
                    )}
                    {project.demo === 'slideshow' && (
                      <span
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: `${project.accent}18`,
                          border: `1px solid ${project.accent}44`,
                          color: project.accent,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        🖼️ Preview
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <h6
                    className="text-base md:text-lg font-bold mb-2"
                    style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}
                  >
                    {project.emoji} {project.title}
                  </h6>

                  <p
                    className="text-sm leading-relaxed mb-5 flex-1"
                    style={{ color: 'var(--muted)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tech + action */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{
                            color: project.accent,
                            border: `1px solid ${project.accent}30`,
                            background: `${project.accent}0D`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className="font-mono text-xs flex items-center gap-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      {project.status === 'private' ? '🔒' : project.demo ? '⊕' : '→'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal?.type === 'choice' && (
          <DemoChoiceModal
            key="choice"
            project={modal.project}
            onClose={closeModal}
            onGithub={() => { closeModal(); window.open(modal.project.githubRepo, '_blank') }}
            onDemo={() => setModal({ type: modal.project.demo, project: modal.project })}
          />
        )}
        {modal?.type === 'slideshow' && (
          <SlideshowModal key="slideshow" project={modal.project} onClose={closeModal} />
        )}
        {modal?.type === 'live' && (
          <LivePreviewModal key="live" project={modal.project} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects