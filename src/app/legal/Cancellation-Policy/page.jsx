import React from "react";
import { Clock, MessageCircleQuestion, RefreshCw, Users, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";

const LIME = "#CBFF3D";

const TIMELINE = [
  { when: "2+ hours before your slot", outcome: "Full refund / no charge", tone: "good" },
  { when: "Less than 2 hours before", outcome: "Non-refundable", tone: "bad" },
  { when: "No-show (didn't arrive)", outcome: "Non-refundable, station released after 15 min grace", tone: "bad" },
  { when: "Reschedule instead of cancel", outcome: "Free, subject to availability", tone: "good" },
];

const SPECIAL_CASES = [
  {
    q: "The station had a technical fault when I arrived",
    a: "You get a free reschedule or a full refund, whichever you'd prefer — that one's on us, not you.",
  },
  {
    q: "I couldn't make it due to illness",
    a: "Message us with your booking ID as soon as you can. We handle these case by case and are generally flexible if you reach out before the slot.",
  },
  {
    q: "I was accidentally charged twice / booked twice",
    a: "Contact Support with both booking IDs and we'll sort out the duplicate and refund the extra charge.",
  },
];

function Row({ label, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-lg bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function CancellationPolicyPage() {
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
            <span style={{ color: LIME }}>Cancellation Policy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
            Cancellation <span style={{ color: LIME }}>& Refunds.</span>
          </h1>
          <p className="text-white/50 mt-3 max-w-xl text-sm sm:text-base">
            Plans change. Here's exactly what happens to your booking when they do.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 -mt-8 pb-20 space-y-6">
        {/* Short version callout */}
        <div className="rounded-2xl p-6 sm:p-8 border-2" style={{ backgroundColor: "#141414", borderColor: LIME }}>
          <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: LIME }}>
            The Short Version
          </p>
          <p className="text-white text-lg sm:text-xl font-bold leading-snug">
            Free cancellation up to 2 hours before your slot. After that, it's non-refundable.
          </p>
        </div>

        {/* How to cancel */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-6">How To Cancel</h2>
          <div className="space-y-5">
            <Row label={<MessageCircle size={16} style={{ color: LIME }} />}>
              <p className="text-white font-semibold text-sm">Message us on WhatsApp</p>
              <p className="text-white/50 text-sm mt-0.5">
                Send your booking ID and we'll confirm the cancellation right there.
              </p>
            </Row>
            <Row label={<Clock size={16} style={{ color: LIME }} />}>
              <p className="text-white font-semibold text-sm">Do it at least 2 hours ahead</p>
              <p className="text-white/50 text-sm mt-0.5">
                That's the cutoff for a full refund — cancellations after that aren't refunded.
              </p>
            </Row>
            <Row label={<RefreshCw size={16} style={{ color: LIME }} />}>
              <p className="text-white font-semibold text-sm">Prefer to reschedule instead?</p>
              <p className="text-white/50 text-sm mt-0.5">
                Just ask — moving your slot to another time is free and doesn't count against you, subject to availability.
              </p>
            </Row>
          </div>
        </div>

        {/* Timeline table */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-6">Refund Timeline</h2>
          <div className="space-y-2">
            {TIMELINE.map((t) => (
              <div
                key={t.when}
                className="flex items-center justify-between gap-4 bg-[#161616] border border-white/10 rounded-xl px-5 py-4"
              >
                <span className="text-white font-semibold text-sm">{t.when}</span>
                <span
                  className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    t.tone === "good" ? "text-black" : "text-white/70 border border-white/15"
                  }`}
                  style={t.tone === "good" ? { backgroundColor: LIME } : {}}
                >
                  {t.outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Groups & full day */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
              <Users size={16} style={{ color: LIME }} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                Group & Full-Day Bookings
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Bookings of 3 or more stations, or Full Day sessions, need at least 24 hours' notice for a full
                refund. This gives us time to release the stations back to other players.
              </p>
            </div>
          </div>
        </div>

        {/* Special cases - native accordion, no JS required */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircleQuestion size={20} style={{ color: LIME }} />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">Special Cases</h2>
          </div>
          <div className="space-y-3">
            {SPECIAL_CASES.map((c) => (
              <details key={c.q} className="group border border-white/10 rounded-xl bg-[#161616] overflow-hidden">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 font-bold text-white text-sm">
                  {c.q}
                  <span className="text-white/30 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 -mt-1 text-white/55 text-sm leading-relaxed">{c.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Refund method */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} style={{ color: LIME }} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">How Refunds Are Paid</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Bookings are currently pay-at-venue, so a valid cancellation simply means you owe nothing — there's
                no charge to reverse. If we move to online payments later, refunds will go back to your original
                payment method within 3–5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: LIME }}>
              Need to cancel now?
            </p>
            <h3 className="text-xl font-black uppercase text-white tracking-tight">We're One Message Away</h3>
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