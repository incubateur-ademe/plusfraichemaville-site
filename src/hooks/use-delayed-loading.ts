import { useState, useEffect, useRef } from "react";

export const useDelayedLoading = (delay: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = () => {
    timerRef.current = setTimeout(() => {
      setIsLoading(true);
    }, delay);
  };

  const stopLoading = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { isLoading, startLoading, stopLoading };
};
