import { useEffect } from "react";
import type { PourAction } from "./model";
export default function usePouring(dispatch: (action: PourAction) => void) {
  useEffect(() => {
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden)
        dispatch({ type: "tick", seconds: (now - last) / 1000 });
      last = now;
    }, 100);
    return () => window.clearInterval(timer);
  }, [dispatch]);
}
