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

  // 记录当前翻开的卡片索引（loop 内唯一 index）；有翻开时暂停整条滚动
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <div className="no-scrollbar overflow-hidden">
      <div
        className={`edu-track flex ${flipped !== null ? 'is-paused' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className={`flip-card relative mr-6 h-[280px] w-[80vw] shrink-0 sm:w-[440px] md:h-[360px] ${
              item.type === 'image' && flipped === i ? 'is-flipped' : ''
            }`}
          >
            {item.type === 'video' ? (
              <div className="h-full w-full overflow-hidden rounded-[36px] border-2 border-white/10">
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
              </div>
            ) : (
              <FlipPhoto
                item={item}
                label={`照片 ${(i % items.length) + 1}`}
                isFlipped={flipped === i}
                onToggle={() =>
                  setFlipped((cur) => (cur === i ? null : i))
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 可翻转照片卡：正面为图片，点击后沿 Y 轴翻转，背面显示故事/回忆
function FlipPhoto({
  item,
  label,
  isFlipped,
  onToggle,
}: {
  item: MediaItem
  label: string
  isFlipped: boolean
  onToggle: () => void
}) {
  return (
    // 直接作为 .flip-card 的直接子元素承载 3D 翻转（perspective 只作用于直接子级）
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-label={isFlipped ? '翻回照片' : '查看这张照片的故事'}
      className="flip-inner cursor-pointer"
    >
      {/* 正面：照片 */}
      <div className="flip-face overflow-hidden rounded-[36px] border-2 border-white/10">
        <img
          src={item.src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* 右下角小提示 */}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-roseblack/50 px-3 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur-sm">
          点击看故事
        </span>
      </div>

      {/* 背面：故事 / 回忆 */}
      <div className="flip-face flip-back flex flex-col overflow-hidden rounded-[36px] border-2 border-[#FFB3D9]/40 bg-gradient-to-br from-[#4a2438] to-roseblack px-7 py-7 text-left">
        <span className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFB3D9]">
          Story
        </span>
        <div className="no-scrollbar flex-1 overflow-y-auto pr-1">
          <StoryText story={item.story} />
        </div>
        <span className="pointer-events-none mt-3 shrink-0 text-[11px] font-medium tracking-wide text-white/45">
          点击翻回照片
        </span>
      </div>
    </div>
  )
}

// 故事文本：首段（日期 · 地点）高亮小字，其余段落为正文
function StoryText({ story }: { story?: string }) {
  if (!story) {
    return (
      <p className="text-[15px] font-light leading-relaxed text-white/85 md:text-base">
        这张照片还没有写下故事～
      </p>
    )
  }
  const [meta, ...rest] = story.split('\n\n')
  return (
    <>
      <p className="mb-3 text-xs font-medium tracking-wide text-[#FFB3D9]/90">
        {meta}
      </p>
      {rest.map((para, i) => (
        <p
          key={i}
          className="mb-2 text-[15px] font-light leading-relaxed text-white/85 md:text-base"
        >
          {para}
        </p>
      ))}
    </>
  )
}
