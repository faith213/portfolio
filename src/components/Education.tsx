import { motion } from 'framer-motion'
import { EDUCATION, ENGLISH } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 教育背景：纯文字呈现，每段学校 = 一行经历
export default function Education() {
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

        <div className="flex flex-col gap-16 md:gap-20">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once:true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
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
          ))}
        </div>

        {/* 英语水平 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-16 border-t border-white/15 pt-8"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]">
            English Proficiency · 英语水平
          </p>
          <div className="flex flex-wrap gap-3">
            {ENGLISH.map((e) => (
              <span
                key={e.label}
                className="rounded-full border border-lilac/50 px-5 py-2 text-sm font-medium tracking-wide text-white/80"
              >
                {e.label}
                <span className="ml-2 font-semibold text-[#FFB3D9]">{e.score}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
