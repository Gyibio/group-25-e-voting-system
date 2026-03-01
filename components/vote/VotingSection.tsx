import { ICandidate } from "@/models/Candidate";
import CandidateCard from "./CandidateCard";

const VotingSection = ({
  currentStep,
  curCandidates,
  selectedCandidates,
  setSelectedCandidates,
}: {
  currentStep: { position: string; index: number };
  curCandidates: ICandidate[];
  selectedCandidates: ICandidate[];
  setSelectedCandidates: (
    _: ICandidate[] | ((_: ICandidate[]) => ICandidate[]),
  ) => void;
}) => {
  const handlePick = (candidate: ICandidate) => {
    setSelectedCandidates((prev) => {
      const pos = currentStep.position;
      const existing = prev.find((p) => p.position === pos);

      if (existing) {
        if (existing.name === candidate.name) {
          // clicked the same one -> remove it
          return prev.filter((p) => p.name !== candidate.name);
        }
        // different candidate in same slot -> swap them
        return prev.map((p) => (p.position === pos ? candidate : p));
      }

      // no selection yet for this position
      return [...prev, candidate];
    });
  };

  return (
    <div className="min-w-full flex-1 flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold">
          {currentStep.position}
        </h1>
        <p>Select one candidate for this position.</p>
      </div>
      <div className=" space-y-4 h-full mb-10 overflow-scroll">
        {curCandidates.map((c) => (
          <CandidateCard
            action={() => handlePick(c)}
            selected={selectedCandidates.some((p) => p.name === c.name)}
            candidate={c}
            key={c.name}
          />
        ))}
      </div>
    </div>
  );
};

export default VotingSection;
