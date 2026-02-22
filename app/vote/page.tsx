"use client";
import CandidateCard from "@/components/vote/CandidateCard";
import VoteHeader from "@/components/vote/VoteHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Page = () => {
  // sample data for testing – each entry has name, position, faculty and motto
  const candidates = [
    // president candidates
    {
      name: "Alice Johnson",
      position: "President",
      faculty: "Science",
      motto: "Knowledge is power",
    },
    {
      name: "David Kwame",
      position: "President",
      faculty: "Business",
      motto: "Leadership through service",
    },
    {
      name: "Emilia Boateng",
      position: "President",
      faculty: "Law",
      motto: "Justice for all",
    },
    {
      name: "Francis Nkrumah",
      position: "President",
      faculty: "Social Sciences",
      motto: "Unity and progress",
    },
    // vice president candidates
    {
      name: "Brian Mensah",
      position: "Vice President",
      faculty: "Engineering",
      motto: "Building the future together",
    },
    {
      name: "Grace Osei",
      position: "Vice President",
      faculty: "Medicine",
      motto: "Health is wealth",
    },
    {
      name: "Henry Adu",
      position: "Vice President",
      faculty: "Agriculture",
      motto: "Growing our nation",
    },
    {
      name: "Irene Tetteh",
      position: "Vice President",
      faculty: "Education",
      motto: "Knowledge for change",
    },
    // secretary candidates
    {
      name: "Claire Owusu",
      position: "Secretary",
      faculty: "Arts",
      motto: "Communication is key",
    },
    {
      name: "James Appiah",
      position: "Secretary",
      faculty: "Computer Science",
      motto: "Connect and record",
    },
    {
      name: "Kofi Yeboah",
      position: "Secretary",
      faculty: "Mathematics",
      motto: "Precision in every word",
    },
    {
      name: "Linda Akoto",
      position: "Secretary",
      faculty: "Nursing",
      motto: "Care with clarity",
    },
  ];

  const test = new Set<string>();

  candidates.map((c) => test.add(c.position));
  console.log(test.entries);

  const positions: string[] = [];
  test.forEach((v) => positions.push(v));
  const [currentStep, setCurrentStep] = useState<{
    position: string;
    index: number;
  }>({ position: positions[0], index: 1 });

  const curCandidates = candidates.filter(
    (c) => c.position === currentStep.position,
  );

  return (
    <div>
      <VoteHeader totalPositions={test.size} currentStep={currentStep} />
      {/* use candidates array here for rendering or testing */}

      <div className="max-w-4xl py-10 mx-auto">
        <div className="pb-10 space-y-4">
          {curCandidates.map((c) => (
            <CandidateCard selected={true} candidate={c} key={c.name} />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentStep.index > 1) {
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
          <button
            onClick={() => {
              if (currentStep.index < positions.length) {
                setCurrentStep({
                  position: positions[currentStep.index],
                  index: currentStep.index + 1,
                });
              }
            }}
            className="btn-primary flex items-center"
          >
            Next <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
