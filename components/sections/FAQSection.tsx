"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Are your projects RERA registered?",
    a: "Yes, all Siteboard projects are RERA registered and compliant. You can verify our RERA number on the official state RERA portal. We provide full documentation before you book.",
  },
  {
    q: "Is there any brokerage or hidden charges?",
    a: "Absolutely not. Siteboard operates with zero brokerage and complete price transparency. The price you see is the price you pay — no hidden charges, no surprise fees at registration.",
  },
  {
    q: "Can I get a home loan for properties listed on Siteboard?",
    a: "Yes. Our properties are approved by all leading banks including SBI, HDFC, ICICI, and Axis Bank. Our team will assist you through the entire loan application and approval process at no extra cost.",
  },
  {
    q: "What documents do I need to book a property?",
    a: "For initial booking you only need your Aadhaar card, PAN card, and a booking amount. Our team will guide you through the complete documentation — sale agreement, registry, and possession letter.",
  },
  {
    q: "How do you ensure legal clearance of the property?",
    a: "Every property goes through a rigorous legal verification process — title check, encumbrance certificate, RERA registration, and municipality approvals. We never list a property with pending legal issues.",
  },
  {
    q: "What happens after I submit an enquiry?",
    a: "Our property expert will call you within 24 hours to understand your requirements. We then arrange a free site visit at your convenience — there is no obligation to purchase.",
  },
  {
    q: "Do you operate Pan India or only in certain cities?",
    a: "We operate Pan India with projects primarily in UP (Noida, Greater Noida, Agra, Lucknow), and expanding to Pune, Hyderabad, and Bengaluru. Contact us to check availability in your preferred city.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-500 text-base">
            Everything you need to know before making your property decision.
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
                  className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
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
