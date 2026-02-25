import React from "react";

const CandidateCardAlt = ({
  name,
  position,
}: {
  name: string;
  position: string;
}) => {
  return (
    <div className="p-4 bg-white border-dark/40 border-2 rounded-lg">
      <p className="text-sm text-dark/60">{position}</p>
      <h1 className="text-xl font-medium">{name}</h1>
    </div>
  );
};

export default CandidateCardAlt;
