import dbConnect from "@/lib/mongoose";
import Candidate, { ICandidate } from "@/models/Candidate";
import { IElection } from "@/models/Election";
import { ChartColumn, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

const ElectionCard = async ({ election }: { election: IElection }) => {
  const { status, title, description, endDate, startDate } = election;

  // request only the candidates belonging to this election
  await dbConnect();

  let candidates: ICandidate[];
  try {
    candidates = await Candidate.find({ election: election._id }).lean();
  } catch (err) {
    throw new Error(
      `Failed to load candidates: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const positions = Array.from(new Set(candidates.map((c) => c.position)));

  // `candidates` now contains only those tied to the election

  return (
    <div className="flex flex-col border border-dark/20 shadow rounded-lg w-full p-4">
      <div className="flex items-center justify-between">
        <div className="relative flex items-center justify-center">
          {status === "active" && (
            <div className="absolute bg-success/90 animate-pulse rounded-full w-[110%] h-[125%] -z-1" />
          )}{" "}
          <p
            className={`text-xs capitalize rounded-full px-2 py-1 ${
              status === "active"
                ? "bg-success"
                : status === "upcoming"
                  ? "bg-secondary"
                  : "bg-primary-light text-dark/70"
            }`}
          >
            {status}
          </p>
        </div>
        {status === "active" ? (
          <Link href={`/vote/${election._id}`}>
            <button className="btn-primary flex items-center text-sm">
              Vote <ChevronRight size={18} />
            </button>
          </Link>
        ) : status === "closed" ? (
          <button className="flex items-center gap-1 font-medium border border-dark/10 px-4 py-2 rounded-lg text-sm bg-primary-light/20 hover:bg-secondary transition-colors ">
            Results <ChartColumn size={18} />
          </button>
        ) : (
          ""
        )}{" "}
      </div>
      <div className="mt-2">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex text-xs gap-3 text-dark/70 pt-2 items-center">
        <div className="flex items-center">
          <Clock size={12} />{" "}
          {status === "upcoming" ? (
            <p className="ml-1">Starting {startDate.toDateString()}</p>
          ) : status === "closed" ? (
            <p className="ml-1">Ended {endDate.toDateString()}</p>
          ) : (
            <p className="ml-1">Ending {endDate.toDateString()}</p>
          )}
        </div>
        <div>
          <p>
            {positions.length} positions · {candidates.length} candidates
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
