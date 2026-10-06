"use client";

import React, { useState } from "react";
import { Network, Terminal, Cpu, Shield, ArrowRight } from "lucide-react";

export default function EcosystemArchitecture() {
  const [activeTab, setActiveTab] = useState<"architecture" | "runtime" | "security">("architecture");

  return (
    <section id="architecture" className="relative w-full py-32 px-6 sm:px-8 bg-black border-t border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B61C1C]/10 border border-[#B61C1C]/25 text-[#B61C1C] text-[11px] font-mono tracking-widest uppercase mb-4">
            Unified Substrate
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
            Engineered for Convergence
          </h2>
          <p className="text-white/60 text-base leading-relaxed font-sans">
            AXUS is not a collection of isolated tools. It is an end-to-end umbrella architecture spanning silicon, distributed networking, and sensory simulation.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {[
              { id: "architecture", label: "01 / PIPELINE ARCHITECTURE", icon: Network },
              { id: "runtime", label: "02 / RUNTIME INTERFACE", icon: Terminal },
              { id: "security", label: "03 / FORMAL VERIFICATION", icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#B61C1C] text-white shadow-[0_0_20px_rgba(182,28,28,0.5)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive View */}
        <div className="relative rounded-3xl bg-neutral-950/80 border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle background red accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B61C1C] to-transparent opacity-60" />

          {activeTab === "architecture" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#B61C1C]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#B61C1C] tracking-widest block mb-2">LAYER 01</span>
                <h4 className="text-lg font-medium text-white mb-2">AXUS Core Hardware Abstraction</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  Direct DMA zero-copy ring buffers interface directly with custom silicon and standard PCIe accelerators without operating system context switches.
                </p>
                <div className="font-mono text-[11px] text-white/70 bg-black/60 p-3 rounded-lg border border-white/5">
                  &gt; Jitter: &lt; 0.12 μs<br />
                  &gt; Memory bounds: Static Verified
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#B61C1C]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#B61C1C] tracking-widest block mb-2">LAYER 02</span>
                <h4 className="text-lg font-medium text-white mb-2">AXUS Mesh Global Fabric</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  Telemetry and state are propagated via multi-path Anycast BGP overlay with end-to-end lattice cryptography, guaranteeing Byzantine consensus.
                </p>
                <div className="font-mono text-[11px] text-white/70 bg-black/60 p-3 rounded-lg border border-white/5">
                  &gt; Replication: Sub-5ms Worldwide<br />
                  &gt; Topology: Self-healing Mesh
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#B61C1C]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#B61C1C] tracking-widest block mb-2">LAYER 03</span>
                <h4 className="text-lg font-medium text-white mb-2">AXUS Studio &amp; Simulation</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  Deterministic physics and digital twin environments mirror physical deployment telemetries in exact mathematical parity.
                </p>
                <div className="font-mono text-[11px] text-white/70 bg-black/60 p-3 rounded-lg border border-white/5">
                  &gt; Solver: Continuous Symplectic<br />
                  &gt; Frame parity: Bit-exact Reproducibility
                </div>
              </div>
            </div>
          )}

          {activeTab === "runtime" && (
            <div className="bg-black/80 rounded-2xl border border-white/10 p-6 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-white/40">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B61C1C]" />
                  axus-runtime.config.ts
                </span>
                <span>AXUS v4.18.0</span>
              </div>
              <pre className="text-white/80 leading-relaxed">
{`import { createAxusNode, SecurityLevel, TelemetryMode } from "@axus/core";

// Initialize unified AXUS Umbrella node
const axus = await createAxusNode({
  cluster: "axus.global.primary",
  subsystems: {
    core: { deterministic: true, tickRateHz: 2400 },
    mesh: { encrypted: true, latticeCrypto: "kyber-1024" },
    sentinel: { formalVerification: true, isolationLevel: "strict" },
    studio: { streamingSync: true, compression: "lossless-fse" }
  },
  redAccentColor: "#B61C1C"
});

console.log("[AXUS] Umbrella subsystem nodes synchronized.");`}
              </pre>
            </div>
          )}

          {activeTab === "security" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-light text-white mb-4">Zero-Compromise Security</h4>
                <p className="text-sm text-white/60 leading-relaxed mb-6 font-sans">
                  Every transition in the AXUS umbrella pipeline is proved with automated theorem provers before execution. Runtime invariant checking ensures untrusted agents cannot violate isolation boundaries.
                </p>
                <ul className="space-y-3 font-mono text-xs text-white/70">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B61C1C]" />
                    Coq-verified microkernel execution guarantees
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B61C1C]" />
                    Hardware-enforced memory boundary isolation
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B61C1C]" />
                    Zero external runtime dependencies
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-900/60 rounded-2xl border border-white/10 p-6 text-center">
                <Shield className="w-16 h-16 text-[#B61C1C] mx-auto mb-4 filter drop-shadow-[0_0_15px_rgba(182,28,28,0.5)]" />
                <div className="font-mono text-sm text-white font-medium mb-1">AXUS Sentinel Verified</div>
                <div className="font-mono text-xs text-white/40">Proof Certificate: #AX-VERIFIED-99.9999%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
