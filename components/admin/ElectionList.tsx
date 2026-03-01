"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { AdminElection } from "@/app/admin/page";

type Candidate = {
  _id: string;
  name: string;
  position: string;
  faculty: string;
};

const STATUS_OPTIONS = ["upcoming", "active", "closed"] as const;

const STATUS_COLORS: Record<AdminElection["status"], string> = {
  upcoming: "bg-warning-light text-warning-dark",
  active: "bg-success-light text-success-dark",
  closed: "bg-dark/10 text-dark/60",
};

// ─── Single election row ──────────────────────────────────────────────────────
const ElectionRow = ({
  election,
  onUpdated,
  onDeleted,
}: {
  election: AdminElection;
  onUpdated: (updated: AdminElection) => void;
  onDeleted: (id: string) => void;
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // edit state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<AdminElection>(election);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // delete state
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ── Expand / load candidates ─────────────────────────────────────────────
  const handleExpand = async () => {
    if (!expanded && candidates === null) {
      setLoadingCandidates(true);
      const res = await fetch(`/api/candidates?election=${election._id}`);
      const data = await res.json();
      setCandidates(Array.isArray(data) ? data : []);
      setLoadingCandidates(false);
    }
    setExpanded((v) => !v);
  };

  // ── Save edits ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setEditError(null);
    const res = await fetch(`/api/elections/${election._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json();
      setEditError(body.error ?? "Failed to save");
      return;
    }
    setEditing(false);
    onUpdated(editForm);
    router.refresh();
  };

  // ── Delete election ──────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/elections/${election._id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (!res.ok) return;
    onDeleted(election._id);
    router.refresh();
  };

  // ── Delete candidate ─────────────────────────────────────────────────────
  const handleDeleteCandidate = async (candidateId: string) => {
    const res = await fetch(`/api/candidates/${candidateId}`, {
      method: "DELETE",
    });
    if (!res.ok) return;
    setCandidates((prev) => prev?.filter((c) => c._id !== candidateId) ?? []);
  };

  // helper — format ISO date string for datetime-local input
  const toDatetimeLocal = (iso: string) =>
    iso ? new Date(iso).toISOString().slice(0, 16) : "";

  return (
    <div className="border border-dark/20 rounded-lg overflow-hidden">
      {/* ── Header row ── */}
      <div className="flex items-center gap-3 p-4 bg-white flex-wrap">
        {/* expand toggle */}
        <button
          onClick={handleExpand}
          className="text-dark/40 hover:text-dark transition-colors"
          aria-label="Toggle candidates"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{election.title}</p>
          <p className="text-xs text-dark/40">
            {new Date(election.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {" → "}
            {new Date(election.endDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[election.status]}`}
        >
          {election.status}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditing((v) => !v);
              setEditForm(election);
              setEditError(null);
            }}
            className="p-1.5 rounded hover:bg-primary-light text-dark/50 hover:text-primary transition-colors"
            aria-label="Edit"
          >
            <Pencil size={15} />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-1.5 rounded bg-error-light text-error-dark hover:bg-error hover:text-white transition-colors"
                aria-label="Confirm delete"
              >
                {deleting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Check size={15} />
                )}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="p-1.5 rounded hover:bg-dark/10 text-dark/50 transition-colors"
                aria-label="Cancel"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded hover:bg-error-light text-dark/50 hover:text-error-dark transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ── Inline edit form ── */}
      {editing && (
        <div className="border-t border-dark/10 bg-bg p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Title</label>
            <input
              className="input w-full"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              className="input w-full"
              rows={2}
              value={editForm.description ?? ""}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                className="input w-full"
                value={toDatetimeLocal(editForm.startDate)}
                onChange={(e) =>
                  setEditForm({ ...editForm, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">End Date</label>
              <input
                type="datetime-local"
                className="input w-full"
                value={toDatetimeLocal(editForm.endDate)}
                onChange={(e) =>
                  setEditForm({ ...editForm, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <select
              className="input w-full"
              value={editForm.status}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  status: e.target.value as AdminElection["status"],
                })
              }
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {editError && <p className="text-xs text-error">{editError}</p>}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 text-sm rounded-lg border border-dark/20 hover:bg-dark/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary px-3 py-1.5 text-sm"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* ── Candidates list ── */}
      {expanded && (
        <div className="border-t border-dark/10 bg-bg">
          {loadingCandidates ? (
            <div className="flex items-center gap-2 p-4 text-sm text-dark/50">
              <Loader2 size={14} className="animate-spin" />
              Loading candidates…
            </div>
          ) : candidates && candidates.length === 0 ? (
            <p className="p-4 text-sm text-dark/40">
              No candidates for this election.
            </p>
          ) : (
            <ul className="divide-y divide-dark/10">
              {candidates?.map((c) => (
                <li
                  key={c._id}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-dark/40 mx-2">·</span>
                    <span className="text-dark/60">{c.position}</span>
                    <span className="text-dark/30 mx-2 hidden sm:inline">
                      ·
                    </span>
                    <span className="text-dark/40 hidden sm:inline">
                      {c.faculty}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteCandidate(c._id)}
                    className="p-1 rounded hover:bg-error-light text-dark/30 hover:text-error-dark transition-colors shrink-0"
                    aria-label={`Remove ${c.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main list ────────────────────────────────────────────────────────────────
const ElectionList = ({
  elections: initial,
}: {
  elections: AdminElection[];
}) => {
  const [elections, setElections] = useState<AdminElection[]>(initial);

  const handleUpdated = (updated: AdminElection) =>
    setElections((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e)),
    );

  const handleDeleted = (id: string) =>
    setElections((prev) => prev.filter((e) => e._id !== id));

  if (elections.length === 0) {
    return (
      <p className="text-sm text-dark/50">
        No elections have been created yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {elections.map((el) => (
        <ElectionRow
          key={el._id}
          election={el}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />
      ))}
    </div>
  );
};

export default ElectionList;
