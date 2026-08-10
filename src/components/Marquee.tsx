import { useEffect, useRef, useState } from 'react'
import { MARQUEE_TOP, MARQUEE_BOTTOM } from '../data'

// 三重复制保证首尾无缝
const triple = (arr: string[]) => [...arr, ...arr, ...arr]

const ROW_TOP = triple(MARQUEE_TOP)
const ROW_BOTTOM = triple(MARQUEE_BOTTOM)

// 横向双行反向滚动图墙，视差系数 0.3，速度绑定 window.scrollY
export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const sectionTop = el.offsetTop
      // (scrollY - sectionTop + innerHeight) * 0.3
      const parallax =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(parallax)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-[45] -mt-14 rounded-t-[60px] bg-roseblack py-20 md:py-28"
    >
      <div className="mb-12 px-6 md:px-12">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]">
          Selected Frames
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* 上行：向左移动 */}
        <div className="no-scrollbar flex w-full overflow-hidden">
          <div
            className="flex shrink-0 gap-6 pl-6"
            style={{ transform: `translateX(${-offset % 2000}px)` }}
          >
            {ROW_TOP.map((src, i) => (
              <Tile key={`t-${i}`} src={src} />
            ))}
          </div>
        </div>

        {/* 下行：反向，向右移动 */}
        <div className="no-scrollbar flex w-full overflow-hidden">
          <div
            className="flex shrink-0 gap-6 pl-6"
            style={{ transform: `translateX(${(offset % 2000) - 2000}px)` }}
          >
            {ROW_BOTTOM.map((src, i) => (
              <Tile key={`b-${i}`} src={src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// 图块统一 420×270 rounded-2xl object-cover，lazy 加载
function Tile({ src }: { src: string }) {
  return (
    <div className="h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl border border-white/5">
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
