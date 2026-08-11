import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Download, ChevronDown } from 'lucide-react'
import { HERO_CHARACTER, HERO_ROLE, RESUME_URL, EMAIL } from '../data'
import ContactModal from './ContactModal'
import DepthText from './DepthText'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 四角构图 + 中心焦点的全屏首屏，角色图跟随鼠标滑动
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [contactOpen, setContactOpen] = useState(false)

  // 角色图跟随光标：以 section 中心为原点做偏移，spring 平滑
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 })

  const onMouseMove = (e: React.MouseEvent) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // 跟随幅度：横向 ±18% 宽、纵向 ±14% 高
    rawX.set(((e.clientX - cx) / rect.width) * rect.width * 0.36)
    rawY.set(((e.clientY - cy) / rect.height) * rect.height * 0.28)
  }
  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-6 pt-24 pb-16 md:px-12 md:pt-28"
    >
      {/* 跟随鼠标的角色主体图（透明 PNG），缩小并置于中右，避免挡字 */}
      <motion.img
        src={HERO_CHARACTER}
        alt="夏格羚"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        style={{
          x,
          y,
          filter: 'drop-shadow(0 24px 48px rgba(255,110,199,0.35))',
        }}
        className="pointer-events-none absolute right-[6%] top-[20%] z-0 h-[42vh] w-auto object-contain md:h-[52vh]"
      />

      {/* 主标题区，整体上移 */}
      <div className="z-10 flex w-full max-w-6xl flex-col items-start">
        {/* 主标题：3D 景深文字，随鼠标倾斜 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="text-left font-black uppercase leading-[0.82] tracking-tight"
        >
          <DepthText
            text="HI! I'M"
            faceColor="#ffe1ec"
            depthColor="#c77dff"
            fontSize="clamp(10vw, 11vw, 12vw)"
            fontWeight={900}
            className="mb-3 block md:mb-5"
          />
          <DepthText
            text="XIAGELING"
            faceColor="#ffe1ec"
            depthColor="#ff6ec7"
            fontSize="clamp(10vw, 11vw, 12vw)"
            fontWeight={900}
            className="block"
          />
        </motion.h1>

        {/* 职位 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-6 inline-block"
        >
          <p
            className="font-semibold uppercase tracking-wide text-cherry"
            style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}
          >
            {HERO_ROLE}
          </p>
          {/* 糖果渐变下划线，呼应主 CTA 配色 */}
          <span
            className="mt-1 block h-1 w-full rounded-full"
            style={{
              backgroundImage:
                'linear-gradient(123deg, #FFB3D9 7%, #FF6EC7 37%, #C77DFF 72%, #FFD6A5 100%)',
            }}
          />
        </motion.div>

        {/* 两个按钮：下载简历 + 联系我 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={RESUME_URL}
            download="夏格羚-简历.pdf"
            className="btn-candy inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            <Download size={18} strokeWidth={2.5} />
            下载简历
          </a>
          <button
            onClick={() => setContactOpen(true)}
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest"
          >
            联系我
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </motion.div>
      </div>

      {/* 底部居中：继续下滑，探索更多 */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-cherry/60 transition-opacity duration-200 hover:opacity-70"
      >
        继续下滑，探索更多
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </motion.span>
      </motion.a>

      <ContactModal
        open={contactOpen}
        email={EMAIL}
        onClose={() => setContactOpen(false)}
      />
    </section>
  )
}
