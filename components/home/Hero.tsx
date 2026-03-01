"use client";

import React from "react";
import Header from "../general/Header";
import Image from "next/image";
import { useLC } from "../general/LoginContext";
import Link from "next/link";

const Hero = () => {
  const { setIsOpen, login } = useLC();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="h-full relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-transparent">
          <div className="h-full w-full flex flex-col px-4 md:pl-10 justify-center">
            <h1 className="text-white text-3xl md:text-6xl font-bold">
              Your Vote,
              <span className="text-secondary"> Your Voice</span>
            </h1>
            <p className="text-white text-sm md:text-xl max-w-2xl">
              The official SRC E-Voting platform for the University of Ghana.
              Secure, transparent, and accessible to every student.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {login ? (
                <Link href="/dashboard">
                  <button className="btn-secondary border border-secondary">
                    Cast Your Vote
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn-secondary border border-secondary"
                >
                  Cast Your Vote
                </button>
              )}
              <Link href={"/results"}>
                <button className="btn-primary backdrop-blur-xs bg-transparent hover:bg-primary hover:border-primary transition-colors duration-300 border border-white">
                  View Results
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Image
          src="/hero.png"
          alt="Image of University of Ghana"
          width={0}
          height={0}
          unoptimized
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Hero;
