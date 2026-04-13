import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL_PROJECTS } from '../constants'
import Swal from 'sweetalert2'

// Countries considered Muslim-majority (OIC members + a few more)
const MUSLIM_COUNTRIES = new Set([
  'AF','AL','DZ','AZ','BH','BD','BJ','BF','BN','CM','TD','KM',
  'DJ','EG','GN','GW','GY','ID','IR','IQ','JO','KZ','KW','KG',
  'LB','LY','MY','MV','ML','MR','MA','MZ','NE','NG','OM','PK',
  'PS','QA','SA','SN','SL','SO','SD','SR','SY','TJ','TZ','TG',
  'TN','TR','TM','UG','AE','UZ','YE','LR','GM','CI','GA',
])

/* ─────────────────────────────────────────────────────────────
   SLIDESHOW MODAL
   ───────────────────────────────────────────────────────────── */
const SlideshowModal = ({ project, onClose }) => {
  const [current, setCurrent] = useState(0)
  const images = project.screenshots || []
  const total = images.length

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
      {/* Card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden flex flex-col"
        style={{ background: 'var(--surface)', border: `1px solid ${project.accent}33`, maxHeight: '90vh' }}
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
        <div className="relative flex items-center justify-center overflow-hidden flex-1" style={{ minHeight: '500px' }}>
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
              style={{ maxHeight: '65vh' }}
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
const PersonalProjects = () => {
  const [modal, setModal] = useState(null)
  // Start with the full list; will filter out Islami for non-Muslim countries once geo resolves
  const [visibleProjects, setVisibleProjects] = useState(PERSONAL_PROJECTS)
  // DEV ONLY — remove before pushing
  //useEffect(() => { setVisibleProjects(PERSONAL_PROJECTS) }, [])

  /* ── Geolocation filter ── */
  useEffect(() => {
    // We use the free, no-key-required ip-api.com endpoint.
    // Falls back to showing ALL projects if the request fails (fail-open).
    fetch('/api/geo')
      .then(r => r.json())
      .then(({ countryCode }) => {
        if (!MUSLIM_COUNTRIES.has(countryCode)) {
          setVisibleProjects(PERSONAL_PROJECTS.filter(p => p.title !== 'Islami'))
        }
        // If the country IS in the set, keep the full list (already set)
      })
      .catch(() => {
        // Network error or blocked → show everything (fail-open)
      })
  }, [])

  const handleProjectClick = (project) => {
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

    if (!project.demo) {
      window.open(project.githubRepo, '_blank')
      return
    }

    setModal({ type: 'choice', project })
  }

  const closeModal = () => setModal(null)

  return (
    <section
      id="personal-projects"
      className="border-b py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
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
        .modal-browser-chrome { background: var(--surface-raised, rgba(0, 0, 0, 0.18)); }
        .modal-url-bar { background: var(--input-bg, rgba(0, 0, 0, 0.06)); }
        .modal-nav-btn {
          background: var(--modal-nav-bg, rgba(0, 0, 0, 0.45));
          backdrop-filter: blur(6px);
        }
        .modal-nav-btn:hover { background: var(--nav-hover-bg, rgba(255,255,255,0.15)) !important; }
        .modal-ghost-btn:hover { background: var(--ghost-hover, rgba(0, 0, 0, 0.06)) !important; }
        .modal-close-btn:hover { background: var(--ghost-hover, rgba(0, 0, 0, 0.08)) !important; }
        .modal-icon-bg { background: var(--icon-bg, rgba(0, 0, 0, 0.07)); }
        :root[data-theme="dark"] .modal-nav-btn,
        .dark .modal-nav-btn,
        [class*="dark"] .modal-nav-btn { background: rgba(0, 0, 0, 0.55); }
        :root[data-theme="dark"] .modal-browser-chrome,
        .dark .modal-browser-chrome,
        [class*="dark"] .modal-browser-chrome { background: rgba(0, 0, 0, 0.3); }
        :root[data-theme="dark"] .modal-url-bar,
        .dark .modal-url-bar,
        [class*="dark"] .modal-url-bar { background: rgba(255, 255, 255, 0.05); }
        :root[data-theme="dark"] .modal-ghost-btn:hover,
        .dark .modal-ghost-btn:hover,
        [class*="dark"] .modal-ghost-btn:hover { background: rgba(255, 255, 255, 0.06) !important; }
        :root[data-theme="dark"] .modal-close-btn:hover,
        .dark .modal-close-btn:hover,
        [class*="dark"] .modal-close-btn:hover { background: rgba(255, 255, 255, 0.08) !important; }
        :root[data-theme="dark"] .modal-icon-bg,
        .dark .modal-icon-bg,
        [class*="dark"] .modal-icon-bg { background: rgba(255, 255, 255, 0.06); }
        :root[data-theme="dark"] .modal-backdrop,
        .dark .modal-backdrop,
        [class*="dark"] .modal-backdrop { background: rgba(0, 0, 0, 0.88); }

        .pp-card { display: flex; flex-direction: column; }
        .pp-thumb-wrap {
          position: relative; width: 100%; height: 200px;
          overflow: hidden; flex-shrink: 0; border-radius: 0;
        }
        .pp-thumb-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pp-card:hover .pp-thumb-wrap img { transform: scale(1.05); }
        @media (min-width: 1024px) {
          .pp-card { flex-direction: row; align-items: center; }
          .pp-thumb-wrap { width: 160px; height: 160px; margin: 1.25rem; border-radius: 0.75rem; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="section-label">Side Work</div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 md:mb-14"
          style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
        >
          Personal Projects
        </motion.h2>

        <div className="flex flex-col gap-5 md:gap-6">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="pp-card group rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              whileHover={{ borderColor: project.accent + '44' }}
            >
              {/* Thumbnail */}
              <div className="pp-thumb-wrap">
                <img src={project.image} alt={project.title} />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.65) 0%, transparent 60%)' }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h6 className="text-lg md:text-xl font-bold" style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>
                    {project.emoji} {project.title}
                  </h6>

                  {project.status === 'private' && (
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', color: '#FF5555' }}>
                      Private
                    </span>
                  )}

                  {project.demo === 'live' && (
                    <span className="font-mono text-xs px-2 py-1 rounded flex items-center gap-1" style={{ background: 'rgba(40,200,80,0.08)', border: '1px solid rgba(40,200,80,0.28)', color: '#4ade80' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                      Live
                    </span>
                  )}
                  {project.demo === 'slideshow' && (
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: `${project.accent}0D`, border: `1px solid ${project.accent}33`, color: project.accent }}>
                      🖼️ Preview
                    </span>
                  )}

                  <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border-bright)', color: 'var(--muted)' }}>
                    {project.tag}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 md:px-3 py-1 rounded"
                      style={{ color: project.accent, border: `1px solid ${project.accent}35`, background: `${project.accent}0D` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div
                className="hidden lg:flex flex-shrink-0 text-2xl pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: project.accent }}
              >
                {project.status === 'private' ? '🔒' : project.demo ? '⊕' : '→'}
              </div>
            </motion.div>
          ))}
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

export default PersonalProjects