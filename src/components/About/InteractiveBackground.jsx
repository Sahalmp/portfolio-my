import { useEffect, useRef } from 'react'

const COUNT = 55
const REPEL_R = 130
const CONNECT_D = 140

export default function InteractiveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let animFrame
    let mounted = true

    // Use parent element dimensions — reliable for absolute-positioned canvas
    const resize = () => {
      const p = canvas.parentElement
      canvas.width  = p ? p.clientWidth  : 800
      canvas.height = p ? p.clientHeight : 600
    }

    const mkParticle = (x, y, burst = false) => ({
      x:  x  ?? Math.random() * canvas.width,
      y:  y  ?? Math.random() * canvas.height,
      vx: burst ? (Math.random() - 0.5) * 7   : (Math.random() - 0.5) * 0.5,
      vy: burst ? (Math.random() - 0.5) * 7   : (Math.random() - 0.5) * 0.5,
      r:  burst ? Math.random() * 2 + 1        : Math.random() * 1.8 + 0.5,
      cyan: Math.random() > 0.5,
      a:  burst ? 0.9 : Math.random() * 0.5 + 0.2,
      burst,
      life: 1,
    })

    let particles = []

    // Defer init until parent has real dimensions
    const start = () => {
      if (!mounted) return
      resize()
      if (canvas.width < 10 || canvas.height < 10) {
        animFrame = requestAnimationFrame(start)
        return
      }
      particles = Array.from({ length: COUNT }, () => mkParticle())
      draw()
    }

    // Only track mouse when it's actually inside the canvas
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x
        mouse.y = y
      } else {
        mouse.x = -9999
        mouse.y = -9999
      }
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const onClickGlobal = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top  || e.clientY > rect.bottom) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      for (let i = 0; i < 12; i++) particles.push(mkParticle(x, y, true))
    }

    const onResize = () => { resize() }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClickGlobal)
    window.addEventListener('resize', onResize)

    const draw = () => {
      if (!mounted) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        if (p.burst) {
          p.life -= 0.022
          p.a = p.life * 0.9
          if (p.life <= 0) { particles.splice(i, 1); continue }
          p.vx *= 0.93
          p.vy *= 0.93
        } else {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_R && dist > 1) {
            const f = (REPEL_R - dist) / REPEL_R
            p.vx += (dx / dist) * f * 0.7
            p.vy += (dy / dist) * f * 0.7
          }
          p.vx *= 0.982
          p.vy *= 0.982
          if (p.x < 0) p.x = canvas.width
          else if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          else if (p.y > canvas.height) p.y = 0
        }
        p.x += p.vx
        p.y += p.vy
      }

      // Connection lines
      const reg = particles.filter(p => !p.burst)
      for (let i = 0; i < reg.length; i++) {
        for (let j = i + 1; j < reg.length; j++) {
          const a = reg[i], b = reg[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < CONNECT_D) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / CONNECT_D) * 0.13})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        const rgb = p.cyan ? '0,229,255' : '123,97,255'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.a * 0.07})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.a})`
        ctx.fill()
      })

      animFrame = requestAnimationFrame(draw)
    }

    start()

    return () => {
      mounted = false
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClickGlobal)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
