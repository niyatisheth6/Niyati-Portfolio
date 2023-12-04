import { links, projectsData } from "./data";

export type ProjectProps = (typeof projectsData)[number];

export type SectionName = (typeof links)[number]["name"];

export type ActiveSectionProps = {
  children: React.ReactNode;
};

export type ActiveSectionCXontextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export type SectionHeadingProps = {
  title: string;
};
