"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] py-3.5 shadow-2xl shadow-black/80"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#"
          className="flex items-center gap-3 group transition-opacity duration-300"
          aria-label="AXUS Home"
        >
          <div className="relative w-7 h-7 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/axus-logo.png"
              alt="AXUS Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(182,28,28,0.4)]"
            />
          </div>
          <span className="font-mono text-sm tracking-[0.25em] uppercase font-semibold text-white/90 group-hover:text-white transition-colors">
            AXUS
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-white/50">
          <a
            href="#products"
            className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B61C1C] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            PRODUCTS
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B61C1C] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            ARCHITECTURE
          </a>
          <a
            href="#ecosystem"
            className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B61C1C] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            ECOSYSTEM
          </a>
          <a
            href="#specs"
            className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B61C1C] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            MANIFESTO
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="#products"
            className="relative group inline-flex items-center justify-center px-4 py-1.5 text-xs font-mono tracking-wider text-white/90 border border-white/15 rounded-full overflow-hidden transition-all duration-300 hover:border-[#B61C1C] hover:shadow-[0_0_18px_rgba(182,28,28,0.35)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#B61C1C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B61C1C] animate-pulse" />
              PORTAL
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
