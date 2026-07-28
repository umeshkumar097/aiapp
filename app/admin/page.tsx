"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, TrendingUp, RefreshCw, Search, Download, LogOut,
  Shield, Phone, MessageCircle, Calendar, Trash2,
  CheckSquare, Square, ChevronDown, Building2, CalendarDays,
  AlertTriangle, FileText, Check, X as XIcon,
} from "lucide-react";
import type { Lead } from "@/types";

// ─── Types ─────────────────────────────────────────────────────
interface StatsData { totalLeads: number; paidLeads: number; todayLeads: number; }
interface LeadsResponse { leads: Lead[]; total: number; page: number; totalPages: number; stats: StatsData; }

// ─── CRM Stages ────────────────────────────────────────────────
const CRM_STAGES = [
  { value: "PENDING",       label: "New Lead",        emoji: "🆕", bg: "bg-slate-100",  text: "text-slate-700",  border: "border-slate-300",  dot: "bg-slate-400"  },
  { value: "CONTACTED",     label: "Called",          emoji: "📞", bg: "bg-blue-50",    text: "text-blue-700",   border: "border-blue-300",   dot: "bg-blue-500"   },
  { value: "NOT_CONNECTED", label: "Not Connected",   emoji: "📵", bg: "bg-orange-50",  text: "text-orange-700", border: "border-orange-300", dot: "bg-orange-500" },
  { value: "FOLLOW_UP",     label: "Follow Up",       emoji: "🔁", bg: "bg-yellow-50",  text: "text-yellow-700", border: "border-yellow-300", dot: "bg-yellow-500" },
  { value: "INTERESTED",    label: "Interested",      emoji: "✅", bg: "bg-teal-50",    text: "text-teal-700",   border: "border-teal-300",   dot: "bg-teal-500"   },
  { value: "QUALIFIED",     label: "Demo Scheduled",  emoji: "📅", bg: "bg-purple-50",  text: "text-purple-700", border: "border-purple-300", dot: "bg-purple-500" },
  { value: "PAID",          label: "Converted",       emoji: "🎉", bg: "bg-green-50",   text: "text-green-700",  border: "border-green-300",  dot: "bg-green-500"  },
  { value: "REFUNDED",      label: "Lost / Dropped",  emoji: "❌", bg: "bg-red-50",     text: "text-red-700",    border: "border-red-300",    dot: "bg-red-500"    },
];

function getStage(value: string) {
  return CRM_STAGES.find((s) => s.value === value) ?? CRM_STAGES[0];
}

// ─── Stat Card ─────────────────────────────────────────────────
function StatCard({ title, value, icon, bg, sub }: { title: string; value: string | number; icon: React.ReactNode; bg: string; sub?: string }) {
  return (
    <div className={`rounded-2xl p-5 border ${bg}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-slate-600">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Stage Badge + Dropdown ────────────────────────────────────
function StageDropdown({ lead, onUpdate }: { lead: Lead; onUpdate: (id: string, field: string, value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const stage = getStage(lead.paymentStatus);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = async (value: string) => {
    setOpen(false);
    if (value === lead.paymentStatus) return;
    setSaving(true);
    await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: lead.id, paymentStatus: value }) });
    onUpdate(lead.id, "paymentStatus", value);
    setSaving(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={saving}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${stage.bg} ${stage.text} ${stage.border} hover:opacity-80 disabled:opacity-60 whitespace-nowrap`}
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stage.dot}`} />
        {stage.label}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 top-9 z-30 bg-white rounded-xl border border-slate-200 shadow-2xl py-1 min-w-[180px]"
          >
            {CRM_STAGES.map((s) => (
              <button
                key={s.value}
                onClick={() => select(s.value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors text-left hover:bg-slate-50 ${s.value === lead.paymentStatus ? "bg-slate-50" : ""}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
                <span className="text-slate-700">{s.emoji} {s.label}</span>
                {s.value === lead.paymentStatus && <Check size={12} className="ml-auto text-blue-600" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Remark Cell ───────────────────────────────────────────────
function RemarkCell({ lead, onUpdate }: { lead: Lead; onUpdate: (id: string, field: string, value: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(lead.adminNotes || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: lead.id, adminNotes: value }) });
    onUpdate(lead.id, "adminNotes", value);
    setSaving(false);
    setEditing(false);
  };

  const cancel = () => { setValue(lead.adminNotes || ""); setEditing(false); };

  if (editing) {
    return (
      <div className="flex items-start gap-1 min-w-[180px]">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 text-xs border border-blue-400 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-slate-800 bg-white"
          rows={2}
          placeholder="Add remark..."
          autoFocus
          onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) save(); if (e.key === "Escape") cancel(); }}
        />
        <div className="flex flex-col gap-1">
          <button onClick={save} disabled={saving} className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center hover:bg-blue-700 disabled:opacity-60">
            {saving ? <RefreshCw size={10} className="animate-spin text-white" /> : <Check size={11} className="text-white" />}
          </button>
          <button onClick={cancel} className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center hover:bg-slate-200">
            <XIcon size={11} className="text-slate-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="group flex items-start gap-1.5 text-left w-full min-w-[140px] max-w-[200px]"
      title="Click to add/edit remark"
    >
      <FileText size={12} className="text-slate-300 group-hover:text-blue-500 mt-0.5 flex-shrink-0 transition-colors" />
      {value ? (
        <span className="text-slate-600 text-xs leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">{value}</span>
      ) : (
        <span className="text-slate-300 text-xs italic group-hover:text-blue-400 transition-colors">Add remark...</span>
      )}
    </button>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchLeads = useCallback(async (keepPage = false) => {
    setLoading(true);
    if (!keepPage) setSelected(new Set());
    try {
      const p = new URLSearchParams({ page: String(page), limit: "50", ...(search && { search }), ...(statusFilter && { status: statusFilter }) });
      const res = await fetch(`/api/leads?${p}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      setData(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search, statusFilter, router]);

  useEffect(() => { fetchLeads(); }, [page, statusFilter]); // eslint-disable-line

  // ── field update (optimistic) ─────
  const handleFieldUpdate = (id: string, field: string, value: string) => {
    setData((prev) => prev ? { ...prev, leads: prev.leads.map((l) => l.id === id ? { ...l, [field]: value } : l) } : prev);
  };

  // ── selection ─────────────────────
  const allIds = data?.leads.map((l) => l.id) ?? [];
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(allIds));
  const toggleOne = (id: string) => setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  // ── delete ────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    await fetch("/api/leads", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: Array.from(selected) }) });
    setDeleting(false);
    setShowDeleteConfirm(false);
    fetchLeads();
  };

  // ── export CSV ────────────────────
  const exportCSV = () => {
    if (!data?.leads) return;
    const rows = (selected.size > 0 ? data.leads.filter((l) => selected.has(l.id)) : data.leads);
    const csv = [
      ["Name", "Company", "Phone", "Email", "Inventory", "City", "Units", "Stage", "Remark", "Source", "Date"],
      ...rows.map((l) => [l.fullName, l.businessName || "", l.phone, l.email, l.platform, l.timeline || "", l.budget || "", getStage(l.paymentStatus).label, l.adminNotes || "", l.utmSource || "", new Date(l.createdAt).toLocaleDateString("en-IN")]),
    ].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `siteboard-leads-${Date.now()}.csv`; a.click();
  };

  const handleLogout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.push("/admin/login"); };

  // ── counts per stage for kanban header ──
  const stageCounts = CRM_STAGES.map((s) => ({
    ...s, count: data?.leads.filter((l) => l.paymentStatus === s.value).length ?? 0,
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-5 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-slate-900 font-black text-sm leading-tight">Siteboard CRM</p>
              <p className="text-slate-400 text-xs">Lead Management</p>
            </div>
          </div>

          {/* Filters inline */}
          <form
            onSubmit={(e) => { e.preventDefault(); setPage(1); fetchLeads(); }}
            className="hidden md:flex items-center gap-2 flex-1 max-w-lg"
          >
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search name, company, phone, email..."
                className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-4 py-2 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                id="admin-search"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              Search
            </button>
          </form>

          <div className="flex items-center gap-2">
            <button onClick={() => fetchLeads()} className="p-2 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors" aria-label="Refresh">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={exportCSV} className="hidden sm:flex items-center gap-1.5 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 text-sm px-3 py-2 rounded-xl transition-colors">
              <Download size={14} />
              Export
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-5">

        {/* ── Stats Row ── */}
        {data?.stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <StatCard title="Total Leads" value={data.stats.totalLeads} icon={<Users size={20} className="text-blue-600" />} bg="bg-blue-50 border-blue-100" sub="All time" />
            <StatCard title="Today's Leads" value={data.stats.todayLeads} icon={<CalendarDays size={20} className="text-green-600" />} bg="bg-green-50 border-green-100" sub="Last 24 hours" />
            <StatCard title="Converted" value={data.stats.paidLeads} icon={<TrendingUp size={20} className="text-purple-600" />} bg="bg-purple-50 border-purple-100" sub="Stage: Converted" />
            <StatCard title="Conversion %" value={`${data.stats.totalLeads > 0 ? Math.round((data.stats.paidLeads / data.stats.totalLeads) * 100) : 0}%`} icon={<TrendingUp size={20} className="text-amber-600" />} bg="bg-amber-50 border-amber-100" sub="Converted / Total" />
          </div>
        )}

        {/* ── Stage Filter Pills ── */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <button
            onClick={() => { setStatusFilter(""); setPage(1); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all whitespace-nowrap ${statusFilter === "" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
          >
            All ({data?.stats.totalLeads ?? 0})
          </button>
          {stageCounts.map((s) => (
            <button
              key={s.value}
              onClick={() => { setStatusFilter(s.value); setPage(1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all whitespace-nowrap ${statusFilter === s.value ? `${s.bg} ${s.text} ${s.border} shadow-sm` : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {s.label} {s.count > 0 && <span className="opacity-70">({s.count})</span>}
            </button>
          ))}
        </div>

        {/* ── Bulk bar ── */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-3"
            >
              <div className="flex items-center gap-3 bg-blue-600 rounded-xl px-4 py-2.5 text-white">
                <CheckSquare size={16} />
                <span className="text-sm font-semibold flex-1">{selected.size} selected</span>
                <button onClick={() => setSelected(new Set())} className="text-blue-200 hover:text-white text-xs transition-colors">Deselect all</button>
                <button onClick={exportCSV} className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                  <Download size={12} /> Export selected
                </button>
                <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  <Trash2 size={12} /> Delete ({selected.size})
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <RefreshCw size={26} className="animate-spin mb-3" />
              <p className="text-sm">Loading leads...</p>
            </div>
          ) : !data?.leads?.length ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-300">
              <Users size={36} className="mb-3" />
              <p className="text-slate-500 text-sm">No leads found.</p>
              {statusFilter && <button onClick={() => setStatusFilter("")} className="mt-2 text-blue-500 text-xs underline">Clear filter</button>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-100">
                    <th className="px-4 py-3 w-10">
                      <button onClick={toggleAll} className="text-slate-400 hover:text-blue-600 transition-colors">
                        {allSelected ? <CheckSquare size={17} className="text-blue-600" /> : <Square size={17} />}
                      </button>
                    </th>
                    {["Lead", "Contact", "Inventory Type", "Remark", "Stage", "Actions", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead, i) => {
                    const isSelected = selected.has(lead.id);
                    const stage = getStage(lead.paymentStatus);
                    const waText = encodeURIComponent(`Hi ${lead.fullName?.split(" ")[0] || ""}, I'm calling from Siteboard. You recently requested a demo for ${lead.platform || "inventory management"}. When is a good time to connect?`);
                    const waLink = `https://wa.me/91${lead.phone}?text=${waText}`;
                    return (
                      <tr
                        key={lead.id}
                        className={`border-b border-slate-100 transition-colors group ${isSelected ? "bg-blue-50/70" : i % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-blue-50/50`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-3.5">
                          <button onClick={() => toggleOne(lead.id)} className="text-slate-300 hover:text-blue-600 transition-colors">
                            {isSelected ? <CheckSquare size={17} className="text-blue-600" /> : <Square size={17} />}
                          </button>
                        </td>

                        {/* Lead info */}
                        <td className="px-4 py-3.5 min-w-[160px] max-w-[200px]">
                          <p className="font-bold text-slate-900 text-sm leading-tight truncate">
                            {lead.fullName || <span className="text-slate-300 italic">No name</span>}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Building2 size={10} className="text-slate-400 flex-shrink-0" />
                            <p className="text-slate-500 text-xs truncate">{lead.businessName || "—"}</p>
                          </div>
                          {lead.timeline && (
                            <p className="text-slate-400 text-[11px] mt-0.5">📍 {lead.timeline}</p>
                          )}
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3.5 min-w-[150px]">
                          <p className="text-slate-800 font-medium text-sm">+91 {lead.phone}</p>
                          <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[150px]">{lead.email}</p>
                        </td>

                        {/* Inventory type */}
                        <td className="px-4 py-3.5">
                          <div>
                            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold px-2 py-1 rounded-lg capitalize">
                              {lead.platform || "—"}
                            </span>
                            {lead.budget && (
                              <p className="text-slate-400 text-[11px] mt-1">{lead.budget}</p>
                            )}
                          </div>
                        </td>

                        {/* Remark */}
                        <td className="px-4 py-3.5">
                          <RemarkCell lead={lead} onUpdate={handleFieldUpdate} />
                        </td>

                        {/* Stage */}
                        <td className="px-4 py-3.5">
                          <StageDropdown lead={lead} onUpdate={handleFieldUpdate} />
                          <div className={`inline-flex items-center gap-1 text-[10px] font-medium mt-1.5 px-1.5 py-0.5 rounded ${stage.bg} ${stage.text}`}>
                            {stage.emoji} {stage.label}
                          </div>
                        </td>

                        {/* Actions — Call + WhatsApp */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:+91${lead.phone}`}
                              title={`Call ${lead.fullName}`}
                              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
                              id={`call-${lead.id}`}
                            >
                              <Phone size={13} />
                              Call
                            </a>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`WhatsApp ${lead.fullName}`}
                              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
                              id={`wa-${lead.id}`}
                            >
                              <MessageCircle size={13} />
                              WhatsApp
                            </a>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="flex items-center gap-1 text-slate-400 text-xs">
                            <Calendar size={11} />
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                          {lead.utmSource && (
                            <p className="text-[10px] text-slate-300 mt-0.5">{lead.utmSource}</p>
                          )}
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
              <p className="text-slate-500 text-xs">
                Showing {(page - 1) * 50 + 1}–{Math.min(page * 50, data.total)} of <strong>{data.total}</strong> leads
              </p>
              <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors">← Prev</button>
                <span className="text-xs text-slate-400 px-1">{page} / {data.totalPages}</span>
                <button disabled={page === data.totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-white transition-colors">Next →</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Delete confirm modal ── */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <AlertTriangle size={22} className="text-red-500" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">Delete {selected.size} Lead{selected.size > 1 ? "s" : ""}?</h3>
                <p className="text-slate-500 text-sm mb-5">This action cannot be undone. These records will be permanently deleted.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                    {deleting ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
