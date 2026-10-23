import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface StartProps {
  start: boolean;
  /** Seconds to wait after `start` before animating. */
  delay?: number;
}

export const Typewriter = ({ text, start, delay = 0, speed = 55 }: StartProps & { text: string; speed?: number }) => {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setCount(text.length);
      return;
    }
    let interval = 0;
    const timeout = window.setTimeout(() => {
      let typed = 0;
      interval = window.setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= text.length) window.clearInterval(interval);
      }, speed);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [start, text, delay, speed, reduced]);

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span aria-hidden className="type-caret" />
    </span>
  );
};

export const SplitName = ({ text, start, delay = 0 }: StartProps & { text: string }) => {
  let index = 0;
  return (
    <span className="split-name">
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const i = index++;
            return (
              <span
                key={i}
                aria-hidden
                className={`name-letter ${start ? "is-in" : ""}`}
                style={{ animationDelay: `${delay + i * 0.045}s` }}
              >
                <span className="name-letter__inner">{char}</span>
              </span>
            );
          })}
          {w < text.split(" ").length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export const FlipWords = ({ words, start, interval = 2600 }: StartProps & { words: string[]; interval?: number }) => {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!start || reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [start, reduced, words.length, interval]);

  return (
    <span className="flip-words" aria-live="polite">
      <span key={i} className="flip-word">
        {words[i]}
      </span>
    </span>
  );
};
