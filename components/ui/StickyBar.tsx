"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Building2 } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 pb-safe"
        >
          <div className="bg-white border-t border-slate-200 shadow-lg px-4 py-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              {/* Left */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Building2 size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-bold leading-none">
                    Siteboard Properties
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    RERA Approved · Zero Brokerage · Pan India
                  </p>
                </div>
              </div>

              {/* Mobile compact */}
              <div className="sm:hidden text-slate-900 text-sm font-bold flex items-center gap-1.5">
                <Building2 size={16} className="text-blue-600" />
                <span>
                  Free Consultation —{" "}
                  <span className="text-blue-600">Zero Brokerage</span>
                </span>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="tel:+918449488090"
                  className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-blue-600 text-sm font-medium border border-slate-200 rounded-xl px-4 py-2.5 transition-colors"
                  id="sticky-bar-call"
                >
                  <Phone size={14} />
                  Call Now
                </a>
                <button
                  onClick={handleClick}
                  className="btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5"
                  id="sticky-bar-cta"
                >
                  Enquire Free
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
