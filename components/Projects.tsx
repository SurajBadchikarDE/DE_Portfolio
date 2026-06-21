"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Database,
  LineChart,
  Activity,
  Layers,
} from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  gridClass: string;
  accent: string;
  icon: any;
  link?: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "Financial Data Analysis & Banking Insights",
      category: "Featured Project — ELT & Analytics",
      description:
        "Built an end-to-end ELT pipeline using Azure Data Factory and PySpark with incremental loading, dynamic file detection, and data quality checks across 10M+ banking records. Developed PySpark transformations for validation, cleansing, and aggregations to surface transaction trends and financial risk insights across Delta Lake layers — with full data lineage tracking throughout the Medallion architecture.",
      tech: ["ADF", "PySpark", "SparkSQL", "Delta Lake", "Azure SQL", "Data Lineage", "Medallion Architecture"],
      metrics: [
        { label: "Records Processed", value: "10M+" },
        { label: "Architecture", value: "Medallion" },
        { label: "Loading Strategy", value: "Incremental" },
      ],
      gridClass: "lg:col-span-2 lg:row-span-2",
      accent: "from-[#00BFFF] to-[#8B5CF6]",
      icon: Layers,
    },
    {
      id: 2,
      title: "Bizmetric Medallion Platform",
      category: "Production Data Platform",
      description:
        "Owned 10+ production Medallion pipelines at Bizmetric processing millions of records daily using ADF, Databricks (PySpark, Spark SQL), and Microsoft Fabric — with Azure Functions–based CI/CD orchestration reducing manual intervention by 50% and improving pipeline reliability by 40%.",
      tech: ["ADF", "Databricks", "PySpark", "Microsoft Fabric", "Azure Functions", "CI/CD", "Azure Monitor"],
      metrics: [
        { label: "Pipelines Owned", value: "10+" },
        { label: "Manual Intervention", value: "↓ 50%" },
        { label: "Reliability Gain", value: "↑ 40%" },
      ],
      gridClass: "lg:col-span-1 lg:row-span-1",
      accent: "from-[#8B5CF6] to-[#00FFFF]",
      icon: Activity,
    },
    {
      id: 3,
      title: "Delta Lake Governance & Optimisation",
      category: "Data Quality & Governance",
      description:
        "Managed Delta Lake tables in Azure Databricks with schema evolution and Unity Catalog governance across curated Silver and Gold layers. Optimised Spark transformations and SQL queries across Azure SQL and PostgreSQL — improving average job runtimes by 35% while powering Power BI and Snowflake reporting for executive dashboards.",
      tech: ["Delta Lake", "Unity Catalog", "Spark SQL", "Azure SQL", "PostgreSQL", "Power BI", "Snowflake"],
      metrics: [
        { label: "Query Speed", value: "↑ 35%" },
        { label: "Cost Reduction", value: "25%" },
      ],
      gridClass: "lg:col-span-1 lg:row-span-1",
      accent: "from-[#00FFFF] to-[#FFD700]",
      icon: Database,
    },
    {
      id: 4,
      title: "Streaming & Reporting Infrastructure",
      category: "Event-Driven & BI Delivery",
      description:
        "Designed SLA-aligned delivery pipelines integrating Azure Event Hubs for streaming ingestion, Debezium-based Change Data Capture (CDC), and automated Power BI / Snowflake reporting for executive stakeholder dashboards — enforcing data quality checks and maintaining lineage across all Medallion layers.",
      tech: ["Azure Event Hubs", "Debezium", "CDC", "Power BI", "Snowflake", "dbt", "Azure Functions"],
      metrics: [
        { label: "Processing Time", value: "↓ 25%" },
        { label: "Dashboards", value: "Executive BI" },
        { label: "SLA Compliance", value: "100%" },
      ],
      gridClass: "lg:col-span-3 lg:row-span-1",
      accent: "from-[#00BFFF] via-[#8B5CF6] to-[#FFD700]",
      icon: LineChart,
    },
  ];

  return (
    <section id="projects-section" className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
        <div className="absolute bottom-[20%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.04)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#00FFFF]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Selected Works
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Data Engineering Projects
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
            Production pipelines, Medallion architectures, and cloud data platforms built on Azure, Databricks, Snowflake, and Microsoft Fabric.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,_auto)]">
          {projects.map((project) => {
            const Icon = project.icon;
            const isFeatured = project.id === 1;
            const isWide = project.id === 4;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: project.id * 0.1 }}
                className={`${project.gridClass} group relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br ${project.accent} opacity-[0.01] group-hover:opacity-[0.06] blur-2xl transition-all duration-700 pointer-events-none`} />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)`,
                    padding: "1px",
                    mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskComposite: "xor",
                  }}
                />

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#00FFFF] uppercase">
                      {project.category}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-300 border border-white/5">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-[#00BFFF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-3xl">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/5 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6 items-end justify-between ${isFeatured || isWide ? "w-full" : ""}`}>
                  {project.metrics && (
                    <div className="flex flex-wrap gap-6">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                            {metric.label}
                          </span>
                          <span className="text-sm md:text-base font-bold text-white font-mono mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#00BFFF] group-hover:text-[#00FFFF] transition-colors duration-300">
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
