"use client";

import { motion } from "framer-motion";
import { UserPlus, FolderPlus, BarChart3, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus size={24} className="text-blue-600" />,
    title: "Create Your Account",
    description:
      "Sign up and set up your company profile in minutes. Add your team members, agents, and assign role-based access controls.",
  },
  {
    number: "02",
    icon: <FolderPlus size={24} className="text-green-600" />,
    title: "Add Your Projects & Inventory",
    description:
      "Create projects and upload your entire inventory — plots, apartments, houses, or commercial units — with pricing, area, and status.",
  },
  {
    number: "03",
    icon: <BarChart3 size={24} className="text-blue-600" />,
    title: "Manage Bookings in Real-time",
    description:
      "As leads come in, book units directly on the platform. Every booking is instantly reflected across your team — zero confusion.",
  },
  {
    number: "04",
    icon: <TrendingUp size={24} className="text-amber-500" />,
    title: "Track Sales & Collections",
    description:
      "Monitor payment milestones, pending collections, and project-wise sales performance — all from a single company dashboard.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-white" aria-label="How Siteboard works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Getting Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Up and Running in <span className="gradient-text">Under 1 Hour</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            No complex setup. No IT team needed. Just sign in and start managing your real estate empire.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-200 via-slate-200 to-amber-200"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center mx-auto mb-5 relative shadow-sm">
                {step.icon}
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
