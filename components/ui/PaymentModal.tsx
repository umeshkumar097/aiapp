"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, CreditCard, Smartphone, Globe } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayNow: () => void;
  loading?: boolean;
  customerName?: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onPayNow,
  loading = false,
  customerName,
}: PaymentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  const paymentMethods = [
    { icon: <Smartphone size={16} />, label: "UPI" },
    { icon: <CreditCard size={16} />, label: "Cards" },
    { icon: <Globe size={16} />, label: "Net Banking" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={(e) => {
              if (e.target === overlayRef.current && !loading) onClose();
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
          >
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl" />

              <div className="relative glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Header gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-green-500" />

                {/* Close */}
                {!loading && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                    aria-label="Close payment modal"
                  >
                    <X size={18} />
                  </button>
                )}

                <div className="p-6 md:p-8">
                  {/* Title */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                      <Shield className="text-white" size={24} />
                    </div>
                    <h2
                      id="payment-modal-title"
                      className="text-2xl font-bold text-white mb-1"
                    >
                      Verify Your Project
                    </h2>
                    {customerName && (
                      <p className="text-slate-400 text-sm">
                        Hello <span className="text-white font-medium">{customerName}</span>! One last step.
                      </p>
                    )}
                  </div>

                  {/* Amount card */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-2xl border border-blue-500/20 p-5 mb-5 text-center">
                    <p className="text-slate-400 text-sm mb-1">Refundable Verification Fee</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-5xl font-black text-white">₹99</span>
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                        100% REFUNDABLE
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      This ₹99 will be adjusted in your final invoice if you proceed.
                      Full refund if you decide not to continue.
                    </p>
                  </div>

                  {/* What you get */}
                  <div className="mb-5 space-y-2">
                    {[
                      "Priority access to our technical experts",
                      "Free 30-minute project consultation call",
                      "Custom project estimate & proposal",
                      "Project kickoff within 48 hours",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-400 text-xs font-bold">✓</span>
                        </div>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Agreement */}
                  <label className="flex items-start gap-3 mb-5 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        id="payment-agreement"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          agreed
                            ? "bg-blue-500 border-blue-500"
                            : "border-slate-600 group-hover:border-blue-400"
                        }`}
                      >
                        {agreed && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">
                      I understand this is a refundable fee and agree to the{" "}
                      <a href="/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/refund-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">
                        Refund Policy
                      </a>
                      .
                    </span>
                  </label>

                  {/* Pay button */}
                  <GradientButton
                    size="lg"
                    className="w-full rounded-2xl"
                    loading={loading}
                    disabled={!agreed || loading}
                    onClick={onPayNow}
                    id="pay-now-button"
                  >
                    {loading ? "Creating secure payment..." : "🔒 Pay ₹99 Securely"}
                  </GradientButton>

                  {/* Payment methods */}
                  <div className="mt-4 flex items-center justify-center gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.label}
                        className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5 border border-white/10"
                      >
                        <span className="text-slate-400">{method.icon}</span>
                        <span className="text-slate-400 text-xs font-medium">{method.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Security note */}
                  <div className="mt-3 flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <Shield size={12} />
                    <span>256-bit SSL · Secured by Cashfree · PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
