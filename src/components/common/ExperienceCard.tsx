import React from "react";

interface ExperienceCardProps {
  position: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  position,
  company,
  location,
  duration,
  responsibilities,
}) => {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-indigo-600 group hover:border-purple-600 transition-colors duration-300">
      {/* Timeline dot */}
      <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-2.5 top-2 group-hover:scale-150 group-hover:bg-purple-600 transition-all duration-300"></div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{position}</h3>
            <p className="text-indigo-600 font-semibold">{company}</p>
          </div>
          <span className="text-sm text-gray-500 font-medium">{duration}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
          <span className="text-indigo-600">📍</span>
          {location}
        </p>

        <ul className="space-y-2">
          {responsibilities.map((resp, idx) => (
            <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-purple-600 font-bold mt-1">✓</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
