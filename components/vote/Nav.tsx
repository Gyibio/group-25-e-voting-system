import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Nav = ({
  confirm,
  setConfirm,
  currentStep,
  setCurrentStep,
  setComplete,
  positions,
}: {
  confirm: boolean;
  setConfirm: (_: boolean) => void;
  setComplete: (_: boolean) => void;
  currentStep: { position: string; index: number };
  setCurrentStep: (_: { position: string; index: number }) => void;
  positions: string[];
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={() => {
          if (confirm) setConfirm(false);
          else if (currentStep.index > 1) {
            setCurrentStep({
              position: positions[currentStep.index - 2],
              index: currentStep.index - 1,
            });
          }
        }}
        className="btn-primary flex items-center"
      >
        <ChevronLeft /> Previous
      </button>
      {confirm ? (
        <button
          onClick={() => {
            setComplete(true);
          }}
          className="btn-primary bg-success gap-1 hover:bg-success-dark2 flex items-center"
        >
          Submit Vote <Check />
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
  );
};

export default Nav;
