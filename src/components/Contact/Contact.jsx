import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import FloatingEnvelope from './FloatingEnvelope'
import data from '../../data/portfolio.json'

const ICONS = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
}

const socialLinks = data.social.map((s) => ({ ...s, icon: ICONS[s.icon] }))

function InputField({ label, type = 'text', name, required }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="relative">
      <label
        className={`absolute left-4 font-mono text-xs transition-all duration-200 pointer-events-none ${
          focused || value
            ? 'top-2 text-[10px] text-[#00e5ff]'
            : 'top-4 text-white/30'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-7 pb-3 px-4 rounded-xl font-mono text-sm text-white bg-white/4 outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: focused
            ? '1px solid rgba(0,229,255,0.4)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: focused ? '0 0 0 3px rgba(0,229,255,0.06)' : 'none',
        }}
      />
    </div>
  )
}

function TextAreaField({ label, name, required }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="relative">
      <label
        className={`absolute left-4 font-mono text-xs transition-all duration-200 pointer-events-none ${
          focused || value
            ? 'top-2 text-[10px] text-[#00e5ff]'
            : 'top-4 text-white/30'
        }`}
      >
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        rows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-7 pb-3 px-4 rounded-xl font-mono text-sm text-white resize-none outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: focused
            ? '1px solid rgba(0,229,255,0.4)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: focused ? '0 0 0 3px rgba(0,229,255,0.06)' : 'none',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7b61ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00e5ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// say.hello"
          title={<>Let's <span className="gradient-text">Connect</span></>}
          subtitle="Available for freelance projects, collaborations, and consulting"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info + Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* 3D Envelope Canvas */}
            <div className="h-64 mb-8 rounded-2xl overflow-hidden glass border border-white/5">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[3, 3, 3]} intensity={2} color="#00e5ff" />
                  <pointLight position={[-3, -2, 2]} intensity={1} color="#7b61ff" />
                  <FloatingEnvelope />
                </Canvas>
              </Suspense>
            </div>

            <h3 className="font-syne font-bold text-xl text-white mb-3">
              Ready to build something great?
            </h3>
            <p className="font-mono text-sm text-white/40 leading-relaxed mb-8">
              Whether you need a production Flutter app, a live streaming platform,
              or a complex mobile system — I'm ready to make it happen.
              Drop me a message and let's talk.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${link.color}30`
                    e.currentTarget.style.background = `${link.color}08`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div style={{ color: link.color }}>{link.icon}</div>
                  <div className="flex-1">
                    <div className="font-syne font-semibold text-sm text-white">{link.name}</div>
                    <div className="font-mono text-xs text-white/30">{link.handle}</div>
                  </div>
                  <svg
                    width="14" height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/20 group-hover:text-white/60 transition-colors"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl mb-4"
                  >
                    ✉️
                  </motion.div>
                  <h3 className="font-syne font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="font-mono text-sm text-white/40">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-mono text-xs text-[#00e5ff] hover:text-white transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-6">
                    <h3 className="font-syne font-bold text-lg text-white mb-1">Send a Message</h3>
                    <p className="font-mono text-xs text-white/30">I typically respond within 24 hours</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Your Name *" name="name" required />
                    <InputField label="Email Address *" type="email" name="email" required />
                  </div>

                  <InputField label="Subject" name="subject" />

                  <TextAreaField label="Your Message *" name="message" required />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: sending ? 1 : 1.02 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                    className="w-full py-4 rounded-xl font-mono text-sm font-medium transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: sending
                        ? 'rgba(255,255,255,0.05)'
                        : 'linear-gradient(135deg, #00e5ff, #7b61ff)',
                      color: sending ? 'rgba(255,255,255,0.3)' : '#0a0a0a',
                    }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      'Send Message →'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
