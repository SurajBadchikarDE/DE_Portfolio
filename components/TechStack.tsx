"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  GitFork, 
  Terminal, 
  Flame, 
  LayoutGrid, 
  Snowflake, 
  Zap, 
  HardDrive, 
  BarChart3,
  Boxes
} from "lucide-react";

interface TechCardProps {
  name: string;
  category: string;
  description: string;
  icon: any;
  glowColor: string;
}

const TechCard = ({ name, category, description, icon: Icon, glowColor }: TechCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden group select-none transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] h-[220px]"
    >
      {/* Radial Hover Glow inside Card */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${glowColor}15, transparent 80%)`,
        }}
      />

      {/* Outer Border Light Trace (Linear style) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${glowColor}40, transparent 80%)`,
          padding: "1px",
          mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="flex flex-col gap-4">
        {/* Category & Icon */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            {category}
          </span>
          <div 
            className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-colors duration-300 group-hover:text-white"
            style={{ color: glowColor }}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-white">
            {name}
          </h3>
          <p className="text-slate-400 text-xs font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Active Node Indicator */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
        <span>Node Cluster</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse" />
      </div>
    </div>
  );
};

export default function TechStack() {
  const technologies: TechCardProps[] = [
    {
      name: "Azure Data Factory",
      category: "Orchestration & ETL",
      description: "Designing hybrid ingestion networks and orchestrating scale-out batch pipelines via copy activities and triggers.",
      icon: GitFork,
      glowColor: "#00BFFF", // Azure Blue
    },
    {
      name: "Databricks",
      category: "Unified Analytics Engine",
      description: "Developing clean, collaborative notebooks utilizing Delta Lakes, Spark runtimes, and optimized execution pipelines.",
      icon: Terminal,
      glowColor: "#8B5CF6", // Databricks Purple
    },
    {
      name: "PySpark",
      category: "Parallel Data Processing",
      description: "Writing robust Python wrapper scripts for Apache Spark clusters to run transformations on massive tabular structures.",
      icon: Flame,
      glowColor: "#FFD700", // Spark Gold
    },
    {
      name: "Microsoft Fabric",
      category: "SaaS Analytics Fabric",
      description: "Building integrated Lakehouse tables, Warehouses, and semantic data models using a unified OneLake ecosystem.",
      icon: LayoutGrid,
      glowColor: "#00FFFF", // Fabric Teal
    },
    {
      name: "Snowflake",
      category: "Cloud Data Warehouse",
      description: "Configuring multi-cluster compute nodes, zero-copy clones, external stages, and optimizing complex SQL queries.",
      icon: Snowflake,
      glowColor: "#00BFFF", // Snowflake Blue
    },
    {
      name: "Azure Functions",
      category: "Serverless Compute",
      description: "Triggering lightweight event-driven data ingestion, REST API calls, metadata updates, and processing files on the fly.",
      icon: Zap,
      glowColor: "#FFD700", // Gold
    },
    {
      name: "ADLS Gen2",
      category: "Enterprise Storage",
      description: "Architecting hierarchal folder spaces, security permissions, file lifecycles, and high-security storage endpoints.",
      icon: HardDrive,
      glowColor: "#8B5CF6", // Purple
    },
    {
      name: "Power BI",
      category: "Business Intelligence",
      description: "Designing dashboards, DAX queries, import models, and automated paginated reporting for business stakeholders.",
      icon: BarChart3,
      glowColor: "#00FFFF", // Teal
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
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
              Cloud Infrastructure
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            The Data Engineering Toolchain
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
            Harnessing state-of-the-art cloud platforms, execution engines, and storage patterns to process billions of operations with minimal latency.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <TechCard key={idx} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
