import { ChartColumn, ChevronRight, Clock, Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ECard {
  status: "active" | "upcoming" | "completed";
  title: string;
  description: string;
  endingDate: Date;
  positions: number;
  candidates: number;
}

const ElectionCard = (data: ECard) => {
  const { status, title, description, endingDate, positions, candidates } =
    data;

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
          <Link href={"/vote"}>
            <button className="btn-primary flex items-center text-sm">
              Vote <ChevronRight size={18} />
            </button>
          </Link>
        ) : status === "completed" ? (
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
          <p className="ml-1">{endingDate.toDateString()}</p>
        </div>
        <div>
          <p>
            {positions} positions · {candidates} candidates{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
