"use client";

import React from "react";
import { 
  Code2, 
  Database, 
  Layers, 
  Wrench, 
  Zap,
  Boxes
} from "lucide-react";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: any;
  glowColor: string;
}

const SkillCategory = ({ title, skills, icon: Icon, glowColor }: SkillCategoryProps) => {
  return (
    <div className="flex flex-col gap-3.5 w-full select-none py-3.5">
      {/* Title & Icon Header (Left-aligned, inline, no boxes) */}
      <div className="flex items-center gap-3 pb-2.5 border-b border-[#00FFFF]/25">
        <div 
          className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ color: glowColor }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
          {title}
        </h3>
      </div>

      {/* Indented Skill tags */}
      <div className="flex flex-wrap gap-2 pl-8">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-md text-[11px] font-mono border border-white/10 bg-white/[0.02] text-slate-300 transition-all duration-300 hover:border-[#00BFFF]/50 hover:bg-[#00BFFF]/5 hover:text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function TechStack() {
  const skillCategories: SkillCategoryProps[] = [
    {
      title: "Programming & Querying",
      skills: ["Python", "Pandas", "SQL", "PySpark", "SparkSQL"],
      icon: Code2,
      glowColor: "#FFD700", // Spark Gold
    },
    {
      title: "Data Engineering & Cloud",
      skills: [
        "Azure Databricks (Unity Catalog)",
        "ADLS Gen2",
        "Snowflake",
        "Microsoft Fabric",
        "Azure Data Factory",
        "Azure Functions",
        "Azure Event Hubs",
        "Azure SQL",
        "Power BI"
      ],
      icon: Database,
      glowColor: "#00BFFF", // Azure Blue
    },
    {
      title: "Architectures & Concepts",
      skills: [
        "Medallion Architecture",
        "Change Data Capture",
        "ELT/ETL",
        "Data Lakehouse",
        "Batch & Streaming Pipelines",
        "Data Modeling",
        "Star Schema",
        "Data Quality",
        "Data Governance",
        "Schema Evolution"
      ],
      icon: Layers,
      glowColor: "#8B5CF6", // Purple
    },
    {
      title: "DevOps & Tools",
      skills: [
        "Azure DevOps",
        "CI/CD Pipelines",
        "Git",
        "GitHub",
        "Azure Monitor",
        "SSMS",
        "DBeaver",
        "Microsoft Excel"
      ],
      icon: Wrench,
      glowColor: "#FF1493", // Pink
    },
    {
      title: "Streaming & Orchestration",
      skills: ["Debezium"],
      icon: Zap,
      glowColor: "#00FFFF", // Teal
    },
  ];

  return (
    <section id="skills-section" className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
      {/* Decorative Radial Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.04)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[#00BFFF]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Technical Skills • 2023 – 2025
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            The Data Engineering Toolchain
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
            Harnessing state-of-the-art cloud platforms, distributed execution engines, and orchestration patterns to build robust enterprise data solutions.
          </p>
        </div>

        {/* Clean, left-aligned 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-6xl">
          {skillCategories.map((item, idx) => (
            <SkillCategory key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
