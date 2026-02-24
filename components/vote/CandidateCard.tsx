"use client";
import { Check, User } from "lucide-react";
import React from "react";

interface candidateT {
  name: string;
  faculty: string;
  motto: string;
}

const CandidateCard = ({
  candidate,
  selected,
  action,
}: {
  candidate: candidateT;
  selected: boolean;
  action: () => void;
}) => {
  const { name, faculty, motto } = candidate;
  return (
    <div
      onClick={() => action()}
      className={`flex group gap-4 w-full ${selected ? "border-primary hover:border-primary-dark bg-primary-light " : "border-dark/20 hover:border-dark/40 bg-white"} border-3 transition-colors rounded-lg p-4 items-center`}
    >
      <div
        className={`${selected ? "bg-primary text-white" : "bg-primary-light text-dark/40"} transition-colors p-2 rounded-full`}
      >
        <User />
      </div>
      <div className="space-y-1 w-full">
        <h1 className="font-bold">{name}</h1>
        <p className="text-xs text-dark/60">Faculty of {faculty}</p>
        <p className="text-xs italic text-primary-dark">&quot;{motto}&quot;</p>
      </div>
      <div>
        <div
          className={`${selected ? "bg-primary border-primary group-hover:border-primary-dark " : "bg-primary-light/50 border-dark/20 group-hover:border-dark/40 "} flex items-center justify-center transition-colors border-2 size-6 rounded-full`}
        >
          {selected && <Check size={16} color="#ffffff" />}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
