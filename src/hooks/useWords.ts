import { faker } from "@faker-js/faker"
import { useCallback, useState } from "react"

function generateWords(count: number): string {
  return faker.word.words(count).toLowerCase()
}

function useWords(count: number) {
  const [words, setWords] = useState(generateWords(count)) 

  const updateWords = useCallback(() => {
    setWords(generateWords(count))
  }, [count])

  return {words, updateWords}
}

export default useWords
