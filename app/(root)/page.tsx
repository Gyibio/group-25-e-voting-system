import Hero from "@/components/home/Hero";
import How from "@/components/home/How";
import Why from "@/components/home/Why";
import React from "react";

const page = () => {
  return (
    <div className="pb-8">
      <Hero />
      <How />
      <Why />
    </div>
  );
};

export default page;
