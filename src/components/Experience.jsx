import { motion } from 'framer-motion'
import { EXPERIENCES } from '../constants'

const Experience = () => {
  return (
    <section id="experience" className="border-b border-neutral-900 py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="section-label">Career</div>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 md:mb-16"
          style={{ letterSpacing: '-0.03em' }}
        >
          Work Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-10" style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-10 md:mb-14 last:mb-0"
            >
              {/* Timeline dot */}
              <div
                className="absolute rounded-full transition-transform duration-300 hover:scale-150"
                style={{
                  width: 10, height: 10,
                  background: exp.color,
                  border: `1px solid ${exp.color}`,
                  left: -28,
                  top: 6,
                  boxShadow: `0 0 12px ${exp.color}66`,
                }}
              />

              {/* Year */}
              <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(240,238,246,0.4)' }}>
                {exp.year}
              </p>

              {/* Role */}
              <h6 className="text-lg md:text-xl font-bold mb-1" style={{ letterSpacing: '-0.01em' }}>
                {exp.role}
              </h6>

              {/* Company */}
              <p className="font-mono text-sm mb-3 md:mb-4" style={{ color: exp.color }}>
                {exp.company}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4 md:mb-5" style={{ color: 'rgba(240,238,246,0.5)', maxWidth: '42rem' }}>
                {exp.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 md:px-3 py-1 rounded"
                    style={{
                      color: exp.color,
                      border: `1px solid ${exp.color}40`,
                      background: `${exp.color}0D`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience