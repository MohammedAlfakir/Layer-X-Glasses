"use client";

import { Michroma } from "next/font/google";

const techFont = Michroma({ weight: "400", subsets: ["latin"] });

interface ProductPage1Props {
  onNext: () => void;
}

export default function ProductPage1({ onNext }: ProductPage1Props) {
  return (
    <div
      className={`min-h-screen bg-black text-[#cbb592] p-8 md:p-16 flex flex-col justify-between overflow-hidden relative ${techFont.className}`}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-lighten"
      >
        <source src="/resources/heroVideo.mp4" type="video/mp4" />
      </video>

      {/* Top right floating Header */}
      <div className="absolute top-16 right-16 hidden md:flex items-center gap-6 text-[10px] tracking-[0.2em] text-[#887455] z-10">
        <span>1/2</span>
        <div className="w-32 h-px bg-[#333]"></div>
        <button
          onClick={onNext}
          className="text-[#a08a65] hover:text-[#cbb592] transition-colors cursor-pointer uppercase tracking-[0.2em] text-[10px] bg-transparent border-none"
        >
          NEXT
        </button>
      </div>

      {/* Main Grid container */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row justify-between h-full gap-8 md:gap-16 pt-12 md:pt-24 flex-1 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-between w-full md:w-1/2 max-w-xl relative">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-wide uppercase text-[#cbb592]">
              LAYER-X //
              <br />
              NEURAL
              <br />
              INTERFACE
            </h1>

            <p className="font-sans text-[#a28f73] text-[13px] max-w-[22rem] leading-relaxed tracking-wide">
              Engineered for the LAYER-X glasses, an ultra-lightweight frame for
              users who don&apos;t just view the AR world—they own it. Shift
              reality.
            </p>
          </div>

          {/* Bottom Left: Product card */}
          <div className="mt-16 sm:mt-auto border border-[#2a2a2a] rounded-[2rem] p-8 max-w-[26rem] bg-black relative max-h-min mb-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-[#cbb592] uppercase">
              MS-01: NEURAL CORE
            </h3>
            <p className="font-sans text-[#998668] text-[12px] mb-8 leading-relaxed">
              High-resolution optics and a light
              <br />
              frame for comfort and clarity.
            </p>
            <button className="border border-[#444] text-[#a28f73] rounded-full px-8 py-3 text-[11px] tracking-wider hover:bg-[#B69D74]/10 transition-colors bg-transparent">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between w-full md:w-1/2 relative pb-8 md:pb-4">
          <div className="flex-1 flex flex-col justify-center w-full max-w-[28rem] self-end mt-16 md:mt-0">
            {/* Technical Specs */}
            <div className="w-full">
              <h3 className="text-[11px] tracking-[0.2em] mb-8 font-bold text-[#cbb592]">
                TECHNICAL SPECS
              </h3>
              <div className="flex flex-col font-sans text-[12px] tracking-wide border-t border-b border-[#222] divide-y divide-[#222]">
                <div className="flex justify-between py-4">
                  <span className="text-[#887455]">Optics</span>
                  <span className="text-[#cbb592]">Dual 8K Micro-OLED</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-[#887455]">Logic</span>
                  <span className="text-[#cbb592]">R1 - Neural Engine</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-[#887455]">Motion</span>
                  <span className="text-[#cbb592]">144Hz Low-Latency</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-[#887455]">Build</span>
                  <span className="text-[#cbb592]">
                    Lightweight Impact Shell
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Pills */}
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5 text-[9px] sm:text-[10px] tracking-[0.2em] font-normal text-[#998668] mt-auto self-end">
            <div className="px-1 hover:text-[#cbb592] transition-colors">
              8K RAW
            </div>
            <div className="w-9 h-9 flex items-center justify-center border border-[#333] rounded-full hover:text-[#cbb592] hover:border-[#555] transition-all">
              A+
            </div>
            <div className="px-1 hover:text-[#cbb592] transition-colors">
              ULTRA-WIDE
            </div>
            <div className="flex items-center border border-[#333] rounded-full px-2 py-1 hover:border-[#555] transition-all">
              NEURAL-SYNC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
