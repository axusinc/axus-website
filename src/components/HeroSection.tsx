"use client";

import React from "react";
import Image from "next/image";
import ContrailsCanvas from "./ContrailsCanvas";

export default function HeroSection() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none">
      {/* Dynamic blurred AXUS Red (#B61C1C) contrails */}
      <ContrailsCanvas />

      {/* Center AXUS Logo only */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-48 h-52 sm:w-60 sm:h-64 md:w-72 md:h-76 lg:w-80 lg:h-84 flex items-center justify-center">
          <Image
            src="/axus-logo.png"
            alt="AXUS"
            width={869}
            height={905}
            priority
            className="w-full h-full object-contain filter contrast-105 select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
