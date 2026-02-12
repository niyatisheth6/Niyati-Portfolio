import React from "react";

interface SkillBadgeProps {
  skill: string;
  index?: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, index = 0 }) => {
  const colors = [
    "from-indigo-500 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-blue-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
  ];

  const color = colors[index % colors.length];

  return (
    <div
      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${color} text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default`}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {skill}
    </div>
  );
};
