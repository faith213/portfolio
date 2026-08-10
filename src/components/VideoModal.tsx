import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const EASE = [0.25, 0.1, 0.25, 1] as const

type Props = {
  open: boolean
  src: string
  onClose: () => void
}

// 视频灯箱：点击教育相册中的视频后播放
export default function VideoModal({ open, src, onClose }: Props) {
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
          <div className="absolute inset-0 bg-roseblack/80 backdrop-blur-sm" />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border-2 border-lilac/40 bg-black shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="关闭"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-200 hover:opacity-70"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="h-auto max-h-[80vh] w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
