import React from "react";
import { portfolioData } from "../../data/portfolio";
import { SectionHeader } from "../common/SectionHeader";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and achievements"
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 md:transform md:-translate-x-1/2"></div>

          <div className="space-y-8 md:space-y-0">
            {portfolioData.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className={`md:grid md:grid-cols-2 md:gap-8 ${
                  idx % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border-4 border-white shadow-lg transform md:-translate-x-1/2 md:-translate-y-2"></div>

                {/* Content */}
                <div className={`pl-10 md:pl-0 md:pr-8 ${idx % 2 === 1 ? "md:col-start-2" : ""}`}>
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Duration badge */}
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Position */}
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {exp.position}
                      </h3>

                      {/* Company */}
                      <p className="text-indigo-600 font-semibold text-lg mb-3">
                        {exp.company}
                      </p>

                      {/* Location */}
                      <p className="text-gray-600 flex items-center gap-2 mb-6">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </p>

                      {/* Divider */}
                      <div className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 opacity-20"></div>

                      {/* Responsibilities */}
                      <ul className="space-y-3">
                        {exp.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="flex items-start gap-3 text-gray-700">
                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mt-2"></span>
                            <span className="text-sm leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
