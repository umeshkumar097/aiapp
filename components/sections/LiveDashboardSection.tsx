"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, XCircle, LayoutGrid } from "lucide-react";

type PlotStatus = "available" | "booked" | "sold";

interface Plot {
  id: number;
  number: string;
  status: PlotStatus;
  area: string;
}

const generatePlots = (): Plot[] => {
  const plots: Plot[] = [];
  const statuses: PlotStatus[] = ["available", "available", "available", "booked", "booked", "sold"];
  for (let i = 1; i <= 48; i++) {
    const s = statuses[Math.floor(Math.random() * statuses.length)];
    plots.push({
      id: i,
      number: `P-${String(i).padStart(3, "0")}`,
      status: s,
      area: `${(Math.floor(Math.random() * 8) + 2) * 50} sq.ft`,
    });
  }
  return plots;
};

const statusConfig: Record<PlotStatus, { color: string; bg: string; border: string; label: string }> = {
  available: { color: "text-green-700", bg: "bg-green-50", border: "border-green-300", label: "Available" },
  booked:    { color: "text-amber-700", bg: "bg-amber-50",  border: "border-amber-300",  label: "Booked"    },
  sold:      { color: "text-red-700",   bg: "bg-red-50",    border: "border-red-300",    label: "Sold"      },
};

export default function LiveDashboardSection() {
  const [plots, setPlots] = useState<Plot[]>(generatePlots);
  const [activePlot, setActivePlot] = useState<Plot | null>(null);
  const [lastChanged, setLastChanged] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-animate random plot status changes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPlots((prev) => {
        const next = [...prev];
        const available = next.filter((p) => p.status === "available");
        if (available.length === 0) return prev;
        const target = available[Math.floor(Math.random() * available.length)];
        const newStatus: PlotStatus = Math.random() > 0.4 ? "booked" : "sold";
        next[target.id - 1] = { ...target, status: newStatus };
        setLastChanged(target.id);
        setTimeout(() => setLastChanged(null), 1200);
        return next;
      });
    }, 1800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const counts = {
    available: plots.filter((p) => p.status === "available").length,
    booked:    plots.filter((p) => p.status === "booked").length,
    sold:      plots.filter((p) => p.status === "sold").length,
  };

  return (
    <section
      className="section-padding overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #f0fdf4 100%)" }}
      aria-label="Live dashboard preview"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Live Preview
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Watch Your Inventory
            <br />
            <span className="gradient-text">Manage Itself — Live</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Real-time plot status updates. The moment a plot is booked, every screen reflects it instantly.
          </p>
        </motion.div>

        {/* 3D Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          className="w-full"
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            style={{ transform: "rotateX(4deg)", boxShadow: "0 40px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
          >
            {/* Browser chrome */}
            <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-slate-400 border border-slate-200 text-center font-medium">
                app.siteboard.in/company-admin/dashboard
              </div>
            </div>

            <div className="flex h-[520px] sm:h-[560px]">
              {/* Left Sidebar */}
              <div className="hidden sm:flex flex-col w-48 bg-slate-50 border-r border-slate-200 py-4 px-3 gap-1 flex-shrink-0">
                {[
                  { label: "Dashboard", active: false },
                  { label: "Leads", active: false },
                  { label: "Customers", active: false },
                ].map((item) => (
                  <div key={item.label} className={`px-3 py-2 rounded-lg text-xs font-medium text-slate-500`}>
                    {item.label}
                  </div>
                ))}
                <div className="px-3 py-1 mt-1">
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Inventory</p>
                </div>
                {[
                  { label: "Plots", active: true },
                  { label: "Apartments", active: false },
                  { label: "Houses", active: false },
                  { label: "Commercials", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                      item.active ? "bg-blue-600 text-white" : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-slate-900 font-black text-base">Kaishav Kunj — Plot Map</p>
                    <p className="text-slate-400 text-xs">Chhata Govardhan Main Road · Live Inventory</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-600 text-xs font-semibold">Live</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3 px-5 py-3 border-b border-slate-100">
                  {[
                    { label: "Total Plots", value: "48", color: "text-slate-900", icon: <LayoutGrid size={14} className="text-slate-500" /> },
                    { label: "Available",   value: String(counts.available), color: "text-green-600", icon: <CheckCircle size={14} className="text-green-500" /> },
                    { label: "Booked",      value: String(counts.booked),    color: "text-amber-600", icon: <Clock size={14} className="text-amber-500" /> },
                    { label: "Sold",        value: String(counts.sold),       color: "text-red-600",   icon: <XCircle size={14} className="text-red-500" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-center">
                      <div className="flex justify-center mb-1">{stat.icon}</div>
                      <AnimatePresence mode="popLayout">
                        <motion.p
                          key={stat.value}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-lg font-black ${stat.color}`}
                        >
                          {stat.value}
                        </motion.p>
                      </AnimatePresence>
                      <p className="text-slate-400 text-[10px] leading-none">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 px-5 py-2">
                  {(["available", "booked", "sold"] as PlotStatus[]).map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-sm border ${statusConfig[s].bg} ${statusConfig[s].border}`} />
                      <span className="text-slate-500 text-[11px] capitalize">{s}</span>
                    </div>
                  ))}
                </div>

                {/* Plot grid */}
                <div className="flex-1 overflow-auto px-5 pb-5">
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                    {plots.map((plot) => {
                      const cfg = statusConfig[plot.status];
                      const isChanging = lastChanged === plot.id;
                      return (
                        <motion.button
                          key={plot.id}
                          layout
                          animate={isChanging ? { scale: [1, 1.4, 1], zIndex: [0, 10, 0] } : { scale: 1 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          onClick={() => setActivePlot(activePlot?.id === plot.id ? null : plot)}
                          className={`relative aspect-square rounded-lg border-2 text-[9px] font-bold flex items-center justify-center transition-all cursor-pointer ${cfg.bg} ${cfg.border} ${cfg.color} hover:scale-110 hover:shadow-md`}
                          title={`${plot.number} · ${plot.area} · ${plot.status}`}
                        >
                          {plot.id}
                          {isChanging && (
                            <motion.div
                              initial={{ opacity: 0.8, scale: 0.5 }}
                              animate={{ opacity: 0, scale: 2.5 }}
                              transition={{ duration: 0.6 }}
                              className={`absolute inset-0 rounded-lg ${cfg.bg}`}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Tooltip on click */}
                  <AnimatePresence>
                    {activePlot && (
                      <motion.div
                        key={activePlot.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 bg-slate-900 text-white rounded-xl px-4 py-3 text-xs flex items-center gap-4"
                      >
                        <span className="font-bold text-sm">{activePlot.number}</span>
                        <span className="text-slate-300">{activePlot.area}</span>
                        <span className={`font-semibold px-2 py-0.5 rounded-full ${statusConfig[activePlot.status].bg} ${statusConfig[activePlot.status].color}`}>
                          {statusConfig[activePlot.status].label}
                        </span>
                        <button onClick={() => setActivePlot(null)} className="ml-auto text-slate-400 hover:text-white">✕</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below dashboard — live feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600"
        >
          {[
            { emoji: "🟢", text: "Green = Available for booking" },
            { emoji: "🟡", text: "Orange = Already booked" },
            { emoji: "🔴", text: "Red = Sold / Closed" },
            { emoji: "⚡", text: "Changes reflect instantly for all users" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-sm text-xs">
              <span>{item.emoji}</span>
              <span className="text-slate-600 font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
