import { motion } from 'framer-motion'
import { HERO_CONTENT } from '../constants'
import profilePic from '../assets/yassineELKEFIProfile.jpeg'
import resume from '../assets/resume.pdf'
import { FaGithub, FaFileAlt } from 'react-icons/fa'

const container = (delay) => ({
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-16 px-12 overflow-hidden">

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

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center gap-12">

        {/* Left: Text */}
        <div className="flex-1 min-w-[320px]">

          {/* Status badge */}
          <motion.div variants={container(0)} initial="hidden" animate="visible">
            <div
              className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full font-mono text-xs"
              style={{
                background: 'rgba(0,229,255,0.06)',
                border: '1px solid rgba(0,229,255,0.2)',
                color: '#00E5FF',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00E5FF', animation: 'pulse 2s ease-in-out infinite' }}
              />
              Available for new opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={container(0.1)}
            initial="hidden"
            animate="visible"
            className="font-extrabold leading-[0.92] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)' }}
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

          {/* Title */}
          <motion.p
            variants={container(0.25)}
            initial="hidden"
            animate="visible"
            className="font-mono text-lg mb-7"
            style={{ color: 'rgba(240,238,246,0.45)' }}
          >
            <span className="text-white">Mobile</span> &amp;{' '}
            <span className="text-white">Full Stack</span> Developer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={container(0.35)}
            initial="hidden"
            animate="visible"
            className="text-base leading-relaxed max-w-lg mb-12"
            style={{ color: 'rgba(240,238,246,0.45)' }}
          >
            {HERO_CONTENT}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a href={resume} target="_blank" className="btn-primary">
              <span>Resume</span>
              <FaFileAlt />
            </a>
            <a href="https://github.com/YassineElkefi" target="_blank" className="btn-ghost">
              <span>GitHub</span>
              <FaGithub />
            </a>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Accent border behind */}
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
                width: 'clamp(260px, 28vw, 420px)',
                aspectRatio: '3/4',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              }}
            />
            {/* Gradient overlay bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl z-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.7), transparent)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-12 font-mono text-xs tracking-widest uppercase flex items-center gap-4"
        style={{ color: 'rgba(240,238,246,0.35)' }}
      >
        <div className="w-14 h-px bg-white/20 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background: '#00E5FF',
              animation: 'scanline 2s ease-in-out infinite',
            }}
          />
        </div>
        scroll
      </div>

      <style>{`
        @keyframes scanline { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.75); } }
      `}</style>
    </section>
  )
}

export default Hero