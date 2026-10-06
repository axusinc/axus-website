"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContrailsCanvas from "./ContrailsCanvas";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Very subtle tilt offset
      const x = (e.clientX - centerX) / centerX;
      const y = (e.clientY - centerY) / centerY;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Dynamic blurred AXUS Red contrails */}
      <ContrailsCanvas />

      {/* Subtle radial vignette overlay to deepen edge contrast */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Centered AXUS Logo */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-700 ease-out"
        style={{
          transform: mounted
            ? `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0) scale(${1 + Math.abs(mouseOffset.x * mouseOffset.y) * 0.02})`
            : "scale(0.96)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative group cursor-default">
          {/* Subtle atmospheric back-glow matching AXUS Red #B61C1C */}
          <div 
            className="absolute -inset-10 rounded-full blur-3xl opacity-35 group-hover:opacity-55 transition-opacity duration-1000 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(182, 28, 28, 0.4) 0%, rgba(182, 28, 28, 0.08) 50%, transparent 75%)",
            }}
          />

          {/* AXUS Logo Image */}
          <div className="relative w-44 h-48 sm:w-56 sm:h-60 md:w-64 md:h-68 lg:w-72 lg:h-76 flex items-center justify-center drop-shadow-[0_0_35px_rgba(182,28,28,0.3)]">
            <Image
              src="/axus-logo.png"
              alt="AXUS"
              width={869}
              height={905}
              priority
              className="w-full h-full object-contain filter contrast-105 brightness-100 transition-all duration-700 select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Discreet bottom scroll indicator to discover AXUS umbrella products */}
      <a
        href="#products"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 group text-white/40 hover:text-white/80 transition-all duration-300 cursor-pointer"
        aria-label="Scroll to AXUS Products"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-mono font-medium text-white/30 group-hover:text-red-400/80 transition-colors">
          Explore Products
        </span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1 group-hover:border-red-500/40 transition-colors">
          <div className="w-1 h-2 bg-[#B61C1C] rounded-full animate-bounce mt-1 shadow-[0_0_8px_#B61C1C]" />
        </div>
      </a>
    </section>
  );
}
