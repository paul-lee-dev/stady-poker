import { useEffect, useRef, useState } from "react";

export const useGameLoop = (onTick: () => void, interval = 1000) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        onTick();
      }, interval);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running, interval, onTick]);

  return { start: () => setRunning(true), stop: () => setRunning(false) };
};