"use client";

import { motion } from "framer-motion";
import { Shield, FileCheck, Award, Users } from "lucide-react";

const reasons = [
  {
    icon: <Shield size={22} className="text-blue-600" />,
    title: "RERA Compliant",
    desc: "Every project is RERA registered. Your investment is legally protected by law.",
  },
  {
    icon: <FileCheck size={22} className="text-green-600" />,
    title: "Clear Legal Title",
    desc: "Zero encumbrances, zero disputes. Our legal team verifies every inch of the property.",
  },
  {
    icon: <Award size={22} className="text-amber-500" />,
    title: "15+ Years of Trust",
    desc: "Over a decade of delivering properties on time with complete transparency.",
  },
  {
    icon: <Users size={22} className="text-blue-600" />,
    title: "Dedicated Manager",
    desc: "One point of contact from enquiry to possession. You're never left guessing.",
  },
];

export default function VerificationSection() {
  return (
    <section className="section-padding bg-navy-light" aria-label="Why choose Siteboard">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Our Promise
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight">
              India&apos;s Most <span className="gradient-text">Trusted</span>
              <br />
              Real Estate Platform
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              Siteboard by Aiclex Technologies is not just a property marketplace — we are your
              trusted partner from the first enquiry to getting your keys. Every property we
              list passes our 20-point legal and quality check.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-3xl font-black text-blue-600 mb-1">500+</p>
                <p className="text-slate-600 text-sm">Families served Pan India</p>
              </div>
              <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-100">
                <p className="text-3xl font-black text-green-600 mb-1">98%</p>
                <p className="text-slate-600 text-sm">On-time possession rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
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
