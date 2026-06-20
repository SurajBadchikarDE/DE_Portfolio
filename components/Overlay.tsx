"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Database, Download, Cpu, ShieldCheck, BarChart4, Award } from "lucide-react";

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
  const steps: PipelineStep[] = [
    {
      title: "Raw Data",
      subtitle: "Medallion Pipeline: Entrypoint",
      description: "Every insight begins as unstructured or semi-structured information flowing through modern cloud enterprise systems.",
      chips: ["SQL Server", "CSV / JSON", "Rest API", "IoT Streams"],
      icon: Database,
      ranges: [0.0, 0.05, 0.10, 0.14],
    },
    {
      title: "Ingestion",
      subtitle: "Bronze Layer: Ingest",
      description: "Building resilient ingestion pipelines with massive throughput using Azure Data Factory, Event Hubs, and Azure Functions.",
      chips: ["ADF", "Event Hubs", "Azure Functions", "Autoloader"],
      icon: Download,
      ranges: [0.15, 0.20, 0.26, 0.30],
    },
    {
      title: "Transformation",
      subtitle: "Silver Layer: Cleanse & Enrich",
      description: "Cleaning, refining, and transforming bronze data using Databricks cluster nodes, PySpark computations, and Delta Lake formats.",
      chips: ["Databricks", "PySpark", "Spark SQL", "Delta Lake"],
      icon: Cpu,
      ranges: [0.31, 0.36, 0.42, 0.46],
    },
    {
      title: "Governance",
      subtitle: "Security & Cataloging",
      description: "Ensuring compliance and data trust through schema evolution, quality checks, lineage, and centralized Unity Catalog policies.",
      chips: ["Unity Catalog", "CDC (Debezium)", "Great Expectations", "Lineage"],
      icon: ShieldCheck,
      ranges: [0.47, 0.52, 0.58, 0.62],
    },
    {
      title: "Business Ready",
      subtitle: "Gold Layer: Curate & Serve",
      description: "Serving aggregate datasets powering enterprise reporting, Snowflake data warehouse tables, and real-time Power BI dashboards.",
      chips: ["Power BI", "Microsoft Fabric", "Snowflake", "dbt"],
      icon: BarChart4,
      ranges: [0.63, 0.68, 0.74, 0.78],
    },
    {
      title: "Data That Creates Value",
      subtitle: "Strategic Analytics",
      description: "Transforming raw numbers into automated strategic decision vectors that drive revenue, efficiency, and business growth.",
      chips: ["Executive Dashboards", "ML Predictions", "Data Products"],
      icon: Award,
      ranges: [0.79, 0.83, 1.0, 1.0],
      isGold: true,
    },
  ];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none w-full h-full">
      {/* Scroll Indicator */}
      <motion.div 
        style={{
          opacity: useTransform(scrollYProgress, [0.0, 0.12], [1, 0])
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">Scroll to process data</span>
        <div className="w-[1.5px] h-10 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-[#00BFFF] to-[#00FFFF]"
          />
        </div>
      </motion.div>

      {/* Steps Rendering */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className="max-w-lg w-full">
          {steps.map((step, index) => {
            // Map values for scroll transforms
            const fadeInStart = step.ranges[0];
            const fadeInEnd = step.ranges[1];
            const fadeOutStart = step.ranges[2];
            const fadeOutEnd = step.ranges[3];

            // If it is the last step, it shouldn't fade out
            const opacityMap = [0, 1, 1, step.isGold ? 1 : 0];
            const opacity = useTransform(
              scrollYProgress,
              [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
              opacityMap
            );

            // Parallax shift
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
                  className={`glass-card p-6 md:p-8 rounded-2xl border ${
                    step.isGold
                      ? "border-[#FFD700]/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] bg-[#FFD700]/[0.02]"
                      : "border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                  } flex flex-col gap-4 max-w-md backdrop-blur-xl`}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        step.isGold
                          ? "bg-[#FFD700]/10 text-[#FFD700]"
                          : "bg-[#00BFFF]/10 text-[#00BFFF]"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-mono tracking-widest uppercase ${
                          step.isGold ? "text-[#FFD700]" : "text-[#00FFFF]"
                        }`}
                      >
                        {step.subtitle}
                      </span>
                      <h3
                        className={`text-xl md:text-2xl font-bold tracking-tight ${
                          step.isGold ? "text-[#FFD700]" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                    {step.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {step.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className={`px-3 py-1 rounded-md text-[11px] font-mono border ${
                          step.isGold
                            ? "bg-[#FFD700]/5 border-[#FFD700]/25 text-[#FFD700]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-[#00BFFF] hover:text-white"
                        } transition-colors`}
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

      {/* Decorative pipeline flow status display */}
      <div className="absolute top-8 right-6 md:right-12 pointer-events-auto bg-[#050816]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 flex items-center gap-3 select-none text-xs font-mono text-slate-400">
        <div className="w-2 h-2 rounded-full bg-[#00BFFF] animate-ping" />
        <span>STREAMING SYSTEM METRIC FEED</span>
      </div>
    </div>
  );
}
