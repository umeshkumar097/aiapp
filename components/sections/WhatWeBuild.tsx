"use client";

import { motion } from "framer-motion";
import { Home, Building2, TreePine, Store } from "lucide-react";

const propertyTypes = [
  {
    icon: <Home size={28} className="text-blue-600" />,
    type: "Plots & Land",
    tag: "Most Popular",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
    description:
      "Residential plots in approved townships and layouts. Secure your land in high-growth corridors with full legal documentation.",
    features: ["RERA Registered", "Clear Title", "Road Connectivity", "Utility Supply"],
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <Building2 size={28} className="text-slate-700" />,
    type: "Apartments",
    tag: "Best Value",
    tagColor: "bg-slate-100 text-slate-700 border-slate-200",
    description:
      "Premium 2BHK & 3BHK apartments in gated communities with world-class amenities and easy home loan eligibility.",
    features: ["2BHK & 3BHK", "Gated Community", "Lift & Power Backup", "Modern Amenities"],
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
  {
    icon: <TreePine size={28} className="text-green-600" />,
    type: "Villas & Houses",
    tag: "Luxury",
    tagColor: "bg-green-50 text-green-700 border-green-100",
    description:
      "Independent villas and luxury houses with private gardens, garages, and fully customizable floor plans.",
    features: ["Independent Unit", "Private Garden", "Car Parking", "Customizable Plan"],
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: <Store size={28} className="text-amber-600" />,
    type: "Commercial",
    tag: "High ROI",
    tagColor: "bg-amber-50 text-amber-700 border-amber-100",
    description:
      "Shops, offices, and commercial plots in high-footfall zones. Ideal for investors seeking rental income.",
    features: ["Retail & Office", "High Footfall Zone", "Rental Income", "Registered Deed"],
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section-padding bg-white" aria-label="Property types">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Properties
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Find the <span className="gradient-text">Right Property</span> for You
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            From affordable plots to luxury villas — we have every property type across India.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((prop, i) => (
            <motion.div
              key={prop.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl p-6 border card-hover ${prop.bg} ${prop.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-white/80 shadow-sm">
                  {prop.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${prop.tagColor}`}>
                  {prop.tag}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2">{prop.type}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{prop.description}</p>
              <ul className="space-y-1.5">
                {prop.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
