import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="text-center mb-12 animation-fadeInUp">
      <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] mx-auto mt-6 rounded-full"></div>
    </div>
  );
};
