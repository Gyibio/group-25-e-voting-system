"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminElection } from "@/app/admin/page";

const CandidateForm = ({ elections }: { elections: AdminElection[] }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    position: "",
    faculty: "",
    motto: "",
    photo: "",
    election: elections[0]?._id ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // strip empty optional fields
    const body = { ...form };
    if (!body.photo) delete (body as Partial<typeof body>).photo;

    const res = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      return;
    }

    setSuccess(true);
    setForm({
      name: "",
      position: "",
      faculty: "",
      motto: "",
      photo: "",
      election: form.election, // keep the selected election for quick batch entry
    });
    router.refresh();
  };

  if (elections.length === 0) {
    return (
      <p className="text-sm text-dark/50">
        No elections exist yet. Create one first.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Election *</label>
        <select
          className="input w-full"
          value={form.election}
          onChange={(e) => setForm({ ...form, election: e.target.value })}
        >
          {elections.map((el) => (
            <option key={el._id} value={el._id}>
              {el.title} — {el.status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            required
            className="input w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Mensah"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Position *</label>
          <input
            required
            className="input w-full"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            placeholder="SRC President"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Faculty *</label>
        <input
          required
          className="input w-full"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
          placeholder="School of Engineering Sciences"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Motto *</label>
        <input
          required
          className="input w-full"
          value={form.motto}
          onChange={(e) => setForm({ ...form, motto: e.target.value })}
          placeholder="Excellence through service"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Photo URL <span className="text-dark/40 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          className="input w-full"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
          placeholder="https://…"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Candidate added successfully.</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Adding…" : "Add Candidate"}
      </button>
    </form>
  );
};

export default CandidateForm;
