"use client";

import { useRef } from "react";
import { Michroma } from "next/font/google";
import { useCart } from "@/context/CartContext";
import { useLightTrailAnimation } from "@/hooks/useLightTrailAnimation";

const techFont = Michroma({ weight: "400", subsets: ["latin"] });

const LAYER_X_PRODUCT = {
  id: "layer-x-glasses",
  name: "LAYER-X",
  subtitle: "Neural Interface Glasses",
  price: 100,
  image: "/resources/LAYER-X.png",
};

interface ProductPage1Props {
  onNext: () => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
}

export default function ProductPage1({
  onNext,
  cartIconRef,
}: ProductPage1Props) {
  const { addItem, openCart, totalItems } = useCart();
  const { fire } = useLightTrailAnimation();
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    addItem(LAYER_X_PRODUCT);
    fire(addToCartBtnRef.current, cartIconRef.current, undefined);
  };

  return (
    <div className={`min-h-screen bg-black text-[#cbb592] ${techFont.className}`}>

      {/* ─── MOBILE NAV BAR ─── */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 relative z-20">
        <span className="text-[10px] tracking-[0.2em] text-[#887455]">1 / 2</span>
        <div className="flex items-center gap-5">
          {/* Cart icon */}
          <button
            ref={cartIconRef as React.RefObject<HTMLButtonElement>}
            onClick={openCart}
            className="relative text-[#887455] hover:text-[#cbb592] transition-colors cursor-pointer"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#cbb592] text-black text-[9px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={onNext}
            className="text-[#a08a65] hover:text-[#cbb592] transition-colors cursor-pointer uppercase tracking-[0.2em] text-[10px] bg-transparent border-none"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* ─── MOBILE VIDEO HERO ─── */}
      <div className="md:hidden relative w-full" style={{ height: "50vw", minHeight: "200px", maxHeight: "340px" }}>
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/resources/heroVideo.mp4" type="video/mp4" />
        </video>
        {/* Bottom gradient fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ─── MOBILE CONTENT ─── */}
      <div className="md:hidden px-6 pb-10 flex flex-col gap-8 relative z-10">
        {/* Title */}
        <h1 className="text-3xl leading-tight tracking-wide uppercase text-[#cbb592]">
          LAYER-X //<br />NEURAL<br />INTERFACE
        </h1>

        {/* Description */}
        <p className="font-sans text-[#a28f73] text-[13px] leading-relaxed">
          Engineered for the LAYER-X glasses, an ultra-lightweight frame for users who don&apos;t just view the AR world—they own it. Shift reality.
        </p>

        {/* Product Card */}
        <div className="border border-[#2a2a2a] rounded-3xl p-6 bg-black">
          <h3 className="text-[10px] font-bold tracking-[0.2em] mb-3 text-[#cbb592] uppercase">
            MS-01: NEURAL CORE
          </h3>
          <p className="font-sans text-[#998668] text-[12px] mb-6 leading-relaxed">
            High-resolution optics and a light frame for comfort and clarity.
          </p>
          <button
            ref={addToCartBtnRef}
            onClick={handleAddToCart}
            className="border border-[#444] text-[#a28f73] rounded-full px-6 py-2.5 text-[11px] tracking-wider hover:bg-[#B69D74]/10 transition-colors bg-transparent cursor-pointer"
          >
            Add to Cart
          </button>
        </div>

        {/* Technical Specs */}
        <div>
          <h3 className="text-[11px] tracking-[0.2em] mb-4 font-bold text-[#cbb592]">TECHNICAL SPECS</h3>
          <div className="flex flex-col font-sans text-[12px] tracking-wide border-t border-b border-[#222] divide-y divide-[#222]">
            {[
              ["Optics", "Dual 8K Micro-OLED"],
              ["Logic", "R1 - Neural Engine"],
              ["Motion", "144Hz Low-Latency"],
              ["Build", "Lightweight Impact Shell"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-3">
                <span className="text-[#887455]">{label}</span>
                <span className="text-[#cbb592]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pills — centered */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.2em] text-[#998668]">
          <span className="px-2">8K RAW</span>
          <span className="w-9 h-9 flex items-center justify-center border border-[#333] rounded-full">A+</span>
          <span className="px-2">ULTRA-WIDE</span>
          <span className="border border-[#333] rounded-full px-3 py-1">NEURAL-SYNC</span>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (unchanged) ─── */}
      <div className="hidden md:flex min-h-screen flex-col justify-between overflow-hidden relative p-16">
        {/* Desktop background video */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-lighten"
        >
          <source src="/resources/heroVideo.mp4" type="video/mp4" />
        </video>

        {/* Desktop header */}
        <div className="absolute top-16 right-16 flex items-center gap-6 text-[10px] tracking-[0.2em] text-[#887455] z-10">
          <span>1/2</span>
          <div className="w-32 h-px bg-[#333]" />
          <button
            onClick={onNext}
            className="text-[#a08a65] hover:text-[#cbb592] transition-colors cursor-pointer uppercase tracking-[0.2em] text-[10px] bg-transparent border-none"
          >
            NEXT
          </button>
          <button
            ref={cartIconRef as React.RefObject<HTMLButtonElement>}
            onClick={openCart}
            className="relative text-[#887455] hover:text-[#cbb592] transition-colors cursor-pointer"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#cbb592] text-black text-[9px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Desktop grid */}
        <div className="max-w-[1400px] w-full mx-auto flex flex-row justify-between h-full gap-16 pt-24 flex-1 relative z-10">
          {/* Left Column */}
          <div className="flex flex-col justify-between w-1/2 max-w-xl relative">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl lg:text-6xl leading-[1.05] tracking-wide uppercase text-[#cbb592]">
                LAYER-X //<br />NEURAL<br />INTERFACE
              </h1>
              <p className="font-sans text-[#a28f73] text-[13px] max-w-[22rem] leading-relaxed tracking-wide">
                Engineered for the LAYER-X glasses, an ultra-lightweight frame for users who don&apos;t just view the AR world—they own it. Shift reality.
              </p>
            </div>
            <div className="mt-auto border border-[#2a2a2a] rounded-[2rem] p-8 max-w-[26rem] bg-black mb-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-[#cbb592] uppercase">MS-01: NEURAL CORE</h3>
              <p className="font-sans text-[#998668] text-[12px] mb-8 leading-relaxed">
                High-resolution optics and a light<br />frame for comfort and clarity.
              </p>
              <button
                ref={addToCartBtnRef}
                onClick={handleAddToCart}
                className="border border-[#444] text-[#a28f73] rounded-full px-8 py-3 text-[11px] tracking-wider hover:bg-[#B69D74]/10 transition-colors bg-transparent cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between w-1/2 relative pb-4">
            <div className="flex-1 flex flex-col justify-center w-full max-w-[28rem] self-end">
              <h3 className="text-[11px] tracking-[0.2em] mb-8 font-bold text-[#cbb592]">TECHNICAL SPECS</h3>
              <div className="flex flex-col font-sans text-[12px] tracking-wide border-t border-b border-[#222] divide-y divide-[#222]">
                {[
                  ["Optics", "Dual 8K Micro-OLED"],
                  ["Logic", "R1 - Neural Engine"],
                  ["Motion", "144Hz Low-Latency"],
                  ["Build", "Lightweight Impact Shell"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-4">
                    <span className="text-[#887455]">{label}</span>
                    <span className="text-[#cbb592]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-5 text-[10px] tracking-[0.2em] text-[#998668] mt-auto self-end">
              <span className="px-1 hover:text-[#cbb592] transition-colors">8K RAW</span>
              <span className="w-9 h-9 flex items-center justify-center border border-[#333] rounded-full hover:text-[#cbb592] hover:border-[#555] transition-all">A+</span>
              <span className="px-1 hover:text-[#cbb592] transition-colors">ULTRA-WIDE</span>
              <span className="flex items-center border border-[#333] rounded-full px-2 py-1 hover:border-[#555] transition-all">NEURAL-SYNC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
