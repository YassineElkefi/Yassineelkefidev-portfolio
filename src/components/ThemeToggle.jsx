import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const { i18n } = useTranslation()

  const isDark = theme === 'dark'
  const isRTL = i18n.dir() === 'rtl'

  // Use positive movement only
  const thumbX = isDark ? 28 : 2

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full flex-shrink-0 transition-colors duration-300"
      style={{
        background: isDark
          ? 'rgba(123,47,255,0.25)'
          : 'rgba(0,229,255,0.2)',
        border: isDark
          ? '1px solid rgba(123,47,255,0.5)'
          : '1px solid rgba(0,180,220,0.5)',
      }}
    >
      {/* Sun */}
      <span
        className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] select-none pointer-events-none"
        style={{ opacity: isDark ? 0.4 : 1 }}
      >
        ☀️
      </span>

      {/* Moon */}
      <span
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] select-none pointer-events-none"
        style={{ opacity: isDark ? 1 : 0.4 }}
      >
        🌙
      </span>

      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full shadow-md"
        animate={{
          x: isRTL ? -thumbX : thumbX,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        style={{
          // Anchor depending on direction
          left: isRTL ? 'auto' : 0,
          right: isRTL ? 0 : 'auto',

          background: isDark
            ? 'linear-gradient(135deg, #7B2FFF, #00E5FF)'
            : 'linear-gradient(135deg, #00C8E0, #FF3CAC)',
        }}
      />
    </button>
  )
}

export default ThemeToggle