import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  RiFlutterFill, RiReactjsLine, RiNextjsFill, RiAngularjsFill,
} from 'react-icons/ri'
import { FaNodeJs, FaAndroid, FaSwift, FaGitAlt, FaDocker, FaRedhat } from 'react-icons/fa6'
import { SiMongodb, SiNestjs, SiGraphql, SiMysql, SiPostgresql, SiTypescript, SiExpress, SiTailwindcss } from 'react-icons/si'

const SKILLS = [
  { name: 'Flutter',     Icon: RiFlutterFill,   level: 90, color: '#00E5FF' },
  { name: 'React',       Icon: RiReactjsLine,   level: 88, color: '#61DAFB' },
  { name: 'Angular',     Icon: RiAngularjsFill, level: 85, color: '#FF3CAC' },
  { name: 'NestJS',      Icon: SiNestjs,        level: 85, color: '#FF3CAC' },
  { name: 'Node.js',     Icon: FaNodeJs,        level: 82, color: '#68D391' },
  { name: 'MongoDB',     Icon: SiMongodb,       level: 80, color: '#68D391' },
  { name: 'GraphQL',     Icon: SiGraphql,       level: 80, color: '#E535AB' },
  { name: 'MySQL',       Icon: SiMysql,         level: 80, color: '#00ADEF' },
  { name: 'SwiftUI',     Icon: FaSwift,         level: 72, color: '#FF6B35' },
  { name: 'Android',     Icon: FaAndroid,       level: 75, color: '#68D391' },
  { name: 'Next.js',     Icon: RiNextjsFill,    level: 70, color: '#7B2FFF' },
  { name: 'PostgreSQL',  Icon: SiPostgresql,    level: 60, color: '#336791' },
  { name: 'TypeScript',  Icon: SiTypescript,    level: 90, color: '#3178C6' },
  { name: 'Express.js',  Icon: SiExpress,       level: 85, color: '#FFFFFF' },
  { name: 'Git',         Icon: FaGitAlt,        level: 85, color: '#F05032' },
  { name: 'Docker',      Icon: FaDocker,        level: 65, color: '#2496ED' },
  { name: 'Tailwind CSS',Icon: SiTailwindcss,   level: 85, color: '#06B6D4' },
  { name: 'Red Hat',     Icon: FaRedhat,        level: 80, color: '#EE0000' },
]

const Technologies = () => {
  const { t } = useTranslation()

  return (
    <section
      id="skills"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-label">{t('skills.label')}</div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 md:mb-14"
          style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
        >
          {t('skills.heading')}
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl overflow-hidden"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = skill.color + '55'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: skill.color }}
              />
              <skill.Icon className="text-3xl md:text-5xl" style={{ color: skill.color }} />
              <span className="font-semibold text-xs md:text-sm text-center" style={{ color: 'var(--text)' }}>
                {skill.name}
              </span>
              <div className="w-full h-[3px] rounded-full" style={{ background: 'var(--border)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies