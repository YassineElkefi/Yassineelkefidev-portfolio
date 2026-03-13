import { motion } from 'framer-motion'
import { PERSONAL_PROJECTS } from '../constants'
import Swal from 'sweetalert2'

const PersonalProjects = () => {
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
    window.open(project.githubRepo, '_blank')
  }

  return (
    <section id="personal-projects" className="border-b border-neutral-900 py-20 md:py-28 px-6 md:px-12">
      <style>{`
        .pp-card { display: flex; flex-direction: column; }
        .pp-thumb-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
          border-radius: 0;
        }
        .pp-thumb-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pp-card:hover .pp-thumb-wrap img { transform: scale(1.05); }
        @media (min-width: 1024px) {
          .pp-card { flex-direction: row; align-items: center; }
          .pp-thumb-wrap {
            width: 160px;
            height: 160px;
            margin: 1.25rem;
            border-radius: 0.75rem;
          }
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
          style={{ letterSpacing: '-0.03em' }}
        >
          Personal Projects
        </motion.h2>

        <div className="flex flex-col gap-5 md:gap-6">
          {PERSONAL_PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="pp-card group rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer',
              }}
              whileHover={{ borderColor: project.accent + '44' }}
            >
              {/* Thumbnail — single image, always visible at every breakpoint */}
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
                  <h6 className="text-lg md:text-xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                    {project.emoji} {project.title}
                  </h6>
                  {project.status === 'private' && (
                    <span
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        background: 'rgba(255,50,50,0.1)',
                        border: '1px solid rgba(255,50,50,0.3)',
                        color: '#FF5555',
                      }}
                    >
                      Private
                    </span>
                  )}
                  <span
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(240,238,246,0.5)',
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,238,246,0.5)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 md:px-3 py-1 rounded"
                      style={{
                        color: project.accent,
                        border: `1px solid ${project.accent}35`,
                        background: `${project.accent}0D`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow — desktop only */}
              <div
                className="hidden lg:flex flex-shrink-0 text-2xl pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: project.accent }}
              >
                {project.status === 'private' ? '🔒' : '→'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PersonalProjects