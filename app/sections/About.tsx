"use client";

import { motion } from "framer-motion";
import { Truck, Users, PackageCheck } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Truck, value: "10+", label: "Years Experience" },
  { icon: Users, value: "1000+", label: "Carriers" },
  { icon: PackageCheck, value: "500+", label: "Deliveries Monthly" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#0f1d32] py-24 lg:py-32 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 lg:order-1"
          >
            {/* Cyan accent shape behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[#0ea5e9]" />
            
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#0ea5e9]/10">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#0a1628] to-[#1e293b] flex items-center justify-center relative">
                {/* Logo instead of silhouette */}
                <div className="relative w-48 h-48 opacity-80">
                  <Image
                    src="/logo.png"
                    alt="Duverge Logistics"
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]" />
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(14,165,233,0.1)] pointer-events-none" />
            </div>

            {/* Stats overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-[#0a1628]/95 backdrop-blur-sm border border-[#0ea5e9]/20 rounded-xl p-5 shadow-xl"
            >
              <div className="flex gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-5 h-5 text-[#0ea5e9] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#f8fafc]">{stat.value}</p>
                    <p className="text-xs text-[#64748b] uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            {/* Eyebrow text */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-[#0ea5e9] text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            >
              About Us
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f8fafc] leading-tight mb-8"
            >
              Built on Relationships,{" "}
              <span className="gradient-text">Powered by Results</span>
            </motion.h2>

            {/* Story paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-5 mb-8"
            >
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                Duverge Logistics isn&apos;t a faceless corporation. We&apos;re a Florida-based
                logistics partner that combines the personal attention of a small business
                with the capabilities of a national provider.
              </p>
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                As a sole proprietorship, I personally oversee every shipment. When you
                call, you talk to me. When there&apos;s a problem, I solve it. No bureaucracy,
                no delays.
              </p>
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                Our network of 1000+ vetted carriers gives us the flexibility to offer
                what larger brokers can&apos;t — guaranteed next-day delivery, custom
                solutions, and the ability to say &quot;yes&quot; when others say &quot;no&quot;.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-0.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] mb-6 origin-left"
            />

            {/* Signature area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-[#f8fafc] font-medium italic">
                — Owner, Duverge Logistics
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
