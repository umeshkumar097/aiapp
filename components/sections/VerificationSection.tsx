"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Users, Zap } from "lucide-react";

const reasons = [
  {
    icon: <Shield size={22} className="text-blue-600" />,
    title: "Built for Indian Builders",
    desc: "Every feature is designed for the way Indian real estate developers actually work — plots, floors, towers, registry, and all.",
  },
  {
    icon: <Lock size={22} className="text-green-600" />,
    title: "Your Data is Yours",
    desc: "Your inventory, bookings, and customer data is fully private. We never share or expose it to any third party.",
  },
  {
    icon: <Users size={22} className="text-amber-500" />,
    title: "Roles for Everyone",
    desc: "Admin, Manager, Agent, Staff — each role sees exactly what they need. Full access control, zero confusion.",
  },
  {
    icon: <Zap size={22} className="text-blue-600" />,
    title: "No IT Setup Required",
    desc: "Cloud-based, browser-based, mobile-friendly. Just sign in and start. No server, no installation, no IT team.",
  },
];

export default function VerificationSection() {
  return (
    <section className="section-padding bg-white" aria-label="Why Siteboard">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Why Siteboard
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">
              Real Estate ERP Built
              <br />
              <span className="gradient-text">For Indian Developers</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              Siteboard is not a generic property portal. It is a purpose-built inventory management
              and sales CRM for real estate developers — from 20-plot layouts to 2,000-unit
              apartment towers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-3xl font-black text-blue-600 mb-1">500+</p>
                <p className="text-slate-600 text-sm">Developers onboarded Pan India</p>
              </div>
              <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-100">
                <p className="text-3xl font-black text-green-600 mb-1">Zero</p>
                <p className="text-slate-600 text-sm">Double bookings reported on platform</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm card-hover"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 border border-slate-100">
                  {r.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-1">{r.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
