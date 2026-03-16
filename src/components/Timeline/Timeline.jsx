import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../../data/projects'
import SectionHeading from '../shared/SectionHeading'

const typeColors = {
  'Full-time': '#00e5ff',
  Freelance: '#7b61ff',
  Development: '#3ecf8e',
  Foundation: '#ff9500',
}

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8 md:mb-12`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'} min-w-0`}
      >
        <div className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
          {/* Year badge */}
          <span
            className="inline-block font-mono text-xs px-2.5 py-1 rounded-full mb-3"
            style={{
              color: typeColors[item.type] || '#00e5ff',
              background: `${typeColors[item.type] || '#00e5ff'}15`,
              border: `1px solid ${typeColors[item.type] || '#00e5ff'}25`,
            }}
          >
            {item.year}
          </span>

          <h3 className="font-syne font-bold text-lg text-white mb-1">
            {item.role}
          </h3>
          <p className="font-mono text-sm text-white/40 mb-4">{item.company}</p>

          <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
            {item.highlights.map((h, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs font-mono text-white/50 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                <span
                  className="mt-1 flex-shrink-0 w-1 h-1 rounded-full"
                  style={{ background: typeColors[item.type] || '#00e5ff' }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-4 h-4 rounded-full border-2 mt-6"
          style={{
            borderColor: typeColors[item.type] || '#00e5ff',
            background: '#0a0a0a',
            boxShadow: `0 0 12px ${typeColors[item.type] || '#00e5ff'}`,
          }}
        >
          <div
            className="absolute inset-0.5 rounded-full"
            style={{ background: typeColors[item.type] || '#00e5ff' }}
          />
        </motion.div>
      </div>

      {/* Empty spacer */}
      <div className="hidden md:block w-5/12" />
    </div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00e5ff]/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// career.path"
          title={<>My <span className="gradient-text">Journey</span></>}
          subtitle="From web development to Flutter — growing one project at a time"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 sm:mb-16"
        >
          {[
            { icon: '🏢', value: 'Codewave', label: 'Current Employer' },
            { icon: '⚡', value: '5+ Years', label: 'Flutter Dev' },
            { icon: '📱', value: '15+ Apps', label: 'Delivered' },
            { icon: '🎓', value: 'BSc CS', label: 'MES College' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 sm:gap-3 glass rounded-xl px-3 sm:px-5 py-2 sm:py-3 border border-white/5"
            >
              <span className="text-xl">{stat.icon}</span>
              <div>
                <div className="font-syne font-bold text-sm text-white">{stat.value}</div>
                <div className="font-mono text-xs text-white/30">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full timeline-line"
            />
          </div>

          {experience.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span className="font-mono text-xs text-white/50">
              Currently available for new projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
