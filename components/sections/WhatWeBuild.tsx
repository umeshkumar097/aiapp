"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Building2, Home, Store } from "lucide-react";

const inventoryTypes = [
  {
    icon: <LayoutGrid size={28} className="text-blue-600" />,
    type: "Plots",
    tag: "Most Popular",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
    description:
      "Manage residential and commercial plot layouts. Track every plot number, area, facing, and status with a visual color-coded map.",
    features: ["Plot No. & Area", "Color-coded Map", "Facing & Corner Units", "Booking & Registry"],
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <Building2 size={28} className="text-slate-700" />,
    type: "Apartments",
    tag: "Multi-Tower",
    tagColor: "bg-slate-100 text-slate-700 border-slate-200",
    description:
      "Tower, floor, and flat-level inventory. Track 2BHK, 3BHK, penthouses — with unit-wise pricing, bookings, and customer linkage.",
    features: ["Tower & Floor View", "Flat Type Mapping", "Unit-wise Pricing", "Payment Milestones"],
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
  {
    icon: <Home size={28} className="text-green-600" />,
    type: "Houses",
    tag: "Independent",
    tagColor: "bg-green-50 text-green-700 border-green-100",
    description:
      "Manage independent houses and villas in your township. Track plot sizes, built-up area, BHK type, and possession status.",
    features: ["Villa / Row House", "Built-up Area", "Possession Status", "Customer History"],
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: <Store size={28} className="text-amber-600" />,
    type: "Commercials",
    tag: "High ROI",
    tagColor: "bg-amber-50 text-amber-700 border-amber-100",
    description:
      "Shops, offices, and showrooms. Track unit dimensions, floor, booking status, and lease vs. sale details in one module.",
    features: ["Shops & Offices", "Floor & Unit No.", "Lease / Sale Mode", "Booking Records"],
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section-padding bg-white" aria-label="Inventory management modules">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Inventory Modules
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Manage <span className="gradient-text">Every Type</span> of Property
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Whether you build plots, apartments, houses, or commercial spaces — Siteboard has a dedicated module for each.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inventoryTypes.map((inv, i) => (
            <motion.div
              key={inv.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl p-6 border card-hover ${inv.bg} ${inv.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-white/80 shadow-sm">
                  {inv.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${inv.tagColor}`}>
                  {inv.tag}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2">{inv.type}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{inv.description}</p>
              <ul className="space-y-1.5">
                {inv.features.map((f) => (
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
