"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ── Scroll driver ──────────────────────────────────────────────────────────
  const scrollYProgressRaw = useMotionValue(0);
  const scrollYProgress = useSpring(scrollYProgressRaw, {
    stiffness: 85,
    damping: 25,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight || (6 * window.innerHeight);
      
      // Calculate progress (0 to 1) as we scroll through the element.
      // At start start, rect.top is 0.
      // At end start, rect.bottom is 0 (which is rect.top = -elementHeight).
      // So scroll distance is elementHeight.
      const distance = -rect.top;
      const progress = Math.max(0, Math.min(1, distance / elementHeight));
      scrollYProgressRaw.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially to set the starting progress
    handleScroll();

    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollYProgressRaw]);

  // ── Step 1 — immediately visible; exit is scroll-driven ─────────────────
  const s1Opacity = useTransform(scrollYProgress, [0.0, 0.10, 0.15], [1, 1, 0]);
  const s1Y       = useTransform(scrollYProgress, [0.10, 0.15], [0, -24]);
  const s1BlurV   = useTransform(scrollYProgress, [0.10, 0.15], [0, 8]);
  const s1Filter  = useMotionTemplate`blur(${s1BlurV}px)`;

  // ── Step 2 — Name ──────────────────────────────────────────────────────────
  const s2NameOpacity = useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.35], [0, 1, 1, 0]);
  const s2NameY       = useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.35], [40, 0, 0, -24]);
  const s2NameBlurV   = useTransform(scrollYProgress, [0.30, 0.35], [0, 8]);
  const s2NameFilter  = useMotionTemplate`blur(${s2NameBlurV}px)`;

  // ── Step 2 — Title ─────────────────────────────────────────────────────────
  const s2TitleOpacity = useTransform(scrollYProgress, [0.17, 0.22, 0.30, 0.35], [0, 1, 1, 0]);
  const s2TitleY       = useTransform(scrollYProgress, [0.17, 0.22, 0.30, 0.35], [40, 0, 0, -24]);
  const s2TitleBlurV   = useTransform(scrollYProgress, [0.30, 0.35], [0, 8]);
  const s2TitleFilter  = useMotionTemplate`blur(${s2TitleBlurV}px)`;

  // ── Step 3 — "I work as an" (connector, fades early) ──────────────────────
  const s3C1Opacity = useTransform(scrollYProgress, [0.35, 0.40, 0.52, 0.57], [0, 1, 1, 0]);

  // ── Step 3 — "Associate Software Engineer" (stays longer) ─────────────────
  const s3RoleOpacity = useTransform(scrollYProgress, [0.38, 0.43, 0.56, 0.60], [0, 1, 1, 0]);
  const s3RoleY       = useTransform(scrollYProgress, [0.38, 0.43], [28, 0]);
  const s3RoleBlurV   = useTransform(scrollYProgress, [0.56, 0.60], [0, 8]);
  const s3RoleFilter  = useMotionTemplate`blur(${s3RoleBlurV}px)`;

  // ── Step 3 — "at" (connector, fades early) ────────────────────────────────
  const s3C2Opacity = useTransform(scrollYProgress, [0.42, 0.47, 0.52, 0.57], [0, 1, 1, 0]);

  // ── Step 3 — "Bizmetric" (stays longer) ───────────────────────────────────
  const s3CompOpacity = useTransform(scrollYProgress, [0.45, 0.50, 0.56, 0.60], [0, 1, 1, 0]);
  const s3CompY       = useTransform(scrollYProgress, [0.45, 0.50], [28, 0]);
  const s3CompBlurV   = useTransform(scrollYProgress, [0.56, 0.60], [0, 8]);
  const s3CompFilter  = useMotionTemplate`blur(${s3CompBlurV}px)`;

  // ── Step 4 — What I Do ────────────────────────────────────────────────────
  const s4Opacity = useTransform(scrollYProgress, [0.60, 0.65, 0.72, 0.76], [0, 1, 1, 0]);
  const s4Y       = useTransform(scrollYProgress, [0.60, 0.65, 0.72, 0.76], [40, 0, 0, -24]);
  const s4BlurV   = useTransform(scrollYProgress, [0.72, 0.76], [0, 8]);
  const s4Filter  = useMotionTemplate`blur(${s4BlurV}px)`;

  // ── Step 5 — Summary lines ────────────────────────────────────────────────
  const s5L1Opacity = useTransform(scrollYProgress, [0.76, 0.79], [0, 1]);
  const s5L1Y       = useTransform(scrollYProgress, [0.76, 0.79], [20, 0]);
  const s5L2Opacity = useTransform(scrollYProgress, [0.78, 0.81], [0, 1]);
  const s5L2Y       = useTransform(scrollYProgress, [0.78, 0.81], [20, 0]);
  const s5L3Opacity = useTransform(scrollYProgress, [0.80, 0.83], [0, 1]);
  const s5L3Y       = useTransform(scrollYProgress, [0.80, 0.83], [20, 0]);

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
    /* Scroll track — 600vh gives 5 "pages" of storytelling */
    <div ref={sectionRef} style={{ height: "600vh" }} className="relative">

      {/* Sticky viewport-height stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050816]">

        {/* Ambient glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.06)_0%,transparent_70%)] blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.04)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_60%)] blur-3xl animate-spin-slow" />
        </div>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STEP 1 — Hi there, I'm Suraj. (visible on load, exits on scroll) */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: s1Opacity, y: s1Y, filter: s1Filter }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white text-center tracking-tight leading-tight"
          >
            Hi there, I&apos;m{" "}
            <span className="font-black">Suraj.</span>
          </motion.p>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STEP 2 — Suraj Badchikar + Data Engineer */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6">
          <motion.h1
            style={{ opacity: s2NameOpacity, y: s2NameY, filter: s2NameFilter }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tight text-white text-center leading-none select-text"
          >
            Suraj Badchikar
          </motion.h1>
          <motion.div
            style={{ opacity: s2TitleOpacity, y: s2TitleY, filter: s2TitleFilter }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.12em] bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] bg-clip-text text-transparent text-center uppercase">
              Data Engineer
            </h2>
          </motion.div>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STEP 3 — Role reveal: connector text fades, main text stays */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          {/* "I work as an" */}
          <motion.p
            style={{ opacity: s3C1Opacity }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
          >
            I work as an
          </motion.p>

          {/* "Associate Software Engineer" */}
          <motion.h2
            style={{ opacity: s3RoleOpacity, y: s3RoleY, filter: s3RoleFilter }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Associate Software Engineer
          </motion.h2>

          {/* "at" */}
          <motion.p
            style={{ opacity: s3C2Opacity }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
          >
            at
          </motion.p>

          {/* "Bizmetric" */}
          <motion.h2
            style={{ opacity: s3CompOpacity, y: s3CompY, filter: s3CompFilter }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] bg-clip-text text-transparent"
          >
            Bizmetric
          </motion.h2>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STEP 4 — What I Do */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <motion.p
            style={{ opacity: s4Opacity }}
            className="text-slate-400 text-base sm:text-lg font-light tracking-widest uppercase"
          >
            What I do
          </motion.p>
          <motion.h2
            style={{ opacity: s4Opacity, y: s4Y, filter: s4Filter }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Build Scalable Data Solutions
          </motion.h2>
          <motion.p
            style={{ opacity: s4Opacity, filter: s4Filter }}
            className="text-slate-400 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mt-2"
          >
            Designing and optimizing robust ETL/ELT pipelines that turn raw data streams into analytics-ready models.
          </motion.p>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* STEP 5 — Professional summary */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-20">
          <div className="max-w-2xl w-full flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.div
              style={{ opacity: s5L1Opacity }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-[1.5px] bg-[#00BFFF] shrink-0" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#00BFFF] uppercase">
                Professional Summary
              </span>
            </motion.div>

            {/* Line 1 */}
            <motion.p
              style={{ opacity: s5L1Opacity, y: s5L1Y }}
              className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed"
            >
              {SUMMARY_LINES[0]}
            </motion.p>

            {/* Line 2 */}
            <motion.p
              style={{ opacity: s5L2Opacity, y: s5L2Y }}
              className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed"
            >
              {SUMMARY_LINES[1]}
            </motion.p>

            {/* Line 3 */}
            <motion.p
              style={{ opacity: s5L3Opacity, y: s5L3Y }}
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
    </div>
  );
}
