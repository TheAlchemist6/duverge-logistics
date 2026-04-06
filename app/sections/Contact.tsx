"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";

// LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "551-234-9587",
    href: "tel:+15512349587",
    description: "24/7 Dispatch Available",
    isLinkedIn: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "Email Us",
    href: "mailto:Info@duvergelogistics.com",
    description: "Quotes & Inquiries",
    isLinkedIn: false,
  },
  {
    icon: null,
    label: "LinkedIn",
    value: "Cesar Duverge",
    href: "https://www.linkedin.com/in/cesarduverge/",
    description: "Connect with me",
    isLinkedIn: true,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24/7 Operations",
    href: "#",
    description: "Always available",
    isLinkedIn: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[#0f1d32]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0ea5e9]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-6">
            Let&apos;s Talk <span className="gradient-text">Logistics</span>
          </h2>
          <p className="text-lg text-[#94a3b8]">
            Ready to streamline your supply chain? Get in touch. We&apos;re here to help your business move faster.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {contactInfo.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.isLinkedIn ? "_blank" : undefined}
                rel={item.isLinkedIn ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-[#0a1628] border border-[#0ea5e9]/10 hover:border-[#0ea5e9]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center mb-5 group-hover:bg-[#0ea5e9]/20 transition-colors">
                  {item.isLinkedIn ? (
                    <LinkedInIcon className="w-7 h-7 text-[#0ea5e9]" />
                  ) : (
                    IconComponent && <IconComponent className="w-7 h-7 text-[#0ea5e9]" />
                  )}
                </div>
                <p className="text-sm text-[#64748b] mb-1">{item.label}</p>
                <p className="text-[#f8fafc] font-semibold text-lg mb-2 break-words">{item.value}</p>
                <p className="text-sm text-[#64748b]">{item.description}</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0ea5e9]/20 to-[#38bdf8]/10 border border-[#0ea5e9]/20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] mb-3">
                Need an urgent quote?
              </h3>
              <p className="text-[#94a3b8]">
                Call now and speak directly with the owner. No phone trees, no delays.
              </p>
            </div>
            <a
              href="tel:+15512349587"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0ea5e9] text-[#0a1628] font-bold text-lg hover:bg-[#38bdf8] transition-all duration-300 whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              Call 551-234-9587
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
