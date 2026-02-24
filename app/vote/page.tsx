"use client";
import Completed from "@/components/vote/Completed";
import Confirmation from "@/components/vote/Confirmation";
import Nav from "@/components/vote/Nav";
import VoteHeader from "@/components/vote/VoteHeader";
import VotingSection from "@/components/vote/VotingSection";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type candidateT = {
  name: string;
  position: string;
  faculty: string;
  motto: string;
};

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

  const positions = Array.from(new Set(candidates.map((c) => c.position)));
  const [currentStep, setCurrentStep] = useState<{
    position: string;
    index: number;
  }>({ position: positions[0], index: 1 });

  const curCandidates = candidates.filter(
    (c) => c.position === currentStep.position,
  );

  const [selectedCandidates, setSelectedCandidates] = useState<candidateT[]>(
    [],
  );

  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => console.log(selectedCandidates), [selectedCandidates]);

  return (
    <div className="h-screen flex flex-col">
      <VoteHeader totalPositions={positions.length} currentStep={currentStep} />
      {/* use candidates array here for rendering or testing */}
      {complete ? (
        <Completed />
      ) : (
        <div className="max-w-4xl py-10 mx-auto">
          {confirm ? (
            <Confirmation selectedCandidates={selectedCandidates} />
          ) : (
            <VotingSection
              currentStep={currentStep}
              curCandidates={curCandidates}
              selectedCandidates={selectedCandidates}
              setSelectedCandidates={setSelectedCandidates}
            />
          )}
          <Nav
            setComplete={setComplete}
            confirm={confirm}
            setConfirm={setConfirm}
            positions={positions}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
