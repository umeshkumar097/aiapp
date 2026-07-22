"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhoneMockup from "@/components/ui/PhoneMockup";

const portfolioItems = [
  {
    title: "FoodieRush — Food Delivery App",
    description: "A full-stack food delivery app with real-time order tracking, payment integration, and restaurant management panel.",
    tags: ["Android", "iOS", "Admin Panel", "Razorpay"],
    gradient: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
    stats: [
      { label: "Users", value: "50K+" },
      { label: "Orders/Day", value: "2,000+" },
      { label: "Rating", value: "4.8★" },
    ],
  },
  {
    title: "MediCare — Doctor Booking App",
    description: "Patient-doctor appointment booking with video consultation, prescription management, and EMR system.",
    tags: ["Android", "iOS", "Video Call", "EMR"],
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563EB 100%)",
    stats: [
      { label: "Doctors", value: "500+" },
      { label: "Appointments", value: "10K+" },
      { label: "Rating", value: "4.9★" },
    ],
  },
  {
    title: "PropEase — Real Estate App",
    description: "Property listing and buying platform with virtual tours, EMI calculator, and agent management system.",
    tags: ["Android", "iOS", "Maps", "Admin Panel"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    stats: [
      { label: "Listings", value: "20K+" },
      { label: "Cities", value: "30+" },
      { label: "Rating", value: "4.7★" },
    ],
  },
  {
    title: "GlowUp — Salon Booking App",
    description: "Smart salon appointment booking with stylist selection, in-app chat, and automated reminders.",
    tags: ["Android", "iOS", "Booking", "Notifications"],
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    stats: [
      { label: "Salons", value: "200+" },
      { label: "Bookings", value: "5K+" },
      { label: "Rating", value: "4.8★" },
    ],
  },
];

export default function Portfolio() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + portfolioItems.length) % portfolioItems.length);
  const next = () => setCurrent((c) => (c + 1) % portfolioItems.length);

  const item = portfolioItems[current];

  return (
    <section id="portfolio" className="section-padding bg-navy overflow-hidden" aria-label="Portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Apps That Drive Real <span className="gradient-text">Business Results</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Premium apps built for real businesses across India. Each project delivered
            with source code, admin panel, and full Store support.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left: Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-blue-400 text-xs font-semibold bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-300 text-base leading-relaxed mb-8">{item.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {item.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass rounded-2xl p-4 text-center border border-white/5"
                    >
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl text-sm"
                  id={`portfolio-cta-${current}`}
                >
                  Build a Similar App →
                </button>
              </div>

              {/* Right: Phone */}
              <div className="flex items-center justify-center">
                <div className="relative flex items-center justify-center gap-6">
                  <PhoneMockup gradient={item.gradient} floating delay={0} />
                  <div className="hidden sm:block opacity-60 scale-90">
                    <PhoneMockup
                      gradient={portfolioItems[(current + 1) % portfolioItems.length].gradient}
                      floating
                      delay={1}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {portfolioItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
