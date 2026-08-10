import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { EDUCATION, type Edu, type MediaItem } from '../data'
import VideoModal from './VideoModal'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 教育背景：每段学校 = 整行文字 + 下方相册（鼠标滚轮横向滑动）
export default function Education() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  return (
    <section
      id="education"
      className="relative z-30 -mt-14 rounded-t-[60px] bg-roseblack px-6 pt-28 pb-28 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]"
        >
          ( Education )
        </motion.span>

        <h2
          className="text-frosted mb-16 font-black uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Education
        </h2>

        <div className="flex flex-col gap-20">
          {EDUCATION.map((edu, i) => (
            <EduRow key={i} edu={edu} index={i} onPlay={setVideoSrc} />
          ))}
        </div>
      </div>

      <VideoModal
        open={videoSrc !== null}
        src={videoSrc ?? ''}
        onClose={() => setVideoSrc(null)}
      />
    </section>
  )
}

function EduRow({
  edu,
  index,
  onPlay,
}: {
  edu: Edu
  index: number
  onPlay: (src: string) => void
}) {
  return (
    <div>
      {/* 整行文字经历 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
        className="border-t border-white/15 pt-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <div>
            <span className="mb-3 block text-sm font-medium uppercase tracking-widest text-[#FFB3D9]">
              {edu.year}
            </span>
            <h3 className="text-3xl font-semibold tracking-wide text-white md:text-5xl">
              {edu.school}
            </h3>
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-white/70 md:text-right">
            {edu.degree}
          </p>
        </div>
        <p
          className="mt-4 max-w-3xl font-light leading-relaxed text-white/60"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)' }}
        >
          {edu.note}
        </p>
      </motion.div>

      {/* 下方相册：全宽出血，自动横向滚动 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="relative left-1/2 right-1/2 mt-10 -ml-[50vw] -mr-[50vw] w-screen pl-6 md:pl-12"
      >
        <EduGallery items={edu.gallery} onPlay={onPlay} />
      </motion.div>
    </div>
  )
}

// 自动横向滚动相册（复制一份实现无缝循环，hover 暂停）
function EduGallery({
  items,
  onPlay,
}: {
  items: MediaItem[]
  onPlay: (src: string) => void
}) {
  // 复制一份保证首尾无缝；速度按数量估算
  const loop = [...items, ...items]
  const duration = items.length * 3 // 每张约 3s，滚动更快

  return (
    <div className="no-scrollbar overflow-hidden">
      <div
        className="edu-track flex"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="relative mr-6 h-[280px] w-[80vw] shrink-0 overflow-hidden rounded-[36px] border-2 border-white/10 sm:w-[440px] md:h-[360px]"
          >
            {item.type === 'video' ? (
              <button
                onClick={() => onPlay(item.src)}
                className="group relative block h-full w-full"
                aria-label="播放视频"
              >
                {/* 视频本身作为封面 */}
                <video
                  src={item.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                {/* 播放按钮蒙层 */}
                <span className="absolute inset-0 flex items-center justify-center bg-roseblack/30 transition-colors duration-200 group-hover:bg-roseblack/10">
                  <span className="btn-candy flex h-16 w-16 items-center justify-center rounded-full text-white">
                    <Play size={26} strokeWidth={2.5} className="ml-1" fill="currentColor" />
                  </span>
                </span>
              </button>
            ) : (
              <img
                src={item.src}
                alt={`照片 ${(i % items.length) + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
