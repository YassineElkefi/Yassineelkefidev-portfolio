import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import aboutImg from '../assets/about.webp'
import { useEffect, useRef, useState } from 'react'

const CountUp = ({ target, suffix = '' }) => {
  const [val, setVal] = useState(0)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const dur = 1400
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val}{suffix}</span>
}

const stats = (t) => [
  { num: 7,  suffix: '+', label: t('about.stats.years') },
  { num: 19, suffix: '+', label: t('about.stats.projects') },
  { num: 4,  suffix: '',  label: t('about.stats.internships') },
]

const About = () => {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="border-b py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">{t('about.label')}</div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl flex flex-col md:grid"
          style={{
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr) minmax(0,1.1fr)',
            border: '1px solid var(--border)',
          }}
        >
          {/* ── Stats ──
              Mobile:  horizontal row, cells separated by left borders
              md+:     vertical column, cells separated by top borders + right border on the column
          */}
          <div
            className="flex flex-row md:flex-col md:border-r"
            style={{ borderColor: 'var(--border)' }}
          >
            {stats(t).map((s, i) => (
              <div
                key={s.label}
                className={[
                  'flex-1 flex flex-col justify-center px-4 py-6 md:px-8 md:py-10',
                  // mobile: left border between cells
                  i > 0 ? 'border-l md:border-l-0' : '',
                  // md+: top border between cells
                  i > 0 ? 'md:border-t' : '',
                ].join(' ')}
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className="text-3xl md:text-5xl font-extrabold leading-none mb-1 md:mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF, #7B2FFF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <CountUp target={s.num} suffix={s.suffix} />
                </div>
                <div
                  className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--muted)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Text ── */}
          <div
            className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 border-t md:border-t-0 md:border-l"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2
              className="text-2xl md:text-4xl font-extrabold leading-tight mb-4 md:mb-6"
              style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
            >
              {t('about.heading_1')}
              <br />
              <span style={{ color: 'var(--cyan)' }}>{t('about.heading_2')}</span>
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {t('about.body')}
            </p>
          </div>

          {/* ── Photo ──
              Mobile:  clamp height so the image shows without dominating
              md+:     fills the grid cell (height set by the row)
          */}
          <div
            className="relative overflow-hidden border-t md:border-t-0 md:border-l"
            style={{
              minHeight: 'clamp(220px, 45vw, 480px)',
              borderColor: 'var(--border)',
            }}
          >
            <img
              src={aboutImg}
              alt="About Yassine"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(6,6,8,0.55) 0%, transparent 50%)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About