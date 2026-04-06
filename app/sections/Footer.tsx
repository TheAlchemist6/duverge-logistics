"use client";

import Image from "next/image";
import { Truck, Globe, Mail, ArrowUp } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Freight Brokerage", href: "#services" },
    { label: "Supply Chain", href: "#services" },
    { label: "Last-Mile Delivery", href: "#services" },
    { label: "Heavy Hauling", href: "#services" },
    { label: "Warehousing", href: "#services" },
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
              Florida&apos;s premier freight brokerage. Personal service, next-day delivery, 
              and 1000+ vetted carriers at your command.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="mailto:Info@duvergelogistics.com"
                className="w-10 h-10 rounded-lg bg-[#0f1d32] flex items-center justify-center text-[#64748b] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#64748b]">
              <Truck className="w-4 h-4 text-[#0ea5e9]" />
              <span>Licensed and insured freight brokerage</span>
            </div>
            <p className="text-sm text-[#64748b]">
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
