import {useRef, useState, useCallback, useEffect} from "react";

type returnF = {
  timeLeft: number,
  startCountdown: () => void,
  resetCountdown: () => void 
}

function useCountdownTimer(seconds: number): returnF {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
      intervalRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => {
          return timeLeft - 1;
        })
      }, 1000); 
    }, []);

  const resetCountdown = useCallback(() => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setTimeLeft(seconds);
    }, []);

  useEffect(() => {
    if(timeLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  return {timeLeft, startCountdown, resetCountdown};
}

export default useCountdownTimer;
