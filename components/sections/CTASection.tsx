"use client";

import { motion } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

export default function CTASection() {
  return (
    <section className="section-padding bg-navy-light relative overflow-hidden" aria-label="Final call to action">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-500/5" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-blue-400 font-semibold text-sm">🎯 Ready to build your app?</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
            Your Competitors Are
            <br />
            <span className="gradient-text">Already on Mobile.</span>
            <br />
            Are You?
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Every day without an app is a day your customers choose someone who has one.
            Start building today — it takes just 3 minutes and ₹99 to reserve your slot.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <GradientButton
              size="xl"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-2xl w-full sm:w-auto"
              id="final-cta-primary"
            >
              🚀 Start My App — Starting at ₹49,999 + Taxes
            </GradientButton>
            <a
              href="https://wa.me/919871881183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-5 rounded-2xl text-lg transition-all hover:-translate-y-1 w-full sm:w-auto"
              id="final-cta-whatsapp"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              ₹99 Refundable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              Source Code Included
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              GST Invoice
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              1 Year Support
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              No Hidden Charges
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
