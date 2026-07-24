"use client";

import React, { useState, useMemo } from "react";
import {
  Monitor,
  Gamepad2,
  Car,
  Headphones,
  CalendarDays,
  Clock,
  Users,
  Minus,
  Plus,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Ticket,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const LIME = "#CBFF3D";
// Set this to your real WhatsApp Business number, country code + number, no spaces or +
const OWNER_WHATSAPP = "919074743403";

const SETUPS = [
  { id: "pc", name: "High-End PC", tag: "RTX 4090 · 240Hz", icon: Monitor, multiplier: 1, capacity: 8 },
  { id: "ps5", name: "PlayStation 5", tag: "4K · 120FPS", icon: Gamepad2, multiplier: 0.85, capacity: 4 },
  { id: "xbox", name: "Xbox Series X", tag: "4K · 120FPS", icon: Gamepad2, multiplier: 0.85, capacity: 4 },
  { id: "racing", name: "Racing Simulator", tag: "Full Motion Rig", icon: Car, multiplier: 1.4, capacity: 2 },
  { id: "vr", name: "VR Experience", tag: "Full Immersion", icon: Headphones, multiplier: 1.6, capacity: 2 },
];

const DURATIONS = [
  { id: "1h", label: "1 Hour", hours: 1, price: 99, note: "Quick Play" },
  { id: "2h", label: "2 Hours", hours: 2, price: 179, note: "Most Popular", popular: true },
  { id: "3h", label: "3 Hours", hours: 3, price: 249, note: "Best Value" },
  { id: "5h", label: "5 Hours", hours: 5, price: 399, note: "Pro Gamer" },
  { id: "full", label: "Full Day", hours: 12, price: 599, note: "Unlimited Fun" },
];

const GAMES = ["Valorant", "EA FC 24", "GTA V", "Forza Horizon 5", "Call of Duty: MW3", "Apex Legends", "Other / Any"];

// Venue hours: 10:00 to 24:00 (midnight), hourly start slots
const OPEN_HOUR = 10;
const CLOSE_HOUR = 24;
const TIME_SLOTS = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);

function to24Label(h) {
  const hh = ((h % 24) + 24) % 24;
  const mer = hh < 12 ? "AM" : "PM";
  let display = hh % 12;
  if (display === 0) display = 12;
  const nextDay = h >= 24 ? " (next day)" : "";
  return `${display}:00 ${mer}${nextDay}`;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function Step({ number, title, subtitle, children }) {
  return (
    <div className="border-b border-white/10 pb-8 mb-8 last:border-none">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-sm font-bold" style={{ color: LIME }}>
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-white/50 mb-5">{subtitle}</p>}
      <div className={subtitle ? "" : "mt-5"}>{children}</div>
    </div>
  );
}

export default function BookSlotPage() {
  const [setupType, setSetupType] = useState("pc");
  const [game, setGame] = useState(GAMES[0]);
  const [date, setDate] = useState(todayISO());
  const [startHour, setStartHour] = useState(null);
  const [duration, setDuration] = useState("2h");
  const [systems, setSystems] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [touched, setTouched] = useState(false);

  const selectedSetup = SETUPS.find((s) => s.id === setupType);
  const selectedDuration = DURATIONS.find((d) => d.id === duration);
  const showGamePicker = setupType === "pc" || setupType === "ps5" || setupType === "xbox";
  const endHour = startHour !== null ? startHour + selectedDuration.hours : null;

  const pricing = useMemo(() => {
    const perSystem = Math.round(selectedDuration.price * selectedSetup.multiplier);
    const rawSubtotal = perSystem * systems;
    const discountRate = systems >= 3 ? 0.1 : 0;
    const discount = Math.round(rawSubtotal * discountRate);
    const subtotal = rawSubtotal - discount;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    return { perSystem, rawSubtotal, discount, discountRate, subtotal, gst, total };
  }, [selectedDuration, selectedSetup, systems]);

  const canConfirm = Boolean(date && startHour !== null && name.trim() && phone.trim() && email.trim());

  function handleConfirm() {
    setTouched(true);
    if (!canConfirm) return;

    const id = "UGZ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const sessionLabel = `${to24Label(startHour)} - ${to24Label(endHour)}`;

    const message =
      `New UGZ booking!\n` +
      `ID: ${id}\n` +
      `Setup: ${selectedSetup.name}${showGamePicker ? ` (${game})` : ""}\n` +
      `Date: ${date}\n` +
      `Session: ${sessionLabel}\n` +
      `Stations: ${systems}\n` +
      `Customer: ${name} (${phone})\n` +
      (notes.trim() ? `Notes: ${notes}\n` : "") +
      `Total: ₹${pricing.total}`;

    const waLink = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;

    setBookingId(id);
    setConfirmed(true);
    window.open(waLink, "_blank");
  }

  function handleReset() {
    setConfirmed(false);
    setTouched(false);
    setStartHour(null);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  }

  if (confirmed) {
    return (
      <div className="min-h-screen w-full bg-[#0b0b0b] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="relative bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-8 pt-10 pb-8 text-center">
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: LIME }}
              >
                <CheckCircle2 size={32} className="text-black" strokeWidth={2.5} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Slot Requested</p>
              <h2 className="text-3xl font-black uppercase text-white tracking-tight">You're In.</h2>
              <p className="text-white/50 text-sm mt-2">
                A WhatsApp tab just opened with your booking — hit send there to confirm with us.
              </p>
            </div>

            <div className="relative mx-6">
              <div className="absolute -left-9 top-0 w-6 h-6 rounded-full bg-[#0b0b0b]" />
              <div className="absolute -right-9 top-0 w-6 h-6 rounded-full bg-[#0b0b0b]" />
              <div className="border-t-2 border-dashed border-white/15" />
            </div>

            <div className="px-8 py-7 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wider">Booking ID</span>
                <span className="font-mono font-bold" style={{ color: LIME }}>{bookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wider">Setup</span>
                <span className="text-white font-semibold text-sm">{selectedSetup.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wider">Date</span>
                <span className="text-white font-semibold text-sm">{date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wider">Session</span>
                <span className="text-white font-semibold text-sm">
                  {to24Label(startHour)} – {to24Label(endHour)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-wider">Stations</span>
                <span className="text-white font-semibold text-sm">{systems}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-white/60 text-sm font-bold uppercase">Estimated Total</span>
                <span className="text-2xl font-black" style={{ color: LIME }}>₹{pricing.total}</span>
              </div>
            </div>

            <div className="px-8 pb-8">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/80 hover:text-black hover:bg-white font-bold uppercase text-sm tracking-wide py-3 rounded-lg transition-colors"
              >
                <RotateCcw size={16} /> Book Another Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f3efe4]">
      {/* Header */}
      <div className="bg-[#0b0b0b] px-6 sm:px-10 pt-10 pb-16 relative overflow-hidden">
        <div
          className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: LIME }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40 mb-6 font-semibold">
            <span>Home</span>
            <span>/</span>
            <span style={{ color: LIME }}>Book a Slot</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
            Book Your <span style={{ color: LIME }}>Slot.</span>
          </h1>
          <p className="text-white/50 mt-3 max-w-md text-sm sm:text-base">
            Pick your setup, your time, and your squad size — we'll have the station ready.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 -mt-8 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Form column */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
          <Step number="01" title="Choose Your Setup">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SETUPS.map((s) => {
                const Icon = s.icon;
                const active = setupType === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSetupType(s.id)}
                    className={`text-left rounded-xl border p-4 transition-colors ${
                      active ? "border-transparent" : "border-white/10 hover:border-white/25"
                    }`}
                    style={active ? { backgroundColor: LIME } : { backgroundColor: "#161616" }}
                  >
                    <Icon size={22} className={active ? "text-black" : "text-white/70"} />
                    <p className={`mt-3 font-bold text-sm ${active ? "text-black" : "text-white"}`}>{s.name}</p>
                    <p className={`text-xs mt-0.5 ${active ? "text-black/60" : "text-white/40"}`}>
                      {s.tag} · {s.capacity} stations
                    </p>
                  </button>
                );
              })}
            </div>

            {showGamePicker && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Preferred Game</p>
                <div className="flex flex-wrap gap-2">
                  {GAMES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGame(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        game === g
                          ? "border-transparent text-black"
                          : "border-white/15 text-white/60 hover:border-white/30"
                      }`}
                      style={game === g ? { backgroundColor: LIME } : {}}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Step>

          <Step number="02" title="Select Duration">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DURATIONS.map((d) => {
                const active = duration === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`relative text-left rounded-xl border p-4 transition-colors ${
                      active ? "border-transparent" : "border-white/10 hover:border-white/25"
                    }`}
                    style={active ? { backgroundColor: LIME } : { backgroundColor: "#161616" }}
                  >
                    {d.popular && (
                      <span
                        className={`absolute -top-2 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          active ? "bg-black text-white" : "text-black"
                        }`}
                        style={!active ? { backgroundColor: LIME } : {}}
                      >
                        Popular
                      </span>
                    )}
                    <Clock size={16} className={active ? "text-black" : "text-white/50"} />
                    <p className={`mt-2 font-bold text-sm ${active ? "text-black" : "text-white"}`}>{d.label}</p>
                    <p className={`text-[11px] ${active ? "text-black/60" : "text-white/40"}`}>{d.note}</p>
                    <p className={`mt-2 font-black text-lg ${active ? "text-black" : "text-white"}`}>
                      ₹{Math.round(d.price * selectedSetup.multiplier)}
                    </p>
                  </button>
                );
              })}
            </div>
          </Step>

          <Step number="03" title="Pick Date & Start Time">
            <div className="flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3 mb-5 max-w-xs">
              <CalendarDays size={18} className="text-white/40" />
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-white text-sm w-full outline-none [color-scheme:dark]"
              />
            </div>

            <p className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Start Time</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((h) => {
                const closesEarly = h + selectedDuration.hours > CLOSE_HOUR;
                const active = startHour === h;
                return (
                  <button
                    key={h}
                    disabled={closesEarly}
                    onClick={() => setStartHour(h)}
                    title={closesEarly ? "Session would run past closing" : ""}
                    className={`text-xs font-semibold py-2.5 rounded-lg border transition-colors ${
                      closesEarly
                        ? "border-white/5 text-white/20 cursor-not-allowed line-through"
                        : active
                        ? "border-transparent text-black"
                        : "border-white/10 text-white/70 hover:border-white/30"
                    }`}
                    style={active && !closesEarly ? { backgroundColor: LIME } : {}}
                  >
                    {to24Label(h)}
                  </button>
                );
              })}
            </div>

            {startHour !== null ? (
              <p className="mt-4 text-sm">
                <span className="text-white/40">Session:</span>{" "}
                <span className="font-bold text-white">
                  {to24Label(startHour)} – {to24Label(endHour)}
                </span>
              </p>
            ) : (
              touched && <p className="text-red-400 text-xs mt-4">Pick a start time to continue.</p>
            )}
          </Step>

          <Step number="04" title="Number of Stations" subtitle="Booking for a squad? Add more stations side by side.">
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setSystems((n) => Math.max(1, n - 1))}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-white/30"
              >
                <Minus size={16} />
              </button>
              <div className="flex items-center gap-2 min-w-[90px] justify-center">
                <Users size={18} style={{ color: LIME }} />
                <span className="text-2xl font-black text-white">{systems}</span>
              </div>
              <button
                onClick={() => setSystems((n) => Math.min(selectedSetup.capacity, n + 1))}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-white/30"
              >
                <Plus size={16} />
              </button>
              {systems >= 3 && (
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: LIME }}>
                  <Sparkles size={13} /> 10% group discount applied
                </span>
              )}
              <span className="text-xs text-white/30">Max {selectedSetup.capacity} stations for {selectedSetup.name}</span>
            </div>
          </Step>

          <Step number="05" title="Your Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3">
                <User size={16} className="text-white/40 shrink-0" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3">
                <Phone size={16} className="text-white/40 shrink-0" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 00000 00000"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3 sm:col-span-2">
                <Mail size={16} className="text-white/40 shrink-0" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30"
                />
              </div>
              <div className="flex items-start gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3 sm:col-span-2">
                <MessageSquare size={16} className="text-white/40 shrink-0 mt-0.5" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know? (optional)"
                  rows={2}
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30 resize-none"
                />
              </div>
            </div>
            {touched && !canConfirm && (
              <p className="text-red-400 text-xs mt-3">Fill in your name, phone and email to confirm.</p>
            )}
          </Step>
        </div>

        {/* Summary column */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-5 flex items-center gap-2 border-b border-white/10">
              <Ticket size={18} style={{ color: LIME }} />
              <h3 className="font-black uppercase text-white tracking-tight">Booking Summary</h3>
            </div>

            <div className="px-6 py-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Setup</span>
                <span className="text-white font-semibold text-right">{selectedSetup.name}</span>
              </div>
              {showGamePicker && (
                <div className="flex justify-between">
                  <span className="text-white/40">Game</span>
                  <span className="text-white font-semibold text-right">{game}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/40">Date</span>
                <span className="text-white font-semibold">{date || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Session</span>
                <span className="text-white font-semibold">
                  {startHour !== null ? `${to24Label(startHour)} – ${to24Label(endHour)}` : "Select a time"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Duration</span>
                <span className="text-white font-semibold">{selectedDuration.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Stations</span>
                <span className="text-white font-semibold">{systems}</span>
              </div>
            </div>

            <div className="relative mx-6">
              <div className="absolute -left-9 top-0 w-6 h-6 rounded-full bg-[#0b0b0b]" />
              <div className="absolute -right-9 top-0 w-6 h-6 rounded-full bg-[#0b0b0b]" />
              <div className="border-t-2 border-dashed border-white/15" />
            </div>

            <div className="px-6 py-5 space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>{selectedSetup.name} rate x {systems}</span>
                <span>₹{pricing.rawSubtotal}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between" style={{ color: LIME }}>
                  <span>Group discount ({pricing.discountRate * 100}%)</span>
                  <span>-₹{pricing.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-white/50">
                <span>GST (18%)</span>
                <span>₹{pricing.gst}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2">
                <span className="text-white font-bold uppercase text-xs tracking-wide">Total</span>
                <span className="text-3xl font-black" style={{ color: LIME }}>₹{pricing.total}</span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 font-black uppercase text-sm tracking-wide py-3.5 rounded-xl text-black hover:brightness-95 transition-all"
                style={{ backgroundColor: LIME }}
              >
                Confirm Booking <ArrowRight size={16} />
              </button>
              <p className="text-center text-white/30 text-[11px] mt-3">
                Opens WhatsApp to send your booking to us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}