import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import Magnet from './Magnet'
import { EMAIL, asset } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

const XHS_QR = asset('/social/xiaohongshu-qr.jpg')

// 页脚 / 联系方式，收束整页
export default function Footer() {
  const [xhsOpen, setXhsOpen] = useState(false)

  return (
    <footer
      id="contact"
      className="relative z-50 -mt-14 rounded-t-[60px] bg-roseblack px-6 pt-28 pb-16 md:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-[#FFB3D9]"
        >
          ( Get In Touch )
        </motion.span>

        <h2
          className="text-frosted mb-12 font-black uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let's Talk
        </h2>

        <Magnet padding={120} strength={4}>
          <a
            href={`mailto:${EMAIL}`}
            className="btn-candy inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white"
          >
            {EMAIL}
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </Magnet>

        <div className="mt-20 flex w-full flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs uppercase tracking-widest text-white/50 md:flex-row">
          <span>© 2026 XIA GELING</span>
          <div className="flex gap-8">
            <a href="#" className="transition-opacity duration-200 hover:opacity-70">Instagram</a>
            <a href="#" className="transition-opacity duration-200 hover:opacity-70">Behance</a>
            <button
              type="button"
              onClick={() => setXhsOpen(true)}
              className="uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
            >
              Xiaohongshu
            </button>
          </div>
          <a href="#top" className="transition-opacity duration-200 hover:opacity-70">Back To Top ↑</a>
        </div>
      </div>

      {/* 小红书名片灯箱 */}
      <AnimatePresence>
        {xhsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setXhsOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-[30px] bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setXhsOpen(false)}
                aria-label="关闭"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
              <img
                src={XHS_QR}
                alt="小红书名片二维码"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
