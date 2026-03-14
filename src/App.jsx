import { Suspense, lazy } from 'react'
import Navbar from './components/shared/Navbar'

// Lazy load heavy sections
const Hero = lazy(() => import('./components/Hero/Hero'))
const About = lazy(() => import('./components/About/About'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Timeline = lazy(() => import('./components/Timeline/Timeline'))
const ComponentLibrary = lazy(() => import('./components/ComponentLibrary/ComponentLibrary'))
const Contact = lazy(() => import('./components/Contact/Contact'))

function SectionLoader() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-[#7b61ff] animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-white/20">
          © 2025 Muhammed Sahal M P · Flutter Developer @ Codewave
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Built with React + Three.js + Framer Motion
        </div>
        <a
          href="https://sahalmp.github.io/My-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-white/20 hover:text-[#00e5ff] transition-colors"
        >
          sahalmp.github.io/My-Portfolio →
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      <main>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ComponentLibrary />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
