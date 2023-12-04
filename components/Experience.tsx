"use client";

import React from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";

// import { useTheme } from "@/context/theme-context";
import SectionHeading from "./SectionHeading";
import { UseSectionView } from "@/lib/hooks";

export default function Experience() {
  const { ref } = UseSectionView("Projects");

  return (
    <section id="experience" className="experience" ref={ref}>
      <SectionHeading title="My experience" />

      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                // background:
                //   theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={
                {
                  // borderRight:
                  //   theme === "light"
                  //     ? "0.4rem solid #9ca3af"
                  //     : "0.4rem solid rgba(255, 255, 255, 0.5)",
                }
              }
              date={item.date}
              icon={item.icon}
              iconStyle={{
                // background:
                //   theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="experience_title">{item.title}</h3>
              <p className="experience_location">{item.location}</p>
              <p className="experience_description">{item.description}</p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
