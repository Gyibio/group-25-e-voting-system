"use client";
import { motion } from "motion/react";
import { useLC } from "./LoginContext";
import { ChartColumn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header = () => {
  const { setIsOpen, login } = useLC();

  return (
    <div className="w-full min-h-16 border-b border-dark/40 py-2 px-4 items-center justify-between flex flex-wrap gap-2">
      <div className="text-3xl font-bold text-primary">
        <Link href={"/"}>VoteUG</Link>
      </div>
      {login ? (
        <div className="flex items-center divide-dark/50 divide-x flex-wrap gap-y-2">
          <div className="flex pr-4 items-center">
            <Link href={"/results"}>
              <button className="flex gap-2 bg-bg hover:bg-secondary transition-colors p-2 text-dark/80 rounded-lg items-center">
                <p className="text-sm font-medium">Results</p>
                <ChartColumn />
              </button>
            </Link>
          </div>
          <div className="flex pl-4 items-center">
            <div className="bg-primary-light mr-2 p-2 rounded-full">
              <User />
            </div>
            {/* session info can be fetched from useSession if needed */}
            <button
              onClick={() => {
                signOut();
              }}
            >
              <LogOut />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <motion.button
            initial={{ borderColor: "#ffffff00", color: "#000000" }}
            whileHover={{ borderColor: "#e6b52a", color: "#e6b52a" }}
            transition={{
              duration: 0.2,
              ease: "linear",
            }}
            onClick={() => setIsOpen(true)}
            className="px-2 sm:px-4 py-2 sm:text-base text-xs rounded-lg font-medium bg-transparent border"
          >
            Sign In
          </motion.button>
          <button
            onClick={() => setIsOpen(true)}
            className="btn-primary border border-primary"
          >
            Vote now
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
