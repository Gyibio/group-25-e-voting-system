"use client";
import candidates from "@/candidates";
import Completed from "@/components/vote/Completed";
import Confirmation from "@/components/vote/Confirmation";
import Nav from "@/components/vote/Nav";
import VoteHeader from "@/components/vote/VoteHeader";
import VotingSection from "@/components/vote/VotingSection";
import { useEffect, useState } from "react";

export type candidateT = {
  name: string;
  position: string;
  faculty: string;
  motto: string;
  votes: number;
};

const Page = () => {
  const positions = Array.from(new Set(candidates.map((c) => c.position)));
  const [currentStep, setCurrentStep] = useState<{
    position: string;
    index: number;
  }>({ position: positions[0], index: 1 });

  const curCandidates = candidates.filter(
    (c) => c.position === currentStep.position,
  );

  const [selectedCandidates, setSelectedCandidates] = useState<candidateT[]>(
    [],
  );

  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => console.log(selectedCandidates), [selectedCandidates]);

  return (
    <div className="flex h-screen flex-col items-center">
      <VoteHeader totalPositions={positions.length} currentStep={currentStep} />
      {/* use candidates array here for rendering or testing */}
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
          />
        </div>
      )}
    </div>
  );
};

export default Page;
