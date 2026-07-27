"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormInput } from "@/lib/validation";
import toast from "react-hot-toast";
import { CheckCircle, Building2, Phone } from "lucide-react";

const unitCountOptions = [
  "1–50 units",
  "51–200 units",
  "201–500 units",
  "500+ units",
];

const inventoryTypes = [
  { value: "plots", label: "Plots" },
  { value: "apartments", label: "Apartments" },
  { value: "houses", label: "Houses" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed", label: "Mixed" },
] as const;

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
    defaultValues: { propertyType: "plots", agreeToPrivacy: true },
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
    <section id="lead-form" className="section-padding bg-navy-light" aria-label="Demo request form">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Get Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">
              Request a <span className="gradient-text">Free Demo</span>
              <br />
              for Your Company
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Tell us about your real estate business. Our team will show you exactly how
              Siteboard can manage your inventory — live, on your own projects.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Building2 size={18} className="text-blue-600" />, title: "Live Demo on Your Data", desc: "We demo using your actual project structure." },
                { icon: <CheckCircle size={18} className="text-green-600" />, title: "No Commitment", desc: "See the platform, then decide. No pressure." },
                { icon: <Phone size={18} className="text-blue-600" />, title: "Expert Calls Within 24 Hrs", desc: "A real product expert — not a sales bot." },
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
                <h3 className="text-slate-900 text-2xl font-black mb-2">Demo Requested!</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Our product expert will call you within 24 hours to schedule your live demo.
                </p>
                <a
                  href="tel:+918449488090"
                  className="inline-flex items-center gap-2 btn-gradient text-white font-bold px-6 py-3 rounded-xl"
                >
                  <Phone size={16} />
                  Call Us: +91 8449488090
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Your Name *</label>
                      <input {...register("fullName")} type="text" placeholder="Arvind Mehta" className={inputClass} />
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
                      <input {...register("email")} type="email" placeholder="you@company.com" className={inputClass} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Company Name *</label>
                      <input {...register("companyName")} type="text" placeholder="Skyline Developers" className={inputClass} />
                      {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Inventory Type *</label>
                    <div className="grid grid-cols-5 gap-2">
                      {inventoryTypes.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setValue("propertyType", p.value)}
                          className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all text-center ${
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
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">Total Units (approx.)</label>
                      <select {...register("unitCount")} className={inputClass}>
                        <option value="">Select range</option>
                        {unitCountOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-1.5">City / Location</label>
                      <input {...register("city")} type="text" placeholder="Noida, Lucknow..." className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-1.5">Anything specific?</label>
                    <textarea
                      {...register("message")}
                      rows={2}
                      placeholder="E.g. We manage 3 plot projects and need agent access..."
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
                      "Request Free Demo →"
                    )}
                  </button>

                  <p className="text-slate-400 text-xs text-center">
                    No commitment · Expert calls within 24 hrs · 100% free demo
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
