import React from "react";
import { portfolioData } from "../../data/portfolio";
import { SectionHeader } from "../common/SectionHeader";

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      skills: portfolioData.skills.frontend,
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      title: "Tools & Libraries",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      skills: portfolioData.skills.tools,
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Other Skills",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      skills: portfolioData.skills.other,
      gradient: "from-pink-600 to-indigo-600",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Technologies and tools I'm proficient in"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-transparent hover:bg-gradient-to-br hover:from-gray-50 hover:to-white hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} p-3 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Title with gradient */}
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-6`}>
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-gray-700 group/item hover:text-gray-900 transition-colors"
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} group-hover/item:scale-150 transition-transform`}></span>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Skill count badge */}
              
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};
