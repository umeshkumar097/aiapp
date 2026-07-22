"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, DollarSign, TrendingUp, RefreshCw, Search,
  Download, LogOut, Shield, Phone, Mail, Calendar,
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

function StatCard({ title, value, icon, color }: {
  title: string; value: string | number; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm">{title}</span>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}

const statusColors: Record<string, string> = {
  PAID: "bg-green-500/20 text-green-400 border-green-500/30",
  PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  REFUNDED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "50",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await fetch(`/api/leads?${params}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [page, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const exportCSV = () => {
    if (!data?.leads) return;
    const headers = ["Name", "Phone", "Email", "Business", "Platform", "Budget", "Status", "Order ID", "Date"];
    const rows = data.leads.map((l) => [
      l.fullName, l.phone, l.email, l.businessName || "", l.platform,
      l.budget || "", l.paymentStatus, l.orderId || "",
      new Date(l.createdAt).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aiclex-leads-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="glass-dark border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base">Aiclex Admin</h1>
              <p className="text-slate-500 text-xs">Lead Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        {data?.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              title="Total Leads"
              value={data.stats.totalLeads}
              icon={<Users size={16} className="text-blue-400" />}
              color="bg-blue-500/20"
            />
            <StatCard
              title="Paid Leads"
              value={data.stats.paidLeads}
              icon={<TrendingUp size={16} className="text-green-400" />}
              color="bg-green-500/20"
            />
            <StatCard
              title="Revenue"
              value={`₹${((data.stats.totalRevenue || 0) / 100).toFixed(0)}`}
              icon={<DollarSign size={16} className="text-amber-400" />}
              color="bg-amber-500/20"
            />
            <StatCard
              title="Conversion"
              value={`${data.stats.totalLeads > 0 ? Math.round((data.stats.paidLeads / data.stats.totalLeads) * 100) : 0}%`}
              icon={<TrendingUp size={16} className="text-purple-400" />}
              color="bg-purple-500/20"
            />
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl border border-white/10 p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search name, email, phone..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  id="admin-search"
                />
              </div>
              <button
                type="submit"
                className="btn-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                Search
              </button>
            </form>

            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-blue-500"
              id="admin-status-filter"
            >
              <option value="" className="bg-slate-900">All Statuses</option>
              <option value="PAID" className="bg-slate-900">Paid</option>
              <option value="PENDING" className="bg-slate-900">Pending</option>
              <option value="REFUNDED" className="bg-slate-900">Refunded</option>
            </select>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 glass border border-white/10 hover:border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              id="admin-export"
            >
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-white/10 overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="animate-spin mx-auto mb-3" size={24} />
              Loading leads...
            </div>
          ) : !data?.leads?.length ? (
            <div className="p-8 text-center text-slate-400">
              No leads found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["Name", "Contact", "Platform", "Budget", "Status", "UTM Source", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/2"}`}
                    >
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{lead.fullName}</p>
                        <p className="text-slate-500 text-xs">{lead.businessName || lead.company || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:+91${lead.phone}`} className="flex items-center gap-1 text-slate-300 hover:text-white text-xs">
                          <Phone size={12} /> {lead.phone}
                        </a>
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-xs mt-0.5">
                          <Mail size={12} /> {lead.email.substring(0, 20)}...
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-slate-300 capitalize text-xs">{lead.platform}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{lead.budget || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${statusColors[lead.paymentStatus] || "text-slate-400"}`}>
                          {lead.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{lead.utmSource || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Calendar size={11} />
                          {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <p className="text-slate-500 text-xs">
                Showing {(page - 1) * 50 + 1}–{Math.min(page * 50, data.total)} of {data.total}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white disabled:opacity-40 hover:bg-white/10 transition-colors"
                >
                  ← Prev
                </button>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white disabled:opacity-40 hover:bg-white/10 transition-colors"
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
