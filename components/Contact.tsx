"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Mail, Copy, Check, MessageSquareCode } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "surajbadchikar@gmail.com";

  const handleEmailAction = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);

    // Trigger theme-colored confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00BFFF", "#00FFFF", "#8B5CF6"], // Ingestion/Transformation/Governance theme colors
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="relative w-full py-32 bg-[#050816] overflow-hidden select-none border-t border-white/[0.02] flex flex-col justify-center items-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.05)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-10">
        
        {/* Header Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.1)]"
        >
          <MessageSquareCode className="w-6 h-6" />
        </motion.div>

        {/* Title */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5CF6]">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-none">
            Let's Build Data Platforms That Scale.
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed mt-2">
            Looking to architect cloud data structures, optimize ETL runs, or collaborate on complex data platforms? Reach out below.
          </p>
        </div>

        {/* Buttons Layer */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6 w-full max-w-md">
          {/* Email button with copy-clipboard confetti */}
          <button
            onClick={handleEmailAction}
            className="w-full sm:w-auto group relative px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-[#00BFFF] hover:shadow-[0_0_25px_rgba(0,191,255,0.3)] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#00BFFF]" />
            <span>Email Me</span>
            <div className="w-[1px] h-4 bg-white/15 my-auto mx-1" />
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1 text-emerald-400"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono lowercase">copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/in/surajbadchikar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2"
          >
            <Linkedin className="w-4 h-4 text-[#8B5CF6]" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/surajbadchikar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-[#00FFFF] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4 text-[#00FFFF]" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em] flex flex-col gap-2">
          <span>Designed & Architected by Suraj Badchikar</span>
          <span>© {new Date().getFullYear()} — All rights reserved</span>
        </div>
      </div>
    </section>
  );
}
