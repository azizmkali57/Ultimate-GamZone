"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

/* Reuses the same arrow icon treatment as the Hero CTA */
const ArrowRight = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const contactInfo = [
  {
    Icon: FaPhoneAlt,
    label: "Call Us",
    value: "+91 98765 43210",
  },
  {
    Icon: FaEnvelope,
    label: "Email Us",
    value: "info@ultimategamezone.com",
  },
  {
    Icon: FaMapMarkerAlt,
    label: "Visit Us",
    value: "123 Gaming Street, Your City, India",
  },
  {
    Icon: FaClock,
    label: "Hours",
    value: "Mon - Fri: 10AM - 12AM  ·  Sat - Sun: 9AM - 1AM",
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Wire this up to your API route / email service of choice.
    // e.g. await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 800);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#080808] py-16 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20">

      {/* Top neon accent line — matches Hero */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, #c8f400 30%, #c8f400 70%, transparent 100%)" }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "#c8f400" }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section heading ── */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <p
            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/60 mb-3 sm:mb-4"
            style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}
          >
            GET IN <span className="text-[#c8f400] font-bold">TOUCH</span>
          </p>
          <h2 className="text-[clamp(32px,6vw,56px)] uppercase text-white leading-[0.95] tracking-tight mb-2">
            LET&apos;S TALK
          </h2>
          <h2 className="text-[clamp(32px,6vw,56px)] uppercase leading-[0.95] tracking-tight text-[#c8f400]">
            GAME PLANS.
          </h2>
          <p
            className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-4 max-w-md"
            style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}
          >
            Got a question about slots, plans, or setups? Send us a message and the team will get back to you.
          </p>
        </div>

        {/* ── Content grid: info cards + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Contact info */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {contactInfo.map(({ Icon, label, value }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#0f0f0f] border border-gray-800 rounded-xl p-5 hover:border-[#c8f400]/40 transition-colors duration-300"
              >
                <span className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 rounded-md text-[#c8f400]">
                  <Icon className="text-sm" />
                </span>
                <div>
                  <p className="text-white font-semibold text-sm uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed break-words">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-xs uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8f400] focus:ring-1 focus:ring-[#c8f400] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white/70 text-xs uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8f400] focus:ring-1 focus:ring-[#c8f400] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white/70 text-xs uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8f400] focus:ring-1 focus:ring-[#c8f400] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/70 text-xs uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need..."
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8f400] focus:ring-1 focus:ring-[#c8f400] transition-colors resize-none"
                />
              </div>

              <button
  type="button"
  onClick={() => window.open("https://wa.me/919074743403", "_blank")}
  className="btn-primary flex items-center justify-center gap-3 bg-[#c8f400] px-7 py-3.5 text-[13px] sm:text-[14px] tracking-wider w-full sm:w-auto"
>
  SEND MESSAGE
  <ArrowRight />
</button>

              {status === "sent" && (
                <p className="text-[#c8f400] text-sm pt-1">Thanks — we&apos;ll get back to you shortly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;