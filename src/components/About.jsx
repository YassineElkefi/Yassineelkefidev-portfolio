import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import aboutImg from '../assets/about.webp'
import { useEffect, useRef, useState } from 'react'

const About = () => {
  const { t } = useTranslation()

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

  const stats = [
  { num: 6,  suffix: '+', label: t('about.stats.years') },
  { num: 16, suffix: '+', label: t('about.stats.projects') },
  { num: 4,  suffix: '',  label: t('about.stats.internships') },
]

  return (
    <section
      id="about"
      className="border-b py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">{t('about.label')}</div>
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
              {t('about.heading_1')}
              <br />
              <span style={{ color: 'var(--cyan)' }}>{t('about.heading_2')}</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 md:mb-10" style={{ color: 'var(--muted)' }}>
              {t('about.body')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-3 md:p-5 rounded-lg transition-all duration-300"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
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
                    <CountUp target={s.num} suffix={s.suffix} />
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