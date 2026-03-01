"use client";

import { useState } from "react";
import ElectionForm from "./ElectionForm";
import CandidateForm from "./CandidateForm";
import ElectionList from "./ElectionList";
import { AdminElection } from "@/app/admin/page";

const TABS = ["Elections", "Candidates", "Manage"] as const;
type Tab = (typeof TABS)[number];

const AdminClient = ({ elections }: { elections: AdminElection[] }) => {
  const [tab, setTab] = useState<Tab>("Manage");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-dark/20 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
              tab === t
                ? "border border-b-white border-dark/20 -mb-px bg-white text-primary"
                : "text-dark/50 hover:text-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-white border border-dark/20 rounded-lg p-6">
        {tab === "Elections" && (
          <>
            <h2 className="font-semibold text-lg mb-4">Create Election</h2>
            <ElectionForm />
          </>
        )}
        {tab === "Candidates" && (
          <>
            <h2 className="font-semibold text-lg mb-4">Add Candidate</h2>
            <CandidateForm elections={elections} />
          </>
        )}
        {tab === "Manage" && (
          <>
            <h2 className="font-semibold text-lg mb-4">Manage Elections</h2>
            <ElectionList elections={elections} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminClient;
