import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

const VoteHeader = ({
  totalPositions,
  currentStep,
}: {
  totalPositions: number;
  currentStep: { position: string; index: number };
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between px-4 py-4">
        <div>
          <button className="flex items-center">
            <ChevronLeft />
            Back
          </button>
        </div>
        <div>{currentStep.position}</div>
        <div>
          {currentStep.index}/{totalPositions}
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep.index / totalPositions) * 100}%` }}
        className=" h-1 bg-primary"
      />
    </div>
  );
};

export default VoteHeader;
