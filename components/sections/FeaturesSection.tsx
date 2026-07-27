"use client";

import { motion } from "framer-motion";
import { Shield, FileCheck, MapPin, CreditCard, Wrench, Headphones } from "lucide-react";

const features = [
  {
    icon: <Shield size={24} className="text-blue-600" />,
    title: "RERA Approved",
    description:
      "All our projects are registered under RERA, ensuring complete legal protection and transparency for every buyer.",
  },
  {
    icon: <FileCheck size={24} className="text-green-600" />,
    title: "100% Legal Clearance",
    description:
      "Every property comes with clear titles, verified documents, and zero legal disputes — buy with total peace of mind.",
  },
  {
    icon: <MapPin size={24} className="text-amber-500" />,
    title: "Prime Locations",
    description:
      "Properties in well-connected, developing corridors across India with high appreciation potential.",
  },
  {
    icon: <CreditCard size={24} className="text-blue-600" />,
    title: "Flexible Payment Plans",
    description:
      "Easy EMI options, construction-linked plans, and bank loan assistance to make your investment stress-free.",
  },
  {
    icon: <Wrench size={24} className="text-green-600" />,
    title: "Premium Amenities",
    description:
      "24/7 security, landscaped parks, clubhouse, wide roads, and all modern infrastructure from day one.",
  },
  {
    icon: <Headphones size={24} className="text-blue-600" />,
    title: "Dedicated Support",
    description:
      "A dedicated relationship manager for every buyer — from site visit to possession and beyond.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-navy-light" aria-label="Features and benefits">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Why Siteboard
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Built on <span className="gradient-text">Trust & Transparency</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Everything you need to make the most confident property decision of your life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 card-hover border border-slate-200"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
