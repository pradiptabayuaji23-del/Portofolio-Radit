// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image"; // <--- 1. Ganti import Logo dengan Image dari Next.js

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 transition-all duration-300 ${
          isScrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 py-3 transition-all duration-300 bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-neutral-200/20 rounded-full ${
            isScrolled ? "w-[90%] md:w-[60%]" : "w-[95%] md:w-[70%]"
          }`}
        >
          {/* LOGO AREA */}
          <a 
            href="#" 
            className="z-10 flex items-center justify-center hover:scale-110 transition-transform duration-300"
            aria-label="Back to Top"
          >
            {/* 2. Gunakan Image component */}
            {/* Path dimulai dengan "/" yang mengacu pada folder public */}
            <Image 
              src="/logo/radit-logo.svg" 
              alt="Logo Radit"
              width={36}  // w-9 setara dengan 36px
              height={36} // h-9 setara dengan 36px
              className="w-9 h-9 object-contain" // object-contain agar rasio gambar terjaga
            /> 
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 bg-neutral-200/50 rounded-full -z-10"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
                {link.name}
              </a>
            ))}
          </div>

          {/* CONTACT BUTTON */}
          <div className="hidden md:flex items-center z-10 ml-4">
             <a 
               href="#contact"
               className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
             >
               Contact Me <ArrowUpRight size={14} />
             </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden p-2 text-neutral-600 hover:text-black z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-2xl p-6 md:hidden flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-700 hover:text-black py-2"
              >
                {link.name}
              </a>
            ))}
             <div className="h-[1px] bg-neutral-100 w-full my-2" />
             <a 
               href="#contact"
               className="bg-neutral-900 text-white py-3 rounded-xl font-semibold"
             >
               Contact Me
             </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}