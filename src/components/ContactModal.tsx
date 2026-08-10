import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Mail, Copy, Check } from 'lucide-react'

const EASE = [0.25, 0.1, 0.25, 1] as const

type Props = {
  open: boolean
  email: string
  onClose: () => void
}

// 联系我弹窗：展示邮箱，可复制 / 直接发信
export default function ContactModal({ open, email, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* 忽略：部分浏览器不支持 clipboard */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* 遮罩 */}
          <div className="absolute inset-0 bg-roseblack/70 backdrop-blur-sm" />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-md overflow-hidden rounded-[40px] border-2 border-lilac/40 bg-cream p-10 text-center shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="关闭"
              className="absolute right-6 top-6 text-cherry/50 transition-opacity duration-200 hover:opacity-70"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full btn-candy text-white">
              <Mail size={28} strokeWidth={2.2} />
            </div>

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-lilac">
              ( Get In Touch )
            </p>
            <h3 className="mb-6 text-2xl font-semibold text-cherry">联系我</h3>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-cherry/15 bg-white/60 px-5 py-4">
              <span className="select-all text-base font-medium text-cherry">
                {email}
              </span>
              <button
                onClick={copy}
                aria-label="复制邮箱"
                className="shrink-0 text-lilac transition-opacity duration-200 hover:opacity-70"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>

            <a
              href={`mailto:${email}`}
              className="btn-candy mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest text-white"
            >
              发送邮件
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
