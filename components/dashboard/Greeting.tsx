"use client";
import { useSession } from "next-auth/react";

const Greeting = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold">
        Welcome, {session?.user?.name}
      </h1>
      <p className="text-dark/60">
        Here are the current and upcoming SRC elections.
      </p>
    </div>
  );
};

export default Greeting;
