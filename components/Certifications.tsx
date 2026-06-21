"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

interface CertificationItem {
  name: string;
  authority: string;
  exam: string;
  description: string;
  badgeColor: string;
  glowColor: string;
  id: string;
  delayClass: string;
  verifyUrl: string;
}

export default function Certifications() {
  const certs: CertificationItem[] = [
    {
      id: "databricks-professional",
      name: "Databricks Certified Data Engineer Professional",
      authority: "Databricks",
      exam: "Professional Level",
      description:
        "Advanced-level expertise in PySpark optimisations, Delta Lake concurrency controls, data governance using Unity Catalog, and structuring enterprise-grade production pipelines.",
      badgeColor: "#FFD700",
      glowColor: "rgba(255, 215, 0, 0.2)",
      delayClass: "",
      verifyUrl: "https://credentials.databricks.com/",
    },
    {
      id: "snowflake-core",
      name: "Snowflake SnowPro Core Certification",
      authority: "Snowflake",
      exam: "SnowPro Core",
      description:
        "Comprehensive understanding of Snowflake cloud warehouse architecture, zero-copy cloning, secure data shares, external stages, and performance optimisations at scale.",
      badgeColor: "#00BFFF",
      glowColor: "rgba(0, 191, 255, 0.2)",
      delayClass: "[animation-delay:2s]",
      verifyUrl: "https://achieve.snowflake.com/",
    },
    {
      id: "microsoft-fabric",
      name: "Microsoft Certified: Fabric Data Engineer Associate",
      authority: "Microsoft",
      exam: "DP-700",
      description:
        "Validated proficiency in Microsoft's SaaS analytics fabric — architecting OneLake workspaces, constructing Synapse pipelines, and building semantic report schemas for enterprise BI.",
      badgeColor: "#00FFFF",
      glowColor: "rgba(0, 255, 255, 0.2)",
      delayClass: "[animation-delay:4s]",
      verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/",
    },
  ];

  return (
    <section id="certifications-section" className="relative w-full py-24 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.02)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFD700]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Industry Credentials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Professional Certifications
          </h2>
          <p className="text-slate-400 font-light text-base leading-relaxed">
            Rigorous industry credentials validating specialised expertise in data warehousing, distributed computation, and cloud analytics fabrics.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className={`animate-float ${cert.delayClass} relative group rounded-2xl p-0.5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,191,255,0.15)]`}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(200px circle at center, ${cert.badgeColor}40, transparent 75%)`,
                }}
              />

              <div className="h-full w-full bg-[#070a1e] rounded-[15px] p-6 md:p-8 flex flex-col justify-between items-start gap-6 backdrop-blur-3xl border border-white/5 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center w-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${cert.badgeColor}30`,
                      background: `${cert.badgeColor}08`,
                      color: cert.badgeColor,
                    }}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                      {cert.authority}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider">
                      {cert.exam}
                    </span>
                  </div>
                </div>

                {/* Name & Details */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Credential Active</span>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono transition-colors duration-200 hover:opacity-80"
                    style={{ color: cert.badgeColor }}
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
