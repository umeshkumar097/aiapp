"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight, Smartphone } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past first viewport height
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
          <div className="glass-dark border-t border-white/10 px-4 py-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              {/* Left: Offer */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Smartphone size={16} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Android + iOS App</p>
                  <p className="text-slate-400 text-xs mt-0.5">Starting at ₹49,999 + Taxes · 1 Year Support</p>
                </div>
              </div>

              {/* Mobile: Compact text */}
              <div className="sm:hidden text-white text-sm font-semibold flex items-center gap-1.5">
                <Smartphone size={16} className="text-blue-400" />
                <span>Android + iOS · <span className="text-blue-400">Starting ₹49,999+Taxes</span></span>
              </div>

              {/* Right: CTA */}
              <GradientButton
                size="md"
                onClick={handleClick}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="flex-shrink-0"
                id="sticky-bar-cta"
              >
                Start My Project
              </GradientButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
