type tParameter = {
  className?: string,
  words: string
}

function GenerateWords({ className, words }: tParameter) {
  return (
    <p className={className}>
      {words}
    </p>
  )
}

export default GenerateWords
