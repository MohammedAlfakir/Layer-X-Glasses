"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Michroma } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import LoadingScreen from "@/components/LoadingScreen";
import ProductPage1 from "@/components/ProductPage1";
import ProductPage2 from "@/components/ProductPage2";
import CartSlider from "@/components/CartSlider";

const techFont = Michroma({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Shared cart icon ref — passed to both pages so the light trail
  // always knows where to fly regardless of which page is active.
  const cartIconRef = useRef<HTMLButtonElement>(null);

  const navigate = (targetPage: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const top = panelTopRef.current;
    const bottom = panelBottomRef.current;
    const line = lineRef.current;
    if (!top || !bottom || !line) return;

    gsap.set(top, { yPercent: -100, display: "block" });
    gsap.set(bottom, { yPercent: 100, display: "block" });
    gsap.set(line, { scaleX: 0, display: "block", opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    });

    tl.to(top, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0);
    tl.to(bottom, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0);
    tl.to(line, { scaleX: 1, duration: 0.35, ease: "power2.out" }, 0.35);
    tl.call(() => setCurrentPage(targetPage), undefined, 0.6);
    tl.to(line, { opacity: 0, duration: 0.15, ease: "none" }, 0.65);
    tl.to(top, { yPercent: -100, duration: 0.5, ease: "power3.inOut" }, 0.7);
    tl.to(bottom, { yPercent: 100, duration: 0.5, ease: "power3.inOut" }, 0.7);
    tl.set([top, bottom, line], { display: "none" });
  };

  return (
    <CartProvider>
      <div className={`relative ${techFont.className}`}>
        {/* Split-panel transition layers */}
        <div ref={panelTopRef} className="fixed top-0 left-0 right-0 h-1/2 bg-black z-[9998] hidden" />
        <div ref={panelBottomRef} className="fixed bottom-0 left-0 right-0 h-1/2 bg-black z-[9998] hidden" />
        <div
          ref={lineRef}
          className="fixed left-0 right-0 z-[9999] hidden"
          style={{
            top: "50%",
            height: "1px",
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, transparent 0%, #cbb592 20%, #e8d5a8 50%, #cbb592 80%, transparent 100%)",
            boxShadow: "0 0 12px 2px rgba(203, 181, 146, 0.6)",
          }}
        />

        {/* Preload both videos simultaneously so page 2 is already buffered */}
        <div className="hidden" aria-hidden="true">
          <video preload="auto" muted playsInline>
            <source src="/resources/heroVideo.mp4" type="video/mp4" />
          </video>
          <video preload="auto" muted playsInline>
            <source src="/resources/heroVideoTwo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Loading screen */}
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        {/* Page content */}
        <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-out" }}>
          {currentPage === 0 ? (
            <ProductPage1 onNext={() => navigate(1)} cartIconRef={cartIconRef} />
          ) : (
            <ProductPage2 onPrev={() => navigate(0)} cartIconRef={cartIconRef} />
          )}
        </div>

        {/* Cart slider — always mounted so GSAP can animate it */}
        <CartSlider />
      </div>
    </CartProvider>
  );
}
