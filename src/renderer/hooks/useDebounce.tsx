import { useRef, useEffect } from 'react';

const useDebouncedCleanup = (callback, delay = 200) => {
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback();
      }, delay);
    };
  }, [callback, delay]);
};

export default useDebouncedCleanup;
