"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);
  const onCompleteRef = useRef(onComplete);

  // Keep ref in sync
  useGSAP(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Reset initial states
      gsap.set(portfolioRef.current, { opacity: 0, y: -20 });
      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(counterRef.current, { opacity: 0, y: 20 });
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Entrance: Portfolio & Counter (Duration 0.6s, Delay 0.1s)
      tl.to(
        portfolioRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );
      tl.to(
        counterRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );

      // Progress Bar (linear scale up over 2.7s)
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 2.7,
          ease: "none",
        },
        0
      );

      // Counter (0 to 100 over exactly 2.7s)
      const proxy = { val: 0 };
      tl.to(
        proxy,
        {
          val: 100,
          duration: 2.7,
          ease: "none",
          onUpdate: function () {
            setCounter(Math.round(proxy.val));
          },
        },
        0
      );

      // Words Sequence Frame
      // Word 1: Design (0.0s setup, 0.4s anim in, 0.9s anim out)
      tl.to(
        word1Ref.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.0 // 0.0s -> "Design" appears
      );
      tl.to(
        word1Ref.current,
        { opacity: 0, y: -20, duration: 0.4, ease: "power2.out" },
        0.5 // starts moving out so it's gone by 0.9
      );

      // Word 2: Create
      tl.to(
        word2Ref.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.9 // 0.9s -> "Create" replaces it
      );
      tl.to(
        word2Ref.current,
        { opacity: 0, y: -20, duration: 0.4, ease: "power2.out" },
        1.4
      );

      // Word 3: Inspire
      tl.to(
        word3Ref.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        1.8 // 1.8s -> "Inspire" replaces it
      );
      // Doesn't animate out according to prompt

      // End of sequence. At 2.7s counter is exactly 100. Let it wait 400ms.
      // 2.7 + 0.4 = 3.1; Fade the entire container out over 0.6s
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.4,
          onComplete: () => onCompleteRef.current(),
        },
        2.7
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a]"
    >
      {/* Portfolio Label */}
      <div
        ref={portfolioRef}
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-[#888888] uppercase tracking-[0.3em] font-sans"
      >
        Portfolio
      </div>

      {/* Rotating Words */}
      <div className={`absolute inset-0 flex items-center justify-center ${instrumentSerif.className}`}>
        <span
          ref={word1Ref}
          className="absolute text-4xl md:text-6xl lg:text-7xl italic text-[#f5f5f5]/80"
        >
          Design
        </span>
        <span
          ref={word2Ref}
          className="absolute text-4xl md:text-6xl lg:text-7xl italic text-[#f5f5f5]/80"
        >
          Create
        </span>
        <span
          ref={word3Ref}
          className="absolute text-4xl md:text-6xl lg:text-7xl italic text-[#f5f5f5]/80"
        >
          Inspire
        </span>
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl text-[#f5f5f5] tabular-nums ${instrumentSerif.className}`}
      >
        {counter.toString().padStart(3, "0")}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1f1f1f]/50">
        <div
          ref={progressRef}
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </div>
  );
}
