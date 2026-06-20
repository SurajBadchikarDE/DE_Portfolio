"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ScrollyCanvas from "@/components/ScrollyCanvas";

// Lazy-load sections below the fold to optimize page speed and memory footprint
const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});
const Certifications = dynamic(() => import("@/components/Certifications"), {
  ssr: false,
});
const Timeline = dynamic(() => import("@/components/Timeline"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Hero Intro Section (100vh) */}
      <Hero />

      {/* Sticky Canvas & Scroll Storytelling Pipeline (600vh scroll space) */}
      <ScrollyCanvas />

      {/* Technical Infrastructure Showcase */}
      <TechStack />

      {/* Certifications Showroom */}
      <Certifications />

      {/* Career Trajectory Path Line */}
      <Timeline />

      {/* Bento Grid Projects Grid */}
      <Projects />

      {/* Contact and Social Connections */}
      <Contact />
    </main>
  );
}
