"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Building2, Smartphone, Trophy, Smile, Globe2 } from "lucide-react";

const stats = [
  { end: 500, suffix: "+", label: "Businesses Served", icon: <Building2 size={22} className="text-blue-400" />, color: "from-blue-500/20 to-blue-700/10" },
  { end: 650, suffix: "+", label: "Projects Completed", icon: <Smartphone size={22} className="text-purple-400" />, color: "from-purple-500/20 to-purple-700/10" },
  { end: 5, suffix: "+", label: "Years Experience", icon: <Trophy size={22} className="text-amber-400" />, color: "from-amber-500/20 to-amber-700/10" },
  { end: 98, suffix: "%", label: "Happy Clients", icon: <Smile size={22} className="text-green-400" />, color: "from-green-500/20 to-green-700/10" },
  { end: 12, suffix: "+", label: "Countries", icon: <Globe2 size={22} className="text-pink-400" />, color: "from-pink-500/20 to-pink-700/10" },
];

export default function StatsSection() {
  return (
    <section className="section-padding bg-navy-light relative overflow-hidden" aria-label="Statistics">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Track Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Numbers That Speak for Themselves
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover glass rounded-2xl p-6 text-center border border-white/5 relative overflow-hidden group"
            >
              {/* Gradient bg on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>

              {/* Label */}
              <p className="text-slate-400 text-xs font-medium leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm">
            Join{" "}
            <span className="text-white font-semibold">500+ businesses</span> who trusted us with their app.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
