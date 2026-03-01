import { ICandidate } from "@/models/Candidate";
import React from "react";
import CandidateCardAlt from "./CandidateCardAlt";
import { CircleAlert } from "lucide-react";

const Confirmation = ({
  selectedCandidates,
}: {
  selectedCandidates: ICandidate[];
}) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Review Your Ballot</h1>
        <p>Please confirm your selections before submitting.</p>
      </div>
      <div className="mb-5 space-y-4">
        {selectedCandidates.map((c) => (
          <CandidateCardAlt name={c.name} position={c.position} key={c.name} />
        ))}
      </div>
      <div className="bg-error-light text-dark/70 rounded-lg mb-5 flex items-center gap-1 border border-error/20 p-2 text-xs ">
        <CircleAlert size={16} />
        <p>
          Your vote is final and cannot be changed after submission. Your ballot
          will be encrypted and stored anonymously.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
