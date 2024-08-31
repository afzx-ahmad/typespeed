import { useState, useEffect, useCallback, useRef } from "react"
import audioSrc from "../assets/audio/key.mp3"

function useTyping(enabled: boolean) {
  const [cursor, setCursor] = useState<number>(0)
  const [typed, setTyped] = useState<string>("")
  const totalTyped = useRef(0)
  const audioRef = useRef(new Audio(audioSrc))

  function playAudio() {
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(error => {
      console.error("Error to play key sound", error)
    })
  }

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    // if enabled: false or isKeyboardCodeAllowed not return anything
    // retrun: exit the function
    if(!enabled || !isKeyboardCodeAllowed(e.code)) return

    switch(e.key) {
      case "Backspace":
      {
        setTyped((current) => current.slice(0, -1))
        setCursor(cursor - 1)
        totalTyped.current -= 1 
        playAudio()
        break
      }
      default:
      {
        setTyped((current) => current.concat(e.key))
        setCursor(cursor + 1)
        totalTyped.current += 1
        playAudio()
        break
      }
    }
  }, [cursor, enabled])

  const clearTyped = useCallback(() => {
    setTyped("")
    setCursor(0)
  }, [])

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler)
    
    return () => {
      window.removeEventListener("keydown", keydownHandler)
    }
  },[keydownHandler])

  return {typed, cursor, clearTyped, resetTotalTyped, totalTyped: totalTyped.current}
}

function isKeyboardCodeAllowed(code: string) {
  return (
    code.startsWith("Key") || code.startsWith("Digit") || code === "Minus" || code === "Backspace" || code === "Space"
  )
}

export default useTyping 
