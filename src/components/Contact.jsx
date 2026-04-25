import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '../constants'
import { useState } from 'react'

const Contact = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const mailtoLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    form.subject
  )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`

  return (
    <section
      id="contact"
      className="border-b py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">{t('contact.label')}</div>

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
              style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
            >
              {t('contact.heading_1')}
              <br />
              <span style={{ color: 'var(--pink)' }}>{t('contact.heading_2')}</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-md" style={{ color: 'var(--muted)' }}>
              {t('contact.sub')}
            </p>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3 md:gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: 'rgba(0,229,255,0.1)' }}>✉</div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--muted)' }}>{t('contact.email_label')}</div>
                  <div className="text-sm truncate" style={{ color: 'var(--text)' }}>{CONTACT.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: 'rgba(123,47,255,0.1)' }}>📍</div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--muted)' }}>{t('contact.location_label')}</div>
                  <div className="text-sm" style={{ color: 'var(--text)' }}>{CONTACT.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: 'rgba(255,60,172,0.1)' }}>📞</div>
                <div className="min-w-0">
                  <div className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--muted)' }}>{t('contact.phone_label')}</div>
                  <div className="text-sm hidden md:block" style={{ color: 'var(--text)' }}>{CONTACT.phoneNo.join('  |  ')}</div>
                  <div className="flex flex-col gap-0.5 md:hidden">
                    {CONTACT.phoneNo.map(p => <span key={p} className="text-sm" style={{ color: 'var(--text)' }}>{p}</span>)}
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
                {[
                  { key: 'name',  label: t('contact.form_name'),  type: 'text',  placeholder: t('contact.form_name_placeholder') },
                  { key: 'email', label: t('contact.form_email'), type: 'email', placeholder: t('contact.form_email_placeholder') },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}
                      onFocus={e => e.target.style.borderColor = 'var(--violet)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{t('contact.form_subject')}</label>
                <input
                  type="text"
                  placeholder={t('contact.form_subject_placeholder')}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = 'var(--violet)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{t('contact.form_message')}</label>
                <textarea
                  placeholder={t('contact.form_message_placeholder')}
                  rows={5}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = 'var(--violet)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <a href={mailtoLink} className="btn-primary justify-center mt-2">
                <span>{t('contact.form_send')}</span>
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