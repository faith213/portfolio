import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'
import { ABOUT_ICONS, ABOUT_TEXT } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 关于我：四角悬浮小图从 x 轴淡入 + 逐字揭示正文（仅一段）
export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 -mt-14 min-h-screen rounded-t-[60px] bg-cream px-6 pt-28 pb-24 md:px-12"
    >
      {/* 四角悬浮小图（爱好娱乐） */}
      {ABOUT_ICONS.map((icon, i) => (
        <motion.img
          key={i}
          src={icon.src}
          alt=""
          loading="lazy"
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
          className={`absolute z-0 h-24 w-24 rounded-3xl border-2 border-lilac/30 object-cover shadow-lg md:h-36 md:w-36 ${icon.pos}`}
        />
      ))}

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 text-xs font-medium uppercase tracking-[0.3em] text-lilac"
        >
          ( About )
        </motion.span>

        <h2
          className="text-frosted mb-14 font-black uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About Me
        </h2>

        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-3xl justify-center text-center font-medium leading-relaxed text-cherry"
        />
      </div>
    </section>
  )
}
