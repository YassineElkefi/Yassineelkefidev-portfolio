import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { EXPERIENCES } from '../constants'

const Experience = () => {
  const { t } = useTranslation()

  return (
    <section
      id="experience"
      className="border-b py-20 md:py-28 px-6 md:px-12"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">{t('experience.label')}</div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 md:mb-14"
          style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
        >
          {t('experience.heading')}
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--border)', marginLeft: '7px' }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 md:gap-10 items-start md:ps-10"
              >
                <div
                  className="hidden md:block absolute w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}66`,
                    left: 0,
                  }}
                />

                <div
                  className="flex-1 p-5 md:p-7 rounded-xl transition-all duration-300 group"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = exp.color + '55'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h6
                        className="text-lg md:text-xl font-bold leading-tight"
                        style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                      >
                        {t(`experience.items.${exp.i18nKey}.role`)}
                      </h6>
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: exp.color }}
                      >
                        {t(`experience.items.${exp.i18nKey}.company`)}
                      </span>
                    </div>
                    <span
                      className="font-mono text-xs px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}33`,
                        color: exp.color,
                      }}
                    >
                      {t(`experience.items.${exp.i18nKey}.year`)}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                    {t(`experience.items.${exp.i18nKey}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 md:px-3 py-1 rounded"
                        style={{
                          color: exp.color,
                          border: `1px solid ${exp.color}35`,
                          background: `${exp.color}0D`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience