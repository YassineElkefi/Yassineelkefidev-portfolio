import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import profilePic from '../assets/yassineELKEFIProfile.jpeg'
import resume from '../assets/resume.pdf'
import { FaGithub, FaFileAlt } from 'react-icons/fa'

const container = (delay) => ({
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start xl:items-center px-6 md:px-12 overflow-hidden"
      style={{ paddingTop: 'max(7rem, 15vh)', paddingBottom: '4rem' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(123,47,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(123,47,255,0.12) 0%, transparent 70%)',
          top: -200, right: -200,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center gap-12 xl:gap-16">

        {/* Text */}
        <div className="flex-1 min-w-0">

          <motion.div variants={container(0)} initial="hidden" animate="visible">
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 md:px-5 py-2 rounded-full font-mono text-xs"
              style={{
                background: 'rgba(0,229,255,0.06)',
                border: '1px solid rgba(0,229,255,0.2)',
                color: 'var(--cyan)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--cyan)', animation: 'pulse 2s ease-in-out infinite' }}
              />
              {t('hero.badge')}
            </div>
          </motion.div>

          <motion.h1
            variants={container(0.1)}
            initial="hidden"
            animate="visible"
            className="font-extrabold leading-[0.92] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: 'var(--text)' }}
          >
            Yassine
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #FF3CAC, #00E5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ELKEFI
            </span>
          </motion.h1>

          <motion.p
            variants={container(0.25)}
            initial="hidden"
            animate="visible"
            className="font-mono text-base md:text-lg mb-6"
            style={{ color: 'var(--muted)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            variants={container(0.35)}
            initial="hidden"
            animate="visible"
            className="text-sm md:text-base leading-relaxed max-w-lg mb-10"
            style={{ color: 'var(--muted)' }}
          >
            {t('about.body')}
          </motion.p>

          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a href={resume} target="_blank" rel="noreferrer" className="btn-primary">
              <span>{t('hero.cta_resume')}</span>
              <FaFileAlt />
            </a>
            <a href="https://github.com/YassineElkefi" target="_blank" rel="noreferrer" className="btn-ghost">
              <span>{t('hero.cta_github')}</span>
              <FaGithub />
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
          className="flex-shrink-0 flex justify-center xl:justify-end"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: '1px solid rgba(123,47,255,0.5)',
                transform: 'translate(12px, 12px)',
                zIndex: 0,
              }}
            />
            <img
              src={profilePic}
              alt="Yassine ELKEFI"
              className="relative z-10 rounded-2xl object-cover object-top"
              style={{
                width: 'clamp(180px, 38vw, 420px)',
                maxHeight: '420px',
                aspectRatio: '3/4',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl z-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.7), transparent)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden sm:flex absolute bottom-10 left-6 md:left-12 font-mono text-xs tracking-widest uppercase items-center gap-4"
        style={{ color: 'var(--muted)' }}
      >
        <div className="w-14 h-px relative overflow-hidden" style={{ background: 'var(--border-bright)' }}>
          <div
            className="absolute inset-y-0 left-0 w-full"
            style={{ background: 'var(--cyan)', animation: 'scanline 2s ease-in-out infinite' }}
          />
        </div>
        {t('hero.scroll')}
      </div>

      <style>{`
        @keyframes scanline { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.75); } }
      `}</style>
    </section>
  )
}

export default Hero