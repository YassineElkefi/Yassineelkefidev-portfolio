import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../constants'
import Swal from 'sweetalert2'
import { ArrowRight, ArrowUpRight, CirclePlus, GitBranch, Globe, Images, LockKeyhole } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   SLIDESHOW MODAL
   ───────────────────────────────────────────────────────────── */
const SlideshowModal = ({ project, onClose }) => {
  const { t } = useTranslation()
  const ProjectIcon = project.icon
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        className="modal-panel relative w-[96vw] max-w-[1600px] rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '94vh' }}
      >
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--modal-border)' }}>
          <span className="font-bold text-base" style={{ color: 'var(--modal-text)' }}>
            <ProjectIcon size={18} style={{ color: project.accent }} />
            {t(`projects.items.${project.i18nKey}.title`)} — {t('projects.screenshots_header')}
          </span>
          <div className="flex items-center gap-3">
            {project.githubRepo && project.status !== 'private' && (
              <a href={project.githubRepo} target="_blank" rel="noreferrer"
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 modal-accent-btn"
                style={{ color: project.accent, border: '1px solid var(--modal-border)' }}
              >GitHub →</a>
            )}
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 modal-close-btn"
              style={{ color: 'var(--modal-muted)', border: '1px solid var(--modal-border)', background: 'var(--modal-chrome)' }}
            >✕</button>
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden flex-1" style={{ minHeight: isWeb ? 'min(68vh, 700px)' : 'min(50vh, 400px)' }}>
          {images.map((src, i) => i !== current && (
            <img key={`preload-${i}`} src={src} alt="" aria-hidden className="absolute opacity-0 pointer-events-none w-0 h-0" />
          ))}
          <AnimatePresence initial={false}>
            <motion.img
              key={current} src={images[current]} alt={`${t(`projects.items.${project.i18nKey}.title`)} screenshot ${current + 1}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, position: 'absolute' }}
              transition={{ duration: 0.15 }}
              className="absolute w-full h-full object-contain"
              style={{ maxHeight: isWeb ? '78vh' : '65vh' }}
            />
          </AnimatePresence>
          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 modal-nav-btn" style={{ color: 'var(--modal-text)' }}>‹</button>
              <button onClick={next} className="absolute right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 modal-nav-btn" style={{ color: 'var(--modal-text)' }}>›</button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--modal-border)' }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-200"
                style={{ width: i === current ? '20px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? project.accent : 'var(--modal-border)', border: 'none', cursor: 'pointer', padding: 0 }}
              />
            ))}
            <span className="ml-2 font-mono text-xs" style={{ color: 'var(--modal-muted)' }}>{current + 1} / {total}</span>
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
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        className="modal-panel relative w-[96vw] max-w-[1600px] rounded-2xl overflow-hidden flex flex-col"
        style={{ height: '90vh' }}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0 modal-browser-chrome" style={{ borderBottom: '1px solid var(--modal-border)' }}>
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full" style={{ background: '#FF5F57' }} title="Close" />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#FEBC2E' }} />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#28C840' }} />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs truncate modal-url-bar" style={{ border: '1px solid var(--modal-border)', color: 'var(--modal-muted)' }}>
            <LockKeyhole size={14} style={{ color: project.accent, flexShrink: 0 }} />
            <span className="truncate">{project.demoUrl}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href={project.demoUrl} target="_blank" rel="noreferrer"
              className="font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200 modal-accent-btn"
              style={{ color: project.accent, border: '1px solid var(--modal-border)' }}
            ><ArrowUpRight size={14} /> Open</a>
            {project.githubRepo && project.status !== 'private' && (
              <a href={project.githubRepo} target="_blank" rel="noreferrer"
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 modal-ghost-btn"
                style={{ color: 'var(--modal-muted)', border: '1px solid var(--modal-border)', background: 'var(--modal-chrome)' }}
              >GitHub →</a>
            )}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'var(--modal-bg)', zIndex: 1 }}>
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--modal-border)', borderTopColor: project.accent }} />
              <span className="font-mono text-xs" style={{ color: 'var(--modal-muted)' }}>{t('projects.loading_preview')}</span>
            </div>
          )}
          <iframe src={project.demoUrl} title={`${t(`projects.items.${project.i18nKey}.title`)} live preview`} className="w-full h-full border-0" onLoad={() => setLoading(false)} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DEMO CHOICE MODAL
   ───────────────────────────────────────────────────────────── */
const DemoChoiceModal = ({ project, onClose, onGithub, onDemo }) => {
  const { t } = useTranslation()
  const ProjectIcon = project.icon

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const demoLabel = project.demo === 'live' ? t('projects.modal_live_label') : t('projects.modal_screenshots_label')
  const demoSub   = project.demo === 'live' ? t('projects.modal_live_sub')   : t('projects.modal_screenshots_sub')

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        className="modal-panel w-full max-w-sm mx-4 rounded-2xl overflow-hidden p-6"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        <div className="text-center mb-6">
          <ProjectIcon size={32} className="mx-auto mb-2" style={{ color: project.accent }} />
          <h3 className="font-bold text-lg" style={{ color: 'var(--modal-text)', letterSpacing: '-0.02em' }}>
            {t(`projects.items.${project.i18nKey}.title`)}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--modal-muted)' }}>{t('projects.modal_what')}</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onDemo}
            className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left w-full modal-choice-btn"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 modal-icon-bg">
              {project.demo === 'live' ? <Globe size={20} /> : <Images size={20} />}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: project.accent }}>{demoLabel}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--modal-muted)' }}>{demoSub}</div>
            </div>
            <span className="ml-auto text-lg" style={{ color: project.accent }}>›</span>
          </button>
          <button onClick={onGithub}
            className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left w-full modal-ghost-btn"
            style={{ background: 'var(--modal-chrome)', border: '1px solid var(--modal-border)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 modal-icon-bg"><GitBranch size={20} /></div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--modal-text)' }}>{t('projects.modal_github_label')}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--modal-muted)' }}>{t('projects.modal_github_sub')}</div>
            </div>
            <span className="ml-auto text-lg" style={{ color: 'var(--modal-muted)' }}>›</span>
          </button>
        </div>
        <button onClick={onClose}
          className="w-full mt-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 modal-ghost-btn"
          style={{ color: 'var(--modal-muted)', border: '1px solid var(--modal-border)', background: 'var(--modal-chrome)' }}
        >{t('projects.modal_cancel')}</button>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
const Projects = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)

  const filterTags = [
    { key: 'All',    label: t('projects.filter_all') },
    { key: 'Web',    label: t('projects.filter_web') },
    { key: 'Mobile', label: t('projects.filter_mobile') },
  ]

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = 
      `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`
  }

  const resetTilt = (e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === active)

  const handleClick = (project) => {
    const projectTitle = t(`projects.items.${project.i18nKey}.title`)

    if (project.status === 'private') {
      Swal.fire({
        title: t('projects.private_title'),
        html: `<div class="text-gray-300 mb-4"><p class="mb-2">${t('projects.private_body_1')} <span class="text-red-400 font-semibold">${t('projects.private_body_2')}</span>.</p><p>${t('projects.private_body_3')} <span class="text-cyan-400 font-medium">${projectTitle}</span></p></div>`,
        icon: 'warning',
        iconColor: '#EF4444',
        confirmButtonText: t('projects.private_confirm'),
        confirmButtonColor: '#06B6D4',
        background: 'linear-gradient(145deg, #1a1a1a, #262626)',
        color: '#FFFFFF',
        customClass: { popup: 'border-2 border-red-500/30 shadow-2xl rounded-xl', title: 'text-xl font-bold text-red-400 mb-4', confirmButton: 'px-6 py-3 rounded-lg font-semibold', cancelButton: 'px-6 py-3 rounded-lg font-semibold', actions: 'gap-4 mt-6' },
        showCancelButton: true,
        cancelButtonText: t('projects.private_cancel'),
        cancelButtonColor: '#6B7280',
        buttonsStyling: false,
        allowEscapeKey: true,
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = `mailto:yassine.elkefi6@gmail.com?subject=Inquiry about Private Project: ${projectTitle}&body=Hi Yassine,%0D%0A%0D%0AI would like to know more about "${projectTitle}".%0D%0A%0D%0AThank you!`
        }
      })
      return
    }
    if (project.demo) setModal({ type: 'choice', project })
    else window.open(project.githubRepo, '_blank')
  }

  const closeModal = () => setModal(null)

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="section-label">{t('projects.label')}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}>
              {t('projects.heading')}
            </h2>
          </div>
          <div className="flex gap-2">
            {filterTags.map(({ key, label }) => (
              <button key={key} onClick={() => setActive(key)}
                className="font-mono text-xs tracking-widest uppercase px-4 md:px-5 py-2 rounded transition-all duration-200"
                style={{ border: `1px solid ${active === key ? 'var(--violet)' : 'var(--border-bright)'}`, background: active === key ? 'rgba(123,47,255,0.15)' : 'transparent', color: active === key ? 'var(--text)' : 'var(--muted)' }}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div key={project.i18nKey} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleClick(project)}
                className="group relative flex flex-col rounded-xl overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = project.accent + '66'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${project.accent}22, 0 0 0 1px ${project.accent}22`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ top: '176px', background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, zIndex: 10 }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{ 
                        top: '176px', 
                        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                        filter: 'blur(0.5px)',
                        zIndex: 10 
                      }}
                    />
                  </div>
                <div className="relative overflow-hidden h-44">
                  <img src={project.image} alt={t(`projects.items.${project.i18nKey}.title`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0.2) 100%)' }} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(6,6,8,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,238,246,0.7)', backdropFilter: 'blur(8px)' }}>{project.tag}</span>
                    {project.status === 'private' && <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,50,50,0.15)', border: '1px solid rgba(255,50,50,0.35)', color: '#FF5555', backdropFilter: 'blur(8px)' }}>Private</span>}
                    {project.demo === 'live' && <span className="font-mono text-xs px-2 py-1 rounded flex items-center gap-1" style={{ background: 'rgba(40,200,80,0.12)', border: '1px solid rgba(40,200,80,0.35)', color: '#4ade80', backdropFilter: 'blur(8px)' }}><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />Live</span>}
                    {project.demo === 'slideshow' && <span className="font-mono text-xs px-2 py-1 rounded flex items-center gap-1" style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}44`, color: project.accent, backdropFilter: 'blur(8px)' }}><Images size={12} /> Preview</span>}
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <h6 className="text-base md:text-lg font-bold mb-2" style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>
                    <project.icon size={18} style={{ color: project.accent, display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.35rem' }} />
                    {t(`projects.items.${project.i18nKey}.title`)}
                  </h6>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--muted)' }}>
                    {t(`projects.items.${project.i18nKey}.description`)}
                  </p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: project.accent, border: `1px solid ${project.accent}30`, background: `${project.accent}0D` }}>{tech}</span>
                      ))}
                    </div>
                    <span className="font-mono text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                      {project.status === 'private' ? <LockKeyhole size={16} /> : project.demo ? <CirclePlus size={16} /> : <ArrowRight size={16} />}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modal?.type === 'choice' && <DemoChoiceModal key="choice" project={modal.project} onClose={closeModal} onGithub={() => { closeModal(); window.open(modal.project.githubRepo, '_blank') }} onDemo={() => setModal({ type: modal.project.demo, project: modal.project })} />}
        {modal?.type === 'slideshow' && <SlideshowModal key="slideshow" project={modal.project} onClose={closeModal} />}
        {modal?.type === 'live' && <LivePreviewModal key="live" project={modal.project} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}

export default Projects