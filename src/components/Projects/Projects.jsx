import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '../../data/projects'
import SectionHeading from '../shared/SectionHeading'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer min-w-[300px] md:min-w-0"
    >
      <div
        className={`relative glass rounded-2xl p-6 h-full transition-all duration-300 ${
          hovered ? 'border-transparent' : 'border border-white/5'
        }`}
        style={{
          boxShadow: hovered
            ? `0 0 30px ${project.color}30, 0 20px 60px rgba(0,0,0,0.5)`
            : 'none',
        }}
      >
        {/* Glow border on hover */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, transparent)`,
              border: `1px solid ${project.color}40`,
            }}
          />
        )}

        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              color: project.color,
              background: `${project.color}15`,
              border: `1px solid ${project.color}25`,
            }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
              FEATURED
            </span>
          )}
        </div>

        {/* Number */}
        <div className="font-syne font-black text-5xl text-white/5 mb-2 leading-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title */}
        <h3 className="font-syne font-bold text-lg text-white mb-3 group-hover:text-white transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="font-mono text-xs text-white/40 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/8 text-white/30 hover:text-white/60 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover indicator */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
          transition={{ duration: 0.2 }}
          className="mt-4 flex items-center gap-1"
        >
          <span className="font-mono text-xs" style={{ color: project.color }}>
            View Details
          </span>
          <span style={{ color: project.color }}>→</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7b61ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// work.showcase"
          title={<>Featured <span className="gradient-text">Projects</span></>}
          subtitle="Production apps built for real users across India and UAE"
        />

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter((p) => p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.filter((p) => !p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 2} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="font-mono text-sm text-white/30 mb-4">
            More projects available on request
          </p>
          <a
            href="https://github.com/sahalmp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
