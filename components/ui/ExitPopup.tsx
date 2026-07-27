"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Phone } from "lucide-react";
import InlineLeadForm from "@/components/sections/InlineLeadForm";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const inactivityTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 25000);

    const handlePopState = () => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        history.pushState(null, "", window.location.href);
      }
    };

    history.pushState(null, "", window.location.href);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
      clearTimeout(inactivityTimer);
    };
  }, [hasShown]);

  const handleClose = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              {/* Blue top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="p-6">
                {/* Header */}
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-3 py-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-red-600 font-semibold text-xs">
                      Don&apos;t miss out — Limited inventory
                    </span>
                  </div>
                  <h3 className="text-slate-900 text-xl font-black leading-tight mb-1">
                    Get Your Dream Property —<br />
                    <span className="text-blue-600">Free Expert Consultation</span>
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Fill in 30 seconds · Our expert calls you within 24 hrs
                  </p>
                </div>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Zero Brokerage", "RERA Approved", "Pan India"].map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1"
                    >
                      <CheckCircle size={11} className="text-green-500" />
                      {t}
                    </span>
                  ))}
                </div>

                <InlineLeadForm compact={true} onSuccess={handleClose} />

                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <Phone size={12} />
                  <span>Or call directly:</span>
                  <a href="tel:+918449488090" className="text-blue-600 font-semibold hover:underline">
                    +91 8449488090
                  </a>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full mt-3 text-slate-400 text-xs hover:text-slate-500 transition-colors py-1"
                >
                  No thanks, I&apos;ll miss out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
