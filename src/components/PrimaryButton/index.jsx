
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

const PrimaryButton = ({ text, icon, onClick }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      className="
        group relative cursor-pointer
        bg-[var(--button-primary)]/80 border border-white/[0.08]
        pl-4 pr-2 py-1.5
        flex items-center gap-6
        rounded-lg
        backdrop-blur-md
        overflow-hidden
        outline-none
      "
    >
      {/* Animated border glow that follows hover */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 50%, rgba(59,130,246,0.08) 100%)",
        }}
      />

      {/* Scanning line effect */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.06) 45%, rgba(59,130,246,0.12) 50%, rgba(59,130,246,0.06) 55%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      />

      {/* Top edge highlight */}
      <span className="pointer-events-none absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      {/* Text */}
      <motion.span
        className="relative z-10 text-slate-200/90 font-medium tracking-wide group-hover:text-white transition-colors duration-300"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
      >
        {text}
      </motion.span>

      {/* Icon container */}
      <motion.span
        className="
          relative z-10
          w-9 h-9 rounded-lg
          flex items-center justify-center
          bg-blue-500 text-white
          shadow-[0_0_15px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
        "
        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          delay: 0.25,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow:
            "0 0 25px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {/* Pulsing ring behind icon */}
        <motion.span
          className="absolute inset-0 rounded-lg border border-blue-400/40"
          animate={{
            scale: [1, 1.35, 1.35],
            opacity: [0.6, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeOut",
          }}
        />
        {icon}
      </motion.span>
    </motion.button>
  )
}

export default PrimaryButton
