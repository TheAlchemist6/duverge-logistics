"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-duverge", label: "Why Us" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a1628]/95 backdrop-blur-xl border-b border-[#0ea5e9]/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Duverge Logistics"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-[#f8fafc] font-bold text-lg leading-tight">
                  DUVERGE
                </div>
                <div className="text-[#0ea5e9] text-xs font-medium tracking-wider">
                  LOGISTICS
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#94a3b8] hover:text-[#f8fafc] font-medium text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#quote"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0ea5e9] text-[#0a1628] font-semibold text-sm hover:bg-[#38bdf8] transition-all duration-300"
              >
                Get Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#0f1d32] text-[#f8fafc]"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="mx-4 bg-[#0f1d32]/98 backdrop-blur-xl rounded-2xl border border-[#0ea5e9]/20 p-4 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0ea5e9]/10 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 px-4 py-3 rounded-xl bg-[#0ea5e9] text-[#0a1628] font-semibold text-center"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
