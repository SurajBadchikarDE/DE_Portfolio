"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          targetAlpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines if particles are close
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around screen boundaries
        if (p1.x < 0) p1.x = canvas.width;
        if (p1.x > canvas.width) p1.x = 0;
        if (p1.y < 0) p1.y = canvas.height;
        if (p1.y > canvas.height) p1.y = 0;

        // Dynamic alpha pulsing
        if (Math.random() < 0.01) {
          p1.targetAlpha = Math.random() * 0.4 + 0.1;
        }
        p1.alpha += (p1.targetAlpha - p1.alpha) * 0.05;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${p1.alpha})`; // #00BFFF
        ctx.fill();

        // Connect lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`; // #8B5CF6
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        const distToMouse = Math.hypot(p1.x - mousePos.x, p1.y - mousePos.y);
        if (distToMouse < 200) {
          const mouseLineAlpha = (1 - distToMouse / 200) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${mouseLineAlpha})`; // #00FFFF
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollToPipeline = () => {
    const section = document.getElementById("pipeline-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050816] px-4 select-none">
      {/* Background Radial Glow System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Sky Blue Glow (Primary) */}
        <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.08)_0%,rgba(0,0,0,0)_70%)] blur-3xl animate-pulse-slow" />
        {/* Teal Glow (Secondary) */}
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />
        {/* Purple Glow (Accent) */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.07)_0%,rgba(0,0,0,0)_60%)] blur-3xl animate-spin-slow" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-1 pointer-events-none"
      />

      {/* Content Layer */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Accent Badge */}
          <span className="px-3 py-1 text-xs tracking-[0.2em] font-semibold text-[#00BFFF] uppercase bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-md">
            Medallion Architecture Portfolio
          </span>

          {/* Large Luxurious Name */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-2 select-text selection:bg-[#00BFFF]/20">
            SURAJ BADCHIKAR
          </h1>

          {/* Glowing Gradient Subtitle */}
          <h2 className="text-2xl md:text-4xl font-light tracking-wide bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] bg-clip-text text-transparent mb-6 select-text selection:bg-[#00FFFF]/20">
            Azure Data Engineer
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-slate-400 font-light max-w-xl leading-relaxed select-text selection:bg-[#8B5CF6]/20"
        >
          Hands-on experience designing scalable ELT &amp; ETL pipelines on cloud-native Azure infrastructure — specialised in Medallion architecture, Change Data Capture, data quality enforcement, and batch &amp; streaming pipelines powering analytics platforms and Power BI dashboards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <button
            onClick={handleScrollToPipeline}
            className="group relative px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-[#00BFFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] flex items-center gap-3 overflow-hidden cursor-pointer"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Explore The Pipeline
            <ArrowDown className="w-4 h-4 text-[#00BFFF] group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Decorative Side Grid Lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden md:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden md:block" />
    </section>
  );
}
