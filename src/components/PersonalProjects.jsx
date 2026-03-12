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
    <section id="personal-projects" className="border-b border-neutral-900 py-28 px-12">
      <div className="max-w-7xl mx-auto">

        <div className="section-label">Side Work</div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight mb-14"
          style={{ letterSpacing: '-0.03em' }}
        >
          Personal Projects
        </motion.h2>

        <div className="flex flex-col gap-10">
          {PERSONAL_PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group flex flex-wrap lg:flex-nowrap gap-8 items-center p-6 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{ borderColor: project.accent + '44' }}
            >
              {/* Thumbnail */}
              <div
                className="flex-shrink-0 relative overflow-hidden rounded-lg"
                style={{ width: 160, height: 160 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(6,6,8,0.3), transparent)' }}
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h6 className="text-xl font-bold" style={{ letterSpacing: '-0.02em' }}>
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
                      Private Repository
                    </span>
                  )}
                  <span
                    className="font-mono text-xs px-2 py-1 rounded ml-auto"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(240,238,246,0.5)',
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,238,246,0.5)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1 rounded"
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

              {/* Arrow */}
              <div
                className="flex-shrink-0 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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