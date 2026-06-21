"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 240;
const WHEEL_SENSITIVITY = 0.00035;
const LERP_FACTOR = 0.09;

export default function ScrollyCanvas() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const isLockedRef = useRef(false);
  const isCompletedRef = useRef(false);
  const isBypassingRef = useRef(false);
  const isReplayingRef = useRef(false);
  const savedScrollY = useRef(0);
  const lastScrollY = useRef(0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState("Initializing medallion pipeline...");

  const scrollProgress = useMotionValue(0);

  // ── Preload frames (max 2 s wait) ────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const statusMsg = (p: number) => {
      if (p < 25)      setLoaderStatus("Ingesting raw data streams...");
      else if (p < 50) setLoaderStatus("Compiling bronze medallion tables...");
      else if (p < 75) setLoaderStatus("Optimizing Spark execution plans...");
      else if (p < 95) setLoaderStatus("Enforcing Unity Catalog governance...");
      else             setLoaderStatus("Ready to stream analytics.");
    };

    // Hard cap: show whatever frames we have after 2 seconds
    const maxTimer = setTimeout(() => {
      imagesRef.current = imgs;
      setIsLoading(false);
    }, 2000);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.041s.png`;
      const idx = i;
      img.onload = img.onerror = () => {
        imgs[idx] = img;
        const pct = Math.round((++loaded / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        statusMsg(pct);
        if (loaded === TOTAL_FRAMES) {
          clearTimeout(maxTimer);
          imagesRef.current = imgs;
          setTimeout(() => setIsLoading(false), 200);
        }
      };
    }

    return () => clearTimeout(maxTimer);
  }, []);

  // ── Sharp canvas draw (devicePixelRatio-aware) ────────────────────────────
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imgs = imagesRef.current;
    if (!imgs.length) return;
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))));
    const img = imgs[idx];
    if (!img?.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    
    let dw = cw, dh = ch, dx = 0, dy = 0;
    const isNarrow = window.innerWidth < 768;
    
    if (isNarrow) {
      // Contain/shrink width on narrow viewports
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // Cover full screen on desktop
      if (cr > ir) {
        dh = cw / ir;
        dy = (ch - dh) / 2;
      } else {
        dw = ch * ir;
        dx = (cw - dw) / 2;
      }
    }
    
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── Lerp animation loop ───────────────────────────────────────────────────
  const startAnimLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const loop = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.0005) {
        currentProgressRef.current = target;
        scrollProgress.set(target);
        drawFrame(target);
        rafRef.current = null;
        return;
      }
      const next = current + diff * LERP_FACTOR;
      currentProgressRef.current = next;
      scrollProgress.set(next);
      drawFrame(next);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [drawFrame, scrollProgress]);

  // ── Lock scroll — snaps page to section top before freezing ──────────────
  const lockScroll = useCallback(() => {
    if (isLockedRef.current) return;
    const section = sectionRef.current;
    // Snap exactly to section top so animation always starts at frame 0
    const snapY = section ? section.offsetTop : window.scrollY;
    window.scrollTo(0, snapY);
    savedScrollY.current = snapY;
    
    // Hide scrollbar and prevent native body scrolling without using position: fixed
    document.body.style.overflow = "hidden";
    isLockedRef.current = true;
  }, []);

  // ── Unlock scroll — restores page to target position ─────────────────────
  const unlockScroll = useCallback((targetY?: number) => {
    if (!isLockedRef.current) return;
    document.body.style.overflow = "";
    window.scrollTo(0, targetY ?? savedScrollY.current);
    isLockedRef.current = false;
  }, []);

  // ── Main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(currentProgressRef.current);
    };
    resize();
    drawFrame(0);

    // ── Window scroll: detect section approaching viewport top ─────────────
    const onWindowScroll = () => {
      if (isBypassingRef.current) return;
      const scrollingDown = window.scrollY >= lastScrollY.current;
      lastScrollY.current = window.scrollY;

      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top;

      // ── Silent canvas reset ───────────────────────────────────────────────
      // Once section is fully above the viewport after completion, quietly
      // draw frame 0 so the animation is ready to replay from the start.
      // We deliberately do NOT change isCompletedRef here — that prevents
      // any re-lock from the forward-entry condition below.
      if (isCompletedRef.current && !isLockedRef.current && top < -20) {
        if (currentProgressRef.current > 0) {
          if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
          targetProgressRef.current  = 0;
          currentProgressRef.current = 0;
          scrollProgress.set(0);
          drawFrame(0);
        }
        return;
      }

      if (isLockedRef.current) return;

      // Forward entry: section top approaches viewport while scrolling down
      if (top <= 10 && scrollingDown && !isCompletedRef.current) {
        targetProgressRef.current  = 0;
        currentProgressRef.current = 0;
        scrollProgress.set(0);
        drawFrame(0);
        lockScroll();
        return;
      }

      // Reverse entry: user scrolled back up so section re-enters viewport
      // Reset animation to frame 0 so it replays from the very beginning
      if (top >= -10 && top <= 5 && !scrollingDown && isCompletedRef.current) {
        isCompletedRef.current     = false;
        targetProgressRef.current  = 0;
        currentProgressRef.current = 0;
        scrollProgress.set(0);
        drawFrame(0);
        lockScroll();
      }
    };
    let lastInteractionTime = Date.now();

    // ── Wheel handler ──────────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (isReplayingRef.current) return;
      if (!isLockedRef.current) return;
      lastInteractionTime = Date.now();
      e.preventDefault();

      const newTarget = Math.max(0, Math.min(1,
        targetProgressRef.current + e.deltaY * WHEEL_SENSITIVITY
      ));
      targetProgressRef.current = newTarget;
      startAnimLoop();

      if (newTarget >= 1) {
        isCompletedRef.current = true;
        // Fade page out → scroll → fade back in (hides programmatic scroll jump)
        document.body.style.transition = 'opacity 0.35s ease';
        document.body.style.opacity   = '0';
        setTimeout(() => {
          const sec = sectionRef.current;
          const pastSection = sec
            ? sec.offsetTop + sec.offsetHeight + 2
            : savedScrollY.current + window.innerHeight;
          unlockScroll(pastSection);
          // Wait 150ms for programmatic scroll to finish rendering before showing page again
          setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => { document.body.style.transition = ''; }, 400);
          }, 150);
        }, 350);
      }

      if (newTarget <= 0) {
        isCompletedRef.current = false;
        document.body.style.transition = 'opacity 0.35s ease';
        document.body.style.opacity   = '0';
        setTimeout(() => {
          const sec = sectionRef.current;
          unlockScroll(sec ? Math.max(0, sec.offsetTop - 2) : 0);
          setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => { document.body.style.transition = ''; }, 400);
          }, 150);
        }, 350);
      }
    };

    // ── Touch support ──────────────────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (isReplayingRef.current) return;
      if (!isLockedRef.current) return;
      lastInteractionTime = Date.now();
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const newTarget = Math.max(0, Math.min(1,
        targetProgressRef.current + dy * WHEEL_SENSITIVITY * 3
      ));
      targetProgressRef.current = newTarget;
      startAnimLoop();
      if (newTarget >= 1) {
        isCompletedRef.current = true;
        document.body.style.transition = 'opacity 0.35s ease';
        document.body.style.opacity   = '0';
        setTimeout(() => {
          const sec = sectionRef.current;
          unlockScroll(sec ? sec.offsetTop + sec.offsetHeight + 2 : savedScrollY.current + window.innerHeight);
          setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => { document.body.style.transition = ''; }, 400);
          }, 150);
        }, 350);
      }
      if (newTarget <= 0) {
        isCompletedRef.current = false;
        document.body.style.transition = 'opacity 0.35s ease';
        document.body.style.opacity   = '0';
        setTimeout(() => {
          const sec = sectionRef.current;
          unlockScroll(sec ? Math.max(0, sec.offsetTop - 2) : 0);
          setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => { document.body.style.transition = ''; }, 400);
          }, 150);
        }, 350);
      }
    };



    const handleBypassScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetHref = customEvent.detail?.targetHref;
      if (!targetHref) return;

      isBypassingRef.current = true;

      const belowSections = [
        "#skills-section",
        "#certifications-section",
        "#timeline-section",
        "#projects-section",
        "#contact-section",
      ];
      const aboveSections = ["#hero-section", "#pipeline-section"];

      if (belowSections.includes(targetHref)) {
        isCompletedRef.current = true;
        targetProgressRef.current = 1;
        currentProgressRef.current = 1;
        scrollProgress.set(1);
        drawFrame(1);
      } else if (aboveSections.includes(targetHref)) {
        isCompletedRef.current = false;
        targetProgressRef.current = 0;
        currentProgressRef.current = 0;
        scrollProgress.set(0);
        drawFrame(0);
      }

      // Unlock body scroll if it was locked
      document.body.style.overflow = "";
      isLockedRef.current = false;

      const clearBypass = () => {
        isBypassingRef.current = false;
        window.removeEventListener("scrollend", clearBypass);
        if (targetHref === "#pipeline-section") {
          lockScroll();
        }
      };

      window.addEventListener("scrollend", clearBypass);
      // Fallback timer
      setTimeout(clearBypass, 1200);
    };

    let replayRaf: number | null = null;
    const startReplay = () => {
      lockScroll();
      isCompletedRef.current = false;
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      scrollProgress.set(0);
      drawFrame(0);

      const duration = 12000; // 12 seconds of play time for slower, readable transitions
      const startTime = Date.now();

      const playLoop = () => {
        if (!isReplayingRef.current) return;
        const elapsed = Date.now() - startTime;
        const pct = Math.min(1, elapsed / duration);
        const easePct = pct < 0.5 ? 2 * pct * pct : 1 - Math.pow(-2 * pct + 2, 2) / 2;

        currentProgressRef.current = easePct;
        targetProgressRef.current = easePct;
        scrollProgress.set(easePct);
        drawFrame(easePct);

        if (pct < 1) {
          replayRaf = requestAnimationFrame(playLoop);
        } else {
          isReplayingRef.current = false;
          isCompletedRef.current = true;

          // Fade body out -> unlock scroll -> fade back in
          document.body.style.transition = 'opacity 0.35s ease';
          document.body.style.opacity   = '0';
          setTimeout(() => {
            const sec = sectionRef.current;
            const pastSection = sec
              ? sec.offsetTop + sec.offsetHeight + 2
              : savedScrollY.current + window.innerHeight;
            unlockScroll(pastSection);
            setTimeout(() => {
              document.body.style.opacity = '1';
              setTimeout(() => { document.body.style.transition = ''; }, 400);
            }, 150);
          }, 350);
        }
      };

      replayRaf = requestAnimationFrame(playLoop);
    };

    const handleReplayEvent = () => {
      if (isReplayingRef.current) return;
      isReplayingRef.current = true;

      const section = sectionRef.current;
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          startReplay();
        }, 800);
      } else {
        startReplay();
      }
    };

    window.addEventListener("replayPipeline", handleReplayEvent);
    window.addEventListener("bypassScroll", handleBypassScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("replayPipeline", handleReplayEvent);
      window.removeEventListener("bypassScroll", handleBypassScroll);
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (replayRaf) cancelAnimationFrame(replayRaf);
      unlockScroll();
    };
  }, [isLoading, drawFrame, startAnimLoop, lockScroll, unlockScroll, scrollProgress]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div
        ref={sectionRef}
        id="pipeline-section"
        style={{ position: "relative", height: "100vh" }}
        className="w-full bg-[#050816]"
      >
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, display: "block" }}
        />

        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}
          className="bg-gradient-to-b from-[#050816] via-transparent to-[#050816] opacity-60" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}
          className="bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,8,22,0.55)_100%)]" />

        {/* Overlay panels */}
        {!isLoading && (
          <div style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" }}>
            <Overlay scrollYProgress={scrollProgress} />
          </div>
        )}

        {/* Preloader */}
        {isLoading && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50 }}
            className="bg-[#050816] flex flex-col justify-center items-center px-4"
          >
            <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 flex flex-col items-center gap-6 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_50px_rgba(0,191,255,0.1)]">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full border-t border-r border-[#00BFFF] animate-spin"
                  style={{ animationDuration: "1s" }} />
                <span className="text-[#00BFFF] font-mono text-sm">{loadProgress}%</span>
              </div>
              <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00BFFF] via-[#00FFFF] to-[#8B5CF6] h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-1">
                  Syncing Node Clusters
                </h3>
                <p className="text-slate-400 text-xs font-mono animate-pulse uppercase tracking-widest">
                  {loaderStatus}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Programmatic Replay Trigger Section sitting directly below the video */}
      <div className="w-full bg-[#050816] py-10 flex justify-center border-b border-white/[0.02]">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("replayPipeline"));
            }
          }}
          className="relative px-8 py-3.5 rounded-full bg-[#050816]/90 border border-[#00BFFF]/30 text-white font-mono text-xs uppercase tracking-widest cursor-pointer hover:border-[#00FFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] transition-all duration-300 flex items-center gap-2.5 group"
        >
          {/* Pulsing Back Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-full blur-md opacity-35 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none -z-10" />
          
          <RotateCcw className="w-4 h-4 text-[#00FFFF] group-hover:rotate-180 transition-transform duration-700 relative z-10" />
          <span className="relative z-10">Play this video again</span>
        </button>
      </div>
    </>
  );
}
