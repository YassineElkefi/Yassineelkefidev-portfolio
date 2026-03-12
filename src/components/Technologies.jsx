import { motion } from 'framer-motion'
import {
  RiFlutterFill, RiReactjsLine, RiNextjsFill, RiAngularjsFill,
} from 'react-icons/ri'
import { FaNodeJs, FaAndroid, FaSwift } from 'react-icons/fa6'
import { SiMongodb, SiNestjs, SiGraphql, SiMysql } from 'react-icons/si'

const SKILLS = [
  { name: 'Flutter',  Icon: RiFlutterFill,   level: 90, color: '#00E5FF' },
  { name: 'React',    Icon: RiReactjsLine,   level: 88, color: '#61DAFB' },
  { name: 'Angular',  Icon: RiAngularjsFill, level: 85, color: '#FF3CAC' },
  { name: 'NestJS',   Icon: SiNestjs,        level: 85, color: '#FF3CAC' },
  { name: 'Node.js',  Icon: FaNodeJs,        level: 82, color: '#68D391' },
  { name: 'MongoDB',  Icon: SiMongodb,       level: 80, color: '#68D391' },
  { name: 'GraphQL',  Icon: SiGraphql,       level: 80, color: '#E535AB' },
  { name: 'MySQL',    Icon: SiMysql,         level: 80, color: '#00ADEF' },
  { name: 'SwiftUI',  Icon: FaSwift,         level: 72, color: '#FF6B35' },
  { name: 'Android',  Icon: FaAndroid,       level: 75, color: '#68D391' },
  { name: 'Next.js',  Icon: RiNextjsFill,    level: 70, color: '#ffffff' },
]

const Technologies = () => {
  return (
    <section id="skills" className="py-28 px-12" style={{ background: 'var(--bg2, #0d0d12)' }}>
      <div className="max-w-7xl mx-auto">

        <div className="section-label">Tech Stack</div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight mb-14"
          style={{ letterSpacing: '-0.03em' }}
        >
          Technologies I work with
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative group flex flex-col items-center gap-3 p-6 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = skill.color + '55'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: skill.color }}
              />

              <skill.Icon className="text-5xl" style={{ color: skill.color }} />

              <span className="font-semibold text-sm text-center">{skill.name}</span>

              {/* Progress bar */}
              <div className="w-full h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
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