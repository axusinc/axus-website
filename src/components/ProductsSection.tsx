"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Terminal,
  Globe2
} from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  tagline: string;
  category: string;
  status: "PRODUCTION" | "EARLY ACCESS" | "RESEARCH";
  description: string;
  specs: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
}

const PRODUCTS: Product[] = [
  {
    id: "core",
    code: "AX-01",
    name: "AXUS Core",
    tagline: "Deterministic High-Performance Substrate",
    category: "SYSTEMS ARCHITECTURE",
    status: "PRODUCTION",
    description:
      "A next-generation microkernel runtime built for real-time determinism, ultra-low jitter, and decentralized hardware abstraction across heterogeneous clusters.",
    specs: ["Sub-microsecond latency", "Zero-alloc memory model", "Heterogeneous ISA support"],
    icon: Cpu,
    accentGradient: "from-[#B61C1C]/20 via-[#B61C1C]/5 to-transparent",
  },
  {
    id: "studio",
    code: "AX-02",
    name: "AXUS Studio",
    tagline: "Spatial Engineering & Simulation Workbench",
    category: "CREATIVE & SIMULATION",
    status: "PRODUCTION",
    description:
      "Precision simulation workbench for spatial computing, generative geometry, physics verification, and collaborative system design at scale.",
    specs: ["Real-time ray-traced feedback", "Physically-based solver", "Multi-user telemetry sync"],
    icon: Layers,
    accentGradient: "from-[#B61C1C]/25 via-[#B61C1C]/5 to-transparent",
  },
  {
    id: "mesh",
    code: "AX-03",
    name: "AXUS Mesh",
    tagline: "Encrypted Global Telemetry Fabric",
    category: "EDGE INFRASTRUCTURE",
    status: "PRODUCTION",
    description:
      "Worldwide state synchronization network ensuring resilient, peer-to-peer data replication with zero-knowledge cryptographic provenance.",
    specs: ["Global Anycast routing", "Post-quantum cryptography", "Self-healing topology"],
    icon: Globe2,
    accentGradient: "from-[#B61C1C]/20 via-[#B61C1C]/5 to-transparent",
  },
  {
    id: "sentinel",
    code: "AX-04",
    name: "AXUS Sentinel",
    tagline: "Autonomous Verification & Safety Guard",
    category: "SECURITY & RELIABILITY",
    status: "EARLY ACCESS",
    description:
      "Continuous formal verification and runtime sentinel monitors enforcing strict safety boundaries and predictive anomaly isolation.",
    specs: ["Continuous formal proofs", "Automated threat isolation", "Immutable audit ledger"],
    icon: ShieldCheck,
    accentGradient: "from-[#B61C1C]/20 via-[#B61C1C]/5 to-transparent",
  },
  {
    id: "engine",
    code: "AX-05",
    name: "AXUS Engine",
    tagline: "Deep Neural & Symbolic Compute Pipeline",
    category: "AI & COMPUTE",
    status: "RESEARCH",
    description:
      "Unified compute engine bridging symbolic constraint solvers with high-density transformer inferences for autonomous agents and robotics.",
    specs: ["Hybrid symbolic/neural graphs", "FP4/FP8 native execution", "Dynamic operator fusion"],
    icon: Activity,
    accentGradient: "from-[#B61C1C]/25 via-[#B61C1C]/5 to-transparent",
  },
];

export default function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  return (
    <section id="products" className="relative w-full py-32 px-6 sm:px-8 bg-black border-t border-white/[0.07] overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: "#B61C1C" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B61C1C] shadow-[0_0_8px_#B61C1C]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B61C1C] font-semibold">
                THE AXUS ECOSYSTEM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-sans">
              Umbrella Products
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-xl mt-3 font-normal font-sans leading-relaxed">
              An integrated portfolio of systems, simulation workbenches, and secure compute infrastructures designed to operate as a unified standard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/40 tracking-wider">STATUS: ALL SYSTEMS NOMINAL</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            const isSelected = activeProduct === prod.id;

            return (
              <div
                key={prod.id}
                onMouseEnter={() => setActiveProduct(prod.id)}
                onMouseLeave={() => setActiveProduct(null)}
                className={`group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border transition-all duration-500 p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-[#B61C1C]/70 shadow-[0_0_35px_rgba(182,28,28,0.25)] -translate-y-1"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Glow layer on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prod.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono tracking-widest text-[#B61C1C] font-semibold">
                      {prod.code}
                    </span>
                    <span
                      className={`text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border ${
                        prod.status === "PRODUCTION"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : prod.status === "EARLY ACCESS"
                          ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                          : "border-[#B61C1C]/30 text-red-400 bg-[#B61C1C]/10"
                      }`}
                    >
                      {prod.status}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/90 group-hover:text-white group-hover:border-[#B61C1C]/50 transition-colors">
                      <Icon className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white tracking-tight group-hover:text-red-50 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase">
                        {prod.category}
                      </p>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-sm text-white/80 font-medium mb-3">
                    {prod.tagline}
                  </p>
                  <p className="text-xs text-white/50 font-normal leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                {/* Specs list & Action */}
                <div>
                  <div className="border-t border-white/[0.06] pt-4 mb-6 space-y-2">
                    {prod.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                        <span className="w-1 h-1 rounded-full bg-[#B61C1C]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                    <span className="tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                      ACCESS SYSTEM
                      <ChevronRight className="w-3.5 h-3.5 text-[#B61C1C]" />
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
