"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, TrendingUp, RefreshCw, Search,
  Download, LogOut, Shield, Phone, Mail, Calendar,
  Trash2, CheckSquare, Square, ChevronDown, Building2,
  CalendarDays, AlertTriangle,
} from "lucide-react";
import type { Lead } from "@/types";

interface StatsData {
  totalLeads: number;
  paidLeads: number;
  totalRevenue: number;
  todayLeads: number;
}
interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  stats: StatsData;
}

// ── CRM status options ──────────────────────────────────────────
const CRM_STATUSES = [
  { value: "PENDING",   label: "New Lead",    dot: "bg-amber-400",  pill: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "CONTACTED", label: "Contacted",   dot: "bg-blue-400",   pill: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "QUALIFIED", label: "Qualified",   dot: "bg-purple-400", pill: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "PAID",      label: "Converted",   dot: "bg-green-500",  pill: "bg-green-50 text-green-700 border-green-200" },
  { value: "REFUNDED",  label: "Lost",        dot: "bg-red-400",    pill: "bg-red-50 text-red-700 border-red-200" },
];

function getStatusConfig(value: string) {
  return CRM_STATUSES.find((s) => s.value === value) ?? CRM_STATUSES[0];
}

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({ title, value, icon, color, sub }: {
  title: string; value: string | number; icon: React.ReactNode; color: string; sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-500 text-sm font-medium">{title}</span>
        <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ── Status Dropdown ────────────────────────────────────────────
function StatusDropdown({ lead, onUpdate }: { lead: Lead; onUpdate: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cfg = getStatusConfig(lead.paymentStatus);

  const handleSelect = async (value: string) => {
    setOpen(false);
    if (value === lead.paymentStatus) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, paymentStatus: value }),
      });
      onUpdate(lead.id, value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${cfg.pill} disabled:opacity-60`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="absolute left-0 top-8 z-20 bg-white rounded-xl border border-slate-200 shadow-xl py-1 min-w-[140px]"
            >
              {CRM_STATUSES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSelect(s.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-slate-50 transition-colors text-left ${
                    s.value === lead.paymentStatus ? "bg-slate-50" : ""
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  {s.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Selection state
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setSelected(new Set());
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "50",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await fetch(`/api/leads?${params}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      setData(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search, statusFilter, router]);

  useEffect(() => { fetchLeads(); }, [page, statusFilter]); // eslint-disable-line

  // ── selection helpers ─────────────────
  const allIds = data?.leads.map((l) => l.id) ?? [];
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allIds));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── status update ─────────────────────
  const handleStatusUpdate = (id: string, status: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        leads: prev.leads.map((l) =>
          l.id === id ? { ...l, paymentStatus: status } : l
        ),
      };
    });
  };

  // ── bulk delete ───────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      setShowDeleteConfirm(false);
      fetchLeads();
    } finally { setDeleting(false); }
  };

  // ── CSV export ────────────────────────
  const exportCSV = () => {
    if (!data?.leads) return;
    const leadsToExport = someSelected
      ? data.leads.filter((l) => selected.has(l.id))
      : data.leads;
    const headers = ["Name", "Company", "Phone", "Email", "Platform", "Budget", "City", "Status", "UTM Source", "Date"];
    const rows = leadsToExport.map((l) => [
      l.fullName, l.businessName || "", l.phone, l.email,
      l.platform, l.budget || "", l.timeline || "",
      l.paymentStatus, l.utmSource || "",
      new Date(l.createdAt).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `siteboard-leads-${Date.now()}.csv`;
    a.click();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-slate-900 font-black text-base">Siteboard Admin</h1>
              <p className="text-slate-400 text-xs">Lead Management CRM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
              aria-label="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Stats ── */}
        {data?.stats && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <StatCard
              title="Total Leads"
              value={data.stats.totalLeads}
              icon={<Users size={18} className="text-blue-600" />}
              color="bg-blue-50"
              sub="All time"
            />
            <StatCard
              title="Today's Leads"
              value={data.stats.todayLeads}
              icon={<CalendarDays size={18} className="text-green-600" />}
              color="bg-green-50"
              sub="Last 24 hours"
            />
            <StatCard
              title="Converted"
              value={data.stats.paidLeads}
              icon={<TrendingUp size={18} className="text-purple-600" />}
              color="bg-purple-50"
              sub="Status: Converted"
            />
            <StatCard
              title="Conversion Rate"
              value={`${data.stats.totalLeads > 0 ? Math.round((data.stats.paidLeads / data.stats.totalLeads) * 100) : 0}%`}
              icon={<Building2 size={18} className="text-amber-600" />}
              color="bg-amber-50"
              sub="Converted / Total"
            />
          </motion.div>
        )}

        {/* ── Filters + Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setPage(1); fetchLeads(); }}
              className="flex gap-2 flex-1"
            >
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search name, company, email, phone..."
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  id="admin-search"
                />
              </div>
              <button type="submit" className="btn-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                Search
              </button>
            </form>

            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:border-blue-500 bg-white"
              id="admin-status-filter"
            >
              <option value="">All Statuses</option>
              {CRM_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors bg-white"
              id="admin-export"
            >
              <Download size={15} />
              {someSelected ? `Export (${selected.size})` : "Export CSV"}
            </button>
          </div>
        </motion.div>

        {/* ── Bulk action bar ── */}
        <AnimatePresence>
          {someSelected && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-blue-600 rounded-2xl px-5 py-3 mb-4 text-white"
            >
              <CheckSquare size={18} />
              <span className="text-sm font-semibold flex-1">
                {selected.size} lead{selected.size > 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setSelected(new Set())}
                className="text-blue-200 hover:text-white text-sm transition-colors"
              >
                Deselect all
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
              >
                <Trash2 size={14} />
                Delete ({selected.size})
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Delete confirm modal ── */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setShowDeleteConfirm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                    <AlertTriangle size={22} className="text-red-500" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">Delete {selected.size} Lead{selected.size > 1 ? "s" : ""}?</h3>
                  <p className="text-slate-500 text-sm mb-5">This action cannot be undone. These leads will be permanently deleted.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {deleting ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      {deleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <RefreshCw className="animate-spin mx-auto mb-3" size={24} />
              <p className="text-sm">Loading leads...</p>
            </div>
          ) : !data?.leads?.length ? (
            <div className="p-12 text-center text-slate-400">
              <Users size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No leads found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">
                    {/* Select all checkbox */}
                    <th className="px-4 py-3 w-10">
                      <button onClick={toggleAll} className="text-slate-400 hover:text-blue-600 transition-colors">
                        {allSelected
                          ? <CheckSquare size={17} className="text-blue-600" />
                          : <Square size={17} />}
                      </button>
                    </th>
                    {["Name & Company", "Contact", "Inventory", "City / Units", "Status", "Source", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead, i) => {
                    const isSelected = selected.has(lead.id);
                    return (
                      <tr
                        key={lead.id}
                        className={`border-b border-slate-100 transition-colors ${
                          isSelected ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                        } hover:bg-blue-50/60`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleOne(lead.id)}
                            className="text-slate-300 hover:text-blue-600 transition-colors"
                          >
                            {isSelected
                              ? <CheckSquare size={17} className="text-blue-600" />
                              : <Square size={17} />}
                          </button>
                        </td>

                        {/* Name & Company */}
                        <td className="px-4 py-3 min-w-[160px]">
                          <p className="text-slate-900 font-semibold text-sm leading-tight">
                            {lead.fullName || "—"}
                          </p>
                          <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                            <Building2 size={10} />
                            {lead.businessName || "—"}
                          </p>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3 min-w-[160px]">
                          <a
                            href={`tel:+91${lead.phone}`}
                            className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 text-xs font-medium transition-colors"
                          >
                            <Phone size={11} className="text-slate-400" />
                            {lead.phone}
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-xs mt-0.5 transition-colors"
                          >
                            <Mail size={11} />
                            {lead.email?.length > 22 ? lead.email.substring(0, 22) + "…" : lead.email}
                          </a>
                        </td>

                        {/* Platform / Inventory type */}
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded-lg capitalize">
                            {lead.platform || "—"}
                          </span>
                        </td>

                        {/* City / Units (timeline = city, budget = unitCount) */}
                        <td className="px-4 py-3 min-w-[100px]">
                          <p className="text-slate-700 text-xs">{lead.timeline || "—"}</p>
                          <p className="text-slate-400 text-xs">{lead.budget || "—"}</p>
                        </td>

                        {/* Status dropdown */}
                        <td className="px-4 py-3">
                          <StatusDropdown lead={lead} onUpdate={handleStatusUpdate} />
                        </td>

                        {/* UTM Source */}
                        <td className="px-4 py-3 text-slate-400 text-xs">
                          {lead.utmSource || "—"}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-slate-400 text-xs whitespace-nowrap">
                            <Calendar size={11} />
                            {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-slate-400 text-xs">
                Showing {(page - 1) * 50 + 1}–{Math.min(page * 50, data.total)} of {data.total} leads
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors"
                >
                  ← Prev
                </button>
                <span className="px-3 py-1.5 text-xs text-slate-500">
                  {page} / {data.totalPages}
                </span>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
