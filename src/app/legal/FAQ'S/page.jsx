"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

const LIME = "#CBFF3D";

const CATEGORIES = ["All", "Booking & Slots", "Plans & Pricing", "Setups", "Policies", "Groups & Events"];

const FAQS = [
  {
    category: "Booking & Slots",
    q: "How do I book a slot?",
    a: "Head to the Book a Slot page, pick your setup, duration, date and start time, then confirm. You'll get a WhatsApp message from us locking in the details.",
  },
  {
    category: "Booking & Slots",
    q: "Can I just walk in without booking?",
    a: "You can, and we'll seat you if a station's free — but booking ahead is the only way to guarantee your setup and time, especially on weekends.",
  },
  {
    category: "Booking & Slots",
    q: "How early should I show up?",
    a: "10 minutes before your session start. That gives us time to get your station ready and log you in.",
  },
  {
    category: "Booking & Slots",
    q: "Can I change my slot after booking?",
    a: "Yes — message us on WhatsApp with your booking ID at least 2 hours before your session and we'll move it, subject to availability.",
  },
  {
    category: "Plans & Pricing",
    q: "What's included in the hourly rate?",
    a: "The station, peripherals (keyboard, mouse, headset or controller), and the game library. Food and drinks are billed separately at the cafe counter.",
  },
  {
    category: "Plans & Pricing",
    q: "Is GST included in the price shown?",
    a: "The prices you see on the booking page are the base rate. 18% GST is added at checkout, and you'll see the full breakdown before you confirm.",
  },
  {
    category: "Plans & Pricing",
    q: "Do you offer group discounts?",
    a: "Yes — book 3 or more stations together for the same session and a 10% group discount is applied automatically.",
  },
  {
    category: "Plans & Pricing",
    q: "Do you have membership plans?",
    a: "Not yet — everything currently runs pay-per-session. If we launch memberships, it'll be announced on our Instagram first.",
  },
  {
    category: "Setups",
    q: "What PC specs do you run?",
    a: "RTX 4090 rigs with 240Hz displays on the High-End PC stations. PS5 and Xbox Series X stations run 4K at up to 120FPS.",
  },
  {
    category: "Setups",
    q: "Can I bring my own peripherals?",
    a: "Sure — bring your own mouse, keyboard, or headset if you've got a setup you're used to. Just flag it with staff when you arrive.",
  },
  {
    category: "Setups",
    q: "Are the VR and Racing Simulator beginner-friendly?",
    a: "Yes. Staff will walk you through the controls and safety setup before your session starts — no experience needed.",
  },
  {
    category: "Policies",
    q: "What's your cancellation policy?",
    a: "Free cancellation up to 2 hours before your slot. See the full Cancellation Policy page for the details on refunds and no-shows.",
  },
  {
    category: "Policies",
    q: "Is there an age limit?",
    a: "We recommend 13+ for unsupervised visits. Younger players are welcome with a parent or guardian present.",
  },
  {
    category: "Policies",
    q: "Can I bring outside food and drinks?",
    a: "Only from our in-house cafe near the hardware — outside food isn't allowed on the gaming floor to keep the setups spill-free.",
  },
  {
    category: "Groups & Events",
    q: "Can I book the whole place for a birthday or LAN party?",
    a: "Yes — message us through Support with your headcount and preferred date and we'll put together a custom group plan.",
  },
  {
    category: "Groups & Events",
    q: "Do you run tournaments?",
    a: "We run periodic Valorant and FC24 tournaments with entry slots and prizes — keep an eye on our Instagram for the next one.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#141414]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
      >
        <span className="font-bold text-white text-sm sm:text-base">{item.q}</span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-200"
          style={{ color: LIME, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 -mt-1">
          <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesQuery =
        !query.trim() ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen w-full bg-[#f3efe4]">
      {/* Header */}
      <div className="bg-[#0b0b0b] px-6 sm:px-10 pt-10 pb-16 relative overflow-hidden">
        <div
          className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: LIME }}
        />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40 mb-6 font-semibold">
            <span>Home</span>
            <span>/</span>
            <span style={{ color: LIME }}>FAQs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
            Got Questions? <br />
            We've Got <span style={{ color: LIME }}>Answers.</span>
          </h1>

          <div className="mt-8 flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3 max-w-lg">
            <Search size={18} className="text-white/40 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a question..."
              className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 -mt-8 pb-20">
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors ${
                    active ? "border-transparent text-black" : "border-white/15 text-white/60 hover:border-white/30"
                  }`}
                  style={active ? { backgroundColor: LIME } : {}}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm">No questions match "{query}" yet.</p>
              <p className="text-white/30 text-xs mt-1">Try a different search, or ask us directly below.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 bg-[#141414] border border-white/10 rounded-2xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: LIME }}>
              Still stuck?
            </p>
            <h3 className="text-xl font-black uppercase text-white tracking-tight">Talk To Our Team</h3>
            <p className="text-white/50 text-sm mt-1">We usually reply within 30 minutes during operating hours.</p>
          </div>
          <a
            href="/Support"
            className="flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-wide px-6 py-3 rounded-xl text-black whitespace-nowrap hover:brightness-95 transition-all"
            style={{ backgroundColor: LIME }}
          >
            <MessageCircle size={16} /> Contact Support <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}