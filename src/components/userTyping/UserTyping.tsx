import classNames from "classnames"
import { motion, Variants} from "framer-motion"

type tParameter = {
  className: string,
  words: string,
  userInput: string
}

function UserTyping({className, words, userInput}: tParameter) {
  const inputChar = userInput.split("")
  return (
    <div
      className={className}
    >
      {
        inputChar.map((char, index) => {
          return <Char key={`${char}_${index}`} userTyped={char} expected={words[index]} />
        })
      }
      <Caret />
    </div>
  )
}

// using Record utilities type
type tParameter_Char = Record<"userTyped" | "expected", string>

function Char({userTyped, expected}: tParameter_Char) {
  const isCorrect = userTyped === expected
  
  return (
    <span
      className={classNames({
        "text-red-500": !isCorrect,
        "text-primary-400": isCorrect,
        "bg-red-500/45": !isCorrect && expected === " "
      })}
    >
      {expected}
    </span>
  )
}

const variants: Variants = {
  blink: { opacity: 0 },
}


function Caret() {
  return (
    <motion.div
      className="inline-block w-[3px] bg-primary-500 h-8"
      animate="blink"
      transition={{ repeat: Infinity, duration: 0.5, ease: "linear"}}
      variants={variants}
    >
    </motion.div> 
  )
}

export default UserTyping
