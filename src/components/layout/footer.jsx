"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronUp } from "react-icons/io5";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = ["Home", "Consoles", "Plans", "Contact"];
  const support = [
    {
      name: "FAQs",
      path: "/legal/FAQ'S",
    },
    {
      name: "Support",
      path: "/legal/support",
    },
    {
      name: "Cancellation Policy",
      path: "/legal/Cancellation-Policy",
    },
  ];

  const socialIcons = [
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/_ultimategamezone?igsh=NmNrZWNsaGFjbjVn",
    },
    { Icon: FaFacebook, href: "#" },
    { Icon: FaYoutube, href: "#" },
    { Icon: FaTwitter, href: "#" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-12 sm:pt-14 pb-6 px-5 sm:px-8 md:px-12 lg:px-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 sm:gap-x-8 gap-y-9 sm:gap-y-10 lg:gap-8">
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos.png"
              alt="UGZ Logo"
              width={90}
              height={90}
              className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-[90px] md:h-[90px] shrink-0"
            />
            <h3 className="text-white font-bold text-base sm:text-lg">
              Ultimate Game Zone
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm sm:max-w-none">
            Ultimate Game Zone is your go-to place for premium gaming. Play
            more. Pay less. Level up your experience.
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {socialIcons.map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 rounded-md hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300"
              >
                <Icon className="text-sm" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-[#c8ff00] transition-colors duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Support
          </h4>

          {support.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ul className="mb-2">{item.name}</ul>
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <FaPhoneAlt className="text-[#c8ff00] mt-1 text-xs shrink-0" />
              <span>+91 90747 43403</span>
            </li>
            <li className="flex items-start gap-2">
              <FaEnvelope className="text-[#c8ff00] mt-1 text-xs shrink-0" />
              <span className="break-all">ultimategamezone10@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[#c8ff00] mt-1 text-xs shrink-0" />
              <span>
                Hatod <br /> Madhya Pradesh, India
              </span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Hours
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span className="text-white">Mon - Fri :</span> 11AM - 10AM
            </li>
            <li>
              <span className="text-white">Sat - Sun :</span> 10AM - 10PM
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 sm:mt-12 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <p className="text-xs text-gray-500">
          © 2026 Ultimate Game Zone. All Rights Reserved.
        </p>

        <div className="flex items-center gap-4">
          <p className="text-xs text-gray-400 italic">Level Up. Play Hard.</p>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300 shrink-0"
            aria-label="Scroll to top"
          >
            <IoChevronUp className="text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
