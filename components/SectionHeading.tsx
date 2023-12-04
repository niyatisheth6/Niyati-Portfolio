import React from "react";
import { SectionHeadingProps } from "@/lib/types";

export default function SectionHeading({ title }: SectionHeadingProps) {
  return <h2 className="about-heading">{title}</h2>;
}
