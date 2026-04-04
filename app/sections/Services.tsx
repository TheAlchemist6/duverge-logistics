"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Network,
  PackageCheck,
  Weight,
  Warehouse,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

// ============================================================================
// Services Data
// ============================================================================

const services: Service[] = [
  {
    id: "freight-brokerage",
    icon: Truck,
    title: "Freight Brokerage",
    description:
      "Access to 1000+ vetted carriers. We match your freight with the perfect carrier for optimal rates and reliability.",
    href: "#freight-brokerage",
  },
  {
    id: "supply-chain",
    icon: Network,
    title: "Supply Chain Management",
    description:
      "End-to-end supply chain solutions. From procurement to final delivery, we optimize every link.",
    href: "#supply-chain",
  },
  {
    id: "last-mile",
    icon: PackageCheck,
    title: "Last-Mile Delivery",
    description:
      "The final mile matters most. White-glove delivery service that delights your customers.",
    href: "#last-mile",
  },
  {
    id: "heavy-hauling",
    icon: Weight,
    title: "Heavy Hauling",
    description:
      "Oversized, overweight, over-dimensional? No problem. Permits, routing, and execution handled.",
    href: "#heavy-hauling",
  },
  {
    id: "warehousing",
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Strategic Florida storage. Inventory management, cross-docking, and distribution under one roof.",
    href: "#warehousing",
  },
  {
    id: "internal-shipping",
    icon: MapPin,
    title: "Internal Shipping",
    description:
      "Streamlined domestic logistics. Coast-to-coast coverage with real-time visibility.",
    href: "#internal-shipping",
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

// ============================================================================
// Service Card Component
// ============================================================================

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col h-full"
    >
      {/* Card Container */}
      <div className="relative flex flex-col h-full p-8 rounded-2xl bg-gradient-to-br from-[#0f1d32] to-[#0a1628] border border-[#0ea5e9]/10 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#0ea5e9]/30 group-hover:shadow-[0_0_40px_-12px_rgba(14,165,233,0.25)]">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/[0.05] via-transparent to-[#38bdf8]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="relative mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5 border border-[#0ea5e9]/20 text-[#0ea5e9] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-7 h-7" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-[#f8fafc] mb-3 tracking-tight">
            {service.title}
          </h3>
          <p className="text-[#94a3b8] text-[15px] leading-relaxed flex-1">
            {service.description}
          </p>

          {/* Learn More Link */}
          <a
            href={service.href}
            className="inline-flex items-center gap-2 mt-6 text-[#0ea5e9] text-sm font-medium transition-all duration-300 group/link hover:text-[#38bdf8]"
            aria-label={`Learn more about ${service.title}`}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>

        {/* Card Number Badge */}
        <div className="absolute top-6 right-6 text-[#1e293b] text-6xl font-bold select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// Services Section Component
// ============================================================================

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-[#0a1628] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0ea5e9]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#38bdf8]/[0.03] rounded-full blur-[100px]" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f1d32] border border-[#0ea5e9]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
            <span className="text-[#94a3b8] text-sm font-medium tracking-wide uppercase">
              What We Do
            </span>
          </div>

          {/* Title */}
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight mb-6"
          >
            Our Services
          </h2>

          {/* Cyan Underline Accent */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-transparent to-[#0ea5e9]" />
            <div className="h-1 w-8 rounded-full bg-[#0ea5e9]" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-l from-transparent to-[#0ea5e9]" />
          </div>

          {/* Subtitle */}
          <p className="text-[#64748b] text-lg leading-relaxed">
            Comprehensive logistics solutions tailored to move your business forward. 
            From coast to coast, we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-[#64748b] mb-6">
            Need a custom solution? We specialize in tailoring our services to your unique requirements.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-[#0a1628] font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.5)] hover:-translate-y-1"
          >
            Get a Custom Quote
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
