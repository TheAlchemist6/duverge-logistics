"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Headphones } from "lucide-react";
import Image from "next/image";


export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#0ea5e9]/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
              <span className="text-[#0ea5e9] text-sm font-medium">
                Now Serving All of the United States & Canada
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
            >
              Your Most{" "}
              <span className="gradient-text">Reliable</span>
              <br />
              Logistics Partner
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-[#94a3b8] max-w-xl mb-10 leading-relaxed"
            >
              Next-day delivery guaranteed. Personal service from the owner.
              1000+ vetted carriers at your command. Built for businesses
              that can&apos;t afford to wait.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0ea5e9] text-[#0a1628] font-bold text-lg hover:bg-[#38bdf8] transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.4)]"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#0ea5e9]/30 text-[#f8fafc] font-semibold text-lg hover:bg-[#0ea5e9]/10 hover:border-[#0ea5e9]/50 transition-all duration-300"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Clock, text: "Next-Day Delivery" },
                { icon: Headphones, text: "24/7 Owner Support" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[#64748b]">
                  <item.icon className="w-4 h-4 text-[#0ea5e9]" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Tracking Card & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Logo Display */}
            <div className="relative mb-8 flex justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[600px] lg:h-[600px]">
                <Image
                  src="/logo.png"
                  alt="Duverge Logistics"
                  fill
                  className="object-contain drop-shadow-[0_0_120px_rgba(14,165,233,0.6)]"
                  priority
                />
              </div>
            </div>


          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent pointer-events-none" />
    </section>
  );
}
