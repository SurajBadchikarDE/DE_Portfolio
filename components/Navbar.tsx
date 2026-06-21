"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  number: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links: NavLink[] = [
    { label: "Intro Showcase", href: "#hero-section", number: "01" },
    { label: "Medallion Pipeline", href: "#pipeline-section", number: "02" },
    { label: "Technical Skills", href: "#skills-section", number: "03" },
    { label: "Certifications", href: "#certifications-section", number: "04" },
    { label: "Career Timeline", href: "#timeline-section", number: "05" },
    { label: "Bento Projects", href: "#projects-section", number: "06" },
    { label: "Connect", href: "#contact-section", number: "07" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bypassScroll", { detail: { targetHref: href } }));
    }
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Smooth scroll to target section
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed Sticky Menu Trigger Button */}
      <div className="fixed top-6 left-6 z-50 w-12 h-12">
        {/* Glow backdrop indicator */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#8B5CF6] rounded-full blur-xl opacity-70 animate-pulse pointer-events-none" />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="relative w-full h-full rounded-full bg-[#050816]/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer hover:border-[#00BFFF]/50 hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] transition-all duration-300 group"
        >
          {/* Subtle glowing ring inside button on hover */}
          <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#00FFFF]/20 transition-all duration-300" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Overlay Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-auto"
          >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.06)_0%,transparent_70%)] blur-3xl" />
              <div className="absolute bottom-[20%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.04)_0%,transparent_70%)] blur-3xl" />
            </div>

            {/* Navigation items list */}
            <nav className="relative z-10 flex flex-col gap-6 md:gap-8 max-w-xl w-full px-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FFFF]/50 uppercase text-center md:text-left mb-2">
                Navigation Pipeline
              </span>
              
              <ul className="flex flex-col gap-4 sm:gap-6">
                {links.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="group flex items-baseline gap-4 md:gap-6 py-2 border-b border-white/5 hover:border-[#00BFFF]/30 transition-colors duration-300"
                    >
                      <span className="text-xs md:text-sm font-mono text-[#8B5CF6] font-bold">
                        {link.number}
                      </span>
                      <span className="text-xl md:text-4xl font-extralight text-slate-300 group-hover:text-white group-hover:font-semibold transition-all duration-300 tracking-wide flex items-center gap-2">
                        {link.label}
                        <ArrowUpRight className="w-5 h-5 text-[#00BFFF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom info */}
            <div className="absolute bottom-8 text-slate-500 font-mono text-[9px] uppercase tracking-widest z-10">
              Suraj Badchikar — Portfolio Directory
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
