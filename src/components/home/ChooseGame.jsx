"use client"; // <-- Must be at the very top of the file!

import { useRef, useState } from "react";
import Link from "next/link"
const games = [
  {
    id: 1,
    title: "WWE 2K26",
    image: "/images/wwe2k26.png",
    genre: "Sports Wrestling",
    tag: "HOT",
    tagColor: "bg-red-500",
  },
  {
    id: 2,
    title: "CRICKET 26",
    image: "/images/cricket26.png",
    genre: "Sports",
    tag: "NEW",
    tagColor: "bg-[#c8f400] text-black",
  },
  {
    id: 3,
    title: "EA SPORTS FC 24",
    image: "/images/fifa.png",
    genre: "Football",
    tag: "POPULAR",
    tagColor: "bg-yellow-500 text-black",
  },
  {
    id: 4,
    title: "GTA V",
    image: "/images/gta5.png",
    genre: "Open World",
    tag: "TRENDING",
    tagColor: "bg-blue-500",
  },
  {
    id: 5,
    title: "RED DEAD REDEMPTION 2",
    image: "/images/rdr2.png",
    genre: "Open World",
    tag: "HOT",
    tagColor: "bg-red-500",
  },
  {
    id: 6,
    title: "BLACK MYTH: WUKONG",
    image: "/images/black_myth_wukong.png",
    genre: "Action RPG",
    tag: "NEW",
    tagColor: "bg-orange-500",
  },
  {
    id: 7,
    title: "NEED FOR SPEED",
    image: "/images/need_for_speed.png",
    genre: "Racing",
    tag: "FAST",
    tagColor: "bg-cyan-500",
  },
  {
    id: 8,
    title: "TEKKEN 8",
    image: "/images/tekken8.png",
    genre: "Fighting",
    tag: "FIGHT",
    tagColor: "bg-purple-500",
  },
  {
    id: 9,
    title: "MORTAL KOMBAT 1",
    image: "/images/mortal_kombat1.png",
    genre: "Fighting",
    tag: "BRUTAL",
    tagColor: "bg-emerald-500",
  },
];

const ArrowRight = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7 16l-4-4m0 0l4-4m-4 4h18"
    />
  </svg>
);

export default function ChooseGame() {
  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollBy = (direction) => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="w-full py-16 px-6 lg:px-14"
      style={{ backgroundColor: "#f0ece0" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ── Section Header ── */}
        <div className="flex items-start justify-between mb-8">
          {/* Left: Title + subtitle */}
          <div>
            <h2
              className="text-[clamp(28px,4vw,46px)] font-black uppercase leading-none tracking-tight text-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CHOOSE YOUR{" "}
              <span style={{ color: "#c8f400", WebkitTextStroke: "1.5px #000" }}>
                GAME
              </span>
            </h2>
            <p
              className="text-[13px] text-black/50 mt-1.5 font-medium tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Pick from 100+ top titles across all platforms
            </p>
          </div>

          {/* Right: VIEW ALL + arrow button */}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => scrollBy("right")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
              style={{ backgroundColor: "#c8f400", border: "2px solid #000" }}
              aria-label="Scroll right"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* ── Scrollable Game Cards ── */}
        <div className="relative">
          {/* Left fade + nav arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 flex items-center justify-start pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, #f0ece0 30%, transparent 100%)",
                }}
              />
              <button
                onClick={() => scrollBy("left")}
                className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center z-20 shadow-md ml-1 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "#c8f400", border: "2px solid #000" }}
                aria-label="Scroll left"
              >
                <ArrowLeft />
              </button>
            </div>
          )}

          {/* Right fade */}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, #f0ece0 30%, transparent 100%)",
              }}
            />
          )}

          {/* Cards scroll container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isHovered={hoveredId === game.id}
                onHover={() => setHoveredId(game.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────
   Game Card Component
───────────────────────────────── */
function GameCard({ game, isHovered, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative flex-shrink-0 cursor-pointer group"
      style={{
        width: "200px",
        height: "290px",
        borderRadius: "16px",
        overflow: "hidden",
        transform: isHovered ? "scale(1.04) translateY(-6px)" : "scale(1) translateY(0px)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
        boxShadow: isHovered
          ? "0 20px 50px rgba(0,0,0,0.45), 0 0 0 2px #c8f400"
          : "0 6px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* ── Cover Image ── */}
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-full object-cover"
        style={{
          transform: isHovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* ── Always-on gradient overlay (bottom) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%)",
        }}
      />

      {/* ── Top-left tag ── */}
      <div className="absolute top-3 left-3">
        <span
          className={`${game.tagColor} text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {game.tag}
        </span>
      </div>

      {/* ── Bottom Content ── */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white/60 text-[10px] font-semibold tracking-widest uppercase mb-0.5"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {game.genre}
        </p>
        <h3
          className="text-white font-black text-[15px] uppercase leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {game.title}
        </h3>

        {/* Play now — slides up on hover */}
        <div
          style={{
            maxHeight: isHovered ? "40px" : "0px",
            opacity: isHovered ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}
        >
          <button
            className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors"
            style={{ color: "#c8f400", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            PLAY NOW
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Neon border glow on hover ── */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: isHovered ? "2px solid #c8f400" : "2px solid transparent",
          transition: "border-color 0.3s ease",
          borderRadius: "16px",
        }}
      />
    </div>
  );
}