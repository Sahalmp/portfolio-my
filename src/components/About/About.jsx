import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import SectionHeading from '../shared/SectionHeading'
import AboutOrb from './AboutOrb'

function StatCard({ value, suffix, label, delay, start }) {
  const count = useCountUp(value, 2000, start)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-4 text-center gradient-border"
    >
      <div className="font-syne font-black text-3xl gradient-text">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-white/40 mt-1 tracking-wider">{label}</div>
    </motion.div>
  )
}

const specialties = [
  'Flutter', 'Dart', 'BLoC', 'Riverpod', 'Provider',
  'Node.js', 'Django', 'Python', 'MySQL', 'MongoDB',
  'AWS EC2', 'CI/CD', 'OpenAI API', 'REST APIs',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7b61ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// about.me"
          title={<>Who I <span className="gradient-text">Am</span></>}
          subtitle="Flutter developer crafting exceptional mobile experiences"
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-64 md:h-96 relative"
          >
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[3, 3, 3]} intensity={2} color="#00e5ff" />
                <pointLight position={[-3, -3, 2]} intensity={1} color="#7b61ff" />
                <AboutOrb />
              </Canvas>
            </Suspense>

            {/* Code snippet decoration */}
            <div className="absolute bottom-4 left-4 glass rounded-xl p-3 font-mono text-xs hidden md:block">
              <div className="text-[#7b61ff]">class</div>
              <div className="text-white ml-2">
                <span className="text-[#00e5ff]">SahalDev</span>
                <span className="text-white/40"> extends </span>
                <span className="text-[#7b61ff]">FlutterDev</span>
              </div>
              <div className="text-white/40 ml-4">architecture: <span className="text-[#00e5ff]">Clean</span></div>
              <div className="text-white/40 ml-4">state: <span className="text-[#00e5ff]">BLoC</span></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-green-400/20 bg-green-400/5">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="font-mono text-xs text-green-400 tracking-wider">Available for Freelance</span>
            </div>

            <h3 className="font-syne font-bold text-2xl md:text-3xl text-white mb-4">
              Building mobile experiences that{' '}
              <span className="gradient-text">scale & perform</span>
            </h3>

            <p className="font-mono text-sm text-white/50 leading-relaxed mb-6">
              Senior Flutter Developer with 5+ years of experience building scalable,
              high-performance mobile applications for iOS and Android. Specialized in Flutter
              architecture, state management (BLoC, Riverpod, Provider), and building smooth,
              production-grade user experiences.
            </p>

            <p className="font-mono text-sm text-white/40 leading-relaxed mb-8">
              Experienced in integrating REST APIs, real-time services, and AI-powered features
              into modern mobile apps. Also skilled in backend development using Node.js (Express)
              and Django, working with MySQL and MongoDB, and managing CI/CD pipelines and
              end-to-end app store deployments.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <StatCard value={5} suffix="+" label="Years Flutter" delay={0.1} start={inView} />
              <StatCard value={20} suffix="+" label="Projects" delay={0.2} start={inView} />
              <StatCard value={3} suffix="" label="Companies" delay={0.3} start={inView} />
            </div>

            {/* Skill Tags */}
            <div>
              <div className="font-mono text-xs text-white/30 tracking-widest mb-3">SPECIALTIES</div>
              <div className="flex flex-wrap gap-2">
                {specialties.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="font-mono text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/50 hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
