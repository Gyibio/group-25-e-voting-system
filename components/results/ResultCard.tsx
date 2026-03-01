"use client";
import { CandidateWithVotes } from "@/types/results";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

const ResultCard = ({
  position,
  candidates,
}: {
  position: string;
  candidates: CandidateWithVotes[];
}) => {
  // candidates arrive pre-sorted (highest votes first) from the server
  const votes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="p-4 bg-white border shadow border-dark/20 rounded-lg">
      <div className="flex flex-wrap gap-2 justify-between mb-4 items-center">
        <h1 className="text-lg md:text-xl font-bold">{position}</h1>
        <p className="text-xs text-dark/60">{votes.toLocaleString()} votes</p>
      </div>
      <div className="space-y-2">
        {candidates.map((c, i) => (
          <div key={c.name}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <h1 className="font-medium">{c.name}</h1>{" "}
                {i === 0 && (
                  <p className="flex gap-1 p-1 text-secondary bg-secondary-light rounded-full items-center text-xs">
                    <Trophy size={12} /> Winner
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-dark/70">
                  {votes ? ((c.votes / votes) * 100).toFixed(2) : 0}%
                </p>
              </div>
            </div>
            <div className="h-2 w-full bg-dark/20 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${votes ? (c.votes / votes) * 100 : 0}%`,
                }}
                viewport={{ once: true, amount: 0.4 }}
                className="bg-primary-dark h-full rounded-lg"
              />
            </div>
            <p className="text-xs text-dark/60 mt-1">
              {c.votes.toLocaleString()} votes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
