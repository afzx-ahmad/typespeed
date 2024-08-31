import style from "./style.module.css"
import { motion, MotionProps } from "framer-motion"

type tParameter = {
  className?: string,
  timeLeft: number,
  delayAnimation?: number  
}

function CountdownTimer({ className, timeLeft, delayAnimation = 0 }: tParameter) {
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
      className={`${className} ${style.wrap}`}
    >
      <p>Time: <span>{timeLeft}</span></p>  
    </motion.div>
  )
}

export default CountdownTimer
