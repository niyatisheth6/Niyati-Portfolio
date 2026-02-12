import React from "react";
import { portfolioData } from "../../data/portfolio";

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {personal.name}
            </h4>
            <p className="text-gray-400 text-sm">
              Frontend Developer crafting beautiful and performant web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {personal.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${personal.phone}`}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {personal.phone}
                </a>
              </p>
              <p className="text-gray-400">{personal.location}</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mb-8">
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 transition-colors duration-300"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.824 0-9.737h3.554v1.377c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.393 3.74 4.385v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.958-1.71 1.187 0 1.927.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.172h3.283v11.28zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
            title="GitHub"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={personal.links.email}
            className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition-colors duration-300"
            title="Email"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <p className="mt-2">
              Built with React, Vite & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
