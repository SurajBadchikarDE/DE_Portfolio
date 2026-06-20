"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Sparkles, GraduationCap, Briefcase } from "lucide-react";

interface TimelineEvent {
  period: string;
  role: string;
  company: string;
  type: "work" | "edu";
  description: string;
  highlights: string[];
  tech: string[];
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const events: TimelineEvent[] = [
    {
      period: "2023 – 2025",
      role: "Master of Computer Applications (MCA)",
      company: "MIT World Peace University, Pune",
      type: "edu",
      description:
        "Completed a rigorous postgraduate programme in Computer Applications with a focus on cloud computing, distributed systems, and data engineering fundamentals.",
      highlights: [
        "1st Place — Coders Hunt competitive programming (MIT-WPU 2023)",
        "NCC B & C Certificates — leadership & discipline",
        "Specialization in cloud-native data systems & algorithms",
      ],
      tech: ["Python", "SQL", "Data Structures", "Cloud Computing"],
    },
    {
      period: "Jan 2024 – Jul 2024",
      role: "IT Intern",
      company: "KWMCS Ventures",
      type: "work",
      description:
        "Supported application development with relational database design and backend integration in a remote, agile team environment.",
      highlights: [
        "Designed relational schemas for internal management tools",
        "Integrated backend services with PostgreSQL databases",
        "Collaborated across distributed agile teams remotely",
      ],
      tech: ["PostgreSQL", "SQL", "Backend Integration", "Agile"],
    },
    {
      period: "Oct 2024 – Dec 2024",
      role: "Software Developer Intern",
      company: "WebWeaver",
      type: "work",
      description:
        "Contributed to backend API integration and data layer development using PostgreSQL, supporting full-stack feature delivery in a collaborative team environment.",
      highlights: [
        "Built REST API integrations for full-stack features",
        "Developed and optimised PostgreSQL data layer queries",
        "Participated in code reviews and sprint planning cycles",
      ],
      tech: ["PostgreSQL", "REST APIs", "Python", "Git"],
    },
    {
      period: "Jan 2025 – Present",
      role: "Associate Software Engineer — Data Engineer",
      company: "Bizmetric",
      type: "work",
      description:
        "Owning Azure-based ETL pipelines using ADF, Databricks (PySpark, Spark SQL), Microsoft Fabric, and SQL — implementing Medallion architecture across 10+ production pipelines processing millions of records daily.",
      highlights: [
        "Built Azure Functions–based CI/CD reducing manual intervention by 50%",
        "Enforced data quality SLAs, cutting infrastructure costs by 25%",
        "Optimised Spark & SQL queries — average job runtimes improved by 35%",
        "Managed Delta Lake schema evolution under Unity Catalog governance",
      ],
      tech: [
        "ADF", "Databricks", "PySpark", "Spark SQL", "Microsoft Fabric",
        "Delta Lake", "Unity Catalog", "Azure Functions", "Snowflake",
        "Power BI", "Azure Monitor", "CI/CD",
      ],
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.02)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-20 md:text-center md:items-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Career Trajectory
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Timeline Progression
          </h2>
          <p className="text-slate-400 font-light text-base leading-relaxed">
            From academia to production-grade cloud data platforms — a chronological record of experience, growth, and impact.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative min-h-[500px]">
          {/* Vertical animated line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 z-0">
            <div className="w-full h-full bg-white/5 rounded-full" />
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00BFFF] via-[#8B5CF6] to-[#00FFFF] rounded-full"
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = event.type === "edu" ? GraduationCap : Briefcase;
              const accentColor = event.type === "edu" ? "#FFD700" : idx % 2 === 0 ? "#00BFFF" : "#8B5CF6";

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050816] border-2 border-white/10 z-10 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] animate-pulse" />
                  </div>

                  {/* Left col (desktop) */}
                  <div className="w-full md:w-1/2 md:pr-12 md:text-right hidden md:block">
                    {isEven && (
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className="px-3 py-1 text-xs font-mono rounded-full font-bold"
                          style={{ color: accentColor, background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                        >
                          {event.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">{event.role}</h3>
                        <span className="text-sm font-mono text-slate-400">{event.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Right col (desktop) */}
                  <div className="w-full md:w-1/2 md:pl-12 md:text-left hidden md:block">
                    {!isEven && (
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className="px-3 py-1 text-xs font-mono rounded-full font-bold"
                          style={{ color: accentColor, background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                        >
                          {event.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">{event.role}</h3>
                        <span className="text-sm font-mono text-slate-400">{event.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div className="pl-12 md:pl-0 w-full md:absolute md:top-auto md:left-0 md:right-0 md:flex md:justify-center md:pointer-events-none">
                    <div
                      className={`glass-card p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl md:max-w-md w-full pointer-events-auto md:hover:border-white/10 md:transition-all ${
                        isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      {/* Mobile header */}
                      <div className="flex flex-col gap-1 md:hidden mb-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="px-2 py-0.5 text-[10px] font-mono rounded-full font-bold"
                            style={{ color: accentColor, background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                          >
                            {event.period}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{event.company}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1">{event.role}</h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                          {event.type === "edu" ? "Education" : event.company}
                        </span>
                      </div>

                      <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed mb-4">
                        {event.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        {event.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#00FFFF] mt-0.5 shrink-0" />
                            <span className="text-slate-400 text-xs font-light leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {event.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
