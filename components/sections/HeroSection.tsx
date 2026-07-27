"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, CheckCircle, TrendingUp, Users, Shield, Zap } from "lucide-react";
import InlineLeadForm from "@/components/sections/InlineLeadForm";

const trustItems = [
  { icon: <CheckCircle size={13} className="text-green-600" />, label: "Zero Double Booking" },
  { icon: <Shield size={13} className="text-blue-600" />, label: "100% Data Security" },
  { icon: <TrendingUp size={13} className="text-green-600" />, label: "Real-time Dashboard" },
  { icon: <Zap size={13} className="text-blue-600" />, label: "Agent View Access" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-hero overflow-hidden pt-16" aria-label="Hero section">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 bg-blue-600 rounded-full px-4 py-2">
                <LayoutDashboard size={14} className="text-white" />
                <span className="text-white font-bold text-sm uppercase tracking-wide">
                  Real Estate ERP Software
                </span>
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-5"
            >
              Manage Your
              <br />
              <span className="gradient-text">Entire Inventory</span>
              <br />
              Zero Chaos.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed mb-6 max-w-lg"
            >
              Stop managing your plots, apartments, houses & commercial spaces
              on WhatsApp and Excel. Siteboard gives builders a real-time dashboard
              to track every unit — available, booked, or sold.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 mb-8 max-w-sm"
            >
              {[
                { value: "500+", label: "Developers" },
                { value: "50K+", label: "Units Managed" },
                { value: "Zero", label: "Double Bookings" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
                  <p className="text-xl font-black text-blue-600">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
                  {item.icon}
                  <span className="text-slate-700 text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <InlineLeadForm />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
