import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

type MagnetProps = {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
}

// 磁吸鼠标跟随：进入 padding 范围时元素向光标位移，位移量 = 偏移 / strength
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)

    if (dist < Math.max(rect.width, rect.height) / 2 + padding) {
      setActive(true)
      setPos({ x: dx / strength, y: dy / strength })
    } else {
      setActive(false)
      setPos({ x: 0, y: 0 })
    }
  }

  const reset = () => {
    setActive(false)
    setPos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ display: 'inline-block' }}
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{
          type: 'spring',
          duration: active ? 0.3 : 0.6,
          bounce: 0.15,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
