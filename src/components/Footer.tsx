"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/[0.08] text-white/50 text-xs py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8">
            <Image
              src="/axus-logo.png"
              alt="AXUS"
              width={32}
              height={32}
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(182,28,28,0.4)]"
            />
          </div>
          <div>
            <div className="font-mono text-sm tracking-widest text-white/90 font-semibold">AXUS</div>
            <div className="text-[11px] text-white/40">Unified Product Ecosystem</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-wider">
          <a href="#products" className="hover:text-white transition-colors">PRODUCTS</a>
          <a href="#architecture" className="hover:text-white transition-colors">ARCHITECTURE</a>
          <a href="#" className="hover:text-white transition-colors">DOCUMENTATION</a>
          <a href="#" className="hover:text-white transition-colors">TELEMETRY</a>
          <a href="#" className="hover:text-white transition-colors">SECURITY</a>
          <a href="#" className="hover:text-white transition-colors">LEGAL</a>
        </div>

        {/* Operational Status */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#B61C1C] animate-ping" />
          <span className="text-white/60">NETWORK HEALTH 100%</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30">
        <div>&copy; {new Date().getFullYear()} AXUS SYSTEMS CORP. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-4">
          <span>RGB ACCENT: #B61C1C</span>
          <span>LATENCY: 0.18ms</span>
        </div>
      </div>
    </footer>
  );
}
