import React from "react";

interface ProjectCardProps {
  name: string;
  tech: string[];
  description: string;
  highlights: string[];
  url: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  tech,
  description,
  highlights,
  url,
}) => {
  return (
    <div className="bg-ink-800 border border-line/10 rounded-xl p-6 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 ease-out hover:-translate-y-2 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{description}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full hover:shadow-md transition-shadow"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <div className="flex-grow">
        <ul className="space-y-2">
          {highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="text-sm text-zinc-400 flex items-start gap-2"
            >
              <span className="text-emerald-400 font-bold mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:gap-3 hover:text-emerald-300 transition-all duration-300 group/link mt-3 cursor-pointer"
      >
        View Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right group-hover/link:translate-x-1 transition-transform"
          aria-hidden="true"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </a>
    </div>
  );
};
