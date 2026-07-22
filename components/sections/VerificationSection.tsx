"use client";

import { motion } from "framer-motion";
import { Shield, RotateCcw, CreditCard, Smartphone, Globe } from "lucide-react";

const paymentMethods = [
  { icon: <Smartphone size={18} />, label: "UPI", sublabel: "GPay, PhonePe, Paytm" },
  { icon: <CreditCard size={18} />, label: "Cards", sublabel: "Visa, Mastercard, Rupay" },
  { icon: <Globe size={18} />, label: "Net Banking", sublabel: "All major banks" },
  { icon: <Shield size={18} />, label: "Cashfree", sublabel: "PCI DSS Secure" },
];

export default function VerificationSection() {
  return (
    <section id="pricing" className="section-padding bg-navy" aria-label="Verification fee explanation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            100% Transparent
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Why We Charge <span className="gradient-text">₹99</span> Upfront?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Dark card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/40 via-blue-500/10 to-green-500/20 p-px">
              <div className="w-full h-full rounded-3xl bg-navy" />
            </div>

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30">
                <Shield size={28} className="text-white" />
              </div>

              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
                <span className="text-blue-400 font-bold text-sm">₹99 Refundable Verification</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                We Reserve Expert Time Only for Serious Builders
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Our senior developers and project managers are in high demand.
                To protect their time for genuine business owners like you,
                we charge a small ₹99 verification fee that filters out casual browsers.
              </p>

              {/* Refund policy */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <RotateCcw className="text-green-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-green-400 font-bold text-sm mb-1">100% Refundable Guarantee</p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      If you proceed with Aiclex Solutions, this ₹99 is <strong className="text-white">adjusted in your final invoice</strong>.
                      If you decide not to continue for any reason, we will refund the complete ₹99 — no questions asked, no delays.
                    </p>
                  </div>
                </div>
              </div>

              {/* What it unlocks */}
              <div className="space-y-3">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">What your ₹99 unlocks:</p>
                {[
                  "Personal call with our senior technical expert",
                  "Free 30-minute requirement consultation",
                  "Custom project proposal within 48 hours",
                  "Priority scheduling over unverified leads",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Payment methods + Pricing card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Pricing card */}
            <div className="glass rounded-3xl border border-white/10 p-8">
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-2">Android + iOS App Packages</p>
                <div className="flex items-end justify-center gap-2 mb-1">
                  <span className="text-slate-400 text-lg font-medium mb-1">Starting at</span>
                  <span className="text-5xl font-black text-white">₹49,999</span>
                  <span className="text-slate-400 text-sm mb-1">+ Taxes</span>
                </div>
                <p className="text-slate-400 text-xs mt-2">Custom quotes available for complex/enterprise applications.</p>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                {[
                  { label: "Android App (Google Play)", value: "✓ Included" },
                  { label: "iOS App (App Store)", value: "✓ Included" },
                  { label: "Admin Dashboard", value: "✓ Included" },
                  { label: "Source Code", value: "✓ 100% Yours" },
                  { label: "1 Year Support", value: "✓ Included" },
                  { label: "GST Invoice", value: "✓ Provided" },
                  { label: "Hidden Charges", value: "✗ None" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{row.label}</span>
                    <span className={`font-semibold ${row.value.startsWith("✓") ? "text-green-400" : "text-slate-400"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full mt-6 btn-gradient text-white font-bold py-4 rounded-2xl text-base"
                id="pricing-cta"
              >
                Get Started for ₹99 →
              </button>
            </div>

            {/* Payment methods */}
            <div className="glass rounded-3xl border border-white/10 p-6">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider text-center mb-4">
                Secure Payment Methods
              </p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{method.label}</p>
                      <p className="text-slate-500 text-xs">{method.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs text-center mt-4 flex items-center justify-center gap-1">
                <Shield size={12} />
                256-bit SSL encryption · PCI DSS Level 1 Compliant
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
