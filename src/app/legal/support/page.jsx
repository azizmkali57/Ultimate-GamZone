"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const LIME = "#CBFF3D";
const WHATSAPP_GREEN = "#25D366";
// Set this to your real WhatsApp Business number, country code + number, no spaces or +
const OWNER_WHATSAPP = "917000577651";

const CHANNELS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Us",
    value: "Fastest response",
    href: `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent("Hi UGZ team, I need help with...")}`,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@ultimategamezone.com",
    href: "mailto:info@ultimategamezone.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Gaming Street, Your City, India",
    href: "#",
  },
];

const QUICK_LINKS = [
  { label: "How do I book a slot?", href: "/FAQs" },
  { label: "What's your cancellation policy?", href: "/CancellationPolicy" },
  { label: "Do you offer group discounts?", href: "/FAQs" },
  { label: "Can I bring my own peripherals?", href: "/FAQs" },
];

export default function SupportPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSend = Boolean(name.trim() && contact.trim() && message.trim());

  function handleSend() {
    if (!canSend) return;
    const text =
      `Support request from UGZ website\n` +
      `Name: ${name}\n` +
      `Contact: ${contact}\n` +
      `Message: ${message}`;
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  function handleNew() {
    setSent(false);
    setName("");
    setContact("");
    setMessage("");
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
            <span style={{ color: LIME }}>Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
            Need A Hand? <br />
            We're <span style={{ color: LIME }}>Here.</span>
          </h1>
          <p className="text-white/50 mt-3 max-w-xl text-sm sm:text-base">
            Booking trouble, setup questions, or just want to talk plans — pick whatever's easiest.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 -mt-8 pb-20 space-y-6">
        {/* Channel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-5 hover:border-white/25 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: LIME }}
                >
                  <Icon size={18} className="text-black" />
                </div>
                <p className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">{c.label}</p>
                <p className="text-white font-semibold text-sm leading-snug">{c.value}</p>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Message form */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1">
              Send Us A Message
            </h2>
            <p className="text-white/50 text-sm mb-6">
              This opens WhatsApp with your message ready — just tap send.
            </p>

            {sent ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: LIME }}
                >
                  <CheckCircle2 size={24} className="text-black" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-black uppercase text-lg">On its way.</p>
                  <p className="text-white/50 text-sm mt-1">
                    A WhatsApp tab opened with your message — hit send there to reach us. We usually reply within 30
                    minutes during operating hours.
                  </p>
                </div>
                <button
                  onClick={handleNew}
                  className="text-sm font-bold uppercase tracking-wide border border-white/15 text-white/80 hover:text-black hover:bg-white px-5 py-2.5 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="space-y-4">
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Phone or email"
                      className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-[#161616] border border-white/10 rounded-xl px-4 py-3">
                  <MessageSquare size={16} className="text-white/40 shrink-0 mt-0.5" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's going on? Booking ID helps if it's about a slot."
                    rows={4}
                    className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/30 resize-none"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!canSend}
                  className="w-full flex items-center justify-center gap-2 font-black uppercase text-sm tracking-wide py-3.5 rounded-xl text-black hover:brightness-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: LIME }}
                >
                  Send via WhatsApp <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Side info */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} style={{ color: LIME }} />
                <h3 className="font-black uppercase text-white tracking-tight">Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Mon – Fri</span>
                  <span className="text-white font-semibold">10 AM – 12 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Sat – Sun</span>
                  <span className="text-white font-semibold">9 AM – 1 AM</span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={18} style={{ color: LIME }} />
                <h3 className="font-black uppercase text-white tracking-tight">Quick Answers</h3>
              </div>
              <div className="space-y-1">
                {QUICK_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="flex items-center justify-between gap-2 text-sm text-white/60 hover:text-white py-2 border-b border-white/5 last:border-none"
                  >
                    {l.label}
                    <ArrowRight size={14} className="shrink-0" style={{ color: LIME }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}