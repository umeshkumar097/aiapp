"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, ShoppingCart, AlertCircle } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

interface ExitPopupProps {
  onClose?: () => void;
}

export default function ExitPopup({ onClose }: ExitPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    // Mouse exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Inactivity timer (20 seconds)
    const inactivityTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 20000);

    // Back button
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

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleCTA = () => {
    handleClose();
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-green-500" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-8">
                {/* Alert badge */}
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="text-amber-400" size={16} />
                  <span className="text-amber-400 text-sm font-semibold">Wait! Don&apos;t leave yet</span>
                </div>

                {/* Comparison grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Without App */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                    <div className="text-center mb-3">
                      <span className="text-2xl">😟</span>
                      <h3 className="text-red-400 font-bold text-sm mt-1">WITHOUT APP</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Customers leaving",
                        "Manual work daily",
                        "Lost revenue",
                        "No brand growth",
                        "Competitors winning",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-red-300">
                          <span className="text-red-500 font-bold">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* With App */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                    <div className="text-center mb-3">
                      <span className="text-2xl">🚀</span>
                      <h3 className="text-green-400 font-bold text-sm mt-1">WITH APP</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "More orders daily",
                        "Brand recognition",
                        "Automatic sales",
                        "Customer loyalty",
                        "Scale faster",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-green-300">
                          <span className="text-green-400 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Offer */}
                <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ShoppingCart className="text-blue-400" size={18} />
                    <span className="text-slate-300 text-sm font-medium">Limited Time Offer</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div>
                      <p className="text-slate-400 text-sm">Android + iOS App</p>
                      <p className="text-3xl font-black text-white mt-0.5">
                        Only <span className="gradient-text">₹49,999</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <TrendingUp className="text-green-400 mb-1" size={20} />
                      <span className="text-green-400 text-xs font-bold">ROI Ready</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <GradientButton
                  size="lg"
                  className="w-full rounded-2xl"
                  onClick={handleCTA}
                  id="exit-popup-cta"
                >
                  🚀 Build My App — Start Now
                </GradientButton>

                <button
                  onClick={handleClose}
                  className="w-full mt-3 text-slate-500 text-sm hover:text-slate-400 transition-colors py-2"
                >
                  No thanks, I&apos;ll stay behind my competitors
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
