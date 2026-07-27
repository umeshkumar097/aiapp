"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Noida, UP",
    property: "Plot — Siteboard City Phase 1",
    rating: 5,
    review:
      "I was confused about where to invest. The Siteboard team guided me honestly — no pressure, just facts. I booked a plot and it has already appreciated 20% in 18 months. Best decision of my life.",
    initials: "RS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Priya Agarwal",
    location: "Delhi NCR",
    property: "2BHK Apartment — Siteboard Residency",
    rating: 5,
    review:
      "From site visit to loan approval, everything was handled by the team. No hidden charges, complete transparency. Possession was on time and the apartment is exactly as promised.",
    initials: "PA",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Mohit Gupta",
    location: "Gurugram, Haryana",
    property: "Villa — Siteboard Green Villas",
    rating: 5,
    review:
      "I was skeptical about buying property online, but the Siteboard team addressed every concern. Legal documentation was spotless. I recommend them to everyone in my family.",
    initials: "MG",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sunita Verma",
    location: "Lucknow, UP",
    property: "Commercial Shop",
    rating: 5,
    review:
      "I wanted a rental income property and they found me the perfect commercial shop. The rental yield has been exceptional. Their after-sales support is also superb.",
    initials: "SV",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Anil Thakur",
    location: "Pune, Maharashtra",
    property: "Plot — Siteboard City Phase 1",
    rating: 5,
    review:
      "The RERA registration and clear title gave me the confidence to invest. The Siteboard team is professional, responsive, and trustworthy. My plot is already showing great appreciation.",
    initials: "AT",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Kavita Singh",
    location: "Agra, UP",
    property: "3BHK Apartment",
    rating: 5,
    review:
      "What I loved most is how transparent they were about everything — price, timeline, approvals. Zero surprises. The handover ceremony was a memorable experience for my entire family.",
    initials: "KS",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-navy-light" aria-label="Customer testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Happy Families
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Trusted by <span className="gradient-text">500+ Families</span> Across India
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Real reviews from real customers who found their dream property with Siteboard.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 card-hover shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.location}</p>
                  <p className="text-blue-600 text-xs font-medium">{t.property}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
