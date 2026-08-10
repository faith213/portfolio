import { motion } from 'framer-motion'
import { NAV } from '../data'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 顶部锚点导航：justify-between 铺 4 个大写链接，无 logo
export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed top-0 left-0 z-50 w-full px-6 py-6 md:px-12"
    >
      <div className="flex items-center justify-between text-cherry">
        {NAV.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="text-xs font-medium uppercase tracking-widest transition-opacity duration-200 hover:opacity-70 md:text-sm"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
