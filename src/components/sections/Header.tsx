import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
];

interface HeaderProps {
  ready?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ ready = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const { personal } = portfolioData;
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const update = () => {
      const el = linkRefs.current[active];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active, ready]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const iconClass =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg bg-line/5 border border-line/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-110";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "bg-ink-950/70 backdrop-blur-xl border-line/10 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent"
      } ${ready ? "nav-enter" : "opacity-0 pointer-events-none"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-[height] duration-500 ${scrolled ? "h-14" : "h-20"}`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="group"
              aria-label="Niyati Sheth – Home"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="logo-cube-scene" aria-hidden>
                  <div className="logo-cube-spin">
                    <div className="logo-cube">
                      <span className="logo-face logo-face--front">N</span>
                      <span className="logo-face logo-face--back">S</span>
                      <span className="logo-face logo-face--right">{"</>"}</span>
                      <span className="logo-face logo-face--left">{"{}"}</span>
                      <span className="logo-face logo-face--top">N</span>
                      <span className="logo-face logo-face--bottom">S</span>
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline font-bold text-zinc-100 text-lg group-hover:text-emerald-400 transition-colors duration-300">
                  Niyati Sheth
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 relative">
            {navLinks.map((link) => (
              <button
                key={link.label}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                onClick={() => handleNavClick(link.href)}
                className={`nav-roll text-sm font-medium ${
                  active === link.href ? "text-zinc-100" : "text-zinc-400"
                }`}
              >
                <span className="nav-roll__inner">
                  <span className="nav-roll__face">{link.label}</span>
                  <span className="nav-roll__face nav-roll__face--bottom" aria-hidden>
                    {link.label}
                  </span>
                </span>
              </button>
            ))}
            <span
              aria-hidden
              className="absolute -bottom-2 h-0.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-500 ease-out"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
            />
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 });
              }}
              className={`theme-toggle ${iconClass} ${theme === "light" ? "is-light" : ""}`}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
            >
              <span className="theme-toggle__inner">
                <span className="theme-toggle__face">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                </span>
                <span className="theme-toggle__face theme-toggle__face--back">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path
                      strokeLinecap="round"
                      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
                    />
                  </svg>
                </span>
              </span>
            </button>

            {/* Social Links */}
            <div className="hidden sm:flex gap-3">
              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={iconClass}
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.824 0-9.737h3.554v1.377c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.393 3.74 4.385v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.958-1.71 1.187 0 1.927.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.172h3.283v11.28zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={iconClass}
                title="GitHub"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href={personal.links.email} className={iconClass} title="Email" aria-label="Email">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden relative w-10 h-10 text-zinc-300 hover:text-emerald-400 transition-transform duration-500 ${
                isMenuOpen ? "[transform:rotateY(180deg)]" : ""
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`absolute left-1/2 top-1/2 -ml-2.5 -mt-px w-5 h-0.5 rounded bg-current transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 -ml-2.5 -mt-px w-5 h-0.5 rounded bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 -ml-2.5 -mt-px w-5 h-0.5 rounded bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mb-4 p-3 rounded-2xl bg-ink-800/95 backdrop-blur-xl border border-line/10 menu-flip">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors duration-300 ${
                    active === link.href
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-zinc-300 hover:text-emerald-400 hover:bg-line/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-3 px-4 pt-3 mt-2 border-t border-line/10">
                <a
                  href={personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconClass}
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.824 0-9.737h3.554v1.377c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.393 3.74 4.385v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.958-1.71 1.187 0 1.927.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.172h3.283v11.28zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a
                  href={personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconClass}
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={personal.links.email} className={iconClass} title="Email">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
