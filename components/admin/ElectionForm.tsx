"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = ["upcoming", "active", "closed"] as const;

const ElectionForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "upcoming" as (typeof STATUS_OPTIONS)[number],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/elections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "Something went wrong");
      return;
    }

    setSuccess(true);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
    });
    // refresh server component data (election list in CandidateForm)
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          required
          className="input w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="SRC General Elections 2026"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="input w-full"
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional description…"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date *</label>
          <input
            required
            type="datetime-local"
            className="input w-full"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date *</label>
          <input
            required
            type="datetime-local"
            className="input w-full"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status *</label>
        <select
          className="input w-full"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as (typeof STATUS_OPTIONS)[number],
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

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Election created successfully.</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Creating…" : "Create Election"}
      </button>
    </form>
  );
};

export default ElectionForm;
