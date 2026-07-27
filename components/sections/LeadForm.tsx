"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormInput } from "@/lib/validation";
import toast from "react-hot-toast";
import { CheckCircle, Building2, MapPin, Phone, MessageSquare } from "lucide-react";

const budgetOptions = [
  "Under ₹20 Lakh",
  "₹20L – ₹50L",
  "₹50L – ₹1 Crore",
  "₹1Cr – ₹2Cr",
  "₹2Cr+",
];

const timelineOptions = [
  "Immediately",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const propertyTypes = [
  { value: "plot", label: "Plot / Land" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa / House" },
  { value: "commercial", label: "Commercial" },
] as const;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: { propertyType: "apartment", agreeToPrivacy: true },
  });

  const propertyType = watch("propertyType");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramMap: Record<string, keyof LeadFormInput> = {
      gclid: "gclid",
      utm_source: "utmSource",
      utm_medium: "utmMedium",
      utm_campaign: "utmCampaign",
      utm_term: "utmTerm",
      utm_content: "utmContent",
    };
    Object.entries(paramMap).forEach(([param, field]) => {
      const val = params.get(param);
      if (val) setValue(field, val);
    });
  }, [setValue]);

  const onSubmit = async (data: LeadFormInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <section id="lead-form" className="section-padding bg-navy-light" aria-label="Property enquiry form">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Info */}
          <div>
            <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Free Consultation
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">
              Tell Us What You&apos;re
              <br />
              <span className="gradient-text">Looking For</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Share your requirements and our property expert will call you
              within 24 hours — no pressure, zero brokerage, completely free.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Building2 size={18} className="text-blue-600" />, title: "RERA Verified Properties", desc: "Every listing is legally vetted and RERA registered." },
                { icon: <MapPin size={18} className="text-green-600" />, title: "Pan India Coverage", desc: "UP, Pune, Hyderabad, Bengaluru and growing." },
                { icon: <Phone size={18} className="text-blue-600" />, title: "Expert Calls Within 24 Hrs", desc: "A dedicated property advisor — not a sales bot." },
                { icon: <MessageSquare size={18} className="text-green-600" />, title: "Zero Brokerage", desc: "No hidden fees. What you see is what you pay." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-500" size={32} />
                </div>
                <h3 className="text-slate-900 text-2xl font-black mb-2">Enquiry Submitted!</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Our expert will call you within 24 hours. Thank you for your interest in Siteboard properties.
                </p>
                <a
                  href="tel:+918449488090"
                  className="inline-flex items-center gap-2 btn-gradient text-white font-bold px-6 py-3 rounded-xl"
                >
                  <Phone size={16} />
                  Call Us Now: +91 8449488090
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Full Name *</label>
                      <input {...register("fullName")} type="text" placeholder="Rajesh Sharma" className={inputClass} />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Phone Number *</label>
                      <input {...register("phone")} type="tel" placeholder="9999999999" className={inputClass} maxLength={10} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Email Address *</label>
                      <input {...register("email")} type="email" placeholder="rajesh@email.com" className={inputClass} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Your City *</label>
                      <input {...register("city")} type="text" placeholder="Noida, Delhi, Pune..." className={inputClass} />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Property Type *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {propertyTypes.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setValue("propertyType", p.value)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            propertyType === p.value
                              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Budget Range</label>
                      <select {...register("budget")} className={inputClass}>
                        <option value="">Select budget</option>
                        {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">When to Buy?</label>
                      <select {...register("timeline")} className={inputClass}>
                        <option value="">Select timeline</option>
                        {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-1.5">Any Specific Requirements?</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="E.g. East facing plot, near highway, school nearby..."
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gradient text-white font-black py-4 rounded-2xl text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Get Free Expert Consultation →"
                    )}
                  </button>

                  <p className="text-slate-400 text-xs text-center">
                    Zero brokerage · RERA approved · 100% free consultation · No spam
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
