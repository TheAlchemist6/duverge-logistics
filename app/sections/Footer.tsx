"use client";

import Image from "next/image";
import { Truck, Globe, Mail, Phone, ArrowUp } from "lucide-react";

const footerLinks = {
  services: [
    { label: "LTL", href: "#services" },
    { label: "Truckload", href: "#services" },
    { label: "Warehousing", href: "#services" },
    { label: "International Shipping", href: "#services" },
    { label: "White-Glove Delivery", href: "#services" },
    { label: "Last-Mile Delivery", href: "#services" },
    { label: "Expedited Delivery", href: "#services" },
    { label: "Heavy Hauling", href: "#services" },
  ],
  company: [
    { label: "Get a Quote", href: "#quote" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070d17] border-t border-[#0ea5e9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.png"
                  alt="Duverge Logistics"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-[#f8fafc] font-bold text-xl">DUVERGE</div>
                <div className="text-[#0ea5e9] text-xs font-medium tracking-wider">
                  LOGISTICS LLC
                </div>
              </div>
            </a>
            <p className="text-[#64748b] mb-6 max-w-sm">
              Premier freight brokerage serving the United States & Canada. Personal service, 
              next-day delivery, and instant response at your command.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+15512349587"
                className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:Info@duvergelogistics.com"
                className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/cesarduverge/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#f8fafc] font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#64748b] hover:text-[#0ea5e9] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#f8fafc] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#64748b] hover:text-[#0ea5e9] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#f8fafc] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#64748b] hover:text-[#0ea5e9] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#0ea5e9]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-[#64748b]">
              <Truck className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
              <span>Licensed and insured freight brokerage</span>
            </div>
            <p className="text-sm text-[#64748b] text-center">
              © {new Date().getFullYear()} Duverge Logistics LLC. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
