import { useState, useEffect } from 'react'
import logo from '../assets/YassineELkefiLogo.png'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter, FaDiscord } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-400 ${
        scrolled
          ? 'bg-[rgba(6,6,8,0.85)] backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        {/*<img className="w-12" src={logo} alt="logo" /> */}
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

      {/* Nav Links */}
      <ul className="hidden lg:flex items-center gap-10 list-none">
        {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
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

      {/* Socials */}
      <div className="flex items-center gap-4 text-xl">
        <a href="https://www.linkedin.com/in/yassine-elkefi/" target="_blank" className="text-white/45 hover:text-blue-400 transition-colors duration-200">
          <FaLinkedin />
        </a>
        <a href="https://github.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors duration-200">
          <FaGithub />
        </a>
        <a href="https://x.com/YassineElkefi" target="_blank" className="text-white/45 hover:text-white transition-colors duration-200">
          <FaSquareXTwitter />
        </a>
        <a href="https://www.instagram.com/yassine_elkefi/" target="_blank" className="text-white/45 hover:text-pink-400 transition-colors duration-200">
          <FaInstagram />
        </a>
        <a href="http://discord.com/users/189012634056654849" target="_blank" className="text-white/45 hover:text-indigo-400 transition-colors duration-200">
          <FaDiscord />
        </a>
      </div>
    </motion.nav>
  )
}

export default Navbar