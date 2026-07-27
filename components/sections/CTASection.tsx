"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function CTASection() {
  const scrollToForm = () =>
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-label="Final call to action"
      style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563EB 50%, #1e40af 100%)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-white font-semibold text-sm">500+ Developers Already On Siteboard</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-[1.1]">
            Your Inventory.
            <br />
            Your Dashboard.
            <br />
            Zero Chaos.
          </h2>

          <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Stop managing your multi-crore real estate projects on WhatsApp and Excel.
            Get started with Siteboard — India&apos;s smartest Real Estate ERP built for Indian builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={scrollToForm}
              className="bg-white text-blue-700 font-black px-8 py-4 rounded-2xl text-base hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg w-full sm:w-auto"
              id="final-cta-primary"
            >
              Request a Free Demo
            </button>
            <a
              href="tel:+918449488090"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/20 w-full sm:w-auto"
              id="final-cta-call"
            >
              <Phone size={18} />
              Call +91 8449488090
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100 text-sm">
            {["Plots Management", "Apartments", "Houses", "Commercials", "Agent Access", "Real-time Dashboard"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-green-300 font-bold">✓</span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
