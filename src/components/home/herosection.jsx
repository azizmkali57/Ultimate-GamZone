'use client';

import Link from 'next/link';
import React from 'react';

/* ── SVG Icons ── */

const GamepadIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M11 4H6a4 4 0 00-4 4v4a4 4 0 004 4h12a4 4 0 004-4V8a4 4 0 00-4-4h-5m-3 4h2m-1-1v2M16 10h.01" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M8 21h8m-4-4v4M5 3H3v5a4 4 0 004 4h.5M19 3h2v5a4 4 0 01-4 4h-.5M7 3h10M9 11a5 5 0 006 0" />
  </svg>
);

const MonitorIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8f400]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ExploreIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M11 4H6a4 4 0 00-4 4v4a4 4 0 004 4h12a4 4 0 004-4V8a4 4 0 00-4-4h-5m-6 4h2m-1-1v2M17 11h.01M14 11h.01" />
  </svg>
);

const ChevronDown = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ── Stats data ── */
const stats = [
  { icon: <GamepadIcon />, value: '10K+', label: 'Happy Gamers' },
  { icon: <TrophyIcon />,  value: '100+', label: 'Games' },
  { icon: <MonitorIcon />, value: '20+',  label: 'High End Setups' },
  { icon: <StarIcon />,    value: '4.9',  label: 'User Rating' },
];

/* ══════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════ */
const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#080808]">

      {/* ── Background Image ──
          Three separate images swap in at each breakpoint (not just
          repositioned) so each one can be cropped/composed for its screen
          — e.g. a tighter, more vertical shot for phones instead of a wide
          desktop image getting squeezed. Drop matching files in
          /public/images/. If you only have one image for now, point all
          three urls at the same file — layout still works either way. */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-[position:78%_center] block sm:hidden"
        style={{ backgroundImage: "url('/images/mobile-bg.png')" }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-[position:68%_center] hidden sm:block lg:hidden"
        style={{ backgroundImage: "url('/images/tablet-bg.png')" }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-center hidden lg:block"
        style={{ backgroundImage: "url('/images/hero_image.png')" }}
      />

      {/* ── Dark overlay — stronger on left, fades to right on desktop.
          On mobile/tablet the gradient runs top-to-bottom instead, since
          text stacks above the image rather than sitting beside it.
          These are mutually exclusive (lg:hidden / hidden lg:block) so
          they never stack and double-darken the image like before. ── */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.8) 45%, rgba(5,5,5,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 40%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.1) 100%)',
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)' }}
      />

      {/* ── Yellow neon accent line (top) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #c8f400 30%, #c8f400 70%, transparent 100%)' }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 min-h-[100svh] flex flex-col justify-center">

        {/* Top spacer for fixed header — shrinks on mobile where the header is shorter */}
        <div className="pt-24 sm:pt-28 lg:pt-32" />

        <div className="flex flex-col w-full max-w-[600px]">

          {/* ── Main Headline ──
              One shared class + a single color override per line, instead
              of mixing custom classes and inline utilities inconsistently */}
          <div className="mb-4 sm:mb-5">
            <h1 className="headline-white text-[clamp(38px,11vw,110px)] uppercase text-white leading-[0.95] tracking-tight">
              PLAY
            </h1>
            <h1 className="headline-white text-[#c8f400] text-[clamp(38px,11vw,110px)] uppercase leading-[0.95] tracking-tight">
              MORE.
            </h1>
            <h1 className="headline-yellow text-[clamp(38px,11vw,110px)] uppercase leading-[0.95] tracking-tight neon-text">
              PAY LESS.
            </h1>
          </div>

          {/* Sub-copy */}
          <p
            className="text-white/65 text-[15px] sm:text-[15px] leading-relaxed mb-7 sm:mb-8 max-w-[320px] sm:max-w-[340px]"
            style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}
          >
            Your ultimate gaming destination. Choose your game, pick your hours and play your way!
          </p>

          {/* ── CTA Buttons ──
              full-width & stacked on phones so tap targets stay easy to
              hit; side-by-side from sm and up */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link href="/BookSlot">
            <button className="btn-primary flex items-center justify-center gap-3 bg-[#c8f400] text-black font-semibold px-6 sm:px-7 py-3.5 text-[13px] sm:text-[14px] tracking-wider w-full sm:w-auto">
              BOOK YOUR SLOT
              <ArrowRight />
            </button>
            </Link>
            <Link href="#ChooseGame">
            <button className="btn-secondary flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 text-[13px] sm:text-[14px] tracking-wider w-full sm:w-auto">
              EXPLORE GAMES
              <ExploreIcon />
            </button>
            </Link>
          </div>

          {/* ── Stats Row ──
              2-column grid on phones so labels never truncate or overlap,
              flows into a single row from sm up */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-5 gap-x-4 sm:gap-0">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`stat-item flex items-center gap-2.5 sm:px-5 sm:py-2 ${idx === 0 ? 'sm:pl-0' : ''}`}
              >
                <span className="text-white/50 shrink-0">{stat.icon}</span>
                <div>
                  <p
                    className="text-white font-bold text-[15px] sm:text-[16px] leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-[10px] sm:text-[11px] leading-tight tracking-wide whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll Down indicator — hidden on short/mobile viewports
            where it would otherwise collide with the stats row ── */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30">
          <div className="flex items-center gap-2 text-white/60 text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm bg-black/20 hover:border-[#c8f400]/50 hover:text-white/80 cursor-pointer transition-all group">
            <span>SCROLL DOWN</span>
            <span className="bounce-slow group-hover:text-[#c8f400] transition-colors">
              <ChevronDown />
            </span>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="pb-20 sm:pb-28 lg:pb-32" />
      </div>

      {/* ── Yellow right-edge neon line ── */}
      <div
        className="absolute top-[15%] bottom-[15%] right-0 w-[2px] hidden xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #c8f400 40%, #c8f400 60%, transparent)' }}
      />
    </section>
  );
};

export default Hero;