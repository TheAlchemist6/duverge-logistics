"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, CheckCircle, Truck, Package, Building2 } from "lucide-react";

const serviceOptions = [
  "LTL (Less Than Truckload)",
  "Truckload",
  "Warehousing",
  "International Shipping",
  "White-Glove Delivery",
  "Last-Mile Delivery",
  "Expedited Delivery",
  "Heavy Hauling",
];

// Google Apps Script Web App URL - Replace with your actual URL after deployment
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    load: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Read service from URL hash on mount and when hash changes
  useEffect(() => {
    const readServiceFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes("?service=")) {
        const serviceParam = hash.split("?service=")[1];
        if (serviceParam) {
          const decodedService = decodeURIComponent(serviceParam);
          setFormData((prev) => ({ ...prev, service: decodedService }));
          // Scroll to quote section after setting service
          setTimeout(() => {
            const quoteSection = document.getElementById("quote");
            if (quoteSection) {
              quoteSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    };

    // Read on mount
    readServiceFromHash();

    // Listen for hash changes
    window.addEventListener("hashchange", readServiceFromHash);
    return () => window.removeEventListener("hashchange", readServiceFromHash);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <section id="quote" className="relative py-24 lg:py-32 bg-[#0a1628]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0f1d32] rounded-2xl p-12 border border-[#0ea5e9]/20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#0ea5e9]" />
            </div>
            <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">
              Quote Request Received!
            </h3>
            <p className="text-[#94a3b8] mb-6">
              Thanks {formData.name.split(" ")[0]}! We&apos;ll review your request and get back to you instantly with a competitive quote.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  company: "",
                  email: "",
                  phone: "",
                  service: "",
                  load: "",
                });
              }}
              className="text-[#0ea5e9] hover:underline"
            >
              Submit another request →
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="relative py-24 lg:py-32 bg-[#0a1628] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0ea5e9]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
              <span className="text-[#0ea5e9] text-sm font-medium">Get Started</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-6">
              Request a <span className="gradient-text">Free Quote</span>
            </h2>

            <p className="text-lg text-[#94a3b8] mb-10">
              Tell us about your shipping needs. We&apos;ll get back to you instantly with a competitive quote.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {[
                {
                  icon: Truck,
                  title: "Competitive Rates",
                  desc: "Access to 1000+ carriers means better pricing",
                },
                {
                  icon: Package,
                  title: "Instant Response",
                  desc: "Quick quotes for time-sensitive shipments",
                },
                {
                  icon: Building2,
                  title: "B2B Specialized",
                  desc: "Tailored solutions for medium & large businesses",
                },
                {
                  icon: Send,
                  title: "All Cargo Types",
                  desc: "From parcels to heavy machinery",
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f8fafc] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#64748b]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#0f1d32]/80 backdrop-blur-xl rounded-2xl p-8 border border-[#0ea5e9]/20"
            >
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                    placeholder="551-234-9587"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                  Service Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                  Load Details
                </label>
                <textarea
                  name="load"
                  rows={4}
                  value={formData.load}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
                  placeholder="Weight, dimensions, special requirements, pickup location, delivery location, timeline..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !GOOGLE_SCRIPT_URL}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0ea5e9] text-[#0a1628] font-bold text-lg hover:bg-[#38bdf8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get My Quote
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#64748b] mt-4">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
