"use client";

import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const problems = [
  "Units double-booked — two customers, one plot",
  "Agents quoting wrong prices from outdated Excel",
  "No idea which units are available at any moment",
  "Lost bookings because follow-up slipped through cracks",
  "Staff sharing sensitive customer data on WhatsApp groups",
  "Confusion at site visit — no real-time availability data",
];

export default function ProblemSection() {
  return (
    <section className="section-padding bg-white" aria-label="Problems Siteboard solves">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-3 py-1.5 mb-5">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-red-600 font-semibold text-sm">Sound Familiar?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">
              Stop Managing
              <br />
              <span className="text-red-500">Multi-Crore Projects</span>
              <br />
              on WhatsApp & Excel
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Every real estate developer starts with spreadsheets. But as your inventory grows,
              chaos follows. Missed bookings, angry customers, agent conflicts — it all costs you
              money and reputation.
            </p>
          </motion.div>

          {/* Right: Pain points */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4"
              >
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <X size={14} className="text-red-500" />
                </div>
                <p className="text-slate-700 text-sm font-medium">{problem}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
