'use client';

import React, { useState } from 'react';
import Link from "next/link"
const navLinks = ['HOME', 'GAMES', 'CONSOLES', 'PLANS', 'ABOUT', 'CONTACT'];

const UGZLogoIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
  >
  </svg>
);

const Header = () => {
  const [active, setActive] = useState('HOME');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-[90px] h-[90px] flex-shrink-0 relative">
  <img
    src="/images/logos.png"
    alt="UGZ Logo"
    className="w-full h-full object-contain"
  />
</div>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`text-[13px] font-semibold tracking-widest transition-colors duration-200 pb-1 ${
                active === link
                  ? 'text-[#c8f400]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/BookSlot">
          <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold tracking-wider bg-[#c8f400] text-black rounded-md hover:opacity-90 transition">
            BOOK A SLOT

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
          </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-[#c8f400]/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              className={`text-left text-[14px] font-semibold tracking-widest transition-colors ${
                active === link
                  ? 'text-[#c8f400]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
          <Link href="/BookSlot">
          <button className="flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-bold tracking-wider bg-[#c8f400] text-black rounded-md hover:opacity-90 transition">
            BOOK A SLOT

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
          </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;