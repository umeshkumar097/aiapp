"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RecentEnquiryProps {
  show?: boolean;
}

const enquiries = [
  { name: "Rahul S.", city: "Mumbai", time: "2 min ago", project: "Restaurant App" },
  { name: "Priya M.", city: "Delhi", time: "5 min ago", project: "Salon Booking App" },
  { name: "Amit K.", city: "Bangalore", time: "8 min ago", project: "E-Commerce App" },
  { name: "Neha P.", city: "Hyderabad", time: "12 min ago", project: "Clinic App" },
  { name: "Vikram R.", city: "Pune", time: "15 min ago", project: "Gym Management App" },
  { name: "Anjali T.", city: "Chennai", time: "18 min ago", project: "Real Estate App" },
  { name: "Deepak G.", city: "Kolkata", time: "22 min ago", project: "Taxi App" },
  { name: "Sunita B.", city: "Ahmedabad", time: "25 min ago", project: "Food Delivery App" },
];

export default function RecentEnquiry({ show = true }: RecentEnquiryProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!show || dismissed) return;

    // First show after 5 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);

      // Rotate enquiries every 12 seconds
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

  // Auto-hide after 5 seconds of showing
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
          <div className="glass-dark rounded-2xl p-4 border border-white/10 shadow-2xl flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {enquiry.name.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Just submitted</span>
              </div>
              <p className="text-white text-sm font-semibold truncate">
                {enquiry.name} from {enquiry.city}
              </p>
              <p className="text-slate-400 text-xs">{enquiry.project} · {enquiry.time}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => {
                setVisible(false);
                setDismissed(true);
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
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
