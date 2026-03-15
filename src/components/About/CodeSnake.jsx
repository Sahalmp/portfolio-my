import { useEffect, useRef } from 'react'

const SYMBOLS = ['{}', '<>', '()', '[]', 'class', 'if', 'var', '=>', '//', '::']
const SEG_DIST  = 34
const SPEED     = 2.4
const MAX_SEGS  = 20
const INIT_LEN  = 6
const FOOD_COUNT = 5

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export default function CodeSnake() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame
    let mounted = true

    // Use parent element — reliable for absolute-positioned canvas
    const resize = () => {
      const p = canvas.parentElement
      canvas.width  = p ? p.clientWidth  : 800
      canvas.height = p ? p.clientHeight : 600
    }

    const state = {
      segments:   [],
      mousePos:   null,
      direction:  { x: 1, y: 0 },   // keyboard direction
      lastDir:    { x: 1, y: 0 },   // last actual movement direction
      usingMouse: false,
      food:       [],
    }

    const spawnFood = () => ({
      x:      60 + Math.random() * (canvas.width  - 120),
      y:      60 + Math.random() * (canvas.height - 120),
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      cyan:   Math.random() > 0.5,
      pulse:  Math.random() * Math.PI * 2,
    })

    const initSnake = () => {
      const cx = canvas.width  / 2
      const cy = canvas.height / 2
      state.segments = []
      for (let i = 0; i < INIT_LEN; i++) {
        state.segments.push({
          x:      cx - i * SEG_DIST,
          y:      cy,
          symbol: SYMBOLS[i % SYMBOLS.length],
          cyan:   i % 2 === 0,
        })
      }
      state.food = []
      for (let i = 0; i < FOOD_COUNT; i++) state.food.push(spawnFood())
    }

    // Defer init until parent has real dimensions
    const startWhenReady = () => {
      if (!mounted) return
      resize()
      if (canvas.width < 10 || canvas.height < 10) {
        animFrame = requestAnimationFrame(startWhenReady)
        return
      }
      initSnake()
      draw()
    }

    const sectionVisible = () => {
      const rect = canvas.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        state.mousePos  = { x, y }
        state.usingMouse = true
      } else {
        state.usingMouse = false
      }
    }
    const onMouseLeave = () => { state.usingMouse = false }

    const onKey = (e) => {
      if (!sectionVisible()) return
      const map = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown:  { x: 0, y:  1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y:  0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      }
      if (map[e.key]) {
        state.direction  = map[e.key]
        state.usingMouse = false
      }
    }

    const onResize = () => { resize() }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    const draw = () => {
      if (!mounted) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const segs = state.segments
      const head = segs[0]

      // Target position
      let tx, ty
      if (state.usingMouse && state.mousePos) {
        tx = state.mousePos.x
        ty = state.mousePos.y
      } else {
        tx = head.x + state.direction.x * 300
        ty = head.y + state.direction.y * 300
      }

      // Move head — always advance using lastDir to prevent freezing near cursor
      const dx   = tx - head.x
      const dy   = ty - head.y
      const dist = Math.hypot(dx, dy)
      if (dist > 2) {
        state.lastDir.x = dx / dist
        state.lastDir.y = dy / dist
      }
      head.x += state.lastDir.x * SPEED
      head.y += state.lastDir.y * SPEED

      // Wrap around edges
      if (head.x < -30) head.x = canvas.width  + 30
      else if (head.x > canvas.width  + 30) head.x = -30
      if (head.y < -30) head.y = canvas.height + 30
      else if (head.y > canvas.height + 30) head.y = -30

      // Move body segments
      for (let i = 1; i < segs.length; i++) {
        const prev = segs[i - 1], curr = segs[i]
        const ddx = prev.x - curr.x
        const ddy = prev.y - curr.y
        const d   = Math.hypot(ddx, ddy)
        if (d > SEG_DIST) {
          curr.x += (ddx / d) * (d - SEG_DIST)
          curr.y += (ddy / d) * (d - SEG_DIST)
        }
      }

      // Food collisions
      state.food.forEach((f, fi) => {
        if (Math.hypot(head.x - f.x, head.y - f.y) < 22) {
          if (segs.length < MAX_SEGS) {
            const tail = segs[segs.length - 1]
            segs.push({ x: tail.x, y: tail.y, symbol: f.symbol, cyan: f.cyan })
          }
          state.food[fi] = spawnFood()
        }
        f.pulse += 0.05
      })

      // Draw spine
      if (segs.length > 1) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(segs[0].x, segs[0].y)
        for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y)
        ctx.strokeStyle = 'rgba(0,229,255,0.07)'
        ctx.lineWidth   = 10
        ctx.lineCap     = 'round'
        ctx.lineJoin    = 'round'
        ctx.stroke()
        ctx.restore()
      }

      // Draw food: pulsing ring with symbol inside (no overlapping dot)
      state.food.forEach(f => {
        const rgb   = f.cyan ? '0,229,255' : '123,97,255'
        const pulse = 0.55 + Math.sin(f.pulse) * 0.45
        const r     = 14 + Math.sin(f.pulse) * 2

        ctx.save()
        // Outer glow ring
        ctx.globalAlpha = pulse * 0.4
        ctx.beginPath()
        ctx.arc(f.x, f.y, r + 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rgb},0.3)`
        ctx.lineWidth   = 1
        ctx.stroke()
        // Main ring
        ctx.globalAlpha = pulse * 0.85
        ctx.beginPath()
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rgb},0.9)`
        ctx.lineWidth   = 1.5
        ctx.stroke()
        // Symbol centered inside ring
        ctx.globalAlpha = pulse
        ctx.font        = '11px "DM Mono", monospace'
        ctx.fillStyle   = `rgba(${rgb},1)`
        ctx.textAlign   = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(f.symbol, f.x, f.y)
        ctx.restore()
      })

      // Draw segments tail → head (correct overlap order)
      for (let i = segs.length - 1; i >= 0; i--) {
        const seg    = segs[i]
        const isHead = i === 0
        const alpha  = Math.max(0.3, 1 - (i / segs.length) * 0.65)
        const rgb    = seg.cyan ? '0,229,255' : '123,97,255'
        const w      = isHead ? 40 : 30
        const h      = isHead ? 22 : 18

        ctx.save()
        ctx.globalAlpha = alpha

        if (isHead) {
          ctx.shadowColor = `rgba(${rgb},0.9)`
          ctx.shadowBlur  = 18
        }

        // Pill background
        roundRect(ctx, seg.x - w / 2, seg.y - h / 2, w, h, 6)
        ctx.fillStyle   = `rgba(${rgb},0.1)`
        ctx.fill()
        ctx.strokeStyle = `rgba(${rgb},${isHead ? 0.75 : 0.35})`
        ctx.lineWidth   = isHead ? 1.5 : 1
        ctx.stroke()

        // Symbol text
        ctx.shadowBlur      = 0
        ctx.font            = `${isHead ? 12 : 10}px "DM Mono", monospace`
        ctx.fillStyle       = `rgba(${rgb},${isHead ? 1 : 0.9})`
        ctx.textAlign       = 'center'
        ctx.textBaseline    = 'middle'
        ctx.fillText(seg.symbol, seg.x, seg.y)

        ctx.restore()
      }

      animFrame = requestAnimationFrame(draw)
    }

    startWhenReady()

    return () => {
      mounted = false
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('keydown', onKey)
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
