"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RecentEnquiryProps {
  show?: boolean;
}

const enquiries = [
  { name: "Rajesh S.", city: "Delhi", time: "2 min ago", property: "3BHK Apartment" },
  { name: "Priya M.", city: "Noida", time: "5 min ago", property: "Residential Plot" },
  { name: "Amit K.", city: "Pune", time: "8 min ago", property: "Villa" },
  { name: "Neha P.", city: "Lucknow", time: "11 min ago", property: "2BHK Apartment" },
  { name: "Vikram R.", city: "Agra", time: "14 min ago", property: "Commercial Shop" },
  { name: "Sunita B.", city: "Gurugram", time: "18 min ago", property: "Plot / Land" },
  { name: "Deepak G.", city: "Faridabad", time: "22 min ago", property: "3BHK Apartment" },
  { name: "Anjali T.", city: "Meerut", time: "26 min ago", property: "Residential Plot" },
];

export default function RecentEnquiry({ show = true }: RecentEnquiryProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!show || dismissed) return;

    const initialTimer = setTimeout(() => {
      setVisible(true);

      intervalRef.current = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % enquiries.length);
          setVisible(true);
        }, 500);
      }, 12000);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [show, dismissed]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [visible, currentIndex]);

  const enquiry = enquiries[currentIndex];

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 left-4 z-50 max-w-xs"
        >
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xl flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {enquiry.name.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-600 text-xs font-semibold">Just enquired</span>
              </div>
              <p className="text-slate-900 text-sm font-semibold truncate">
                {enquiry.name} from {enquiry.city}
              </p>
              <p className="text-slate-500 text-xs">
                {enquiry.property} · {enquiry.time}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={() => {
                setVisible(false);
                setDismissed(true);
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
