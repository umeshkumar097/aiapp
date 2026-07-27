"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormInput } from "@/lib/validation";
import toast from "react-hot-toast";
import { CheckCircle, Building2, Phone } from "lucide-react";

const inventoryTypes = [
  { value: "plots", label: "Plots" },
  { value: "apartments", label: "Apartments" },
  { value: "houses", label: "Houses" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed", label: "Mixed" },
] as const;

interface InlineFormProps {
  compact?: boolean;
  onSuccess?: () => void;
}

export default function InlineLeadForm({ compact = false, onSuccess }: InlineFormProps) {
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
      onSuccess?.();
      if (typeof window !== "undefined" && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as { fbq?: (...args: unknown[]) => void }).fbq!("track", "Lead");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        <h3 className="text-slate-900 text-xl font-bold mb-2">Demo Requested!</h3>
        <p className="text-slate-500 text-sm">
          Our product expert will call you within 24 hours. Thank you for your interest.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 text-sm font-medium">
          <Phone size={16} />
          <a href="tel:+918449488090">+91 8449488090</a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-md ${compact ? "p-5" : "p-6 md:p-8"}`}>
      {!compact && (
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 mb-3">
            <Building2 size={14} className="text-blue-600" />
            <span className="text-blue-700 font-semibold text-xs">Free Demo — No Commitment</span>
          </div>
          <h3 className="text-slate-900 text-xl font-black">Request a Live Demo</h3>
          <p className="text-slate-500 text-sm mt-1">Our expert calls you within 24 hrs</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input {...register("fullName")} type="text" placeholder="Your Name *" className={inputClass} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <input {...register("phone")} type="tel" placeholder="Phone Number *" className={inputClass} maxLength={10} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <input {...register("email")} type="email" placeholder="Email Address *" className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("companyName")} type="text" placeholder="Company Name *" className={inputClass} />
          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
        </div>

        <div>
          <p className="text-slate-600 text-xs font-medium mb-2">Inventory Type *</p>
          <div className="grid grid-cols-5 gap-1.5">
            {inventoryTypes.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setValue("propertyType", p.value)}
                className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all text-center ${
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

        <input {...register("city")} type="text" placeholder="City / Location" className={inputClass} />

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gradient text-white font-bold py-4 rounded-2xl text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
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
          No commitment · 100% free · Expert callback in 24 hrs
        </p>
      </form>
    </div>
  );
}
