import { ICandidate } from "@/models/Candidate";
import { Check, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useState } from "react";

const Nav = ({
  confirm,
  setConfirm,
  currentStep,
  setCurrentStep,
  setComplete,
  positions,
  electionId,
  selectedCandidates,
}: {
  confirm: boolean;
  setConfirm: (_: boolean) => void;
  setComplete: (_: boolean) => void;
  currentStep: { position: string; index: number };
  setCurrentStep: (_: { position: string; index: number }) => void;
  positions: string[];
  electionId: string;
  selectedCandidates: ICandidate[];
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const results = await Promise.all(
        selectedCandidates.map((c) =>
          fetch("/api/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              candidate: c._id,
              election: electionId,
              position: c.position,
            }),
          }),
        ),
      );

      // 409 = duplicate vote (already recorded) — that's fine, treat as success
      const realFailure = results.find((r) => !r.ok && r.status !== 409);
      if (realFailure) {
        const body = await realFailure.json();
        setError(body.error ?? "Failed to submit vote. Please try again.");
        return;
      }

      setComplete(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-error text-sm text-center">{error}</p>}
      <div className="flex justify-between">
        <button
          disabled={submitting}
          onClick={() => {
            if (confirm) setConfirm(false);
            else if (currentStep.index > 1) {
              setCurrentStep({
                position: positions[currentStep.index - 2],
                index: currentStep.index - 1,
              });
            }
          }}
          className="btn-primary flex items-center disabled:opacity-50"
        >
          <ChevronLeft /> Previous
        </button>
        {confirm ? (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary bg-success gap-1 hover:bg-success-dark2 flex items-center disabled:opacity-50"
          >
            {submitting ? (
              <>
                Submitting <Loader size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Submit Vote <Check />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              if (currentStep.index < positions.length) {
                setCurrentStep({
                  position: positions[currentStep.index],
                  index: currentStep.index + 1,
                });
              } else setConfirm(true);
            }}
            className="btn-primary flex items-center"
          >
            Next <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
