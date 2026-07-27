"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";

const projects = [
  {
    developerName: "Skyline Developers",
    location: "Greater Noida West, UP",
    inventoryType: "Plots",
    totalUnits: "184",
    available: "113",
    booked: "67",
    sold: "4",
    gradient: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    badge: "Active on Siteboard",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    developerName: "Apex Group",
    location: "Sector 75, Noida, UP",
    inventoryType: "Apartments",
    totalUnits: "240",
    available: "98",
    booked: "120",
    sold: "22",
    gradient: "from-slate-50 to-slate-100",
    border: "border-slate-200",
    badge: "Active on Siteboard",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    developerName: "Terra Infra",
    location: "Yamuna Expressway, UP",
    inventoryType: "Houses + Commercial",
    totalUnits: "96",
    available: "44",
    booked: "38",
    sold: "14",
    gradient: "from-green-50 to-green-100",
    border: "border-green-200",
    badge: "Active on Siteboard",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-navy-light" aria-label="Developer case studies">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Powering Sales For
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Real Developers,{" "}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Builders across India use Siteboard to manage their plot, apartment, house, and commercial inventory in real-time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.developerName}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover shadow-sm"
            >
              {/* Color banner */}
              <div className={`bg-gradient-to-br ${project.gradient} border-b ${project.border} px-5 pt-5 pb-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-slate-900 font-black text-base">{project.developerName}</p>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                      <MapPin size={11} />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                </div>
                <span className="text-xs font-semibold bg-white/70 text-slate-700 px-2.5 py-1 rounded-full border border-white/80">
                  {project.inventoryType}
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-4 gap-2 text-center mb-4">
                  {[
                    { label: "Total", value: project.totalUnits, color: "text-slate-900" },
                    { label: "Available", value: project.available, color: "text-green-600" },
                    { label: "Booked", value: project.booked, color: "text-amber-500" },
                    { label: "Sold", value: project.sold, color: "text-red-500" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                      <p className="text-slate-400 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>Managed on Siteboard Dashboard</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
