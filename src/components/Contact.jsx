import { motion } from 'framer-motion'
import { CONTACT } from '../constants'

const Contact = () => {
  return (
    <section id="contact" className="border-b border-neutral-900 py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="section-label">Let's Talk</div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            <h2
              className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 md:mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Ready to build
              <br />
              <span style={{ color: '#FF3CAC' }}>something great?</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-md" style={{ color: 'rgba(240,238,246,0.5)' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of an ambitious team.
            </p>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3 md:gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none', color: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00E5FF55')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: 'rgba(0,229,255,0.1)' }}
                >
                  ✉
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'rgba(240,238,246,0.4)' }}>Email</div>
                  <div className="text-sm truncate">{CONTACT.email}</div>
                </div>
              </a>

              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: 'rgba(123,47,255,0.1)' }}
                >
                  📍
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'rgba(240,238,246,0.4)' }}>Location</div>
                  <div className="text-sm">{CONTACT.address}</div>
                </div>
              </div>

              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: 'rgba(255,60,172,0.1)' }}
                >
                  📞
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'rgba(240,238,246,0.4)' }}>Phone</div>
                  {/* Stack phone numbers on mobile */}
                  <div className="text-sm hidden md:block">{CONTACT.phoneNo.join('  |  ')}</div>
                  <div className="flex flex-col gap-0.5 md:hidden">
                    {CONTACT.phoneNo.map((p) => (
                      <span key={p} className="text-sm">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 w-full"
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Name', 'Email'].map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(240,238,246,0.4)' }}>
                      {field}
                    </label>
                    <input
                      type={field === 'Email' ? 'email' : 'text'}
                      placeholder={field === 'Email' ? 'you@email.com' : 'Your name'}
                      className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'var(--text, #F0EEF6)',
                        fontFamily: 'Syne, sans-serif',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#7B2FFF')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(240,238,246,0.4)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project inquiry"
                  className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'var(--text, #F0EEF6)',
                    fontFamily: 'Syne, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#7B2FFF')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(240,238,246,0.4)' }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'var(--text, #F0EEF6)',
                    fontFamily: 'Syne, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#7B2FFF')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="btn-primary justify-center mt-2"
              >
                <span>Send Message</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact