"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormInput } from "@/lib/validation";
import GradientButton from "@/components/ui/GradientButton";
import PaymentModal from "@/components/ui/PaymentModal";
import toast from "react-hot-toast";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cashfree?: any;
  }
}

export default function LeadForm() {
  const [showModal, setShowModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: { platform: "both", agreeToPrivacy: true },
  });

  const platform = watch("platform");

  // Capture UTM params from URL
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

  // Load Cashfree SDK dynamically
  useEffect(() => {
    if (document.getElementById("cashfree-js")) return;
    const script = document.createElement("script");
    script.id = "cashfree-js";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onSubmit = () => {
    setShowModal(true);
  };

  const handlePayNow = async () => {
    setPaymentLoading(true);
    try {
      const formData = watch();

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentSessionId) {
        toast.error(data.error || "Failed to create order. Please try again.");
        setPaymentLoading(false);
        return;
      }

      if (!window.Cashfree) {
        toast.error("Payment gateway loading... Please try in 3 seconds.");
        setPaymentLoading(false);
        return;
      }

      const cashfree = window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV || "production",
      });

      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        returnUrl: `${window.location.origin}/api/verify-payment?orderId=${data.orderId}&redirect=true`,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setPaymentLoading(false);
    }
  };

  const budgetOptions = [
    "Under ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹3,00,000",
    "₹3,00,000 - ₹5,00,000", "₹5,00,000+",
  ];

  const timelineOptions = [
    "ASAP (1-2 months)", "2-3 months", "3-6 months", "6+ months",
  ];

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all";

  const customerName = watch("fullName");

  return (
    <section id="lead-form" className="section-padding bg-navy-light" aria-label="Project inquiry form">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Get Started Today
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Tell Us About Your <span className="gradient-text">Project</span>
          </h2>
          <p className="text-slate-400 text-base">
            Fill the form below to initiate your project consultation.
          </p>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Full Name *</label>
                <input {...register("fullName")} type="text" placeholder="Umesh Kumar" className={inputClass} />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Phone Number *</label>
                <input {...register("phone")} type="tel" placeholder="8449488090" className={inputClass} maxLength={10} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Email Address *</label>
                <input {...register("email")} type="email" placeholder="umeshkumarceo@gmail.com" className={inputClass} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Business Name</label>
                <input {...register("businessName")} type="text" placeholder="My Business" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Platform *</label>
              <div className="grid grid-cols-3 gap-3">
                {(["android", "ios", "both"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue("platform", p)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      platform === p
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {p === "android" ? "Android" : p === "ios" ? "iOS" : "Both (Android + iOS)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Budget Range</label>
                <select {...register("budget")} className={inputClass}>
                  <option value="" className="bg-slate-900">Select budget range</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b} className="bg-slate-900">{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Timeline</label>
                <select {...register("timeline")} className={inputClass}>
                  <option value="" className="bg-slate-900">Select timeline</option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t} className="bg-slate-900">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Project Description</label>
              <textarea {...register("projectDescription")} rows={4} placeholder="Tell us about your app idea..." className={inputClass} />
            </div>

            <GradientButton
              type="submit"
              size="lg"
              className="w-full rounded-2xl mt-2"
              loading={isSubmitting}
            >
              Submit Requirement →
            </GradientButton>
          </form>
        </div>
      </div>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPayNow={handlePayNow}
        loading={paymentLoading}
        customerName={customerName}
      />
    </section>
  );
}
