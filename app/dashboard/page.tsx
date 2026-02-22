import ElectionCard from "@/components/dashboard/ElectionCard";
import Greeting from "@/components/dashboard/Greeting";
import Header from "@/components/general/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <div className="py-8 px-6">
        <Greeting />
        <div className="space-y-4 pt-8">
          <ElectionCard
            status="active"
            title="Election test number 1"
            description="This an election description I am thinking about"
            endingDate={new Date(Date.now())}
            positions={8}
            candidates={24}
          />
          <ElectionCard
            status="upcoming"
            title="Election test number 1"
            description="This an election description I am thinking about"
            endingDate={new Date(Date.now())}
            positions={8}
            candidates={24}
          />
          <ElectionCard
            status="completed"
            title="Election test number 1"
            description="This an election description I am thinking about"
            endingDate={new Date(Date.now())}
            positions={8}
            candidates={24}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
