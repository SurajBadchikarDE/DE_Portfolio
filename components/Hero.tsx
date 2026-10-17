"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

const SUMMARY_LINES = [
  "Azure Data Engineer with hands-on experience designing and building scalable ELT and ETL pipelines on cloud-native Azure infrastructure.",
  "Specialised in Medallion architecture, Change Data Capture, and data quality enforcement across Databricks, Snowflake, and Microsoft Fabric.",
  "Building batch and streaming pipelines that power analytics platforms and executive Power BI dashboards — committed to data governance across Silver and Gold layers.",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  // ── Scroll Progress Binding ────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active frame for indicator & accessibility
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.18) setActiveFrameIndex(0);
    else if (latest < 0.39) setActiveFrameIndex(1);
    else if (latest < 0.60) setActiveFrameIndex(2);
    else if (latest < 0.81) setActiveFrameIndex(3);
    else setActiveFrameIndex(4);
  });

  // ── Frame 1 Animations ("Hi there, I'm Suraj.") ───────────────────────────
  // Plateau: 0.00 – 0.13 | Exit: 0.13 – 0.18
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.13, 0.18], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0.0, 0.13, 0.18], [0, 0, -35], { clamp: true });
  const blur1 = useTransform(scrollYProgress, [0.0, 0.13, 0.18], [0, 0, 8], { clamp: true });
  const filter1 = useTransform(blur1, (b) => `blur(${b}px)`);
  const visibility1 = useTransform(scrollYProgress, (v) => (v <= 0.18 ? "visible" : "hidden"));
  const pointerEvents1 = useTransform(scrollYProgress, (v) => (v <= 0.16 ? "auto" : "none"));

  // Frame 1 scroll-hint indicator (fades quickly upon initial scroll)
  const scrollHintOpacity = useTransform(scrollYProgress, [0.0, 0.06], [1, 0], { clamp: true });
  const scrollHintY = useTransform(scrollYProgress, [0.0, 0.06], [0, 14], { clamp: true });

  // ── Frame 2 Animations ("Suraj Badchikar" / "Data Engineer") ───────────────
  // Enter: 0.18 – 0.24 | Plateau: 0.24 – 0.34 | Exit: 0.34 – 0.39
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.24, 0.34, 0.39], [0, 1, 1, 0], { clamp: true });
  const y2_title = useTransform(scrollYProgress, [0.18, 0.24, 0.34, 0.39], [35, 0, 0, -35], { clamp: true });
  const y2_sub = useTransform(scrollYProgress, [0.19, 0.25, 0.34, 0.39], [45, 0, 0, -35], { clamp: true });
  const blur2 = useTransform(scrollYProgress, [0.18, 0.24, 0.34, 0.39], [8, 0, 0, 8], { clamp: true });
  const filter2 = useTransform(blur2, (b) => `blur(${b}px)`);
  const visibility2 = useTransform(scrollYProgress, (v) => (v >= 0.18 && v <= 0.39 ? "visible" : "hidden"));
  const pointerEvents2 = useTransform(scrollYProgress, (v) => (v >= 0.18 && v <= 0.37 ? "auto" : "none"));

  // ── Frame 3 Animations (Role reveal: Associate Software Engineer at Bizmetric) ─
  // Enter: 0.39 – 0.45 | Plateau: 0.45 – 0.55 | Exit: 0.55 – 0.60
  const opacity3 = useTransform(scrollYProgress, [0.39, 0.45, 0.55, 0.60], [0, 1, 1, 0], { clamp: true });
  const y3_1 = useTransform(scrollYProgress, [0.39, 0.44, 0.55, 0.60], [25, 0, 0, -25], { clamp: true });
  const y3_2 = useTransform(scrollYProgress, [0.40, 0.45, 0.55, 0.60], [35, 0, 0, -25], { clamp: true });
  const y3_3 = useTransform(scrollYProgress, [0.41, 0.46, 0.55, 0.60], [25, 0, 0, -25], { clamp: true });
  const y3_4 = useTransform(scrollYProgress, [0.42, 0.47, 0.55, 0.60], [45, 0, 0, -25], { clamp: true });
  const blur3 = useTransform(scrollYProgress, [0.39, 0.45, 0.55, 0.60], [8, 0, 0, 8], { clamp: true });
  const filter3 = useTransform(blur3, (b) => `blur(${b}px)`);
  const visibility3 = useTransform(scrollYProgress, (v) => (v >= 0.39 && v <= 0.60 ? "visible" : "hidden"));
  const pointerEvents3 = useTransform(scrollYProgress, (v) => (v >= 0.39 && v <= 0.58 ? "auto" : "none"));

  // ── Frame 4 Animations ("What I do" / "Build Scalable Data Solutions") ───────
  // Enter: 0.60 – 0.66 | Plateau: 0.66 – 0.76 | Exit: 0.76 – 0.81
  const opacity4 = useTransform(scrollYProgress, [0.60, 0.66, 0.76, 0.81], [0, 1, 1, 0], { clamp: true });
  const y4_1 = useTransform(scrollYProgress, [0.60, 0.65, 0.76, 0.81], [25, 0, 0, -25], { clamp: true });
  const y4_2 = useTransform(scrollYProgress, [0.61, 0.66, 0.76, 0.81], [35, 0, 0, -25], { clamp: true });
  const y4_3 = useTransform(scrollYProgress, [0.62, 0.67, 0.76, 0.81], [45, 0, 0, -25], { clamp: true });
  const blur4 = useTransform(scrollYProgress, [0.60, 0.66, 0.76, 0.81], [8, 0, 0, 8], { clamp: true });
  const filter4 = useTransform(blur4, (b) => `blur(${b}px)`);
  const visibility4 = useTransform(scrollYProgress, (v) => (v >= 0.60 && v <= 0.81 ? "visible" : "hidden"));
  const pointerEvents4 = useTransform(scrollYProgress, (v) => (v >= 0.60 && v <= 0.79 ? "auto" : "none"));

  // ── Frame 5 Animations (Professional Summary) ──────────────────────────────
  // Enter: 0.81 – 0.87 | Plateau: 0.87 – 1.00
  const opacity5 = useTransform(scrollYProgress, [0.81, 0.87, 1.0], [0, 1, 1], { clamp: true });
  const y5_1 = useTransform(scrollYProgress, [0.81, 0.86, 1.0], [25, 0, 0], { clamp: true });
  const y5_2 = useTransform(scrollYProgress, [0.82, 0.87, 1.0], [30, 0, 0], { clamp: true });
  const y5_3 = useTransform(scrollYProgress, [0.83, 0.88, 1.0], [35, 0, 0], { clamp: true });
  const y5_4 = useTransform(scrollYProgress, [0.84, 0.89, 1.0], [40, 0, 0], { clamp: true });
  const blur5 = useTransform(scrollYProgress, [0.81, 0.87, 1.0], [8, 0, 0], { clamp: true });
  const filter5 = useTransform(blur5, (b) => `blur(${b}px)`);
  const visibility5 = useTransform(scrollYProgress, (v) => (v >= 0.81 ? "visible" : "hidden"));
  const pointerEvents5 = useTransform(scrollYProgress, (v) => (v >= 0.81 ? "auto" : "none"));

  // ── Particle Canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
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
        p.x += p.vx;
        p.y += p.vy;
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
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * 0.06})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
        if (dm < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(0,255,255,${(1 - dm / 160) * 0.12})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      });
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToFrame = useCallback((frameIdx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + (frameIdx / 4) * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      id="hero-section"
      style={{ height: "450vh" }}
      className="relative w-full bg-[#050816]"
    >
      {/* Sticky viewport pinned while scrolling through the 5 frames */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.06)_0%,transparent_70%)] blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.04)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_60%)] blur-3xl animate-spin-slow" />
        </div>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* FRAME 1 — Hi there, I'm Suraj. */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: opacity1,
            y: y1,
            filter: filter1,
            visibility: visibility1,
            pointerEvents: pointerEvents1,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
        >
          <p className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white text-center tracking-tight leading-tight select-text">
            Hi there, I&apos;m{" "}
            <span className="font-black">Suraj.</span>
          </p>

          {/* Gentle scroll indicator that fades out on scroll */}
          <motion.div
            style={{ opacity: scrollHintOpacity, y: scrollHintY }}
            className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#00BFFF]/70 font-mono">
              Scroll to explore
            </span>
            <div className="w-[1.5px] h-7 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00BFFF] via-[#00FFFF] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* FRAME 2 — Suraj Badchikar + Data Engineer */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: opacity2,
            filter: filter2,
            visibility: visibility2,
            pointerEvents: pointerEvents2,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <motion.h1
            style={{ y: y2_title }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tight text-white leading-none select-text"
          >
            Suraj Badchikar
          </motion.h1>
          <motion.div
            style={{ y: y2_sub }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.12em] bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] bg-clip-text text-transparent uppercase">
              Data Engineer
            </h2>
          </motion.div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* FRAME 3 — Role reveal */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: opacity3,
            filter: filter3,
            visibility: visibility3,
            pointerEvents: pointerEvents3,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center"
        >
          <motion.p
            style={{ y: y3_1 }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase select-text"
          >
            I work as an
          </motion.p>

          <motion.h2
            style={{ y: y3_2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight select-text"
          >
            Associate Software Engineer
          </motion.h2>

          <motion.p
            style={{ y: y3_3 }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase select-text"
          >
            at
          </motion.p>

          <motion.h2
            style={{ y: y3_4 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] bg-clip-text text-transparent select-text"
          >
            Bizmetric
          </motion.h2>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* FRAME 4 — What I Do */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: opacity4,
            filter: filter4,
            visibility: visibility4,
            pointerEvents: pointerEvents4,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center"
        >
          <motion.p
            style={{ y: y4_1 }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase select-text"
          >
            What I do
          </motion.p>

          <motion.h2
            style={{ y: y4_2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight select-text"
          >
            Build Scalable Data Solutions
          </motion.h2>

          <motion.p
            style={{ y: y4_3 }}
            className="text-slate-400 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mt-2 select-text"
          >
            Designing and optimizing robust ETL/ELT pipelines that turn raw data streams into analytics-ready models.
          </motion.p>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* FRAME 5 — Professional summary */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: opacity5,
            filter: filter5,
            visibility: visibility5,
            pointerEvents: pointerEvents5,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-20"
        >
          <div className="max-w-2xl w-full flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.div
              style={{ y: y5_1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-[1.5px] bg-[#00BFFF] shrink-0" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#00BFFF] uppercase">
                Professional Summary
              </span>
            </motion.div>

            {/* Line 1 */}
            <motion.p
              style={{ y: y5_2 }}
              className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed select-text"
            >
              {SUMMARY_LINES[0]}
            </motion.p>

            {/* Line 2 */}
            <motion.p
              style={{ y: y5_3 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed select-text"
            >
              {SUMMARY_LINES[1]}
            </motion.p>

            {/* Line 3 */}
            <motion.p
              style={{ y: y5_4 }}
              className="text-slate-400 text-sm sm:text-base font-light leading-relaxed select-text"
            >
              {SUMMARY_LINES[2]}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Cinematic Side Frame Indicator ────────────────────────────────── */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          {[0, 1, 2, 3, 4].map((idx) => {
            const isActive = activeFrameIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToFrame(idx)}
                aria-label={`Jump to frame ${idx + 1}`}
                className="group relative flex items-center justify-center py-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-1.5 h-6 bg-gradient-to-b from-[#00BFFF] to-[#8B5CF6] shadow-[0_0_12px_rgba(0,191,255,0.8)]"
                      : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-0" />
        <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-0" />
      </div>
    </div>
  );
}
