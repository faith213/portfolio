import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
}

// 逐 token 揭示：随滚动 opacity 0.2 → 1，offset ['start 0.8','end 0.2']
// tokenize：单个 CJK 字符 / 连续的非空白拉丁片段 / 空格，兼容中英混排
function tokenize(text: string): string[] {
  const re = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]|[^\s]+|\s+/g
  return text.match(re) ?? [text]
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const tokens = tokenize(text)

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tokens.map((tk, i) => {
        const start = i / tokens.length
        const end = start + 1 / tokens.length
        return (
          <Token key={i} range={[start, end]} progress={scrollYProgress}>
            {tk}
          </Token>
        )
      })}
    </p>
  )
}

function Token({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  // 空白 token 直接占位，保留断词
  if (/^\s+$/.test(children)) return <span>{'\u00A0'}</span>
  return (
    <motion.span style={{ opacity, whiteSpace: 'pre' }}>{children}</motion.span>
  )
}
