import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { componentLibrary } from '../../data/projects'
import SectionHeading from '../shared/SectionHeading'

function OTPInputPreview() {
  return (
    <div className="flex gap-2 justify-center">
      {['3', '7', '•', '•', '•', '•'].map((v, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="w-9 h-11 rounded-lg flex items-center justify-center font-mono text-base font-bold"
          style={{
            background: i < 2 ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.04)',
            border: i === 2 ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.08)',
            color: i < 2 ? '#00e5ff' : 'rgba(255,255,255,0.2)',
          }}
        >
          {v}
        </motion.div>
      ))}
    </div>
  )
}

function CountryPickerPreview() {
  const countries = [
    { flag: '🇮🇳', name: 'India', code: '+91' },
    { flag: '🇦🇪', name: 'UAE', code: '+971' },
    { flag: '🇺🇸', name: 'USA', code: '+1' },
  ]
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-1.5">
      {countries.map((c, i) => (
        <motion.button
          key={c.name}
          onClick={() => setSelected(i)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all"
          style={{
            background: selected === i ? 'rgba(123,97,255,0.15)' : 'rgba(255,255,255,0.03)',
            border: selected === i ? '1px solid rgba(123,97,255,0.4)' : '1px solid rgba(255,255,255,0.06)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-base">{c.flag}</span>
          <span className="font-mono text-xs text-white/70 flex-1">{c.name}</span>
          <span className="font-mono text-xs text-white/30">{c.code}</span>
        </motion.button>
      ))}
    </div>
  )
}

function TimerPreview() {
  const [progress] = useState(65)

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
          <circle
            cx="40" cy="40" r="34"
            stroke="#00e5ff"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-sm font-bold text-[#00e5ff]">02:35</span>
          <span className="font-mono text-[8px] text-white/30">remaining</span>
        </div>
      </div>
    </div>
  )
}

function DropdownPreview() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('BLoC')
  const options = ['BLoC', 'Riverpod', 'Provider', 'GetX']

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-mono text-xs"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: open ? '1px solid rgba(123,97,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <span>{selected}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/30">▾</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-1 w-full rounded-lg overflow-hidden z-10"
            style={{ background: '#111', border: '1px solid rgba(123,97,255,0.3)' }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false) }}
                className="w-full px-3 py-2 text-left font-mono text-xs hover:bg-white/5 transition-colors"
                style={{ color: selected === opt ? '#7b61ff' : 'rgba(255,255,255,0.5)' }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TimelineWidgetPreview() {
  const items = [
    { label: 'App Initialized', status: 'done' },
    { label: 'Auth Complete', status: 'done' },
    { label: 'Data Loaded', status: 'active' },
    { label: 'Render UI', status: 'pending' },
  ]

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: item.status === 'done' ? '#00e5ff' : item.status === 'active' ? '#7b61ff' : 'rgba(255,255,255,0.1)',
                boxShadow: item.status === 'active' ? '0 0 8px #7b61ff' : 'none',
              }}
            />
            {i < items.length - 1 && (
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-4"
                style={{ background: i < 2 ? '#00e5ff' : 'rgba(255,255,255,0.08)' }}
              />
            )}
          </div>
          <span
            className="font-mono text-xs"
            style={{
              color: item.status === 'done' ? 'rgba(255,255,255,0.7)' : item.status === 'active' ? '#7b61ff' : 'rgba(255,255,255,0.2)',
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function SkillBarPreview() {
  const bars = [
    { name: 'Flutter', value: 95, color: '#00e5ff' },
    { name: 'BLoC', value: 90, color: '#7b61ff' },
    { name: 'Firebase', value: 85, color: '#ff6b35' },
  ]

  return (
    <div className="space-y-3">
      {bars.map((bar, i) => (
        <div key={bar.name}>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-xs text-white/50">{bar.name}</span>
            <span className="font-mono text-xs text-white/25">{bar.value}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.value}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: bar.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const previews = {
  'OTP Input': OTPInputPreview,
  'Country Code Picker': CountryPickerPreview,
  'Custom Timer': TimerPreview,
  'Dropdown Overlay': DropdownPreview,
  'Timeline Widget': TimelineWidgetPreview,
  'Animated Skill Bar': SkillBarPreview,
}

function ComponentCard({ component, index }) {
  const Preview = previews[component.name]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group"
    >
      {/* Preview area */}
      <div
        className="h-36 flex items-center justify-center p-4 relative"
        style={{
          background: `linear-gradient(135deg, ${component.color}08, transparent)`,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="w-full max-w-[200px]">
          {Preview && <Preview />}
        </div>

        {/* Corner badge */}
        <div
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: component.color, boxShadow: `0 0 6px ${component.color}` }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">{component.icon}</span>
          <h4 className="font-syne font-semibold text-sm text-white group-hover:text-white transition-colors">
            {component.name}
          </h4>
        </div>
        <p className="font-mono text-xs text-white/35 leading-relaxed">
          {component.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ComponentLibrary() {
  return (
    <section id="components" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#7b61ff]/4 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// flutter.components"
          title={<>Component <span className="gradient-text">Library</span></>}
          subtitle="Reusable Flutter UI components built and refined across production apps"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {componentLibrary.map((component, index) => (
            <ComponentCard key={component.name} component={component} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass rounded-2xl p-6 border border-white/5 text-center"
        >
          <p className="font-mono text-sm text-white/40 mb-2">
            All components are production-tested and available for integration
          </p>
          <p className="font-mono text-xs text-white/20">
            Built with Flutter · BLoC-compatible · Fully customizable · MIT License
          </p>
        </motion.div>
      </div>
    </section>
  )
}
