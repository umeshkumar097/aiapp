"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why is the app priced at ₹49,999?",
    a: "₹49,999 includes a complete Android + iOS app with beautiful UI, admin panel, API integrations, Play Store & App Store publishing, and 1 year of support. Most agencies charge ₹2–5 lakh for the same. We maintain lower costs by having an in-house team without agency overhead, passing the savings to you.",
  },
  {
    q: "Is the ₹99 verification fee really refundable?",
    a: "Yes, 100% refundable — no fine print. If you proceed with development, the ₹99 is adjusted in your final project invoice (you pay less). If you decide not to proceed for any reason, simply WhatsApp or email us requesting a refund and we'll process it within 3-5 business days. No questions asked.",
  },
  {
    q: "How many days will it take to deliver the app?",
    a: "Typical delivery is 45–90 days depending on the complexity of features. A standard app (booking, listing, delivery) takes 45–60 days. CRM/ERP or complex marketplace apps take 60–90 days. We provide a detailed milestone-based timeline upfront before starting.",
  },
  {
    q: "Will I receive the complete source code?",
    a: "Yes, absolutely. You receive 100% of the source code — Android, iOS, admin panel, and backend API. The code is fully yours. No hidden licensing fees, no lock-in. You can take it to any other developer in the future if needed.",
  },
  {
    q: "Do you handle Play Store and App Store submission?",
    a: "Yes! We handle the complete submission process for both Google Play Store and Apple App Store. This includes app store optimization (ASO), screenshots, descriptions, and handling any rejection feedback from the stores. You just need to create developer accounts (we guide you through this).",
  },
  {
    q: "Are there any hidden charges after ₹49,999?",
    a: "No hidden charges whatsoever. The ₹49,999 covers everything listed. The only additional costs you may incur are: Google Play Developer Account (₹1,750 one-time), Apple Developer Account ($99/year), and third-party API costs (like SMS, email, payment gateway — based on your usage). All of this is explained clearly before you start.",
  },
  {
    q: "What does 1 year support include?",
    a: "1 year support includes bug fixes, minor UI updates, iOS/Android OS compatibility updates, and technical assistance. It does not include new major features (those are quoted separately). You can contact your dedicated project manager anytime via WhatsApp, email, or phone.",
  },
  {
    q: "Can I see your portfolio before deciding?",
    a: "Yes! Check our portfolio section above with live app examples. We can also share client references and live apps in your industry during the consultation call. Our senior developer will walk you through relevant case studies before any commitment.",
  },
  {
    q: "What technology stack do you use?",
    a: "We build native Android (Kotlin), native iOS (Swift), and cross-platform apps (Flutter/React Native) depending on your requirements. Admin panels are built with React.js + Node.js. We recommend the best tech stack based on your business needs, not what's trendy.",
  },
  {
    q: "How do I get started?",
    a: "Simple! Fill the project form above → Pay the ₹99 refundable verification → Our senior developer calls you within 24 hours → Free project consultation → Detailed proposal with timeline → Development starts. The whole process from form to project kickoff takes 48–72 hours.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.07 }}
      className="border border-white/10 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-4 p-5 text-left transition-colors ${
          open ? "bg-blue-600/10" : "hover:bg-white/5"
        }`}
        aria-expanded={open}
        id={`faq-button-${index}`}
      >
        <span className="text-white font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`text-blue-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-white/5">
              <div className="pt-4">{faq.a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-navy" aria-label="Frequently asked questions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Questions? We Have <span className="gradient-text">Answers.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know before starting your app project.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass rounded-3xl border border-white/10 p-8 text-center"
        >
          <h3 className="text-white font-bold text-xl mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm mb-6">
            Chat with us on WhatsApp or call us directly. We typically respond within 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919871881183?text=Hi, I have a question about building a mobile app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              id="faq-whatsapp"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:+918449488090"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/10"
              id="faq-call"
            >
              📞 Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
