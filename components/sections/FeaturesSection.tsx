"use client";

import { motion } from "framer-motion";
import { Map, ShieldCheck, FolderKanban, Lock, BookOpen, Eye } from "lucide-react";

const features = [
  {
    icon: <Map size={24} className="text-blue-600" />,
    title: "Visual Plot Map",
    description:
      "See your entire layout on an interactive map. Color-coded status — green for available, orange for booked, red for sold. Anyone can instantly see what&apos;s left.",
  },
  {
    icon: <FolderKanban size={24} className="text-green-600" />,
    title: "Project-Wise Management",
    description:
      "Manage multiple projects simultaneously. Each project has its own inventory, pricing, documents, and booking records — all in one place.",
  },
  {
    icon: <ShieldCheck size={24} className="text-blue-600" />,
    title: "Zero Double Booking",
    description:
      "The moment a unit is booked, it's instantly locked across all channels. No more accidental duplicate bookings by agents or staff.",
  },
  {
    icon: <BookOpen size={24} className="text-amber-500" />,
    title: "Booking Management",
    description:
      "Full booking lifecycle — from initial token to final registry. Track payment milestones, due dates, and customer documents in one timeline.",
  },
  {
    icon: <Eye size={24} className="text-green-600" />,
    title: "Agent View-Only Access",
    description:
      "Give your channel partners and agents a read-only view of live inventory. They see what&apos;s available — nothing more, nothing less.",
  },
  {
    icon: <Lock size={24} className="text-blue-600" />,
    title: "Company-Level Control",
    description:
      "Full admin control for your company. Set roles, restrict access by project, and audit every action your staff and agents take.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-navy-light" aria-label="Platform features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Everything a Builder Needs —<br />
            <span className="gradient-text">In One Dashboard</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Built specifically for Indian real estate developers managing plots, apartments, houses, and commercial spaces.
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
              className="bg-white rounded-2xl p-6 card-hover border border-slate-200 shadow-sm"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2">{feature.title}</h3>
              <p
                className="text-slate-500 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
