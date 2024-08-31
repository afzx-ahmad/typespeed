import { useRef } from "react";
import { motion, MotionProps } from "framer-motion";

function RestartButton({onRestart: handleRestart, addClassName, delayAnimation = 0}: {onRestart: () => void, addClassName?: string, delayAnimation?: number}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const animationProps: MotionProps = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {duration: 1, delay: delayAnimation}
  }

  function handleClick() {
    buttonRef.current?.blur()
    handleRestart()
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      initial={animationProps.initial}
      animate={animationProps.animate}
      transition={animationProps.transition}

      className={`block rounded px-8 py-2 hover:bg-secondary ${addClassName}`}
    >
      🔃
    </motion.button>
  )
}

export default RestartButton
