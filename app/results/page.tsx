import ResultCard from "@/components/results/ResultCard";
import ResultHeader from "@/components/results/ResultHeader";
import dbConnect from "@/lib/mongoose";
import Candidate from "@/models/Candidate";
import Election from "@/models/Election";
import Vote from "@/models/Vote";
import { CandidateWithVotes } from "@/types/results";
import React from "react";

export type { CandidateWithVotes };

type ElectionResult = {
  _id: string;
  title: string;
  startDate: string;
  byPosition: Record<string, CandidateWithVotes[]>;
};

const page = async () => {
  await dbConnect();

  let electionResults: ElectionResult[];

  try {
    // 1. Fetch non-upcoming elections sorted by most‑recent startDate first
    const rawElections = await Election.find({ status: { $ne: "upcoming" } })
      .sort({ startDate: -1 })
      .lean();
    const elections = JSON.parse(JSON.stringify(rawElections)) as {
      _id: string;
      title: string;
      startDate: string;
    }[];

    // 2. Fetch all candidates as plain objects
    const rawCandidates = await Candidate.find().lean();
    const candidates = JSON.parse(JSON.stringify(rawCandidates)) as Omit<
      CandidateWithVotes,
      "votes"
    >[];

    // 3. Count votes per candidate in a single aggregation round-trip
    const voteCounts = await Vote.aggregate<{ _id: string; count: number }>([
      { $group: { _id: { $toString: "$candidate" }, count: { $sum: 1 } } },
    ]);
    const voteMap = new Map(voteCounts.map((v) => [v._id, v.count]));

    // 4. Build a map: electionId → { position → CandidateWithVotes[] }
    const electionMap = new Map<string, Record<string, CandidateWithVotes[]>>();
    for (const c of candidates) {
      const elId = c.election as unknown as string;
      if (!electionMap.has(elId)) electionMap.set(elId, {});
      const byPos = electionMap.get(elId)!;
      const withVotes: CandidateWithVotes = {
        ...c,
        votes: voteMap.get(c._id) ?? 0,
      };
      (byPos[c.position] ??= []).push(withVotes);
    }

    // 5. Sort each position's candidates highest → lowest
    for (const byPos of electionMap.values()) {
      for (const arr of Object.values(byPos)) {
        arr.sort((a, b) => b.votes - a.votes);
      }
    }

    // 6. Assemble final list in election order (most recent first)
    electionResults = elections
      .filter((e) => electionMap.has(e._id))
      .map((e) => ({
        _id: e._id,
        title: e.title,
        startDate: e.startDate,
        byPosition: electionMap.get(e._id)!,
      }));
  } catch (error) {
    throw new Error(
      `Failed to load results: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  return (
    <div>
      <ResultHeader />
      <div className="max-w-4xl py-6 md:py-10 px-4 md:px-0 mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Election Results</h1>
          <p className="text-sm text-dark/40">
            Results published by the SRC Electoral Commission.
          </p>
        </div>

        <div className="space-y-16 mt-8">
          {electionResults.map((election) => (
            <section key={election._id}>
              {/* Election heading */}
              <div className="mb-6 pb-3 border-b border-dark/20">
                <h2 className="text-xl md:text-2xl font-bold">
                  {election.title}
                </h2>
                <p className="text-xs text-dark/40 mt-1">
                  {new Date(election.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Position cards for this election */}
              <div className="space-y-6">
                {Object.entries(election.byPosition).map(
                  ([position, candidates]) => (
                    <ResultCard
                      key={position}
                      position={position}
                      candidates={candidates}
                    />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
