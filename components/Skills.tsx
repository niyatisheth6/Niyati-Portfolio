"use client";

import React from "react";

import { skillsData } from "@/lib/data";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { UseSectionView, fadeInAnimationVariants } from "@/lib/hooks";

export default function Skills() {
  const { ref } = UseSectionView("Skills");

  return (
    <section ref={ref} id="skills" className="skills">
      <SectionHeading title="My skills" />

      <ul className="skills_navbar">
        {skillsData.map((skill, index) => (
          <motion.li
            className="skills_navlist"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
