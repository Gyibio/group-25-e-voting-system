import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ResultHeader = () => {
  return (
    <div className="flex justify-between w-full border-b border-dark/40 p-4 items-center">
      <div className="flex-1">
        <Link href={"/dashboard"}>
          <button className="flex items-center gap-1">
            <ChevronLeft />
            Dashboard
          </button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="font-bold">Election Results</h1>
      </div>
      <div className="flex-1" />
    </div>
  );
};

export default ResultHeader;
