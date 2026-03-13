import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../constants'
import Swal from 'sweetalert2'

const filterTags = ['All', 'Web', 'Mobile']

const Projects = () => {
  const [active, setActive] = useState('All')

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
          popup: 'border-2 border-red-500/30 shadow-2xl shadow-red-500/20 backdrop-blur-sm rounded-xl',
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
    window.open(project.githubRepo, '_blank')
  }

  return (
    <section
      id="projects"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ background: 'var(--bg2)' }}
    >
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
                      {project.status === 'private' ? '🔒' : '→'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Projects