import { motion } from 'framer-motion'
import { ABOUT_TEXT } from '../constants'
import aboutImg from '../assets/about.webp'

const stats = [
  { num: '6+', label: 'Years Coding' },
  { num: '16+', label: 'Projects Built' },
  { num: '4',  label: 'Internships' },
]

const About = () => {
  return (
    <section id="about" className="border-b border-neutral-900 py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">About Me</div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-[340px] xl:w-[380px] flex-shrink-0"
          >
            <div
              className="absolute rounded-xl pointer-events-none"
              style={{
                inset: 0,
                border: '1px solid rgba(123,47,255,0.45)',
                transform: 'translate(10px, 10px)',
                zIndex: 0,
              }}
            />
            <div
              className="relative z-10 rounded-xl overflow-hidden"
              style={{ aspectRatio: '3/4', maxHeight: '420px' }}
            >
              <img
                src={aboutImg}
                alt="About Yassine"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.75) 0%, transparent 55%)' }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex-1 min-w-0"
          >
            <h2
              className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
              style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
            >
              Building digital
              <br />
              <span style={{ color: 'var(--cyan)' }}>experiences</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 md:mb-10" style={{ color: 'var(--muted)' }}>
              {ABOUT_TEXT}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-3 md:p-5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div
                    className="text-2xl md:text-4xl font-extrabold leading-none mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #00E5FF, #7B2FFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About