"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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

// Internal API route for quote submissions
const QUOTE_API_URL = '/api/quote';

// Input sanitization function - removes potentially harmful characters
const sanitizeInput = (input: string, preserveNewlines = false): string => {
  let sanitized = input
    // Don't trim here - allow spaces while typing
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and javascript:
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
;
  
  if (!preserveNewlines) {
    // Normalize multiple spaces to single space (for single-line fields)
    sanitized = sanitized.replace(/\s+/g, ' ');
  } else {
    // For multi-line: normalize spaces but keep newlines
    // Replace multiple spaces with single space, but preserve newlines
    sanitized = sanitized.replace(/[ \t]+/g, ' '); // tabs/multiple spaces -> single space
    sanitized = sanitized.replace(/\n{3,}/g, '\n\n'); // max 2 consecutive newlines
  }
  
  return sanitized.slice(0, 1000);
};

// Email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone validation - allows various formats
const isValidPhone = (phone: string): boolean => {
  // Remove all non-numeric characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  // Must be 10-15 digits
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

// Format phone number consistently
const formatPhone = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

// Name validation - no numbers or special chars except hyphens and apostrophes
const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s'-]{2,50}$/.test(name);
};

// Company name validation
const isValidCompany = (company: string): boolean => {
  return company.length >= 2 && company.length <= 100 && /^[a-zA-Z0-9\s&.,'-]+$/.test(company);
};

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    load: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [honeypot, setHoneypot] = useState("");
  const [fromService, setFromService] = useState(false);

  // Read service from URL hash on mount and when hash changes
  useEffect(() => {
    const readServiceFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes("?service=")) {
        const serviceParam = hash.split("?service=")[1];
        if (serviceParam) {
          const decodedService = decodeURIComponent(serviceParam);
          // Validate service is in allowed list
          if (serviceOptions.includes(decodedService)) {
            setFormData((prev) => ({ ...prev, service: decodedService }));
          }
          setFromService(true);
          // Scroll directly to form inputs after a brief delay
          setTimeout(() => {
            const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
            if (nameInput) {
              nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
              setTimeout(() => nameInput.focus(), 300);
            }
          }, 100);
          // Clear the hash so it doesn't persist on refresh
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    };

    // Read on mount
    readServiceFromHash();

    // Listen for hash changes
    window.addEventListener("hashchange", readServiceFromHash);
    return () => window.removeEventListener("hashchange", readServiceFromHash);
  }, []);

  // Validate individual field
  const validateField = useCallback((name: string, value: string): string | undefined => {
    const sanitized = sanitizeInput(value);
    
    switch (name) {
      case 'name':
        if (!sanitized) return "Name is required";
        if (sanitized.length < 2) return "Name must be at least 2 characters";
        if (sanitized.length > 50) return "Name must be less than 50 characters";
        if (!isValidName(sanitized)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
        return undefined;
        
      case 'company':
        if (!sanitized) return "Company name is required";
        if (sanitized.length < 2) return "Company name must be at least 2 characters";
        if (sanitized.length > 100) return "Company name must be less than 100 characters";
        if (!isValidCompany(sanitized)) return "Company name contains invalid characters";
        return undefined;
        
      case 'email':
        if (!sanitized) return "Email is required";
        if (!isValidEmail(sanitized)) return "Please enter a valid email address";
        return undefined;
        
      case 'phone':
        if (!sanitized) return "Phone number is required";
        if (!isValidPhone(sanitized)) return "Please enter a valid phone number (10-15 digits)";
        return undefined;
        
      case 'service':
        if (!sanitized) return undefined; // Service is optional
        if (!serviceOptions.includes(sanitized)) return "Please select a valid service";
        return undefined;
        
      default:
        return undefined;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Sanitize on input - preserve newlines for load/details field
    const preserveNewlines = name === 'load';
    let sanitizedValue = sanitizeInput(value, preserveNewlines);
    
    // Special handling for email
    if (name === 'email') {
      sanitizedValue = sanitizedValue.toLowerCase();
    }
    
    // Special handling for phone - format it
    if (name === 'phone' && sanitizedValue) {
      sanitizedValue = formatPhone(sanitizedValue);
    }
    
    setFormData({ ...formData, [name]: sanitizedValue });
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.company = validateField('company', formData.company);
    newErrors.email = validateField('email', formData.email);
    newErrors.phone = validateField('phone', formData.phone);
    
    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key as keyof FormErrors]) {
        delete newErrors[key as keyof FormErrors];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check — bots fill hidden fields
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    // Rate limiting - prevent duplicate submissions within 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setSubmitError("Please wait a moment before submitting again.");
      return;
    }
    
    // Check if API URL is configured
    if (!QUOTE_API_URL) {
      setSubmitError("Form submission is not yet configured. Please contact us directly at Info@duvergelogistics.com");
      return;
    }
    
    // Validate all fields
    if (!validateForm()) {
      setSubmitError("Please fix the errors above before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    // Final sanitization before sending - trim values here
    const normalizedData = {
      name: sanitizeInput(formData.name).trim(),
      company: sanitizeInput(formData.company).trim(),
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.replace(/\D/g, ''),
      service: sanitizeInput(formData.service).trim(),
      load: sanitizeInput(formData.load, true).trim(), // preserve newlines for load details
    };
    
    // Create form data (avoids CORS preflight issues)
    const formDataObj = new URLSearchParams();
    Object.entries(normalizedData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    formDataObj.append('_honeypot', honeypot);
    
    try {
      // Submit to API route with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(QUOTE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setLastSubmitTime(now);
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setSubmitError("Request timed out. Please check your connection and try again.");
        } else {
          setSubmitError("Network error. Please check your connection and try again.");
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
                setErrors({});
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
          {/* Left - Info - Hidden on mobile when coming from service */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={fromService ? 'hidden lg:block' : ''}
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
              id="quote-form"
              onSubmit={handleSubmit}
              className="bg-[#0f1d32]/80 backdrop-blur-xl rounded-2xl p-8 border border-[#0ea5e9]/20"
              noValidate
            >
              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

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
                    onBlur={handleBlur}
                    maxLength={50}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#0ea5e9]/20 focus:border-[#0ea5e9]/50'} text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-colors`}
                    placeholder="John Smith"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
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
                    onBlur={handleBlur}
                    maxLength={100}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border ${errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-[#0ea5e9]/20 focus:border-[#0ea5e9]/50'} text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-colors`}
                    placeholder="Acme Inc."
                    autoComplete="organization"
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                  )}
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
                    onBlur={handleBlur}
                    maxLength={254}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#0ea5e9]/20 focus:border-[#0ea5e9]/50'} text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-colors`}
                    placeholder="john@company.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
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
                    onBlur={handleBlur}
                    maxLength={20}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-[#0ea5e9]/20 focus:border-[#0ea5e9]/50'} text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-colors`}
                    placeholder="551-234-9587"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
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
                  onBlur={handleBlur}
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
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-[#0ea5e9]/20 text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
                  placeholder="Weight, dimensions, special requirements, pickup location, delivery location, timeline..."
                />
                <p className="mt-1 text-xs text-[#64748b] text-right">{formData.load.length}/1000</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !QUOTE_API_URL}
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
                We respect your privacy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
