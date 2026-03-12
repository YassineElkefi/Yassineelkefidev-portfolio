import { motion } from 'framer-motion'
import { ABOUT_TEXT } from '../constants'
import aboutImg from '../assets/about.webp'

const stats = [
  { num: '4+', label: 'Years Coding' },
  { num: '8+', label: 'Projects Built' },
  { num: '4',  label: 'Internships' },
]

const About = () => {
  return (
    <section id="about" className="border-b border-neutral-900 py-28 px-12">
      <div className="max-w-7xl mx-auto">

        <div className="section-label">About Me</div>

        <div className="flex flex-wrap lg:flex-nowrap gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0 w-full lg:w-[380px]"
          >
            {/* Accent frame */}
            <div
              className="absolute rounded-xl pointer-events-none"
              style={{
                inset: 0,
                border: '1px solid rgba(123,47,255,0.45)',
                transform: 'translate(12px, 12px)',
                zIndex: 0,
              }}
            />
            <div className="relative z-10 rounded-xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img
                src={aboutImg}
                alt="About Yassine"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              {/* Bottom gradient */}
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
            className="flex-1"
          >
            <h2
              className="text-5xl font-extrabold leading-tight tracking-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Building digital
              <br />
              <span style={{ color: '#00E5FF' }}>experiences</span>
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(240,238,246,0.5)' }}>
              {ABOUT_TEXT}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-lg transition-all duration-300 hover:border-cyan-400/50 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="text-4xl font-extrabold leading-none mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #00E5FF, #7B2FFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(240,238,246,0.4)' }}>
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