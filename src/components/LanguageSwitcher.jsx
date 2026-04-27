import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import { motion, AnimatePresence } from 'framer-motion'

const LANGS = [
  { code: 'en', label: 'English',  short: 'EN', country: 'GB' },
  { code: 'fr', label: 'Français', short: 'FR', country: 'FR' },
  { code: 'ar', label: 'العربية',  short: 'AR', country: 'SA' },
]

const dropdown = {
  hidden: {
    opacity: 0,
    y: -6,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: {
      duration: 0.12,
      ease: 'easeIn',
    },
  },
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGS.find(l => l.code === i18n.language?.slice(0, 2)) ?? LANGS[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (code) => { i18n.changeLanguage(code); setOpen(false) }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-xs transition-all duration-200"
        style={{
          background: open ? 'rgba(123,47,255,0.12)' : 'transparent',
          border: `1px solid ${open ? 'rgba(123,47,255,0.45)' : 'var(--border)'}`,
          color: 'var(--text)',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.borderColor = 'var(--border-bright)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = open ? 'rgba(123,47,255,0.45)' : 'var(--border)' }}
      >
        <ReactCountryFlag
          countryCode={current.country}
          svg
          style={{
            width: '1.2em',
            height: '1.2em',
            borderRadius: '9999px',
          }}
          title={current.label}
        />        
        <span className="tracking-widest uppercase hidden sm:inline">{current.short}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown — always anchored to the right edge of the trigger */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            variants={dropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute mt-2 rounded-xl overflow-hidden z-50"
            style={{
              insetInlineEnd: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              minWidth: '150px',
              top: '100%',
              transformOrigin: 'top right',
            }}
          >
            {LANGS.map(({ code, label, short, country }, idx) => {
              const isActive = code === current.code

              return (
                <button
                  key={code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => select(code)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 transition-colors duration-150"
                  style={{
                    background: isActive ? 'rgba(123,47,255,0.1)' : 'transparent',
                    borderBottom: idx < LANGS.length - 1 ? '1px solid var(--border)' : 'none',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    cursor: 'pointer',
                    textAlign: 'start',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(123,47,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <ReactCountryFlag
                    countryCode={country}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      flexShrink: 0,
                      borderRadius: '9999px',
                    }}
                    title={label}
                  />

                  <span className="font-mono text-xs tracking-widest uppercase">
                    {short}
                  </span>

                  <span className="flex-1 text-xs" style={{ color: 'var(--muted)', opacity: 0.8 }}>
                    {label}
                  </span>

                  {isActive && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--violet)', flexShrink: 0 }}>
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher