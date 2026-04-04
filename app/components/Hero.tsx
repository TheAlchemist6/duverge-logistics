"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, HeadphonesIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShipmentTracker from "./ShipmentTracker";

const stats = [
  {
    icon: Zap,
    title: "Next-Day Delivery",
    description: "Florida-wide",
    color: "orange",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Always here",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "Florida Coverage",
    description: "Every mile",
    color: "orange",
  },
];

// Animated grid background component
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a]/90 to-[#020617] z-10" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Stat card component
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const Icon = stat.icon;
  const isOrange = stat.color === "orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div
        className={`absolute inset-0 ${isOrange ? "bg-orange-500/20" : "bg-blue-500/20"} blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative bg-[#0f172a]/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 hover:border-slate-600/50 transition-colors">
        <div
          className={`p-3 rounded-xl ${isOrange ? "bg-orange-500/10" : "bg-blue-500/10"}`}
        >
          <Icon
            className={`w-5 h-5 ${isOrange ? "text-orange-500" : "text-blue-500"}`}
          />
        </div>
        <div>
          <p className="text-slate-100 font-semibold text-sm">{stat.title}</p>
          <p className="text-slate-500 text-xs">{stat.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
      <AnimatedGrid />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8"
          >
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-orange-400 text-sm font-medium">
              Next-Day Delivery Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 leading-tight mb-6"
          >
            Florida&apos;s Most{" "}
            <span className="relative">
              <span className="relative z-10 text-orange-500">Reliable</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-orange-500/20 -skew-x-6 origin-left"
              />
            </span>{" "}
            <br className="hidden sm:block" />
            Logistics Partner
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Personalized B2B logistics with next-day delivery across Florida.
            Experience the difference of a partner who treats your shipments
            like their own.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-1 w-full sm:w-auto"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 px-8 py-6 text-base rounded-xl transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              Track Shipment
            </Button>
          </motion.div>

          {/* Shipment Tracker */}
          <div className="flex justify-center mb-16">
            <ShipmentTracker />
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent z-20" />
    </section>
  );
}
