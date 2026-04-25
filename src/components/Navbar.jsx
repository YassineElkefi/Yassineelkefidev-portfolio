import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter, FaDiscord } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { key: 'about',      label: t('nav.about') },
    { key: 'skills',     label: t('nav.skills') },
    { key: 'experience', label: t('nav.experience') },
    { key: 'projects',   label: t('nav.projects') },
    { key: 'contact',    label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (key) => {
    setMenuOpen(false)
    document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-400 ${
          scrolled || menuOpen ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          background: scrolled || menuOpen ? 'rgba(var(--nav-rgb, 6,6,8), 0.95)' : 'transparent',
          borderBottom: `1px solid ${scrolled || menuOpen ? 'var(--border)' : 'transparent'}`,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #00E5FF, #7B2FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            YE.
          </span>
        </div>

        {/* Nav Links — desktop only */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {NAV_LINKS.map(({ key, label }) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Socials — hide on very small screens */}
          <div className="hidden sm:flex items-center gap-4 text-xl">
            <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><FaLinkedin /></a>
            <a href="https://github.com/YassineElkefi" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><FaGithub /></a>
            <a href="https://x.com/YassineElkefi" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><FaSquareXTwitter /></a>
            <a href="https://www.instagram.com/yassine_elkefi/" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#F472B6'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><FaInstagram /></a>
            <a href="http://discord.com/users/189012634056654849" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#818CF8'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><FaDiscord /></a>
          </div>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--text)', transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }} />
            <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--text)', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--text)', transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu fixed top-[68px] left-0 right-0 z-40 lg:hidden"
            style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(20px)' }}
          >
            <ul className="flex flex-col list-none py-4">
              {NAV_LINKS.map(({ key, label }, i) => (
                <motion.li key={key} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <button
                    onClick={() => handleNavClick(key)}
                    className="w-full text-left px-6 py-4 font-mono text-sm tracking-widest uppercase transition-colors duration-200"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Socials in mobile menu */}
            <div className="flex items-center gap-5 px-6 py-4 border-t text-xl" style={{ borderColor: 'var(--border)' }}>
              <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><FaLinkedin /></a>
              <a href="https://github.com/YassineElkefi" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><FaGithub /></a>
              <a href="https://x.com/YassineElkefi" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><FaSquareXTwitter /></a>
              <a href="https://www.instagram.com/yassine_elkefi/" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><FaInstagram /></a>
              <a href="http://discord.com/users/189012634056654849" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><FaDiscord /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar