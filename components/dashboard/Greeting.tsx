"use client";
import { useLC } from "@/components/general/LoginContext";

const Greeting = () => {
  const { user } = useLC();

  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-dark/60">
        Here are the current and upcoming SRC elections.
      </p>
    </div>
  );
};

export default Greeting;
