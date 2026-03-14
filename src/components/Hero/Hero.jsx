import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import ParticleField from '../../three/ParticleField'
import PhoneMockup from '../../three/PhoneMockup'
import { useTypingEffect } from '../../hooks/useTypingEffect'

const TYPING_WORDS = ['BLoC Architect', 'Live Streaming Dev', 'Clean Code Engineer', 'Firebase Expert']

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00e5ff" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#7b61ff" />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />

      <Suspense fallback={null}>
        <ParticleField count={600} />
        <group position={[2.5, 0, 0]}>
          <PhoneMockup />
        </group>
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}

export default function Hero() {
  const typedText = useTypingEffect(TYPING_WORDS, 75, 45, 2200)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      })
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7,
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#7b61ff]/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#7b61ff]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Available tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="font-mono text-xs text-white/60 tracking-wider">
                Available for Projects
              </span>
            </motion.div>

            {/* Name */}
            <div ref={headingRef}>
              <h1 className="font-syne font-black text-5xl md:text-7xl xl:text-8xl leading-none mb-4">
                <span className="block text-white">Muhammed</span>
                <span className="block gradient-text text-glow-cyan">Sahal</span>
              </h1>
            </div>

            {/* Role */}
            <div ref={subtitleRef}>
              <p className="font-mono text-base md:text-lg text-white/50 mb-2 tracking-wide">
                Flutter Developer · Mobile Engineer
              </p>

              {/* Typing effect */}
              <div className="flex items-center gap-2 mb-8">
                <span className="font-mono text-sm text-[#00e5ff]/70">// </span>
                <span className="font-mono text-sm md:text-base text-[#00e5ff]">
                  {typedText}
                </span>
                <span className="cursor-blink font-mono text-[#00e5ff] text-lg">|</span>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex gap-8 mb-10"
              >
                {[
                  { value: '5+', label: 'Years Flutter' },
                  { value: '20+', label: 'Projects' },
                  { value: 'Codewave', label: 'Current Co.' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-syne font-bold text-2xl gradient-text">{stat.value}</div>
                    <div className="font-mono text-xs text-white/30 tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollTo('projects')}
                  className="group relative px-7 py-3.5 rounded-xl font-mono text-sm font-medium overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#7b61ff] transition-opacity" />
                  <span className="relative text-[#0a0a0a] font-semibold group-hover:text-white transition-colors">
                    View Projects →
                  </span>
                </button>

                <button
                  onClick={() => scrollTo('contact')}
                  className="px-7 py-3.5 rounded-xl font-mono text-sm border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
                >
                  Contact Me
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-white/30 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

      {/* Corner decoration */}
      <div className="absolute top-32 right-6 md:right-12 font-mono text-[10px] text-white/15 tracking-widest rotate-90 origin-top-right hidden md:block">
        FLUTTER DEVELOPER · MOBILE ENGINEER · CLEAN ARCHITECTURE
      </div>
    </section>
  )
}
