import React, { useEffect, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
];

const HEADLINE = [
  { words: ["Let's", "build", "something"], accent: false },
  { words: ["great", "together."], accent: true },
];

const linkClass =
  "relative inline-block text-zinc-400 hover:text-emerald-400 hover:translate-x-1 transition-[color,transform] duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-emerald-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 motion-reduce:transition-none motion-reduce:after:transition-none";

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.824 0-9.737h3.554v1.377c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.393 3.74 4.385v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.958-1.71 1.187 0 1.927.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.172h3.283v11.28zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ArrowUpRight = ({ className = "" }: { className?: string }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const useIndiaTime = () => {
  const format = () =>
    new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

export const Footer: React.FC = () => {
  const { personal } = portfolioData;
  const [footerRef, visible] = useInViewOnce<HTMLElement>(0.1);
  const reducedMotion = usePrefersReducedMotion();
  const time = useIndiaTime();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });

  const reveal = (delayMs: number) => ({
    className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: visible ? `${delayMs}ms` : "0ms" },
  });

  const socials = [
    { label: "LinkedIn", href: personal.links.linkedin, icon: <LinkedInIcon />, external: true },
    { label: "GitHub", href: personal.links.github, icon: <GitHubIcon />, external: true },
    { label: "Email", href: personal.links.email, icon: <MailIcon />, external: false },
  ];

  let wordIndex = 0;
  const statusReveal = reveal(0);
  const ctaReveal = reveal(650);
  const columnsReveal = [reveal(850), reveal(950), reveal(1050), reveal(1150)];
  const bottomReveal = reveal(1300);
  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-ink-950 text-zinc-100 pt-24 px-4">
      <div aria-hidden className="footer-dots absolute inset-0 pointer-events-none" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-full h-[320px] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-transform duration-1000 ease-out motion-reduce:transition-none ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center">
          <div {...statusReveal} className={`${statusReveal.className} inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            {HEADLINE.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.words.map((word) => {
                  const delay = 150 + wordIndex++ * 90;
                  return (
                    <span key={word} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em] last:mr-0">
                      <span
                        className={`inline-block transition-transform duration-700 ease-out motion-reduce:transition-none ${
                          line.accent ? "bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent" : ""
                        } ${visible ? "translate-y-0" : "translate-y-full"}`}
                        style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <div {...ctaReveal} className={`${ctaReveal.className} mt-10 flex flex-col sm:flex-row items-center justify-center gap-4`}>
            <a
              href={`mailto:${personal.email}`}
              className="btn-shine group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-emerald-500 text-onaccent hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.45)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              Say hello
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-line/10 bg-line/5 text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors duration-300"
            >
              {copied ? (
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15V6a2 2 0 012-2h9" />
                </svg>
              )}
              <span aria-live="polite">{copied ? "Copied!" : personal.email}</span>
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-line/10 pt-12">
          <div {...columnsReveal[0]} className={`${columnsReveal[0].className} col-span-2 md:col-span-1`}>
            <h4 className="text-lg font-bold mb-3">{personal.name}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Frontend Developer crafting beautiful and performant web experiences.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {personal.location} · <span className="tabular-nums text-zinc-300">{time}</span> IST
            </p>
          </div>

          <div {...columnsReveal[1]}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div {...columnsReveal[2]}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${personal.email}`} className={`${linkClass} break-all`}>
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personal.phone}`} className={linkClass}>
                  {personal.phone}
                </a>
              </li>
              <li className="text-zinc-400">{personal.location}</li>
            </ul>
          </div>

          <div {...columnsReveal[3]}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Socials</h4>
            <ul className="space-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 text-sm text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors duration-300"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line/10 bg-line/5 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-onaccent group-hover:rotate-[-8deg]">
                      {social.icon}
                    </span>
                    {social.label}
                    <ArrowUpRight className="ml-auto opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          {...bottomReveal}
          className={`${bottomReveal.className} mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line/10 py-6 text-xs text-zinc-500`}
        >
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with React, Vite & Tailwind CSS
            <span className="type-caret" aria-hidden />
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/5 px-4 py-2 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors duration-300"
          >
            Back to top
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
