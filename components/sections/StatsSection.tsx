"use client";

import { motion } from "framer-motion";
import { Users, Building2, Award, Clock } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Families", icon: <Users size={22} className="text-blue-600" /> },
  { value: "50+", label: "Projects Delivered", icon: <Building2 size={22} className="text-green-600" /> },
  { value: "98%", label: "On-Time Possession", icon: <Clock size={22} className="text-amber-500" /> },
  { value: "15+", label: "Years Experience", icon: <Award size={22} className="text-blue-600" /> },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-y border-slate-100 py-12" aria-label="Company statistics">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-3 border border-slate-100">
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
