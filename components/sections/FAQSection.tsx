"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of properties can I manage on Siteboard?",
    a: "Siteboard supports all four major inventory types — Plots, Apartments, Houses (independent/villas), and Commercial units (shops, offices, showrooms). You can manage all of them from a single dashboard, with separate modules for each type.",
  },
  {
    q: "How does Siteboard prevent double bookings?",
    a: "The moment a unit is marked as booked by any user in your system, it is instantly locked and marked unavailable across all access points — including agent view, staff dashboard, and walk-in inquiry screens. No refresh needed. Real-time sync.",
  },
  {
    q: "Can I give access to my agents without sharing sensitive data?",
    a: "Yes. Siteboard has a dedicated Agent View-Only Access mode. Agents can see live inventory availability — which units are available, booked, or sold — but cannot access customer data, pricing details, or booking financials unless you explicitly allow it.",
  },
  {
    q: "Can I manage multiple projects from one account?",
    a: "Absolutely. Siteboard is built for multi-project developers. You can manage unlimited projects from a single company account. Each project has its own inventory, booking records, and reports — all accessible from one central dashboard.",
  },
  {
    q: "Is my data secure? Who can see our inventory and customer data?",
    a: "Your data is fully private and encrypted. Only users you add to your account can access your data. Siteboard never shares your inventory or customer information with any third party. Role-based access ensures each team member sees only what they need.",
  },
  {
    q: "Do you offer onboarding support?",
    a: "Yes. When you sign up, our team will schedule an onboarding session to help you set up your company, add projects, and upload inventory. Most developers are fully operational within 1 hour of signing up.",
  },
  {
    q: "Is Siteboard suitable for small developers with just one project?",
    a: "Absolutely. Whether you have 20 plots or 2,000 units across 10 projects, Siteboard works for you. Small developers benefit from the clarity and professionalism it brings to their sales process.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-500 text-base">
            Everything you need to know before signing up for Siteboard.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="text-slate-900 font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
