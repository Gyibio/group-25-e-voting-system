import CandidateCard from "./CandidateCard";
import { candidateT } from "@/app/vote/page";

const VotingSection = ({
  currentStep,
  curCandidates,
  selectedCandidates,
  setSelectedCandidates,
}: {
  currentStep: { position: string; index: number };
  curCandidates: candidateT[];
  selectedCandidates: candidateT[];
  setSelectedCandidates: (
    _: candidateT[] | ((_: candidateT[]) => candidateT[]),
  ) => void;
}) => {
  const handlePick = (candidate: candidateT) => {
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
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{currentStep.position}</h1>
        <p>Select one candidate for this position.</p>
      </div>
      <div className="pb-10 space-y-4">
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
