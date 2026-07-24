"use client";

import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rohan Mehta",
    tag: "@rohanplays",
    level: 42,
    rating: 5,
    quote:
      "Best gaming setups in the city, hands down. Booked a slot for Valorant with my squad and the rigs ran buttery smooth all night.",
    reactions: [
      { emoji: "🔥", count: 24 },
      { emoji: "🎮", count: 12 },
    ],
  },
  {
    name: "Ananya Sharma",
    tag: "@ananya.gg",
    level: 37,
    rating: 5,
    quote:
      "Pricing is honestly unbeatable for what you get. I've stopped gaming at home on weekends, this is just better.",
    reactions: [
      { emoji: "💯", count: 18 },
      { emoji: "🔥", count: 9 },
    ],
  },
  {
    name: "Kabir Singh",
    tag: "@kabir_ks",
    level: 55,
    rating: 4,
    quote:
      "Console library is huge and it never feels crowded even on busy Saturdays. Staff actually knows the games. Big plus.",
    reactions: [
      { emoji: "🎮", count: 15 },
      { emoji: "👍", count: 6 },
    ],
  },
  {
    name: "Priya Nair",
    tag: "@priyaplays",
    level: 12,
    rating: 5,
    quote:
      "Walked in not knowing what to expect and left booking a monthly plan. It just feels like a proper gaming zone.",
    reactions: [
      { emoji: "😍", count: 21 },
      { emoji: "🔥", count: 14 },
    ],
  },
  {
    name: "Aditya Rao",
    tag: "@rao.exe",
    level: 61,
    rating: 5,
    quote:
      "We use UGZ for scrim practice before local tournaments. Monitors are high refresh, booking hours in advance is dead simple.",
    reactions: [
      { emoji: "⚡", count: 27 },
      { emoji: "🎮", count: 10 },
    ],
  },
  {
    name: "Simran Kaur",
    tag: "@simrankaur",
    level: 29,
    rating: 4,
    quote:
      "Brought our whole club here for a LAN night and it was smooth from booking to checkout. Definitely back for the next tournament.",
    reactions: [
      { emoji: "🙌", count: 11 },
      { emoji: "💯", count: 8 },
    ],
  },
];

const initials = (name) => name.split(" ").map((n) => n[0]).join("");

/* One Discord-style message bubble */
const TestimonialBubble = ({ t }) => (
  <div className="relative shrink-0 w-[300px] sm:w-[340px] bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 mx-2.5 hover:border-[#c8f400]/50 transition-colors duration-300">
    {/* Header: avatar + status dot, name, handle, level badge */}
    <div className="flex items-center gap-3 mb-3">
      <div className="relative shrink-0">
        <span className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] border border-[#c8f400]/30 rounded-full text-[#c8f400] font-bold text-sm">
          {initials(t.name)}
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#c8f400] rounded-full border-2 border-[#0d0d0d]" />
      </div>
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm leading-tight truncate">{t.name}</p>
        <p className="text-gray-500 text-xs leading-tight truncate">{t.tag}</p>
      </div>
      <span
        className="ml-auto shrink-0 text-[10px] font-bold tracking-wide text-[#c8f400] border border-[#c8f400]/30 rounded-full px-2 py-1"
        style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
      >
        LVL {t.level}
      </span>
    </div>

    {/* Stars */}
    <div className="flex items-center gap-1 mb-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={`text-[11px] ${i < t.rating ? "text-[#c8f400]" : "text-gray-700"}`} />
      ))}
    </div>

    {/* Message bubble body */}
    <p className="text-gray-300 text-[13.5px] leading-relaxed mb-4">{t.quote}</p>

    {/* Reaction chips, Discord-style */}
    <div className="flex items-center gap-2">
      {t.reactions.map((r, i) => (
        <span
          key={i}
          className="flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-full px-2 py-1 text-xs text-gray-300"
        >
          <span>{r.emoji}</span>
          <span className="text-gray-500">{r.count}</span>
        </span>
      ))}
    </div>
  </div>
);

/* One infinite-scrolling row. Content is duplicated so the loop is seamless;
   translating exactly -50% lines the duplicate up perfectly with the original. */
const MarqueeRow = ({ items, direction = "left", speed = 40 }) => (
  <div className="marquee-viewport overflow-hidden">
    <div
      className="marquee-track flex w-max"
      style={{
        animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
      }}
    >
      {[...items, ...items].map((t, i) => (
        <TestimonialBubble key={i} t={t} />
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f0e8] py-16 sm:py-20 lg:py-28">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        {/* ── Section heading — Discord-channel-style eyebrow instead of
            a generic "testimonials" label, ties into the gaming-community
            audience without leaning on a cliché icon-and-label pattern ── */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <p
            className="text-[12px] sm:text-[13px] font-semibold text-black/45 mb-3 sm:mb-4"
            style={{ fontFamily: "'Barlow Condensed', monospace" }}
          >
            <span className="text-[#8fae00] font-bold">#</span> wall-of-love
          </p>
          <h2 className="text-[clamp(32px,6vw,56px)] uppercase text-black leading-[0.95] tracking-tight mb-2">
            REAL PLAYERS.
          </h2>
          <h2 className="text-[clamp(32px,6vw,56px)] uppercase leading-[0.95] tracking-tight text-[#8fae00]">
            REAL LOVE.
          </h2>
          <p
            className="text-black/55 text-[14px] sm:text-[15px] leading-relaxed mt-4 max-w-md"
            style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}
          >
            Don&apos;t take our word for it — here&apos;s what the UGZ community is saying right now.
          </p>
        </div>
      </div>

      {/* ── Two marquee rows, scrolling opposite directions ──
          Full-bleed (outside the max-w container) so cards drift off both
          edges of the viewport rather than stopping at a hard margin. */}
      <div className="space-y-5 sm:space-y-6">
        <MarqueeRow items={testimonials} direction="left" speed={42} />
        <MarqueeRow items={[...testimonials].reverse()} direction="right" speed={50} />
      </div>

      {/* Edge fades so cards feel like they scroll from underneath the
          section padding rather than getting clipped abruptly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f5f0e8] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f5f0e8] to-transparent z-10" />

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-viewport:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;