"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number; targetAlpha: number;
}

const SUMMARY_LINES = [
  "Azure Data Engineer with hands-on experience designing and building scalable ELT and ETL pipelines on cloud-native Azure infrastructure.",
  "Specialised in Medallion architecture, Change Data Capture, and data quality enforcement across Databricks, Snowflake, and Microsoft Fabric.",
  "Building batch and streaming pipelines that power analytics platforms and executive Power BI dashboards — committed to data governance across Silver and Gold layers.",
];

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(1);

  // ── Autoplay Step Transitions ──────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 5) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 2600); // 2.6 seconds per step for comfortable reading
    return () => clearInterval(timer);
  }, []);

  // ── Particle canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.35 + 0.08,
        targetAlpha: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (Math.random() < 0.008) p.targetAlpha = Math.random() * 0.35 + 0.08;
        p.alpha += (p.targetAlpha - p.alpha) * 0.04;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,191,255,${p.alpha})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * 0.06})`;
            ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
        if (dm < 160) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(0,255,255,${(1 - dm / 160) * 0.12})`;
          ctx.lineWidth = 0.4; ctx.stroke();
        }
      });
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, [mousePos]);

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ height: "100vh" }} className="relative w-full overflow-hidden bg-[#050816]">

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.06)_0%,transparent_70%)] blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.04)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_60%)] blur-3xl animate-spin-slow" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* STEP 1 — Hi there, I'm Suraj. */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{
          opacity: currentStep === 1 ? 1 : 0,
          y: currentStep === 1 ? 0 : -24,
          filter: currentStep === 1 ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 ${
          currentStep !== 1 ? "pointer-events-none" : ""
        }`}
      >
        <p className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white text-center tracking-tight leading-tight">
          Hi there, I&apos;m{" "}
          <span className="font-black">Suraj.</span>
        </p>
      </motion.div>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* STEP 2 — Suraj Badchikar + Data Engineer */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 ${
        currentStep !== 2 ? "pointer-events-none" : ""
      }`} style={{ opacity: currentStep >= 2 ? 1 : 0, visibility: currentStep >= 2 ? "visible" : "hidden" }}>
        <motion.h1
          animate={{
            opacity: currentStep === 2 ? 1 : 0,
            y: currentStep === 2 ? 0 : (currentStep < 2 ? 40 : -24),
            filter: currentStep === 2 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tight text-white text-center leading-none select-text"
        >
          Suraj Badchikar
        </motion.h1>
        <motion.div
          animate={{
            opacity: currentStep === 2 ? 1 : 0,
            y: currentStep === 2 ? 0 : (currentStep < 2 ? 40 : -24),
            filter: currentStep === 2 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.12em] bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] bg-clip-text text-transparent text-center uppercase">
            Data Engineer
          </h2>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* STEP 3 — Role reveal */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center ${
        currentStep !== 3 ? "pointer-events-none" : ""
      }`} style={{ opacity: currentStep >= 3 ? 1 : 0, visibility: currentStep >= 3 ? "visible" : "hidden" }}>
        <motion.p
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
        >
          I work as an
        </motion.p>

        <motion.h2
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
            y: currentStep === 3 ? 0 : (currentStep < 3 ? 28 : -24),
            filter: currentStep === 3 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
        >
          Associate Software Engineer
        </motion.h2>

        <motion.p
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
        >
          at
        </motion.p>

        <motion.h2
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
            y: currentStep === 3 ? 0 : (currentStep < 3 ? 28 : -24),
            filter: currentStep === 3 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] bg-clip-text text-transparent"
        >
          Bizmetric
        </motion.h2>
      </div>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* STEP 4 — What I Do */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center ${
        currentStep !== 4 ? "pointer-events-none" : ""
      }`} style={{ opacity: currentStep >= 4 ? 1 : 0, visibility: currentStep >= 4 ? "visible" : "hidden" }}>
        <motion.p
          animate={{
            opacity: currentStep === 4 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
        >
          What I do
        </motion.p>
        <motion.h2
          animate={{
            opacity: currentStep === 4 ? 1 : 0,
            y: currentStep === 4 ? 0 : (currentStep < 4 ? 40 : -24),
            filter: currentStep === 4 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
        >
          Build Scalable Data Solutions
        </motion.h2>
        <motion.p
          animate={{
            opacity: currentStep === 4 ? 1 : 0,
            filter: currentStep === 4 ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mt-2"
        >
          Designing and optimizing robust ETL/ELT pipelines that turn raw data streams into analytics-ready models.
        </motion.p>
      </div>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* STEP 5 — Professional summary */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-20 ${
        currentStep !== 5 ? "pointer-events-none" : ""
      }`} style={{ opacity: currentStep >= 5 ? 1 : 0, visibility: currentStep >= 5 ? "visible" : "hidden" }}>
        <div className="max-w-2xl w-full flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            animate={{
              opacity: currentStep === 5 ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-[1.5px] bg-[#00BFFF] shrink-0" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00BFFF] uppercase">
              Professional Summary
            </span>
          </motion.div>

          {/* Line 1 */}
          <motion.p
            animate={{
              opacity: currentStep === 5 ? 1 : 0,
              y: currentStep === 5 ? 0 : 20,
            }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed"
          >
            {SUMMARY_LINES[0]}
          </motion.p>

          {/* Line 2 */}
          <motion.p
            animate={{
              opacity: currentStep === 5 ? 1 : 0,
              y: currentStep === 5 ? 0 : 20,
            }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed"
          >
            {SUMMARY_LINES[1]}
          </motion.p>

          {/* Line 3 */}
          <motion.p
            animate={{
              opacity: currentStep === 5 ? 1 : 0,
              y: currentStep === 5 ? 0 : 20,
            }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            className="text-slate-400 text-sm sm:text-base font-light leading-relaxed"
          >
            {SUMMARY_LINES[2]}
          </motion.p>
        </div>
      </div>

      {/* Grid lines */}
      <div className="absolute left-[5%]  top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-0" />
      <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-0" />

      {/* Blink keyframe via inline style */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
