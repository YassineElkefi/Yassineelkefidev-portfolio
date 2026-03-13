import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter, FaDiscord } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (link) => {
    setMenuOpen(false)
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-400 ${
          scrolled || menuOpen
            ? 'bg-[rgba(6,6,8,0.95)] backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-transparent border-b border-transparent'
        }`}
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
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Socials — hide on very small screens, show on sm+ */}
          <div className="hidden sm:flex items-center gap-4 text-xl">
            <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" className="text-white/45 hover:text-blue-400 transition-colors duration-200"><FaLinkedin /></a>
            <a href="https://github.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors duration-200"><FaGithub /></a>
            <a href="https://x.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors duration-200"><FaSquareXTwitter /></a>
            <a href="https://www.instagram.com/yassine_elkefi/" target="_blank" className="text-white/45 hover:text-pink-400 transition-colors duration-200"><FaInstagram /></a>
            <a href="http://discord.com/users/189012634056654849" target="_blank" className="text-white/45 hover:text-indigo-400 transition-colors duration-200"><FaDiscord /></a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
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
            className="fixed top-[68px] left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(6,6,8,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <ul className="flex flex-col list-none py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(link)}
                    className="w-full text-left px-6 py-4 font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
                  >
                    {link}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Socials in mobile menu */}
            <div className="flex items-center gap-5 px-6 py-4 border-t text-xl" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" className="text-white/45 hover:text-blue-400 transition-colors"><FaLinkedin /></a>
              <a href="https://github.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors"><FaGithub /></a>
              <a href="https://x.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors"><FaSquareXTwitter /></a>
              <a href="https://www.instagram.com/yassine_elkefi/" target="_blank" className="text-white/45 hover:text-pink-400 transition-colors"><FaInstagram /></a>
              <a href="http://discord.com/users/189012634056654849" target="_blank" className="text-white/45 hover:text-indigo-400 transition-colors"><FaDiscord /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar