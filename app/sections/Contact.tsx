"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, Globe } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "551-234-9587",
    href: "tel:+15512349587",
    description: "24/7 Dispatch Available",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Info@duvergelogistics.com",
    href: "mailto:Info@duvergelogistics.com",
    description: "Quotes & Inquiries",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    value: "Cesar Duverge",
    href: "https://www.linkedin.com/in/cesarduverge/",
    description: "Connect with us",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24/7 Operations",
    href: "#",
    description: "Always available for urgent shipments",
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
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === "LinkedIn" ? "_blank" : undefined}
              rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-[#0a1628] border border-[#0ea5e9]/10 hover:border-[#0ea5e9]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center mb-5 group-hover:bg-[#0ea5e9]/20 transition-colors">
                <item.icon className="w-7 h-7 text-[#0ea5e9]" />
              </div>
              <p className="text-sm text-[#64748b] mb-1">{item.label}</p>
              <p className="text-[#f8fafc] font-semibold text-lg mb-2">{item.value}</p>
              <p className="text-sm text-[#64748b]">{item.description}</p>
            </motion.a>
          ))}
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
