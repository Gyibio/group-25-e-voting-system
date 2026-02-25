import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const Completed = () => {
  return (
    <div className="flex flex-col gap-6 h-full w-full justify-center items-center">
      <div className="text-success bg-success-light rounded-full p-3">
        <Check size={46} />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Vote Submitted!</h1>
        <p className="text-x; text-dark/70">
          Your encrypted ballot has been securely recorded.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href={"/dashboard"}>
          <button className="px-4 py-2 rounded-lg font-medium bg-primary-light border border-dark/40 hover:bg-secondary transition-colors ">
            Back to Dashboard
          </button>
        </Link>
        <Link href={"/results"}>
          <button className="btn-primary border border-primary">
            View Results
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Completed;
