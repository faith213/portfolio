import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_SHOWCASE } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 个人项目：为什么做 → 项目图片 → 项目链接
export default function ProjectShowcase() {
  const data = PROJECT_SHOWCASE

  return (
    <section
      id="project"
      className="relative z-[42] -mt-14 rounded-t-[60px] bg-roseblack px-6 pt-28 pb-28 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* 小标题 + 巨型标题 */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]"
        >
          ( Project )
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-frosted mb-12 font-black uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </motion.h2>

        {/* 为什么做这个项目 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 md:p-10"
        >
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h3 className="text-2xl font-semibold tracking-wide text-white md:text-4xl">
              {data.name}
            </h3>
            <span className="rounded-full border-2 border-lilac px-5 py-2 text-xs font-semibold uppercase tracking-widest text-lilac">
              {data.tagline}
            </span>
          </div>

          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]">
            Why I Built It · 为什么做
          </p>

          <ul className="flex flex-col gap-3">
            {data.why.map((s, i) => (
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
        </motion.div>

        {/* 功能模块注解 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {data.features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-lilac/50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-lilac"
            >
              {f}
            </span>
          ))}
        </motion.div>

        {/* 项目图片：背景已与页面 roseblack 融为一体，无边框无白底 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-12"
        >
          {/* 上排标注：5 台手机上方 */}
          <div className="pointer-events-none absolute left-0 top-0 w-full -translate-y-[calc(100%+10px)]">
            {data.phoneLabels[0].map((label, i) => (
              <span
                key={label}
                className="absolute -translate-x-1/2 whitespace-nowrap text-[7px] font-medium tracking-normal text-[#FFB3D9] md:text-xs md:tracking-widest"
                style={{ left: `${[7.24, 30.02, 50.39, 70.85, 92.79][i]}%` }}
              >
                {label}
              </span>
            ))}
          </div>

          <img
            src={data.image}
            alt={`${data.name} 功能展示`}
            loading="lazy"
            className="h-auto w-full object-contain"
          />

          {/* 下排标注：两行手机之间，与第二行手机保持间距 */}
          <div
            className="pointer-events-none absolute left-0 w-full -translate-y-1/2"
            style={{ top: '55%' }}
          >
            {data.phoneLabels[1].map((label, i) => (
              <span
                key={label}
                className="absolute -translate-x-1/2 whitespace-nowrap text-[7px] font-medium tracking-normal text-[#FFB3D9] md:text-xs md:tracking-widest"
                style={{ left: `${[7.24, 30.02, 50.39, 70.85, 92.79][i]}%` }}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 项目链接 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {data.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="btn-candy inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              {l.label}
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
