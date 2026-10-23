import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

export type Theme = "dark" | "light";

/** Must match the key read by the inline script in index.html. */
const STORAGE_KEY = "niyati-theme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const currentTheme = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggleTheme = useCallback((origin?: { clientX: number; clientY: number }) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const apply = () => {
      root.classList.toggle("light", next === "light");
      flushSync(() => setTheme(next));
    };

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable – theme just won't persist across reloads
    }

    const doc = document as ViewTransitionDocument;
    if (prefersReducedMotion()) {
      apply();
      return;
    }

    if (!doc.startViewTransition) {
      root.classList.add("theme-transition");
      apply();
      window.setTimeout(() => root.classList.remove("theme-transition"), 450);
      return;
    }

    const x = origin?.clientX ?? window.innerWidth / 2;
    const y = origin?.clientY ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

  return { theme, toggleTheme };
};
