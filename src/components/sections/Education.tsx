import React from "react";
import { portfolioData } from "../../data/portfolio";
import { SectionHeader } from "../common/SectionHeader";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Education"
          subtitle="Academic background and achievements"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {portfolioData.education.map((edu, index) => (
            <div
              key={edu.id}
              className="group relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-indigo-600 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2"
            >
              {/* Left accent bar */}
              {/* <div className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-l-2xl transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div> */}

              {/* Top accent dot */}
              {/* <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

              <div className="relative z-10">
                {/* Year badge */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">
                    {edu.duration}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-indigo-600 font-semibold text-lg mb-3">
                  {edu.institution}
                </p>

                {/* Location with icon */}
                <p className="text-gray-600 flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{edu.location}</span>
                </p>

                {/* CGPA */}
                {edu.cgpa && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">CGPA</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {edu.cgpa}
                    </p>
                  </div>
                )}

                {/* Hover effect arrow */}
                {/* <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
