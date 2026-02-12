import React from "react";

interface ProjectCardProps {
  name: string;
  tech: string[];
  description: string;
  highlights: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  tech,
  description,
  highlights,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{description}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold rounded-full hover:shadow-md transition-shadow"
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
              className="text-sm text-gray-600 flex items-start gap-2"
            >
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
