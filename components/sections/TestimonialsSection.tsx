"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arvind Mehta",
    company: "Skyline Developers, Noida",
    role: "Managing Director",
    rating: 5,
    review:
      "Before Siteboard, we used to manage 200+ plots in Excel. Double bookings were a nightmare. Now everything is on one dashboard — my agents, my staff, my customers. Complete clarity.",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Pradeep Gupta",
    company: "Apex Group, Lucknow",
    role: "Director",
    rating: 5,
    review:
      "We manage 3 apartment projects simultaneously. Siteboard gives us a single view of all units — available, booked, sold — in real time. Our sales team is 3x faster now.",
    initials: "PG",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Ramesh Agarwal",
    company: "Terra Infra, Greater Noida",
    role: "Founder",
    rating: 5,
    review:
      "The agent view-only access is brilliant. I can give my channel partners real-time inventory access without worrying about data misuse. This system is built for Indian developers.",
    initials: "RA",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sunil Sharma",
    company: "Urban Space Builders, Agra",
    role: "CEO",
    rating: 5,
    review:
      "We had a double booking incident that cost us a customer and a lot of trust. After Siteboard, it has never happened again. The zero double booking guarantee actually works.",
    initials: "SS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Kavita Jain",
    company: "Green Homes Pvt. Ltd., Pune",
    role: "Operations Head",
    rating: 5,
    review:
      "Managing houses and commercial units together was impossible on spreadsheets. Siteboard&apos;s separate modules for each type make it so clean. Even our non-tech staff loves it.",
    initials: "KJ",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Deepak Verma",
    company: "Pioneer Real Estate, Meerut",
    role: "Director",
    rating: 5,
    review:
      "The company dashboard gives me a bird&apos;s eye view of all projects every morning. I know exactly how many units are available, how many are booked — no calls, no confusion.",
    initials: "DV",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-navy-light" aria-label="Customer testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Developer Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Trusted by <span className="gradient-text">500+ Developers</span> Across India
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Real estate builders who switched from WhatsApp & Excel to Siteboard.
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
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p
                className="text-slate-700 text-sm leading-relaxed mb-5 italic"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.review}&rdquo;` }}
              />
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                  <p className="text-blue-600 text-xs font-medium">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
