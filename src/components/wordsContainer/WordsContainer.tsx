import React from "react"
import { motion, MotionProps } from "framer-motion"

function WordsContainer({ children, delayAnimation = 0 }: {children: React.ReactNode, delayAnimation?: number}) {
  const animationProps: MotionProps = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {duration: 1, delay: delayAnimation}
  }

  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      transition={animationProps.transition}
      className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all"
    >
      {children}
    </motion.div>
  )
}

export default WordsContainer
