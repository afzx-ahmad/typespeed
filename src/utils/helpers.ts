export function countErrors(actualTyped: string, expectedWords: string): number {
  const expectedCharacter = expectedWords.split("")

  return expectedCharacter.reduce((errors, expectedChar, i) => {
    const actualChar = actualTyped[i]
    if(actualChar !== expectedChar) {
      errors++
    }

    return errors
  }, 0)
}

export function calculateAccuracyPercentage(errors: number, total: number): number {
  if(total > 0) {
    const correct = total - errors
    return (correct / total) * 100
  }

  return 0
}

export function formatPercentage(value: number): string {
  return `${value.toFixed()}%`
}
