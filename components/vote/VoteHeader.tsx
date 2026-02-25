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
    <div className="w-full h-fit">
      <div className="w-full flex items-center justify-between p-4">
        <div>
          <button className="flex items-center">
            <ChevronLeft />
            Back
          </button>
        </div>
        <h1 className="font-bold">SRC Elections 2025/2026</h1>
        <div>
          {currentStep.index}/{totalPositions}
        </div>
      </div>
      <div className="w-full bg-dark/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep.index / totalPositions) * 100}%` }}
          className=" h-0.5 bg-primary"
        />
      </div>
    </div>
  );
};

export default VoteHeader;
