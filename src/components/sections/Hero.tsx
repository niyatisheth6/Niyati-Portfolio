import React from "react";
import { portfolioData } from "../../data/portfolio";

export const Hero: React.FC = () => {
  const { personal, summary } = portfolioData;

  return (
    <section
      className="relative min-h-screen bg-white flex items-center justify-center px-4 pt-24"
      id="home"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center animation-fadeInUp">
          {/* Greeting */}
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg">
              Hello, I'm
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 !leading-tight">
            {personal?.name}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            {personal?.title}
          </h2>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            {personal?.subtitle}
          </h2>

          {/* Summary */}
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {summary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-50">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-indigo-600/40 transition-all duration-300 ease-out active:scale-95 flex items-center gap-2 group hover:-translate-y-1 cursor-pointer"
            >
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View My Work
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center mt-12 relative z-50">
            {/* LinkedIn */}
            <a
              href={personal?.links?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white border-2 border-gray-200 rounded-full hover:bg-indigo-600 hover:border-indigo-600 hover:text-white hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-110 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {" "}
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.824 0-9.737h3.554v1.377c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.393 3.74 4.385v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.958-1.71 1.187 0 1.927.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.172h3.283v11.28zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />{" "}
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={personal?.links?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:shadow-xl hover:shadow-gray-900/30 hover:scale-110 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {" "}
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />{" "}
              </svg>
            </a>

            {/* Email */}
            <a
              href={personal?.links?.email}
              className="p-4 bg-white border-2 border-gray-200 rounded-full hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-xl hover:shadow-red-600/30 hover:scale-110 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />{" "}
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
