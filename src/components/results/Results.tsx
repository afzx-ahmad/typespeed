import { tState } from "../../App"
import  { motion } from "framer-motion"
import { formatPercentage } from "../../utils/helpers"

function Results({
  state,
  errors,
  total,
  accuracyPercentage,
  addClassName
}: {
  state: tState,
  errors: number,
  total: number,
  accuracyPercentage: number,
  addClassName: string
}) {
  const animationProp = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {duration: 0.4}
  }

  if(state !== "finish") {
    return null
  } else {
    return (
      <ul
        className={`flex flex-col items-center text-primary-400 space-y-3 ${addClassName}`} 
      >
        <motion.li
          initial={animationProp.initial}
          animate={animationProp.animate}
          transition={animationProp.transition}
          className="text-xl font-semibold"
        >
          Results
        </motion.li>

        <motion.li
          initial={animationProp.initial}
          animate={animationProp.animate}
          transition={{...animationProp.transition, delay: 0.5}}
        >
          Accuracy: {formatPercentage(accuracyPercentage)}
        </motion.li>

        <motion.li
          initial={animationProp.initial}
          animate={animationProp.animate}
          transition={{...animationProp.transition, delay: 1}}
          className="text-red-500"
        >
          Errors: {errors}
        </motion.li>

        <motion.li
          initial={animationProp.initial}
          animate={animationProp.animate}
          transition={{...animationProp.transition, delay: 1.5}}
        >
          Total Typed: {total}
        </motion.li>
      </ul>
    )
  }
}

export default Results
