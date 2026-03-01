"use client";
import Completed from "@/components/vote/Completed";
import Confirmation from "@/components/vote/Confirmation";
import Nav from "@/components/vote/Nav";
import VoteHeader from "@/components/vote/VoteHeader";
import VotingSection from "@/components/vote/VotingSection";
import { ICandidate } from "@/models/Candidate";
import { useState } from "react";

const VoteClient = ({
  candidates,
  electionId,
  previousVotes = {},
}: {
  candidates: ICandidate[];
  electionId: string;
  previousVotes?: Record<string, string>;
}) => {
  const positions = Array.from(new Set(candidates.map((c) => c.position)));

  const [currentStep, setCurrentStep] = useState<{
    position: string;
    index: number;
  }>({ position: positions[0], index: 1 });

  const curCandidates = candidates.filter(
    (c) => c.position === currentStep.position,
  );

  // Pre-select candidates the user previously voted for
  const [selectedCandidates, setSelectedCandidates] = useState<ICandidate[]>(
    () => {
      const preSelected: ICandidate[] = [];
      for (const [position, candidateId] of Object.entries(previousVotes)) {
        const match = candidates.find(
          (c) => c.position === position && String(c._id) === candidateId,
        );
        if (match) preSelected.push(match);
      }
      return preSelected;
    },
  );

  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center">
      <VoteHeader totalPositions={positions.length} currentStep={currentStep} />
      {complete ? (
        <Completed />
      ) : (
        <div className="max-w-4xl h-full justify-between sm:block flex flex-col w-full py-6 md:py-10 px-4 md:px-0">
          {confirm ? (
            <Confirmation selectedCandidates={selectedCandidates} />
          ) : (
            <VotingSection
              currentStep={currentStep}
              curCandidates={curCandidates}
              selectedCandidates={selectedCandidates}
              setSelectedCandidates={setSelectedCandidates}
            />
          )}
          <Nav
            setComplete={setComplete}
            confirm={confirm}
            setConfirm={setConfirm}
            positions={positions}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            electionId={electionId}
            selectedCandidates={selectedCandidates}
          />
        </div>
      )}
    </div>
  );
};

export default VoteClient;
