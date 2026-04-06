"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Warehouse,
  Plane,
  HandHeart,
  MapPin,
  Zap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// Custom Forklift Icon Component
const ForkliftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Forklift body */}
    <rect x="2" y="8" width="10" height="10" rx="1" />
    {/* Forklift mast */}
    <line x1="14" y1="18" x2="14" y2="4" />
    <line x1="17" y1="18" x2="17" y2="4" />
    {/* Forks */}
    <line x1="14" y1="14" x2="20" y2="14" />
    <line x1="14" y1="16" x2="20" y2="16" />
    {/* Wheels */}
    <circle cx="5" cy="20" r="2" />
    <circle cx="11" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
    {/* Load on forks */}
    <rect x="18" y="10" width="4" height="4" />
  </svg>
);

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Service {
  id: string;
  icon: LucideIcon | React.FC<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

// ============================================================================
// Services Data
// ============================================================================

const services: Service[] = [
  {
    id: "ltl",
    icon: Truck,
    title: "LTL (Less Than Truckload)",
    description:
      "Cost-effective shipping for smaller freight that doesn't require a full truck. Pay only for the space you use while maintaining reliable delivery schedules.",
    href: "#quote?service=LTL%20(Less%20Than%20Truckload)",
  },
  {
    id: "truckload",
    icon: Truck,
    title: "Truckload",
    description:
      "Full truckload solutions for large shipments. Dedicated capacity with direct routes, fewer stops, and maximum security for your cargo from pickup to delivery.",
    href: "#quote?service=Truckload",
  },
  {
    id: "warehousing",
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Strategic storage facilities in Florida with inventory management, cross-docking, and distribution services. Flexible space solutions that scale with your business needs.",
    href: "#quote?service=Warehousing",
  },
  {
    id: "international",
    icon: Plane,
    title: "International Shipping",
    description:
      "Seamless cross-border logistics with customs clearance expertise. Connect your business to global markets with reliable air, ocean, and ground freight options.",
    href: "#quote?service=International%20Shipping",
  },
  {
    id: "white-glove",
    icon: HandHeart,
    title: "White-Glove Delivery",
    description:
      "Premium handling for high-value, fragile, or specialized items. Inside delivery, assembly, installation, and debris removal with meticulous care and attention.",
    href: "#quote?service=White-Glove%20Delivery",
  },
  {
    id: "last-mile",
    icon: MapPin,
    title: "Last-Mile Delivery",
    description:
      "The final mile matters most. Timely, accurate delivery to your customers' doorsteps with real-time tracking and proof of delivery for complete visibility.",
    href: "#quote?service=Last-Mile%20Delivery",
  },
  {
    id: "expedited",
    icon: Zap,
    title: "Expedited Delivery",
    description:
      "Time-critical shipments that can't wait. Priority handling with dedicated trucks and team drivers to meet your tightest deadlines, including same-day and next-day options.",
    href: "#quote?service=Expedited%20Delivery",
  },
  {
    id: "heavy-hauling",
    icon: ForkliftIcon,
    title: "Heavy Hauling",
    description:
      "Oversized, overweight, and over-dimensional freight expertise. From permits and routing to specialized equipment, we handle the complex logistics of heavy cargo.",
    href: "#quote?service=Heavy%20Hauling",
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
      staggerChildren: 0.1,
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

  const handleGetQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Update URL with service parameter
    const encodedService = encodeURIComponent(service.title);
    window.location.hash = `#quote?service=${encodedService}`;
    
    // Scroll to quote section
    setTimeout(() => {
      const quoteSection = document.getElementById("quote");
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

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

          {/* Get Quote Button */}
          <button
            onClick={handleGetQuote}
            className="inline-flex items-center gap-2 mt-6 text-[#0ea5e9] text-sm font-medium transition-all duration-300 group/link hover:text-[#38bdf8] text-left"
            aria-label={`Get quote for ${service.title}`}
          >
            <span>Get Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </button>
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
            Services
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
            From local deliveries to international freight, we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
