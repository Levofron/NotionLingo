import { useEffect, useState } from 'react';

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  useEffect(() => () => clearInterval(intervalId), []);

  useEffect(() => {
    if (intervalId && countdown <= 0) {
      setIntervalId(undefined);
      clearInterval(intervalId);
    }
  }, [intervalId, countdown]);

  const start = () => {
    if (intervalId) {
      throw new Error('Interval is already set');
    }

    let timer = seconds;

    const newIntervalId = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const isEnded = countdown <= 0;

  return {
    start,
    isEnded,
    countdown,
    isStarted: !isEnded && !!intervalId,
  };
};
