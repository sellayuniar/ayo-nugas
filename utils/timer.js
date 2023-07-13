import { useRef, useState, useEffect } from "react";
import moment from "moment";

export function useTimer() {
  const [currentTime, setCurrentTime] = useState(moment());
  const ref = useRef();

  useEffect(() => {
    ref.current = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(ref.current);
    };
  }, [currentTime]);

  return currentTime;
}
