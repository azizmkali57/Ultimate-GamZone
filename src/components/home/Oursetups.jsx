"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const setups = [
  {
    id: 1,
    image: "/images/ps5.png",
    title: "PLAYSTATION 5",
    specs: ["4K Gaming", "120 FPS", "DualSense"],
    fit:"fill",
  },
  {
    id: 2,
    image: "/images/ps2.png",
    title: "PLAYSTATION 2",
    specs: ["Classic Games", "Retro Console", "Multiplayer"],
  },
  {
    id: 3,
    image: "/images/Snooker.png",
    title: "SNOOKER",
    specs: ["Professional Table", "Premium Cues", "Tournament Setup"],
  },
  {
    id: 4,
    image: "/images/Carrom.png",
    title: "CARROM",
    specs: ["Professional Board", "Premium Coins", "Smooth Finish"],
  },
];

/* One card, shared by both the grid and slider layouts */
const SetupCard = ({ setup, className = "", ...rest }) => (
  <div
    {...rest}
    className={`group relative flex flex-col bg-gradient-to-b from-[#242424] to-[#161616] rounded-xl overflow-hidden border border-white/10 hover:border-[#c8f400] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(200,244,0,0.25)] cursor-pointer ${className}`}
  >
    {/* Top accent line — always faintly visible, brightens on hover */}
    <div className="h-[2px] w-full bg-[#c8f400]/25 group-hover:bg-[#c8f400] transition-colors duration-300" />

    {/* Full-bleed image */}
    <div className="relative w-full aspect-[4/3] overflow-hidden">
      <Image
        src={setup.image}
        alt={setup.title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#161616] to-transparent" />
      <div className="absolute inset-0 bg-[#c8f400]/0 group-hover:bg-[#c8f400]/10 transition-colors duration-300" />
    </div>

    {/* Text content */}
    <div className="flex flex-col items-center gap-2.5 px-3 sm:px-4 py-4 border-t border-white/10 text-center">
      <h3 className="text-white font-bold text-[12px] sm:text-[13px] uppercase tracking-wider">
        {setup.title}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {setup.specs.map((spec, index) => (
          <span
            key={index}
            className="text-[10px] sm:text-[10.5px] font-medium text-[#c8f400] bg-[#c8f400]/10 border border-[#c8f400]/25 rounded-full px-2 py-0.5 whitespace-nowrap"
          >
            {spec}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const OurSetups = () => {
  const isSlider = setups.length > 5;

  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    if (!isSlider) return;
    updateArrows();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlider]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-[#f5f0e8] py-16 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-20">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto mb-10 sm:mb-14 flex items-end justify-between gap-4">
        <div>
          <p
            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black/45 mb-3"
            style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}
          >
            THE GEAR
          </p>
          <h2 className="text-[clamp(30px,5.5vw,52px)] font-extrabold uppercase text-black leading-[0.95] tracking-tight">
            OUR <span className="text-[#8fae00]">SETUPS.</span>
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-md">
            Premium equipment for an unbeatable experience.
          </p>
        </div>

        {/* Arrow controls — only shown when the slider is active, hidden
            on touch-sized phones where swiping is the natural gesture */}
        {isSlider && (
          <div className="hidden sm:flex items-center gap-2 shrink-0 mb-1">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-black/15 text-black/70 hover:border-[#8fae00] hover:text-[#8fae00] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-black/15 text-black/70 hover:border-[#8fae00] hover:text-[#8fae00] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>

      {isSlider ? (
        /* ── Slider layout — kicks in automatically once there are more
            than 5 setups, so this scales as you add gear without needing
            a layout change later ── */
        <div className="relative max-w-7xl mx-auto">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {setups.map((setup) => (
              <SetupCard
                key={setup.id}
                setup={setup}
                data-card
                className="snap-start shrink-0 w-[46vw] sm:w-[240px] lg:w-[250px]"
              />
            ))}
          </div>

          {/* Edge fades so cards feel like they scroll from under the
              section padding rather than getting clipped abruptly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#f5f0e8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#f5f0e8] to-transparent" />
        </div>
      ) : (
        /* ── Grid layout — used whenever there are 5 or fewer setups ── */
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4">
          {setups.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      )}
    </section>
  );
};

export default OurSetups;