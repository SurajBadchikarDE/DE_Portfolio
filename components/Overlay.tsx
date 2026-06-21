"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Database, Download, Cpu, ShieldCheck, BarChart4, Wrench } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

interface PipelineStep {
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
  icon: any;
  ranges: number[]; // [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
  isGold?: boolean;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps: PipelineStep[] = [
    {
      title: "Raw Data Sources",
      subtitle: "Ingestion — Where data is born",
      description:
        "Raw, unstructured data flows in from operational systems, files, APIs, and event streams. Tools and languages used to connect, query, and pull data from source systems.",
      chips: [
        "Python", "SQL", "Pandas",
        "Azure SQL", "SQL Server", "PostgreSQL",
        "CSV / JSON / Parquet", "REST APIs",
        "SSMS", "DBeaver",
      ],
      icon: Database,
      ranges: [0.0, 0.05, 0.10, 0.14],
    },
    {
      title: "Ingestion & Streaming",
      subtitle: "Bronze Layer — Ingest at scale",
      description:
        "Building resilient batch and real-time ingestion pipelines. Change Data Capture, event-driven ingest, and serverless triggers bring data into the lakehouse reliably.",
      chips: [
        "Azure Data Factory", "Azure Event Hubs",
        "Azure Functions", "Debezium (CDC)",
        "ADLS Gen2", "Autoloader",
        "ELT / ETL", "Batch Pipelines", "Streaming Pipelines",
      ],
      icon: Download,
      ranges: [0.15, 0.20, 0.26, 0.30],
    },
    {
      title: "Transformation",
      subtitle: "Silver Layer — Cleanse & Enrich",
      description:
        "Heavy distributed computation — cleaning, joining, aggregating, and conforming bronze data into enriched Silver tables using cluster-scale engines and lakehouse formats.",
      chips: [
        "PySpark", "SparkSQL", "Databricks",
        "Delta Lake", "Microsoft Fabric",
        "Data Modeling", "Star Schema",
        "Schema Evolution", "Incremental Loading",
        "Data Quality Checks",
      ],
      icon: Cpu,
      ranges: [0.31, 0.36, 0.42, 0.46],
    },
    {
      title: "Governance & Quality",
      subtitle: "Compliance · Lineage · Trust",
      description:
        "Enforcing data contracts, lineage tracking, access controls, and automated monitoring to ensure Gold-layer data is trustworthy, compliant, and audit-ready.",
      chips: [
        "Unity Catalog", "Data Governance",
        "Data Lineage", "Data Quality",
        "Change Data Capture", "SLA Monitoring",
        "Azure Monitor", "CI/CD Pipelines",
        "Azure DevOps", "Git / GitHub",
      ],
      icon: ShieldCheck,
      ranges: [0.47, 0.52, 0.58, 0.62],
    },
    {
      title: "Business Ready — Gold",
      subtitle: "Serve · Report · Analyse",
      description:
        "Curated, aggregated Gold tables power executive dashboards, analyst queries, and machine learning feature stores. Analytics at the speed of business decisions.",
      chips: [
        "Power BI", "Snowflake",
        "Microsoft Fabric", "Azure SQL",
        "Data Lakehouse", "Executive Dashboards",
        "dbt", "DirectLake",
      ],
      icon: BarChart4,
      ranges: [0.63, 0.68, 0.74, 0.78],
    },
    {
      title: "DevOps & Tooling",
      subtitle: "Infrastructure · Automation · Reliability",
      description:
        "End-to-end automation, monitoring, and release engineering ensure pipelines run reliably in production. Infrastructure-as-code and observability complete the data platform.",
      chips: [
        "Azure DevOps", "CI/CD Pipelines",
        "Git", "GitHub",
        "Azure Monitor", "Azure Functions",
        "Microsoft Excel", "SSMS", "DBeaver",
        "Medallion Architecture",
      ],
      icon: Wrench,
      ranges: [0.79, 0.83, 1.0, 1.0],
      isGold: true,
    },
  ];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none w-full h-full">

      {/* ── Section title — visible at start, fades as you scroll ─────────── */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.0, 0.10], [1, 0]) }}
        className="absolute top-4 sm:top-10 left-1/2 -translate-x-1/2 text-center px-4 w-full"
      >
        <p className="text-[8px] sm:text-[10px] font-mono tracking-[0.3em] text-[#00BFFF] uppercase mb-1 sm:mb-2">
          Scroll to explore
        </p>
        <h2 className="text-sm sm:text-2xl md:text-3xl font-black text-white leading-tight">
          Skills I Know &amp;{" "}
          <span className="bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] bg-clip-text text-transparent">
            Where They Fit
          </span>
        </h2>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.0, 0.12], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">Scroll through pipeline</span>
        <div className="w-[1.5px] h-10 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-[#00BFFF] to-[#00FFFF]"
          />
        </div>
      </motion.div>

      {/* ── Pipeline step cards ────────────────────────────────────────────── */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center -translate-y-12">
        <div className="max-w-lg w-full">
          {steps.map((step, index) => {
            const [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] = step.ranges;
            const opacityMap = [0, 1, 1, step.isGold ? 1 : 0];
            const opacity = useTransform(
              scrollYProgress,
              [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
              opacityMap
            );
            const yMap = [60, 0, 0, step.isGold ? 0 : -60];
            const y = useTransform(
              scrollYProgress,
              [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
              yMap
            );

            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                style={{ opacity, y }}
                className="absolute left-6 md:left-12 right-6 md:right-auto pointer-events-auto"
              >
                <div
                  className={`glass-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border ${
                    step.isGold
                      ? "border-[#FFD700]/30 shadow-[0_0_40px_rgba(255,215,0,0.12)] bg-[#FFD700]/[0.02]"
                      : "border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                  } flex flex-col gap-2.5 sm:gap-4 max-w-md backdrop-blur-xl`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        step.isGold
                          ? "bg-[#FFD700]/10 text-[#FFD700]"
                          : "bg-[#00BFFF]/10 text-[#00BFFF]"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase hidden sm:inline-block ${
                          step.isGold ? "text-[#FFD700]" : "text-[#00FFFF]"
                        }`}
                      >
                        {step.subtitle}
                      </span>
                      <h3
                        className={`text-base sm:text-xl md:text-2xl font-bold tracking-tight ${
                          step.isGold ? "text-[#FFD700]" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-normal sm:leading-relaxed">
                    {step.description}
                  </p>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 pt-2 border-t border-white/[0.06]">
                    {(isMobile ? step.chips.slice(0, 5) : step.chips).map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className={`px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[8px] sm:text-[11px] font-mono border transition-colors ${
                          step.isGold
                            ? "bg-[#FFD700]/5 border-[#FFD700]/25 text-[#FFD700]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-[#00BFFF] hover:text-white"
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-8 right-6 md:right-12 pointer-events-auto bg-[#050816]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 flex items-center gap-3 select-none text-xs font-mono text-slate-400">
        <div className="w-2 h-2 rounded-full bg-[#00BFFF] animate-ping" />
        <span>PIPELINE SKILL MAP</span>
      </div>
    </div>
  );
}
