"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Headset, Shield, SlidersHorizontal } from "lucide-react";

const differentiators = [
  {
    number: "01",
    title: "Next-Day Delivery Guarantee",
    description:
      "While competitors take 2-3 days, we deliver tomorrow. Our carrier relationships make the impossible routine.",
    icon: Zap,
    gradient: "from-[#0ea5e9] to-[#38bdf8]",
  },
  {
    number: "02",
    title: "One Point of Contact",
    description:
      "No call centers. No rotating account managers. You work directly with the owner who knows your business.",
    icon: Headset,
    gradient: "from-[#38bdf8] to-[#22d3ee]",
  },
  {
    number: "03",
    title: "Carrier Control",
    description:
      "Deep relationships with 1000+ vetted carriers means capacity when you need it, even during peak seasons.",
    icon: Shield,
    gradient: "from-[#0ea5e9] to-[#22d3ee]",
  },
  {
    number: "04",
    title: "Tailored Solutions",
    description:
      "Every business is unique. We craft logistics solutions that fit your specific needs, not one-size-fits-all templates.",
    icon: SlidersHorizontal,
    gradient: "from-[#38bdf8] to-[#0ea5e9]",
  },
];

function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof differentiators)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      className="group relative"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/0 to-[#38bdf8]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#0ea5e9]/5 group-hover:to-[#38bdf8]/5 group-hover:opacity-100" />
      
      <div className="relative flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-[#0ea5e9]/10 bg-[#0f1d32]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#0ea5e9]/30 hover:bg-[#0f1d32]/80">
        <span className="text-[#0ea5e9] text-sm font-bold tracking-wider order-1">
          {item.number}
        </span>

        <div className="flex-1 order-3 sm:order-2 basis-full sm:basis-auto">
          <h3 className="text-[#f8fafc] text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-[#0ea5e9] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
            {item.description}
          </p>
        </div>

        <div
          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] transition-transform duration-300 group-hover:scale-110 order-2 sm:order-3 ml-auto sm:ml-0`}
        >
          <div className="w-full h-full rounded-xl bg-[#0a1628] flex items-center justify-center">
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5e9]" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="why-duverge"
      className="relative py-24 lg:py-32 bg-[#0a1628] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f8fafc 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0ea5e9] rounded-full blur-[150px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#38bdf8] rounded-full blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Sticky Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="lg:sticky lg:top-32"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
              <span className="text-[#0ea5e9] text-sm font-medium">
                The Duverge Difference
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f8fafc] leading-tight mb-6">
              Why Florida Businesses{" "}
              <span className="gradient-text">Choose Duverge</span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg text-[#94a3b8] max-w-md leading-relaxed">
              We don&apos;t just move freight. We build relationships that keep
              your supply chain running smoother than the competition.
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 sm:gap-8 mt-10 pt-10 border-t border-[#0ea5e9]/10"
            >
              <div>
                <div className="text-3xl font-bold text-[#0ea5e9]">1,000+</div>
                <div className="text-sm text-[#64748b] mt-1">Vetted Carriers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#38bdf8]">24h</div>
                <div className="text-sm text-[#64748b] mt-1">Next-Day Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0ea5e9]">100%</div>
                <div className="text-sm text-[#64748b] mt-1">Owner-Operated</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Differentiators */}
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <DifferentiatorCard key={item.number} item={item} index={index} />
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.25, 0.4, 0.25, 1] as const,
              }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/10 to-[#38bdf8]/10 border border-[#0ea5e9]/20"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#0ea5e9] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a1628] font-bold text-lg">?</span>
                  </div>
                  <div>
                    <h4 className="text-[#f8fafc] font-semibold mb-1">
                      Still comparing options?
                    </h4>
                    <p className="text-[#94a3b8] text-sm">
                      Let us show you the Duverge difference with a free freight audit.
                    </p>
                  </div>
                </div>
                <a
                  href="#quote"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-[#0ea5e9] text-[#0a1628] font-semibold text-sm hover:bg-[#38bdf8] transition-colors whitespace-nowrap"
                >
                  Get Quote
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
