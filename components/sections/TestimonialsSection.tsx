"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Owner, Spice Garden Restaurant",
    city: "Mumbai",
    rating: 5,
    review:
      "Aiclex built our food delivery app in 45 days. Orders increased by 60% within the first month. The admin panel is so easy to use, even my manager can update menu items without any help. Best investment we made for our restaurant.",
    avatar: "PM",
    gradient: "from-orange-500 to-red-500",
    project: "Food Delivery App",
  },
  {
    name: "Dr. Vikram Sharma",
    role: "Director, Sharma Multispecialty Clinic",
    city: "Delhi",
    rating: 5,
    review:
      "Our patient appointment app is excellent. Patients love booking online and our staff no longer handles hundreds of phone calls. Revenue went up 40% as we could serve more patients efficiently. Highly recommend Aiclex.",
    avatar: "VS",
    gradient: "from-blue-500 to-cyan-500",
    project: "Doctor Booking App",
  },
  {
    name: "Rajesh Kumar",
    role: "CEO, Kumar Properties",
    city: "Bangalore",
    rating: 5,
    review:
      "Property listings app changed our business completely. We close deals 3x faster now because clients can browse properties on their phones. The team was professional, on time, and the source code is clean. 100% worth it.",
    avatar: "RK",
    gradient: "from-purple-500 to-violet-500",
    project: "Real Estate App",
  },
  {
    name: "Anita Patel",
    role: "Founder, GlowUp Salons",
    city: "Ahmedabad",
    rating: 5,
    review:
      "We had 6 salon locations and managing bookings was chaos. Aiclex built us a beautiful booking app and our no-show rate dropped from 35% to under 8% because of automated reminders. Outstanding work!",
    avatar: "AP",
    gradient: "from-pink-500 to-rose-500",
    project: "Salon Booking App",
  },
  {
    name: "Mohammed Faiz",
    role: "Director, FastMove Logistics",
    city: "Hyderabad",
    rating: 5,
    review:
      "Needed a delivery tracking app for our logistics business. The app has real-time GPS, customer notifications, and driver management. All delivered in 50 days. The team is highly skilled and communicates well.",
    avatar: "MF",
    gradient: "from-emerald-500 to-teal-500",
    project: "Logistics Tracking App",
  },
  {
    name: "Sneha Agarwal",
    role: "Principal, Bright Future Academy",
    city: "Pune",
    rating: 5,
    review:
      "Our school management app has revolutionized communication with 800+ parents. Attendance, fee payments, homework — everything on one app. Parents love it and our admin burden reduced drastically. Great team!",
    avatar: "SA",
    gradient: "from-amber-500 to-orange-500",
    project: "School Management App",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-navy-light overflow-hidden" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Client Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Real Results for Real <span className="gradient-text">Businesses</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            500+ businesses across India trust Aiclex Solutions. Here&apos;s what
            some of them have to say about working with us.
          </p>

          {/* Google rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
              <span className="text-2xl">G</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm font-semibold">4.9 on Google · 120+ Reviews</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="card-hover glass rounded-2xl border border-white/5 p-6 flex flex-col"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={20} className="text-blue-400/40" />
              </div>

              {/* Stars */}
              <div className="mb-3">
                <StarRow count={t.rating} />
              </div>

              {/* Review */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Project tag */}
              <div className="mb-4">
                <span className="text-blue-400 text-xs font-semibold bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  {t.project}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                  <p className="text-slate-600 text-xs">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm mb-4">
            Join 500+ satisfied businesses. Your success story starts with one form.
          </p>
          <button
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gradient text-white font-semibold px-8 py-4 rounded-2xl text-base"
            id="testimonials-cta"
          >
            Start My App Project →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
