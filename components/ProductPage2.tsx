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

interface ProductPage2Props {
  onPrev: () => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
}

export default function ProductPage2({
  onPrev,
  cartIconRef,
}: ProductPage2Props) {
  const { addItem, openCart, totalItems } = useCart();
  const { fire } = useLightTrailAnimation();
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    addItem(LAYER_X_PRODUCT);
    fire(addToCartBtnRef.current, cartIconRef.current);
  };

  return (
    <div
      className={`h-screen bg-black text-[#cbb592] p-8 md:p-16 flex flex-col overflow-hidden relative ${techFont.className}`}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-lighten"
      >
        <source src="/resources/heroVideoTwo.mp4" type="video/mp4" />
      </video>

      {/* Top right floating Header */}
      <div className="absolute top-16 right-16 hidden md:flex items-center gap-6 text-[10px] tracking-[0.2em] text-[#887455] z-10">
        <span>2/2</span>
        <div className="w-32 h-px bg-[#333]"></div>

        <button
          onClick={onPrev}
          className="text-[#a08a65] hover:text-[#cbb592] transition-colors cursor-pointer uppercase tracking-[0.2em] text-[10px] bg-transparent border-none"
        >
          PREV
        </button>

        {/* Cart icon */}
        <button
          ref={cartIconRef as React.RefObject<HTMLButtonElement>}
          onClick={openCart}
          className="relative text-[#887455] hover:text-[#cbb592] transition-colors cursor-pointer"
          aria-label="Open cart"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#cbb592] text-black text-[9px] flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Top Section */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16 pt-12 md:pt-24">
        {/* Top Left: Heading + CTA */}
        <div className="flex flex-col gap-8 w-full md:w-1/2 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl leading-[1.05] tracking-wide uppercase text-[#cbb592]">
            CREATING <br /> THE FUTURE OF
            <br />
            VISION
          </h1>

          {/* Shop Now button */}
          <button
            ref={addToCartBtnRef}
            onClick={handleAddToCart}
            className="flex items-center gap-3 border border-[#444] text-[#cbb592] rounded-full px-7 py-3 text-[11px] tracking-widest hover:bg-[#cbb592]/10 transition-colors bg-transparent self-start cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            Add to Cart
          </button>
        </div>

        {/* Top Right: Description */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 max-w-sm self-center">
          <p className="font-sans text-[#a28f73] text-[13px] leading-relaxed tracking-wide">
            Make your LAYER-X glasses an extension of your personal style.
            Choose from a range of elegant lenses and adaptive frames built for
            every environment.
          </p>
          <p className="font-sans text-[#887455] text-[13px] leading-relaxed tracking-wide">
            Customize AR features to suit your preferences—from spatial overlays
            to real-time translations.
          </p>
        </div>
      </div>

      {/* Bottom: Giant "LAYER-X" text */}
      <div className="relative z-10 flex-1 flex items-end overflow-hidden">
        <span
          className="block w-full text-[18vw] md:text-[14vw] leading-none font-bold uppercase tracking-tight select-none whitespace-nowrap"
          style={{
            background:
              "linear-gradient(180deg, #888 0%, #444 40%, #222 70%, #111 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LAYER-X
        </span>
      </div>
    </div>
  );
}
