"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Michroma } from "next/font/google";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

const techFont = Michroma({ weight: "400", subsets: ["latin"] });

export default function CartSlider() {
  const { items, isOpen, orderConfirmed, removeItem, updateQuantity, closeCart, confirmOrder, resetOrder } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Animate open/close
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (isOpen) {
      gsap.set(backdrop, { display: "block" });
      gsap.set(panel, { x: "100%" });
      gsap.to(backdrop, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(panel, { x: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(panel, { x: "100%", duration: 0.45, ease: "power3.inOut" });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => { gsap.set(backdrop, { display: "none" }); },
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeCart}
        className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm hidden opacity-0"
      />

      {/* Slider Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[9991] bg-[#0a0a0a] border-l border-[#1e1e1e] flex flex-col translate-x-full ${techFont.className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#1e1e1e]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.3em] text-[#887455] uppercase">
              Your Cart
            </span>
            <span className="text-[#cbb592] text-sm tracking-widest uppercase">
              LAYER-X Order
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center border border-[#2a2a2a] rounded-full text-[#887455] hover:text-[#cbb592] hover:border-[#444] transition-all text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {orderConfirmed ? (
            /* Order Confirmed State */
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              {/* Animated check mark ring */}
              <div className="w-20 h-20 rounded-full border-2 border-[#cbb592] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#cbb592]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#cbb592] text-sm tracking-widest uppercase">
                  Order Confirmed
                </p>
                <p className="font-sans text-[#887455] text-xs leading-relaxed">
                  Your LAYER-X glasses are on their way.<br />
                  Expect delivery within 5–7 business days.
                </p>
              </div>
              <button
                onClick={resetOrder}
                className="mt-4 border border-[#2a2a2a] text-[#a28f73] rounded-full px-8 py-3 text-[11px] tracking-widest hover:bg-[#cbb592]/10 hover:border-[#444] transition-all"
              >
                CLOSE
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty cart */
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg className="w-10 h-10 text-[#2a2a2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="font-sans text-[#444] text-xs tracking-widest uppercase">
                Your cart is empty
              </p>
            </div>
          ) : (
            /* Cart items */
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 pb-6 border-b border-[#1a1a1a] last:border-0"
                >
                  {/* Product image */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#1e1e1e] flex-shrink-0 bg-[#111]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[#cbb592] text-[11px] tracking-widest uppercase">
                          {item.name}
                        </p>
                        <p className="font-sans text-[#665640] text-[11px] mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#443322] hover:text-[#cbb592] transition-colors text-xs ml-2"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 border border-[#2a2a2a] rounded-full px-4 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#887455] hover:text-[#cbb592] transition-colors text-sm leading-none"
                        >
                          −
                        </button>
                        <span className="text-[#cbb592] text-xs w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#887455] hover:text-[#cbb592] transition-colors text-sm leading-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-[#cbb592] text-sm">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only when there are items and order not confirmed */}
        {!orderConfirmed && items.length > 0 && (
          <div className="px-8 py-6 border-t border-[#1e1e1e] flex flex-col gap-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-[0.25em] text-[#887455] uppercase">
                Total
              </span>
              <span className="text-[#cbb592] text-lg tracking-wide">
                ${total.toLocaleString()}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeCart}
                className="flex-1 border border-[#2a2a2a] text-[#887455] rounded-full py-3 text-[11px] tracking-widest hover:border-[#444] hover:text-[#cbb592] transition-all"
              >
                BACK
              </button>
              <button
                onClick={confirmOrder}
                className="flex-[2] bg-[#cbb592] text-black rounded-full py-3 text-[11px] tracking-widest hover:bg-[#e8d5a8] transition-all font-bold"
              >
                CONFIRM ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
