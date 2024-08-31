import { useCallback, useEffect, useState } from "react"
import CountdownTimer from "./components/conutdownTimer/CountdownTimer"
import WordsContainer from "./components/wordsContainer/WordsContainer"
import GenerateWords from "./components/generateWords/GenerateWords"
import UserTyping from "./components/userTyping/UserTyping"
import RestartButton from "./components/restartButton/RestartButton"
import Results from "./components/results/Results"
import Copyright from "./components/copyright/Copyright"
import useCountdownTimer from "./hooks/useCountdownTimer"
import useTyping from "./hooks/useTyping"
import useWords from "./hooks/useWords"
import { calculateAccuracyPercentage, countErrors } from "./utils/helpers"

const COUNTDOWN_SECOND = 60
const TOTAL_WORDS = 9 

export type tState = "start" | "run" | "finish"

function App() {
  const [state, setState] = useState<tState>("start")
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECOND) 
  const {words, updateWords} = useWords(TOTAL_WORDS)
  const {typed, cursor, clearTyped, resetTotalTyped, totalTyped} = useTyping(state != "finish")

  const [errors, setErrors] = useState(0)
  const isStarting = state === "start" && cursor > 0
  const areWordsFinished = cursor === words.length

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor)
    setErrors((current) => current + countErrors(typed, wordsReached))
  }, [typed, cursor])

  const restart = useCallback(() => {
    resetCountdown()
    resetTotalTyped()
    setState("start")
    setErrors(0)
    updateWords()
    clearTyped()
  }, [])

  // As soon the user start typing the first letter, timer will be start
  useEffect(() => {
    if(isStarting) {
      setState("run")
      startCountdown()
    }
  }, [isStarting])

  // When times is up, program will end and finish
  useEffect(() => {
    if(!timeLeft) {
      setState("finish")
      sumErrors()
    }
  }, [timeLeft, sumErrors])

  // Generate another random words if user finished type current words
  useEffect(() => {
    if(areWordsFinished) {
      sumErrors()
      updateWords()
      clearTyped()
    }
  }, [areWordsFinished])

  return (
    <>
      <CountdownTimer 
        className="text-primary-400 font-medium text-lg"
        timeLeft={timeLeft} 
      />
      <WordsContainer
        delayAnimation={0.6}
      >
        <GenerateWords 
          className="text-secondary-500"
          words={words} 
        />
        <UserTyping 
          className="absolute inset-0" 
          words={words}
          userInput={typed} 
        />
      </WordsContainer>
      <RestartButton
        addClassName="mx-auto mt-10 text-secondary-500 text-3xl"
        onRestart={restart}
        delayAnimation={1}
      />
      <Results
        state={state}
        errors={errors}
        total={totalTyped}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        addClassName="mt-5"
      />
      <Copyright />
    </>
  )
}

export default App
