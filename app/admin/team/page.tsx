"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, Edit2, Trash2, Phone, Mail, RefreshCw,
  Shield, LogOut, CheckCircle2, XCircle, Check, X as XIcon,
  ChevronDown, UserCircle2,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  role: string;
  active: boolean;
  color: string;
  createdAt: string;
}

const ROLES = [
  { value: "admin",   label: "Admin",   color: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "manager", label: "Manager", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "agent",   label: "Agent",   color: "bg-green-100 text-green-700 border-green-200" },
];

const AVATAR_COLORS = [
  "#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981","#ef4444","#06b6d4","#f97316",
];

function getRoleConfig(role: string) {
  return ROLES.find((r) => r.value === role) ?? ROLES[2];
}

function Avatar({ name, color, size = 36 }: { name: string; color: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

// ── Add/Edit Member Form ──────────────────────────────────────
function MemberForm({ member, onSave, onCancel }: {
  member?: TeamMember | null;
  onSave: (data: Partial<TeamMember>) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(member?.name || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [email, setEmail] = useState(member?.email || "");
  const [role, setRole] = useState(member?.role || "agent");
  const [color, setColor] = useState(member?.color || AVATAR_COLORS[0]);
  const [saving, setSaving] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await onSave({ name: name.trim(), phone: phone || null, email: email || null, role, color });
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 mb-4">
      <h3 className="text-slate-900 font-bold text-base mb-4">
        {member ? "Edit Team Member" : "Add New Team Member"}
      </h3>

      {/* Avatar preview + color picker */}
      <div className="flex items-center gap-3 mb-5">
        <Avatar name={name || "?"} color={color} size={48} />
        <div>
          <p className="text-xs text-slate-500 mb-1.5 font-medium">Avatar Color</p>
          <div className="flex gap-1.5">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full transition-all border-2 ${color === c ? "border-slate-900 scale-110" : "border-transparent"}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rahul Sharma"
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoFocus
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9XXXXXXXXX"
            maxLength={10}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rahul@siteboard.in"
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="relative">
          <label className="text-xs font-semibold text-slate-600 block mb-1">Role</label>
          <button
            onClick={() => setRoleOpen((v) => !v)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none flex items-center justify-between bg-white"
          >
            <span>{getRoleConfig(role).label}</span>
            <ChevronDown size={14} className={`transition-transform ${roleOpen ? "rotate-180" : ""}`} />
          </button>
          {roleOpen && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 w-full py-1">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => { setRole(r.value); setRoleOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 text-left ${r.value === role ? "font-semibold" : ""}`}
                >
                  {role === r.value && <Check size={13} className="text-blue-600" />}
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={onCancel} className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
          {member ? "Save Changes" : "Add Member"}
        </button>
      </div>
    </div>
  );
}

// ── Team Page ─────────────────────────────────────────────────
export default function TeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/team");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setMembers(data.members || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleAdd = async (data: Partial<TeamMember>) => {
    await fetch("/api/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setShowForm(false);
    fetchMembers();
  };

  const handleEdit = async (data: Partial<TeamMember>) => {
    await fetch("/api/team", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingMember!.id, ...data }) });
    setEditingMember(null);
    fetchMembers();
  };

  const handleToggleActive = async (member: TeamMember) => {
    await fetch("/api/team", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: member.id, active: !member.active }) });
    fetchMembers();
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    await fetch("/api/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleteConfirm.id }) });
    setDeleting(false);
    setDeleteConfirm(null);
    fetchMembers();
  };

  const handleLogout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.push("/admin/login"); };

  const activeCount = members.filter((m) => m.active).length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-5 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-slate-900 font-black text-sm">Siteboard CRM</p>
              <p className="text-slate-400 text-xs">Team Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Nav tabs */}
            <a href="/admin" className="text-slate-500 hover:text-blue-600 text-sm px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors font-medium">
              Leads
            </a>
            <span className="text-sm px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold">
              Team
            </span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-slate-900 font-black text-xl">Team Members</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {activeCount} active · {members.length} total
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingMember(null); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>

        {/* Add form */}
        <AnimatePresence>
          {(showForm || editingMember) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <MemberForm
                member={editingMember}
                onSave={editingMember ? handleEdit : handleAdd}
                onCancel={() => { setShowForm(false); setEditingMember(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Members list */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <RefreshCw size={24} className="animate-spin mr-2" />
            Loading team...
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <UserCircle2 size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No team members yet</p>
            <p className="text-slate-400 text-sm mt-1">Add your first team member to start tracking calls.</p>
            <button onClick={() => setShowForm(true)} className="mt-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
              + Add Member
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((member) => {
              const roleConfig = getRoleConfig(member.role);
              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${member.active ? "border-slate-200" : "border-slate-100 opacity-60"}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar name={member.name} color={member.color} size={44} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-slate-900 font-bold text-base">{member.name}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roleConfig.color}`}>
                          {roleConfig.label}
                        </span>
                        {!member.active && (
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Inactive</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                        {member.phone && (
                          <a href={`tel:+91${member.phone}`} className="flex items-center gap-1 text-slate-500 hover:text-blue-600 text-xs transition-colors">
                            <Phone size={11} /> +91 {member.phone}
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs transition-colors">
                            <Mail size={11} /> {member.email}
                          </a>
                        )}
                        <span className="text-slate-300 text-xs">
                          Added {new Date(member.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleToggleActive(member)}
                        title={member.active ? "Deactivate" : "Activate"}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${member.active ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}
                      >
                        {member.active ? <><CheckCircle2 size={13} /> Active</> : <><XCircle size={13} /> Inactive</>}
                      </button>
                      <button
                        onClick={() => { setEditingMember(member); setShowForm(false); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(member)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Usage instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
            <Users size={16} /> How team tracking works in Lead CRM
          </h3>
          <ul className="space-y-2 text-blue-800 text-xs">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center font-bold flex-shrink-0 text-blue-800 mt-0.5">1</span>
              Go to <a href="/admin" className="underline font-semibold">/admin → Leads</a> and open any lead's activity log
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center font-bold flex-shrink-0 text-blue-800 mt-0.5">2</span>
              Select <strong>your name</strong> from the "Logged by" dropdown before adding a note
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center font-bold flex-shrink-0 text-blue-800 mt-0.5">3</span>
              Each activity log entry shows: <strong>note + timestamp + team member name</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center font-bold flex-shrink-0 text-blue-800 mt-0.5">4</span>
              Full history is preserved — kabhi bhi dekh sakte ho kaun kab baat kiya
            </li>
          </ul>
        </div>
      </main>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={deleteConfirm.name} color={deleteConfirm.color} size={40} />
                  <div>
                    <p className="text-slate-900 font-bold">{deleteConfirm.name}</p>
                    <p className="text-slate-400 text-xs">{getRoleConfig(deleteConfirm.role).label}</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-1 font-semibold">Remove this team member?</p>
                <p className="text-slate-500 text-sm mb-5">Their activity logs in leads will still be visible. This only removes them from the team list.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                    {deleting ? <RefreshCw size={13} className="animate-spin" /> : <XIcon size={13} />} Remove
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
