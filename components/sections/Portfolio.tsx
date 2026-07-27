"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";

const projects = [
  {
    name: "Siteboard City Phase 1",
    location: "Greater Noida West, UP",
    type: "Plots",
    status: "Ready to Move",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    highlights: ["RERA Registered", "60 Ft Wide Roads", "Park & Clubhouse", "Gate with Security"],
    gradient: "from-blue-50 to-blue-100",
  },
  {
    name: "Siteboard Residency",
    location: "Noida Extension, UP",
    type: "Apartments",
    status: "Under Construction",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    highlights: ["2BHK & 3BHK", "Rooftop Garden", "EV Charging", "24/7 CCTV"],
    gradient: "from-slate-50 to-slate-100",
  },
  {
    name: "Siteboard Green Villas",
    location: "Yamuna Expressway, UP",
    type: "Villas",
    status: "New Launch",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    highlights: ["Independent Villas", "Private Pool Option", "Vastu Compliant", "Bank Loan Ready"],
    gradient: "from-green-50 to-green-100",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-navy-light" aria-label="Featured projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            <span className="gradient-text">Featured</span> Developments
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Handpicked projects with the best location, legal clarity, and long-term value.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover shadow-sm"
            >
              {/* Color banner */}
              <div className={`bg-gradient-to-br ${project.gradient} h-36 relative flex items-center justify-center`}>
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-300 select-none">
                    {project.type[0]}
                  </p>
                </div>
                <span
                  className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border ${project.statusColor}`}
                >
                  {project.status}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-semibold bg-white/80 text-slate-700 px-2.5 py-1 rounded-full border border-white">
                  {project.type}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-slate-900 font-bold text-base mb-1">{project.name}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <MapPin size={13} />
                  <span>{project.location}</span>
                </div>
                <ul className="grid grid-cols-2 gap-1.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
