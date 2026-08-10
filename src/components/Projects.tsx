import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PROJECTS, type Project } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 实习经历：左右箭头切换的轮播
export default function Projects() {
  const total = PROJECTS.length
  const [[index, dir], setState] = useState<[number, number]>([0, 0])

  const paginate = (d: number) => {
    setState(([i]) => [(i + d + total) % total, d])
  }

  const project = PROJECTS[index]

  return (
    <section
      id="projects"
      className="relative z-40 -mt-14 rounded-t-[60px] bg-cream px-6 pt-28 pb-28 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* 标题 + 箭头 */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-lilac">
              ( Experience )
            </span>
            <h2
              className="text-frosted font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Experience
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium uppercase tracking-widest text-cherry/50">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={() => paginate(-1)}
              aria-label="上一段"
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lilac text-lilac transition-colors duration-200 hover:bg-lilac/10"
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="下一段"
              className="btn-candy flex h-14 w-14 items-center justify-center rounded-full text-white"
            >
              <ArrowRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 轮播卡片 */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={project.no}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -80 : 80 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Card project={project} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 进度圆点 */}
        <div className="mt-8 flex justify-center gap-3">
          {PROJECTS.map((p, i) => (
            <button
              key={p.no}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`跳到第 ${i + 1} 段`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-candy' : 'w-2 bg-cherry/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-[50px] border-2 border-[#8FA3B0]/50 bg-roseblack p-8 md:p-12">
      {/* 卡片头：大编号 + 分类 + 名称 + 时间 */}
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-baseline gap-6">
          <span
            className="text-frosted font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 88px)' }}
          >
            {project.no}
          </span>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]">
              {project.cat}
            </p>
            <h3 className="text-2xl font-semibold tracking-wide text-white md:text-4xl">
              {project.name}
            </h3>
          </div>
        </div>
        <span className="shrink-0 rounded-full border-2 border-lilac px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-lilac">
          {project.period}
        </span>
      </header>

      {/* 卡片体：左文右图，图片顶部对齐、完整显示不裁切 */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div className="order-2 flex flex-col lg:order-1">
          {/* 概述 bullet */}
          <ul className="mb-6 flex flex-col gap-2.5">
            {project.summary.map((s, i) => (
              <li
                key={i}
                className="flex gap-3 font-light leading-relaxed text-white/75"
                style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
              >
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB3D9]" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          {/* 专项 block */}
          <div className="flex flex-col gap-5">
            {project.blocks.map((b, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6"
              >
                <h4 className="mb-3 text-base font-semibold text-white md:text-lg">
                  {b.title}
                </h4>
                <div className="flex flex-col gap-3">
                  {b.items.map((it, j) => (
                    <p
                      key={j}
                      className="font-light leading-relaxed text-white/60"
                      style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)' }}
                    >
                      <span className="font-medium text-[#FFB3D9]">{it.k}：</span>
                      {it.v}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 实习封面图：保持原始比例完整显示，顶部对齐不裁切；支持多张纵向堆叠 */}
        <div className="order-1 lg:order-2">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            {(Array.isArray(project.cover) ? project.cover : [project.cover]).map(
              (src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[30px] border border-white/10"
                >
                  <img
                    src={src}
                    alt={project.cat}
                    loading="lazy"
                    className="h-auto w-full object-contain"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
