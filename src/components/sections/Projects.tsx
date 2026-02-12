import React from "react";
import { portfolioData } from "../../data/portfolio";
import { ProjectCard } from "../common/ProjectCard";
import { SectionHeader } from "../common/SectionHeader";

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="Innovative solutions I've built using modern technologies"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              tech={project.tech}
              description={project.description}
              highlights={project.highlights}
              url= {project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
