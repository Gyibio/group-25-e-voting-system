import candidates from "@/candidates";
import ResultCard from "@/components/results/ResultCard";
import ResultHeader from "@/components/results/ResultHeader";
import React from "react";

const page = () => {
  const positions = Array.from(new Set(candidates.map((c) => c.position)));

  positions.map((p) => {
    candidates.filter((c) => c.position === p);
  });

  return (
    <div>
      <ResultHeader />
      <div className="max-w-4xl py-6 md:py-10 px-4 md:px-0 mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            SRC Elections 2025/2026 Results
          </h1>
          <p className="text-sm text-dark/40">
            Results published by the SRC Electoral Commission.
          </p>
        </div>
        <div className="space-y-8 mt-5">
          {positions.map((p) => (
            <ResultCard
              position={p}
              candidates={candidates.filter((c) => c.position === p)}
              key={p}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
