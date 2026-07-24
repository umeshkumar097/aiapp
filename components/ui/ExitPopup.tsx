"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import InlineLeadForm from "@/components/sections/InlineLeadForm";

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

              <div className="p-6 md:p-7">
                {/* Header */}
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-red-400 font-semibold text-xs">Wait! Limited slots available</span>
                  </div>
                  <h3 className="text-white text-xl font-black leading-tight">
                    Get Your App Built<br />
                    <span className="gradient-text">Starting at ₹49,999</span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Fill the form — reserve your slot now with just ₹99 refundable token
                  </p>
                </div>

                <InlineLeadForm compact={true} />

                <button
                  onClick={handleClose}
                  className="w-full mt-3 text-slate-500 text-xs hover:text-slate-400 transition-colors py-2"
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
