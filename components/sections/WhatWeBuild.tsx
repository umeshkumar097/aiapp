"use client";

import { motion } from "framer-motion";
import {
  Building2, Utensils, Stethoscope, GraduationCap, Scissors, Dumbbell,
  Car, BarChart3, Factory, Bike, Calendar, ShoppingCart, ShoppingBag,
  Cog, Sparkles, Share2
} from "lucide-react";

const apps = [
  { label: "Real Estate App", icon: <Building2 size={24} className="text-blue-400" />, color: "from-blue-600/30 to-blue-700/10" },
  { label: "Restaurant App", icon: <Utensils size={24} className="text-orange-400" />, color: "from-orange-500/30 to-orange-600/10" },
  { label: "Doctor App", icon: <Stethoscope size={24} className="text-red-400" />, color: "from-red-500/30 to-red-600/10" },
  { label: "School App", icon: <GraduationCap size={24} className="text-green-400" />, color: "from-green-500/30 to-green-600/10" },
  { label: "Salon App", icon: <Scissors size={24} className="text-pink-400" />, color: "from-pink-500/30 to-pink-600/10" },
  { label: "Gym App", icon: <Dumbbell size={24} className="text-amber-400" />, color: "from-amber-500/30 to-amber-600/10" },
  { label: "Taxi App", icon: <Car size={24} className="text-yellow-400" />, color: "from-yellow-500/30 to-yellow-600/10" },
  { label: "CRM Software", icon: <BarChart3 size={24} className="text-indigo-400" />, color: "from-indigo-500/30 to-indigo-600/10" },
  { label: "ERP System", icon: <Factory size={24} className="text-slate-300" />, color: "from-slate-500/30 to-slate-600/10" },
  { label: "Food Delivery", icon: <Bike size={24} className="text-rose-400" />, color: "from-rose-500/30 to-rose-600/10" },
  { label: "Booking App", icon: <Calendar size={24} className="text-cyan-400" />, color: "from-cyan-500/30 to-cyan-600/10" },
  { label: "Marketplace", icon: <ShoppingCart size={24} className="text-violet-400" />, color: "from-violet-500/30 to-violet-600/10" },
  { label: "Ecommerce App", icon: <ShoppingBag size={24} className="text-purple-400" />, color: "from-purple-500/30 to-purple-600/10" },
  { label: "Business Automation", icon: <Cog size={24} className="text-teal-400" />, color: "from-teal-500/30 to-teal-600/10" },
  { label: "Custom Apps", icon: <Sparkles size={24} className="text-blue-400" />, color: "from-blue-500/30 to-blue-600/10" },
  { label: "Social Media App", icon: <Share2 size={24} className="text-emerald-400" />, color: "from-emerald-500/30 to-emerald-600/10" },
];

export default function WhatWeBuild() {
  return (
    <section className="section-padding bg-navy-light" aria-label="App categories we build">
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
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Apps for Every <span className="gradient-text">Business Category</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Whether you run a restaurant, hospital, school, or startup — we&apos;ve built
            successful apps for every industry. Your idea is next.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {apps.map((app, i) => (
            <motion.div
              key={app.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 4) * 0.06 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`group bg-gradient-to-br ${app.color} rounded-2xl p-4 border border-white/5 hover:border-white/15 transition-all duration-300 cursor-default`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {app.icon}
              </div>
              <p className="text-white font-semibold text-sm leading-snug">{app.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Don't see yours? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass rounded-3xl border border-white/10 p-6 text-center"
        >
          <p className="text-white font-bold text-lg mb-1">Don&apos;t see your industry?</p>
          <p className="text-slate-400 text-sm mb-4">
            We build custom mobile apps for any business category. Tell us your idea — we&apos;ll make it happen.
          </p>
          <button
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl text-sm"
            id="what-we-build-cta"
          >
            Discuss My Custom App →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
