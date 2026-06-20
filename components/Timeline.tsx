"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Calendar, Sparkles, GraduationCap, Briefcase } from "lucide-react";

interface TimelineEvent {
  period: string;
  role: string;
  company: string;
  type: "work" | "edu";
  employmentType: "Full-time" | "Internship" | "Full-time Education";
  highlights: string[];
  tech: string[];
}

interface CardProps {
  event: TimelineEvent;
  side: "left" | "right";
}

function TimelineCard({ event, side }: CardProps) {
  const isEdu = event.type === "edu";
  
  const badgeColor = isEdu
    ? "bg-[#FFD700]/10 border-[#FFD700]/25 text-[#FFD700]"
    : event.employmentType === "Full-time"
    ? "bg-[#00BFFF]/10 border-[#00BFFF]/25 text-[#00BFFF]"
    : "bg-[#8B5CF6]/10 border-[#8B5CF6]/25 text-[#8B5CF6]";

  const glowShadow = isEdu
    ? "hover:shadow-[0_0_35px_rgba(255,215,0,0.06)] hover:border-[#FFD700]/20"
    : event.employmentType === "Full-time"
    ? "hover:shadow-[0_0_35px_rgba(0,191,255,0.06)] hover:border-[#00BFFF]/20"
    : "hover:shadow-[0_0_35px_rgba(139,92,246,0.06)] hover:border-[#8B5CF6]/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative w-full ${side === "left" ? "lg:text-right lg:ml-auto" : "lg:text-left lg:mr-auto"}`}
    >
      {/* Central Node (rendered on the divider line) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10 w-8 h-8 rounded-full bg-[#050816] border-2 border-white/10"
        style={{
          right: side === "left" ? "-40px" : "auto",
          left: side === "right" ? "-40px" : "auto",
          transform: side === "left" ? "translate(50%, -50%)" : "translate(-50%, -50%)",
        }}
      >
        <motion.div 
          className="w-3.5 h-3.5 rounded-full"
          style={{
            background: isEdu 
              ? "radial-gradient(circle, #FFD700 0%, #B8860B 100%)" 
              : "radial-gradient(circle, #8B5CF6 0%, #00BFFF 100%)"
          }}
          whileInView={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Horizontal Connector Line (desktop only) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-white/10 hidden lg:block z-0"
        style={{
          width: "40px",
          right: side === "left" ? "0" : "auto",
          left: side === "right" ? "0" : "auto",
          transformOrigin: side === "left" ? "right" : "left",
          background: isEdu
            ? "linear-gradient(to left, #FFD700, rgba(255,255,255,0.05))"
            : "linear-gradient(to right, #8B5CF6, rgba(255,255,255,0.05))"
        }}
      />

      {/* Card Content */}
      <div
        className={`glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] shadow-2xl backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-300 ${glowShadow}`}
      >
        {/* Header Block */}
        <div className="flex flex-col gap-2 mb-4">
          <div className={`flex flex-wrap items-center gap-2.5 ${side === "left" ? "lg:justify-end" : "lg:justify-start"}`}>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10 ${badgeColor}`}>
              {event.employmentType}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {event.period}
            </span>
          </div>

          {/* Company Name (Enlarged) */}
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            {event.company}
          </h2>

          {/* Role Title */}
          <h3 className="text-sm sm:text-base font-semibold tracking-wide text-slate-300">
            {event.role}
          </h3>
        </div>

        {/* Highlights Bullet List */}
        <div className={`flex flex-col gap-3 mb-4 ${side === "left" ? "lg:items-end" : "lg:items-start"}`}>
          {event.highlights.map((h, hIdx) => (
            <div 
              key={hIdx} 
              className={`flex items-start gap-3 ${side === "left" ? "lg:flex-row-reverse lg:text-right" : "lg:flex-row lg:text-left"}`}
            >
              <Sparkles className="w-4 h-4 text-[#00FFFF] mt-0.5 shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className={`flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06] ${side === "left" ? "lg:justify-end" : "lg:justify-start"}`}>
          {event.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCardFullWidth({ event }: { event: TimelineEvent }) {
  const badgeColor = "bg-[#00BFFF]/10 border-[#00BFFF]/25 text-[#00BFFF]";
  const glowShadow = "hover:shadow-[0_0_40px_rgba(0,191,255,0.08)] hover:border-[#00BFFF]/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      {/* Node centered on top edge of full-width container (on vertical line path) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#050816] border-2 border-[#00BFFF]/30 flex items-center justify-center hidden lg:flex">
        <motion.div 
          className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6]"
          whileInView={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Card Content */}
      <div
        className={`glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] shadow-2xl backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-300 ${glowShadow} mt-4`}
      >
        <div className="flex flex-col gap-2 mb-4 items-center text-center">
          <div className="flex flex-wrap items-center gap-2.5 justify-center">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10 ${badgeColor}`}>
              {event.employmentType}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {event.period}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            {event.company}
          </h2>

          <h3 className="text-sm sm:text-base font-semibold tracking-wide text-slate-300">
            {event.role}
          </h3>
        </div>

        <div className="flex flex-col gap-3 mb-4 items-start max-w-xl mx-auto">
          {event.highlights.map((h, hIdx) => (
            <div key={hIdx} className="flex items-start gap-3 text-left">
              <Sparkles className="w-4 h-4 text-[#00FFFF] mt-0.5 shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                {h}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06] justify-center">
          {event.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MobileTimelineCard({ event }: { event: TimelineEvent }) {
  const isEdu = event.type === "edu";
  const badgeColor = isEdu
    ? "bg-[#FFD700]/10 border-[#FFD700]/25 text-[#FFD700]"
    : event.employmentType === "Full-time"
    ? "bg-[#00BFFF]/10 border-[#00BFFF]/25 text-[#00BFFF]"
    : "bg-[#8B5CF6]/10 border-[#8B5CF6]/25 text-[#8B5CF6]";

  const accentColor = isEdu ? "#FFD700" : event.employmentType === "Full-time" ? "#00BFFF" : "#8B5CF6";

  return (
    <div className="relative w-full">
      {/* Mobile left line node */}
      <div 
        className="absolute -left-[41px] top-4 w-6 h-6 rounded-full bg-[#050816] border-2 z-10 flex items-center justify-center"
        style={{ borderColor: accentColor }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>

      <div className="glass-card p-6 rounded-xl border border-white/5 bg-white/[0.01]">
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase border border-white/10 ${badgeColor}`}>
              {event.employmentType}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {event.period}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{event.company}</h2>
          <h3 className="text-xs font-medium text-slate-400">{event.role}</h3>
        </div>

        <div className="flex flex-col gap-2.5 mb-4">
          {event.highlights.map((h, hIdx) => (
            <div key={hIdx} className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00FFFF] mt-0.5 shrink-0" />
              <span className="text-slate-300 text-xs font-light leading-relaxed">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {event.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/5 text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = containerRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const totalRange = element.offsetHeight || 800;
      
      const start = window.innerHeight / 2;
      const distance = start - rect.top;
      const progress = Math.max(0, Math.min(1, distance / totalRange));
      scrollYProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollYProgress]);

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const eduEvents: TimelineEvent[] = [
    {
      period: "2023 – 2025",
      role: "Master of Computer Applications (MCA)",
      company: "MIT World Peace University, Pune",
      type: "edu",
      employmentType: "Full-time Education",
      highlights: [
        "Completed a rigorous postgraduate programme in Computer Applications with a focus on cloud computing, distributed systems, and data engineering fundamentals.",
        "1st Place — Coders Hunt competitive programming (MIT-WPU 2023)",
        "NCC B & C Certificates — leadership & discipline",
        "Specialization in cloud-native data systems & algorithms",
      ],
      tech: ["Python", "SQL", "Data Structures", "Cloud Computing", "Distributed Systems"],
    }
  ];

  const internEvents: TimelineEvent[] = [
    {
      period: "Oct 2024 – Dec 2024",
      role: "Software Developer Intern",
      company: "WebWeaver",
      type: "work",
      employmentType: "Internship",
      highlights: [
        "Contributed to backend API integration and data layer development using PostgreSQL, supporting full-stack feature delivery in a team environment.",
      ],
      tech: ["PostgreSQL", "REST APIs", "Python", "Git"],
    },
    {
      period: "Jan 2024 – Jul 2024",
      role: "IT Intern",
      company: "KWMCS Ventures",
      type: "work",
      employmentType: "Internship",
      highlights: [
        "Supported application development with relational database design and backend integration in a remote, agile team environment.",
      ],
      tech: ["PostgreSQL", "SQL", "Backend Integration", "Agile"],
    }
  ];

  const fullTimeEvents: TimelineEvent[] = [
    {
      period: "Jan 2025 – Present",
      role: "Associate Software Engineer (Data Engineer)",
      company: "Bizmetric",
      type: "work",
      employmentType: "Full-time",
      highlights: [
        "Owned Azure-based ETL pipelines using Azure Data Factory, Azure Databricks (PySpark, Spark SQL), Microsoft Fabric, and SQL, implementing Medallion architecture across 10+ production pipelines processing millions of records daily.",
        "Built Azure Functions–based CI/CD orchestration for automated pipeline scheduling and monitoring via Azure Monitor, reducing manual intervention by 50% and improving pipeline reliability by 40%.",
        "Enforced data quality checks and SLA-aligned delivery across pipeline stages, lowering processing time and infrastructure costs by 25% while maintaining data lineage across Medallion layers.",
        "Optimized Spark transformations and SQL queries across Azure SQL and PostgreSQL, improving average job runtimes by 35% while supporting Power BI and Snowflake reporting for executive dashboards.",
        "Managed Delta Lake tables in Azure Databricks with schema evolution and data governance controls across curated Silver and Gold layers, enabling reliable analytics workloads for stakeholder dashboards.",
      ],
      tech: [
        "ADF", "Databricks", "PySpark", "Spark SQL", "Microsoft Fabric",
        "Delta Lake", "Unity Catalog", "Azure Functions", "Snowflake",
        "Power BI", "Azure Monitor", "CI/CD",
      ],
    }
  ];

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.02)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
        <div className="absolute top-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.02)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-20 md:text-center md:items-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center">
            <Calendar className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Career Trajectory
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Timeline Progression
          </h2>
          <p className="text-slate-400 font-light text-base leading-relaxed">
            Parallel paths of education and enterprise-grade data platform development, side-by-side.
          </p>
        </div>

        {/* Timeline body container */}
        <div className="relative">
          {/* Vertical central timeline line (desktop only) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 hidden lg:block z-0">
            <div className="w-full h-full bg-white/5 rounded-full" />
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00BFFF] via-[#8B5CF6] to-[#00FFFF] rounded-full"
            />
          </div>

          {/* Desktop Layout (Split & Full Width Sections) */}
          <div className="hidden lg:flex flex-col gap-12 relative">
            
            {/* Phase 1: Parallel Education vs Internships (Side-by-Side) */}
            <div className="grid grid-cols-2 gap-20 items-stretch relative">
              {/* Left Column: Education (MIT WPU MCA) */}
              <div className="flex flex-col gap-8 text-right pr-4 justify-center">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/[0.04] justify-end">
                  <GraduationCap className="w-6 h-6 text-[#FFD700]" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase">
                    Education
                  </h3>
                </div>
                {eduEvents.map((event, idx) => (
                  <TimelineCard key={idx} event={event} side="left" />
                ))}
              </div>

              {/* Right Column: Internships */}
              <div className="flex flex-col gap-8 pl-4 justify-center">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/[0.04]">
                  <Briefcase className="w-6 h-6 text-[#8B5CF6]" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase">
                    Internships
                  </h3>
                </div>
                {internEvents.map((event, idx) => (
                  <TimelineCard key={idx} event={event} side="right" />
                ))}
              </div>
            </div>

            {/* Part 2: Full-Time Experience (Centered Below) */}
            <div className="flex flex-col items-center mt-12 relative">
              <div className="w-full max-w-2xl flex flex-col items-center mb-8">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                <div className="flex items-center gap-3 pb-2 border-b border-white/[0.04] justify-center">
                  <Briefcase className="w-6 h-6 text-[#00BFFF]" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase">
                    Full-Time Experience
                  </h3>
                </div>
              </div>

              {/* Bizmetric full-time card */}
              <div className="w-full max-w-2xl relative">
                {fullTimeEvents.map((event, idx) => (
                  <TimelineCardFullWidth key={idx} event={event} />
                ))}
              </div>
            </div>

          </div>

          {/* Mobile vertical stacking layout */}
          <div className="flex flex-col gap-12 lg:hidden">
            <div className="relative pl-8 border-l border-white/10 flex flex-col gap-12">
              <MobileTimelineCard event={eduEvents[0]} />
              <MobileTimelineCard event={internEvents[1]} />
              <MobileTimelineCard event={internEvents[0]} />
              <MobileTimelineCard event={fullTimeEvents[0]} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
