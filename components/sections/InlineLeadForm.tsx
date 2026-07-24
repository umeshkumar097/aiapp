"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormInput } from "@/lib/validation";
import PaymentModal from "@/components/ui/PaymentModal";
import toast from "react-hot-toast";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cashfree?: any;
  }
}

interface InlineFormProps {
  compact?: boolean;
}

export default function InlineLeadForm({ compact = false }: InlineFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSession, setPaymentSession] = useState<{ orderId: string; paymentSessionId: string } | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: { platform: "both", agreeToPrivacy: true },
  });

  const platform = watch("platform");
  const customerName = watch("fullName");

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

  useEffect(() => {
    if (document.getElementById("cashfree-js")) return;
    const script = document.createElement("script");
    script.id = "cashfree-js";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onSubmit = async (data: LeadFormInput) => {
    setFormLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data }),
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.paymentSessionId) {
        toast.error(responseData.error || "Failed to process. Please try again.");
        return;
      }

      setPaymentSession({
        orderId: responseData.orderId,
        paymentSessionId: responseData.paymentSessionId,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Form submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!paymentSession) return;
    setPaymentLoading(true);
    try {
      if (!window.Cashfree) {
        toast.error("Payment gateway loading... Please try in 3 seconds.");
        setPaymentLoading(false);
        return;
      }
      const cashfree = window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV || "production",
      });
      cashfree.checkout({
        paymentSessionId: paymentSession.paymentSessionId,
        returnUrl: `${window.location.origin}/api/verify-payment?orderId=${paymentSession.orderId}&redirect=true`,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setPaymentLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all";

  return (
    <>
      <div className={`glass-dark rounded-3xl border border-white/10 ${compact ? "p-5" : "p-6 md:p-8"}`}>
        {!compact && (
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-semibold text-xs">Free Consultation — Just ₹99 Token</span>
            </div>
            <h3 className="text-white text-xl font-black">Start Your App Project</h3>
            <p className="text-slate-400 text-sm mt-1">Fill below — takes 60 seconds</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Full Name *"
                className={inputClass}
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number *"
                className={inputClass}
                maxLength={10}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address *"
              className={inputClass}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("businessName")}
              type="text"
              placeholder="Business Name"
              className={inputClass}
            />
          </div>

          <div>
            <p className="text-slate-400 text-xs mb-2">Platform *</p>
            <div className="grid grid-cols-3 gap-2">
              {(["android", "ios", "both"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setValue("platform", p)}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    platform === p
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {p === "android" ? "Android" : p === "ios" ? "iOS" : "Both"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={formLoading}
            className="w-full btn-gradient text-white font-black py-4 rounded-2xl text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
          >
            {formLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving...
              </span>
            ) : (
              "Submit & Reserve Slot →"
            )}
          </button>

          <p className="text-slate-500 text-xs text-center">
            100% secure · GST Invoice · Refundable token
          </p>
        </form>
      </div>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPayNow={handlePayNow}
        loading={paymentLoading}
        customerName={customerName}
      />
    </>
  );
}
