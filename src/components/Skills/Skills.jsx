import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillOrbs } from '../../data/projects'
import SectionHeading from '../shared/SectionHeading'
import FloatingOrbs from '../../three/FloatingOrbs'

function SkillBar({ name, level, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-sm text-white/70">{name}</span>
        <span className="font-mono text-xs text-white/30">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  )
}

function SkillCategoryCard({ category, items, isActive, onClick }) {
  const colors = {
    Mobile: '#00e5ff',
    Backend: '#7b61ff',
    DevOps: '#ff6b35',
    Tools: '#3ecf8e',
  }

  const color = colors[category] || '#00e5ff'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`glass rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
        isActive ? 'gradient-border' : 'border border-white/5'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <h3 className="font-syne font-semibold text-white">{category}</h3>
      </div>

      {items.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          color={color}
          delay={i * 0.1}
        />
      ))}
    </motion.div>
  )
}

function OrbCard({ name, icon, color }) {
  const [flipped, setFlipped] = useState(false)
  const level = skillOrbs.find(s => s.name === name)

  return (
    <motion.div
      className="relative h-24 cursor-pointer"
      style={{ perspective: 1000 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-xl flex flex-col items-center justify-center gap-1.5 border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderColor: `${color}30`,
          }}
        >
          <span className="text-2xl">{icon}</span>
          <span className="font-mono text-xs text-white/60">{name}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            border: `1px solid ${color}40`,
          }}
        >
          <span className="font-syne font-bold text-lg" style={{ color }}>
            Expert
          </span>
          <span className="font-mono text-xs text-white/40">hover ↗</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Mobile')
  const categories = Object.keys(skills)

  return (
    <section id="skills" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00e5ff]/4 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// tech.stack"
          title={<>My <span className="gradient-text">Arsenal</span></>}
          subtitle="Tools and technologies I wield to build exceptional apps"
        />

        {/* 3D Orbs Canvas */}
        <div className="h-56 sm:h-80 md:h-96 mb-12 relative rounded-3xl overflow-hidden glass border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/60 z-10 pointer-events-none" />
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <div className="font-mono text-xs text-white/30">Loading 3D orbs...</div>
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 8], fov: 55 }} gl={{ alpha: true, antialias: true }}>
              <FloatingOrbs />
            </Canvas>
          </Suspense>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <span className="font-mono text-xs text-white/30 tracking-widest">INTERACTIVE 3D · HOVER TO EXPLORE</span>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((cat) => (
            <SkillCategoryCard
              key={cat}
              category={cat}
              items={skills[cat]}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Flip Cards */}
        <div>
          <div className="font-mono text-xs text-white/30 tracking-widest mb-4 text-center">
            HOVER CARDS TO FLIP
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {skillOrbs.map((orb) => (
              <OrbCard
                key={orb.name}
                name={orb.name}
                icon={orb.icon}
                color={orb.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
