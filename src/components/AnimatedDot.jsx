import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
const AnimatedDot = ({ color }) => {
  const ref = useRef(null)
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPopped(true)
          observer.disconnect()
        }
      },
      { threshold: 0.8 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="hidden md:block absolute w-4 h-4 rounded-full flex-shrink-0 mt-1"
      style={{
        background: color,
        boxShadow: `0 0 12px ${color}66`,
        insetInlineStart: 0,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={popped ? { scale: [0, 1.4, 1], opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        // pulse once after pop
        if (popped && ref.current) {
          ref.current.animate(
            [
              { boxShadow: `0 0 0px ${color}00`, transform: 'scale(1)' },
              { boxShadow: `0 0 16px ${color}99`, transform: 'scale(1.3)' },
              { boxShadow: `0 0 0px ${color}00`, transform: 'scale(1)' },
            ],
            { duration: 700, easing: 'ease-out' }
          )
        }
      }}
    />
  )
}

export default AnimatedDot;