"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link"

/* ── Plans Data ── */
const plans = [
  { id: 1, duration: "1 HOUR",   label: "Quick Play",    price: 99,  popular: false },
  { id: 2, duration: "2 HOURS",  label: "Most Popular",  price: 179, popular: true  },
  { id: 3, duration: "3 HOURS",  label: "Best Value",    price: 249, popular: false },
  { id: 4, duration: "5 HOURS",  label: "Pro Gamer",     price: 399, popular: false },
  { id: 5, duration: "FULL DAY", label: "Unlimited Fun", price: 599, popular: false },
];

/* ── Trust Badges Data (no JSX in array — use id + render fn) ── */
const badges = [
  { id: 1, title: "Instant Booking",   sub: "Book your slot in seconds"       },
  { id: 2, title: "No Hidden Charges", sub: "What you see is what you pay"     },
  { id: 3, title: "Flexible & Easy",   sub: "Cancel or reschedule anytime"    },
];

/* ── Badge Icons as Components ── */
function BadgeIcon({ id }) {
  if (id === 1) return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  if (id === 2) return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
  if (id === 3) return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

/* ── Clock Icon ── */
function ClockIcon({ size = 40, color = "#c8f400" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="1.8" />
      <path d="M20 11v9l5.5 3.5" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Star Icon ── */
function StarIcon({ color = "#c8f400" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ══════════════════════════════════
   MAIN SECTION
══════════════════════════════════ */
export default function PricingPlans() {
  const [hoveredId, setHoveredId] = useState(null);

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
    updateArrows();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-plan-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      className="w-full py-16 px-6 lg:px-14 relative overflow-hidden"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* ── Background grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,244,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,244,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Corner accent lines ── */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#c8f400]/30" />
        <div className="absolute top-0 left-0 w-[2px] h-20 bg-[#c8f400]/30" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#c8f400]/30" />
        <div className="absolute bottom-0 right-0 w-[2px] h-20 bg-[#c8f400]/30" />
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">

        {/* ── Section Heading ── */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2
              className="text-[clamp(30px,4.5vw,52px)] font-black uppercase leading-none tracking-tight text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PICK YOUR{" "}
              <span style={{ color: "#c8f400" }}>PLAN</span>
            </h2>
            <p
              className="text-white/45 text-[13px] mt-2 font-medium tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Flexible hourly plans for every gamer
            </p>
          </div>

          {/* Arrow controls — only relevant below lg, where cards scroll
              instead of sitting in a fixed 5-column row */}
          <div className="hidden sm:flex lg:hidden items-center gap-2 shrink-0 mb-1">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-[#c8f400] hover:text-[#c8f400] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-[#c8f400] hover:text-[#c8f400] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* ── Pricing Cards ──
            Below lg (< 1024px): horizontal snap-scroll slider — 5 cards
            with real content (clock icon, price, button, popular card
            that scales up) don't fit 2/3-per-row without getting crushed.
            From lg up: back to the original static 5-column grid. */}
        <div className="relative mb-12">
          <div
            ref={trackRef}
            className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none items-end pb-3 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isHovered={hoveredId === plan.id}
                onHover={() => setHoveredId(plan.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>

          {/* Edge fades, slider mode only */}
          <div className="lg:hidden pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
          <div className="lg:hidden pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
        </div>

        {/* ── Trust Badges ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(200,244,0,0.08)", color: "#c8f400" }}
              >
                <BadgeIcon id={badge.id} />
              </div>
              <div>
                <p
                  className="text-white font-bold text-[13px] leading-tight mb-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
                >
                  {badge.title}
                </p>
                <p
                  className="text-white/40 text-[11px] leading-snug"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {badge.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PLAN CARD
══════════════════════════════════ */
function PlanCard({ plan, isHovered, onHover, onLeave }) {
  const isPopular = plan.popular;

  const cardBg = isPopular
    ? "linear-gradient(160deg, #d4ff00 0%, #a8e600 35%, #7ec800 70%, #5aaa00 100%)"
    : isHovered
    ? "linear-gradient(160deg, #1e2a0f 0%, #151f0a 100%)"
    : "linear-gradient(160deg, #1a1a1a 0%, #111111 100%)";

  const cardBorder = isPopular
    ? "none"
    : isHovered
    ? "1.5px solid rgba(200,244,0,0.5)"
    : "1.5px solid rgba(255,255,255,0.07)";

  const cardTransform = isPopular
    ? undefined
    : isHovered
    ? "translateY(-5px)"
    : "translateY(0)";

  const cardShadow = isPopular
    ? "0 20px 60px rgba(160,230,0,0.35), 0 4px 20px rgba(0,0,0,0.5)"
    : isHovered
    ? "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,244,0,0.2)"
    : "0 4px 16px rgba(0,0,0,0.4)";

  const clockColor = isPopular
    ? "#0d0d0d"
    : isHovered
    ? "#c8f400"
    : "rgba(200,244,0,0.7)";

  const durationColor = isPopular ? "#0d0d0d" : "#ffffff";
  const labelColor    = isPopular ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.4)";
  const rupeeColor    = isPopular ? "#0d0d0d" : "#c8f400";
  const priceColor    = isPopular ? "#0d0d0d" : "#ffffff";

  return (
    <div
      data-plan-card
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative flex flex-col items-center text-center rounded-2xl cursor-pointer select-none shrink-0 w-[46vw] sm:w-[200px] lg:w-auto snap-start"
      style={{
        padding: isPopular ? "32px 20px 24px" : "28px 20px 22px",
        background: cardBg,
        border: cardBorder,
        transform: cardTransform,
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.3s ease, border-color 0.3s ease",
        boxShadow: cardShadow,
      }}
    >
      {/* ── POPULAR badge ── */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap"
            style={{
              backgroundColor: "#0d0d0d",
              color: "#c8f400",
              fontFamily: "'Barlow Condensed', sans-serif",
              border: "1px solid rgba(200,244,0,0.4)",
            }}
          >
            POPULAR
          </span>
        </div>
      )}

      {/* ── Star top-right (popular only) ── */}
      {isPopular && (
        <div className="absolute top-3 right-3">
          <StarIcon color="#0d0d0d" />
        </div>
      )}

      {/* ── Clock Icon ── */}
      <div className="mb-4">
        <ClockIcon size={40} color={clockColor} />
      </div>

      {/* ── Duration ── */}
      <h3
        className="font-black uppercase leading-none mb-1"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(18px, 2vw, 22px)",
          color: durationColor,
          letterSpacing: "0.02em",
        }}
      >
        {plan.duration}
      </h3>

      {/* ── Label ── */}
      <p
        className="text-[11px] font-semibold tracking-wide mb-5"
        style={{ fontFamily: "'Barlow', sans-serif", color: labelColor }}
      >
        {plan.label}
      </p>

      {/* ── Price ── */}
      <div className="mb-6 flex items-start justify-center">
        <span
          className="text-[18px] font-bold mt-1 leading-none"
          style={{ color: rupeeColor, fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ₹
        </span>
        <span
          className="font-black leading-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(36px, 4vw, 46px)",
            color: priceColor,
          }}
        >
          {plan.price}
        </span>
      </div>

      {/* ── Book Now Button ── */}
      <Link href="/BookSlot">
      <BookButton isPopular={isPopular} />
      </Link>
    </div>
  );
}

/* ── Separated button to avoid inline handler issues ── */
function BookButton({ isPopular }) {
  const [hovered, setHovered] = useState(false);

  const bg     = isPopular ? "#0d0d0d"                   : "transparent";
  const color  = isPopular ? "#c8f400"                   : hovered ? "#c8f400" : "#ffffff";
  const border = isPopular ? "none"                      : hovered ? "1.5px solid #c8f400" : "1.5px solid rgba(255,255,255,0.25)";
  const bgH    = isPopular && hovered ? "#1a1a1a" : bg;

  return (
    <button
      className="w-full rounded-lg font-bold text-[13px] uppercase tracking-widest py-3 transition-all duration-200"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        background: bgH,
        color,
        border,
        letterSpacing: "0.12em",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      BOOK NOW
    </button>
  );
}