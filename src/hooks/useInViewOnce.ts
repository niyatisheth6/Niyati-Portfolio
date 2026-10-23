import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Flips to true the first time the element scrolls into view (immediately when reduced motion is on). */
export const useInViewOnce = <T extends Element>(threshold = 0.2) => {
  const ref = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (reducedMotion || seen) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, seen, threshold]);

  return [ref, seen || reducedMotion] as const;
};
