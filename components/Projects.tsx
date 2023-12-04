"use client";

import React from "react";
import { projectsData } from "@/lib/data";
import Project from "./Project";
import SectionHeading from "./SectionHeading";
import { UseSectionView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = UseSectionView("Projects");

  return (
    <section id="projects" className="projects" ref={ref}>
      <SectionHeading title="My projects" />

      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
