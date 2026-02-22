"use client";
import { User } from "lucide-react";
import React from "react";

interface candidateT {
  name: string;
  faculty: string;
  motto: string;
}

const CandidateCard = ({
  candidate,
  selected,
}: {
  candidate: candidateT;
  selected: boolean;
}) => {
  const { name, faculty, motto } = candidate;
  return (
    <div className="flex group gap-4 w-full border-dark/20 border-3 hover:border-dark/40 transition-colors rounded-lg p-4 items-center">
      <div className="bg-primary-light p-2 rounded-full text-dark/40">
        <User />
      </div>
      <div className="space-y-1 w-full">
        <h1 className="font-bold">{name}</h1>
        <p className="text-xs">Faculty of {faculty}</p>
        <p className="text-xs italic">&quot;{motto}&quot;</p>
      </div>
      <div>
        <div className="border-dark/20 group-hover:border-dark/40 transition-colors border-2 size-6 rounded-full bg-primary-light/50" />
      </div>
    </div>
  );
};

export default CandidateCard;
